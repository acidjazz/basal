<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\SoftDeletes;

class Structure extends \Moloquent
{

  use SoftDeletes;

  protected $collection = 'structure';
  protected $primaryKey = '_id';

  protected $fillable = [ 'name', 'entries' ];

  protected $dateFormat = 'c';

  protected $dates = ['deleted_at'];

  public function client()
  {
    return $this->hasOne('App\Models\Client', '_id', 'client.id');
  }

  public function entries()
  {
    return $this->hasMany('App\Models\Entry', 'structure.id', '_id');
  }

}
