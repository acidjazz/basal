<?php

namespace App\Api;

use App\Models\Structure;
use Illuminate\Http\Request;

use App\Structure\Kernel;

class StructureController extends MetApiController
{

  public function __construct(Request $request)
  {
    parent::__construct($request);
  }

  public function add(Request $request)
  {

    $this->addOption('name', 'required|string');
    $this->addOption('entities', 'required|array');
    $this->addOption('entities.*.name', 'required|string|distinct');
    $this->addOption('entities.*.type', 'required|in:'.implode((new Kernel())->getTypes(), ','));

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $structure = new Structure();
    $structure->name = $query['combined']['name'];
    $structure->entities = $query['combined']['entities'];
    $structure->save();

    return $this->render(['status' => 'Structure added successfully']);
  }

  public function get(Request $request)
  {

    $this->addOption('view', 'in:true,false', 'false');

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $structures = Structure::paginate(20);
    $this->addPaginate($structures);

    $view = false;
    if ($query['combined']['view'] === 'true') {
      $view = view('partial.structures', ['structures' => $structures->items()])->render();
    }

    return $this->render($structures->items(),$view);

  }

}
