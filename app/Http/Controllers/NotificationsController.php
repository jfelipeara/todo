<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationsController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $userUnreadNotification = auth('api')->user()
            ->unreadNotifications()
            ->where('id', $request->id)
            ->first();

        if($userUnreadNotification) {
            $userUnreadNotification->markAsRead();
        }

        return response()->json();
    }
}
