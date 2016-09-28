<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;


class Structure extends Eloquent
{

  protected $collection = 'structure';
  protected $primaryKey = '_id';

  protected $fillable = [ 'name', 'entries' ];

  protected $dateFormat = 'c';

  public function client()
  {
    return $this->hasOne('App\Models\Client', '_id', 'client.id');
  }

}
