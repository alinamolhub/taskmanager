<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Tasks;
class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $resource = parent::toArray($request);
        //auth()->user()->can('update', $this);
       
        $resource["user"] = $this->user;
        $resource["creator"] = $this->creator;

        $resource["canUpdate"] = auth()->user()->can('update', $this->resource);
        $resource["seconds"] = $this->getTotalSeconds();
        $resource["isTimerOn"] = $this->isTimerOn();
        return $resource;
    }
}
