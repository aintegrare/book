# Use PHP 8.3 CLI (não Apache)
FROM php:8.3-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    libzip-dev \
    libicu-dev \
    zip \
    unzip \
    nodejs \
    npm

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-configure intl
RUN docker-php-ext-install pdo_pgsql pgsql mbstring exif pcntl bcmath gd intl zip

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy composer files first (for layer caching)
COPY composer.json composer.lock ./

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts

# Copy package files
COPY package*.json ./

# Install Node dependencies
RUN npm install

# Copy application files
COPY . .

# Run composer scripts now
RUN composer dump-autoload --optimize

# Build assets
RUN npm run build

# Create storage directories and set permissions
RUN mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views \
    && mkdir -p storage/logs \
    && mkdir -p bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Expose port (Render will override with $PORT)
EXPOSE 8000

# Create startup script
RUN echo '#!/bin/bash\n\
set -e\n\
echo "Starting BookVault..."\n\
echo "Waiting for database..."\n\
sleep 5\n\
echo "Running migrations..."\n\
php artisan migrate --force --no-interaction\n\
echo "Caching configuration..."\n\
php artisan config:clear\n\
php artisan config:cache\n\
php artisan route:cache\n\
php artisan view:cache\n\
echo "Starting server on port ${PORT:-8000}..."\n\
exec php artisan serve --host=0.0.0.0 --port=${PORT:-8000}' > /usr/local/bin/start.sh \
    && chmod +x /usr/local/bin/start.sh

# Start application
CMD ["/usr/local/bin/start.sh"]
