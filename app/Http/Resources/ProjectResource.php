<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\TaskCollection;
use App\Http\Resources\TaskResource;
class ProjectResource extends JsonResource
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
        $resource["tasks"] = TaskResource::collection($this->whenLoaded('tasks'));
        $resource["users"] = $this->whenLoaded('users');

        return $resource;
    }
}
