<?

namespace App\Structure;

class Kernel
{

  protected $types = [ 'Text', 'Blog', 'Image', 'Tags' ];

  public function getTypes()
  {

    return (array) $this->types;

  }

}
