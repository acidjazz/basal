<?php

namespace App\Models;

class Entry extends \Moloquent
{

  protected $collection = 'entry';
  protected $primaryKey = '_id';

  protected $fillable = [ 'name' ];

  protected $dateFormat = 'c';

}
