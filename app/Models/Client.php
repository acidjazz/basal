<?php

namespace App\Models;

class Client extends \Moloquent
{

  protected $collection = 'client';
  protected $primaryKey = '_id';

  protected $fillable = [
    'name'
  ];

}
