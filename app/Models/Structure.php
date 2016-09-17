<?php

namespace App\Models;

class Structure extends \Moloquent
{

  protected $collection = 'structure';
  protected $primaryKey = '_id';

  protected $fillable = [ 'name' ];

  protected $dateFormat = 'c';

}
