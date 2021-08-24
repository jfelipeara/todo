<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\BroadcastsEvents;

class Todo extends Model
{
    use HasFactory, BroadcastsEvents;

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'date' => 'date:Y-m-d',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the channels that model events should broadcast on.
     *
     * @param  string  $event
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn($event)
    {
        return match($event) {
            'deleted' => [],
            default => [$this, $this->user],
        };
    }
}
