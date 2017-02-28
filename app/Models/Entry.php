<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\SoftDeletes;

class Entry extends \Moloquent
{

  use SoftDeletes;

  protected $collection = 'entry';
  protected $primaryKey = '_id';

  protected $fillable = [ 'name' ];

  protected $dateFormat = 'c';

  protected $dates = ['entities.*.date', 'deleted_at'];

}
