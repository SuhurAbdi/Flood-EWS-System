<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class FloodReport extends Model
{
use HasFactory;

    protected $fillable = [
        'user_id',
        'location',
        'severity',
        'flood_occurred',
        'description',
        'photo',
        'status',
        'latitude',
        'longitude',
    ];

    protected $casts = [
        'flood_occurred' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
