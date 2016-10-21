<?

namespace App\Entities;

class Kernel
{

  protected $entities = [ 'Text', 'Blog', 'Image', 'Tags', 'Date' ];

  public function getEntities()
  {

    return (array) $this->entities;

  }

}
