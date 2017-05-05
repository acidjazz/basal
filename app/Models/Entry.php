<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\SoftDeletes;

use App\Entities\Kernel;

class Entry extends \Moloquent
{

  use SoftDeletes;

  protected $collection = 'entry';
  protected $primaryKey = '_id';

  protected $fillable = [ 'name' ];

  protected $dateFormat = 'c';

  protected $dates = ['entities.*.date', 'deleted_at'];

  public function getEntitiesAttribute($entities) {

    foreach ($entities as $key=>$value) {

      if ($value['type'] === 'Image') {

        $thumbnails = [];
        $parts = pathinfo($value['value']);

        foreach (Kernel::getThumbnails() as $size) {
          $thumbnails[$size] = sprintf('%s/%s-%d.%s', 
            $parts['dirname'],
            $parts['filename'],
            $size,
            $parts['extension']
          );
        }

        $entities[$key]['thumbnails'] = $thumbnails;

      }

    }

    return $entities;

  }

}
