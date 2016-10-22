<?

namespace App\Entities;

class Kernel
{

  protected $entities = [

    'Text',
    'Blog',
    'Image',
    'Tags',
    
    'Date',
    'Time',
    'DateTime',
    'DateRange',
    'DateTimeRange',

  ];

  public function getEntities()
  {

    return (array) $this->entities;

  }

}
