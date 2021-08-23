<?php

namespace App\Console;

use App\Models\Todo;
use App\Models\User;
use App\Notifications\TodoCompleted;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Notification;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->call(function() {
            $now = now();
            $todos = Todo::whereDate('date', $now->toDateString())
                ->whereTime('time', $now->toTimeString())
                ->get();
            foreach ($todos as $todo) {
                $users = User::all();
                Notification::send($users, new TodoCompleted($todo));
            }
        })->everyMinute();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
