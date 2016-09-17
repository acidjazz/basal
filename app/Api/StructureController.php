<?php

namespace App\Api;

use App\Models\Structure;
use Illuminate\Http\Request;

class StructureController extends MetApiController
{

  public function __construct(Request $request)
  {
    parent::__construct($request);
  }

  public function add(Request $request)
  {

    $this->addOption('name', 'required|alpha_dash|unique:structure');

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $structure = new Structure();
    $structure->name = $query['combined']['name'];
    $structure->save();

    return $this->render(['status' => 'Structure added successfully']);
  }

  public function get(Request $request)
  {

    $this->addOption('view', "in:true,false");

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
