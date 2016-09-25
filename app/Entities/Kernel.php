<?

namespace App\Entities;

class Kernel
{

  protected $entities = [ 'Text', 'Blog', 'Image', 'Tags' ];

  public function getEntities()
  {

    return (array) $this->entities;

  }

}
