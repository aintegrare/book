<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class Book extends Model
{
    protected $fillable = [
        'title',
        'author',
        'description',
        'cover_url',
        'slug',
        'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($book) {
            if (empty($book->slug)) {
                $book->slug = Str::slug($book->title);
            }
        });
    }

    public function chapters(): HasMany
    {
        return $this->hasMany(Chapter::class)->orderBy('order');
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'book_accesses')
            ->withTimestamps()
            ->withPivot(['granted_at', 'expires_at']);
    }

    public function bookAccesses(): HasMany
    {
        return $this->hasMany(BookAccess::class);
    }

    public function userHasAccess(User $user): bool
    {
        return $this->bookAccesses()
            ->where('user_id', $user->id)
            ->where(function ($query) {
                $query->whereNull('expires_at')
                    ->orWhere('expires_at', '>', now());
            })
            ->exists();
    }
}
