<?php

namespace App\Entities;

class Kernel
{

  public static $thumbnails = [
    100,
    20
  ];

  protected $entities = [

    'Text',
    'Number',
    'Link',
    'Blog',
    'Image',
    'Tags',
    'Date',
    'Time',
    'DateTime',
    'DateRange',
    'DateTimeRange',

  ];

  public static function getThumbnails()
  {
    return (array) self::$thumbnails;
  }

  public function getEntities()
  {
    return (array) $this->entities;
  }

}
