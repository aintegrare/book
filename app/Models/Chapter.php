<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Chapter extends Model
{
    protected $fillable = [
        'book_id',
        'title',
        'content',
        'order',
        'slug',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($chapter) {
            if (empty($chapter->slug)) {
                $chapter->slug = Str::slug($chapter->title);
            }
        });
    }

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }
}
