<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\SoftDeletes;

class Client extends \Moloquent
{

  use SoftDeletes;

  protected $collection = 'client';
  protected $primaryKey = '_id';

  protected $fillable = [ 'name' ];

  protected $dateFormat = 'c';
  protected $dates = ['deleted_at'];

  public function structures()
  {
    return $this->hasMany('App\Models\Structure', 'client.id', '_id');
  }
  public function entries()
  {
    return $this->hasMany('App\Models\Entry', 'client.id', '_id');
  }

}
