<?php

namespace App\Models;

class Structure extends \Moloquent
{

  protected $collection = 'structure';
  protected $primaryKey = '_id';

  protected $fillable = [ 'name', 'entries' ];

  protected $dateFormat = 'c';

}
