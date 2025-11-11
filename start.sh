#!/bin/bash
set -e

echo "🚀 Starting BookVault..."

# Wait for database
echo "⏳ Waiting for database connection..."
sleep 3

# Run migrations
echo "📦 Running migrations..."
php artisan migrate --force --no-interaction || echo "⚠️  Migration failed, continuing..."

# Cache configuration
echo "⚙️  Caching configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start server
echo "✅ Starting server on port ${PORT:-8000}..."
exec php artisan serve --host=0.0.0.0 --port=${PORT:-8000}
