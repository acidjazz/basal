<?php

namespace App\Api;

use App\Models\Structure;
use App\Models\Client;

use Illuminate\Http\Request;
use App\Entities\Kernel;

class StructureController extends MetApiController
{

  public function __construct(Request $request)
  {
    parent::__construct($request);
  }

  public function add(Request $request)
  {

    $this->addOption('client', 'required|regex:/[0-9a-fA-F]{24}/|exists:client,_id');
    $this->addOption('name', 'required|string');
    $this->addOption('entities', 'required|array');
    $this->addOption('entities.*.name', 'required|string|distinct');
    $this->addOption('entities.*.type', 'required|in:'.implode((new Kernel())->getEntities(), ','));

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $structure = new Structure();

    $client = Client::find($query['combined']['client']);


    $structure->name = $query['combined']['name'];
    $structure->entities = $query['combined']['entities'];
    $structure->client = [
      "id" => $client->_id,
      "name" => $client->name,
    ];
    $structure->save();


    return $this->render(['status' => 'Structure added successfully']);
  }

  public function get(Request $request)
  {

    $this->addOption('view', 'in:true,false', 'false');
    $this->addOption('client', 'regex:/[0-9a-fA-F]{24}/');
    $this->addOption('client', 'regex:/[0-9a-fA-F]{24}/|exists:client,_id');

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $structures = Structure::query();

    if (isset($query['combined']['client'])) {
      $structures = $structures->where(['client.id' => $query['combined']['client']]);
    }

    $structures = $structures->paginate(20);

    $this->addPaginate($structures);

    $view = false;
    if ($query['combined']['view'] === 'true') {
      $view = view('partial.structures', ['structures' => $structures->items()])->render();
    }

    return $this->render($structures->items(),$view);

  }

}
