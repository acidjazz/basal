<?php

namespace App\Models;

class Test extends \Moloquent
{

  protected $collection = 'test';
  protected $primaryKey = '_id';

  protected $dateFormat = 'c';

}
