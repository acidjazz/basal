<?php

namespace App\Api;

use App\Models\User;
use App\Models\Structure;
use App\Models\Entry;
use App\Models\Client;

use Illuminate\Http\Request;
use App\Entities\Kernel;

class StructureController extends MetApiController
{

  private $me = false;

  public function __construct(Request $request)
  {
    parent::__construct($request);
    $this->me = User::loggedIn();
  }

  public function add(Request $request)
  {

    if (!$this->me) {
      return $this->addError('auth', 'session.required')->error();
    }

    $this->addOption('name', 'required|string');
    $this->addOption('entities', 'required|array');
    $this->addOption('entities.*.name', 'required|string|distinct');
    $this->addOption('entities.*.type', 'required|in:'.implode((new Kernel())->getEntities(), ','));

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $structure = new Structure();

    $structure->name = $query['combined']['name'];
    $structure->entities = $query['combined']['entities'];
    $structure->client = [
      "id" => $this->me->client['id'],
      "name" => $this->me->client['name'],
    ];

    $structure->save();

    return $this->render(['status' => 'Structure added successfully', '_id' => $structure->_id]);
  }

  public function update(Request $request, $_id)
  {

    $request->request->add(['_id' => $_id]);

    $this->addOption('_id', 'required|regex:/[0-9a-fA-F]{24}/|exists:structure,_id');

    $this->addOption('name', 'required|string');
    $this->addOption('entities', 'required|array');
    $this->addOption('entities.*.name', 'required|string|distinct');
    $this->addOption('entities.*.type', 'required|in:'.implode((new Kernel())->getEntities(), ','));

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $entries = Entry::count(['structure.id' => $_id]);

    if (Entry::count(['structure.id' => $_id]) > 0) {
      return $this->addError('disabled', 'entries.exixst')->error();
    }

    $structure = Structure::find($_id);

    if ($structure->client['id'] !== $this->me->client['id']) {
      return $this->addError('auth', 'permission.denied')->error();
    }

    if (isset($query['combined']['name'])) {
      $structure->name = $query['combined']['name'];
    }
    if (isset($query['combined']['entities'])) {
      $structure->entities = $query['combined']['entities'];
    }

    $structure->save();

    return $this->render(['status' => 'Structure updated successfully', '_id' => $structure->_id]);

  }

  public function get(Request $request)
  {

    $this->addOption('view', 'in:true,false', 'false');
    $this->addOption('client', 'regex:/[0-9a-fA-F]{24}/|exists:client,_id');
    $this->addOption('_id', 'regex:/[0-9a-fA-F]{24}/');

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $structures = Structure::query();

    if (isset($query['combined']['client'])) {
      $structures = $structures->where(['client.id' => $query['combined']['client']]);
    }

    if (isset($query['combined']['_id'])) {
      $structures = $structures->where(['_id' => $query['combined']['_id']]);
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
