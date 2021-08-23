<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\ResourceCollection;

class TodoCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $todos = $this->collection->map(function($todo) {
            $onTime = Carbon::parse($todo->time)->lt(Carbon::parse(now()->toTimeString()));
            if ($todo->date->lt(now()->startOfDay())) {
                $todo->isComplete = true;
            } else if ($todo->date->eq(now()->startOfDay())) {
                if ($onTime) {
                    $todo->isComplete = true;
                }
            } else {
                $todo->isComplete = false;
            }
            $todo->load('user');
            return $todo;
        });

        return $todos;
    }
}
