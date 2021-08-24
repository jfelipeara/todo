<?php

namespace App\Notifications;

use App\Models\Todo;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class TodoCompleted extends Notification
{
    use Queueable;

    protected $todo;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Todo $todo)
    {
        $this->todo = $todo;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['broadcast', 'database'];
    }


    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'notification_id' => $this->id,
            'todo_id' => $this->todo->id,
            'title' => $this->todo->title,
            'text' => $this->todo->text,
        ];
    }
}
