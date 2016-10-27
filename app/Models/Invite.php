<?php

namespace App\Models;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;

class Invite extends \Moloquent
{

  use SoftDeletes;

  protected $collection = 'invite';
  protected $primaryKey = '_id';

  protected $dateFormat = 'c';


}
