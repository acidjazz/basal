<?php

namespace App\Api;

use App\Models\User;
use App\Models\Client;
use App\Models\Structure;
use App\Models\Entry;
use Illuminate\Http\Request;
use App\Entities\Kernel;

class EntryController extends MetApiController
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

    $this->addOption('structure', 'required|regex:/[0-9a-fA-F]{24}/|exists:structure,_id');
    $this->addOption('name', 'required|string');
    $this->addOption('entities', 'required|array');
    $this->addOption('entities.*.type', 'required|in:'.implode((new Kernel())->getEntities(), ','));
    $this->addOption('entities.*.value', 'required');

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $entry = new Entry();
    $entry->name = $query['combined']['name'];
    $entry->entities = $query['combined']['entities'];

    $structure = Structure::find($query['combined']['structure']);

    $entry->structure = [
      "id" => $structure->_id,
      "name" => $structure->name,
    ];

    $client = Client::find($structure->client->id);

    $entry->client = [
      "id" => $client->_id,
      "name" => $client->name,
    ];

    $entry->save();

    return $this->render(['status' => 'Entry added successfully', '_id' => $entry->_id]);
  }


  public function update(Request $request, $_id)
  {

    $request->request->add(['_id' => $_id]);
    $this->addOption('_id', 'required|regex:/[0-9a-fA-F]{24}/|exists:entry,_id');

    $this->addOption('name', 'string');
    $this->addOption('entities', 'array');
    $this->addOption('entities.*.type', 'in:'.implode((new Kernel())->getEntities(), ','));

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $entry = Entry::find($_id);

    if (isset($query['combined']['name'])) {
      $entry->name = $query['combined']['name'];
    }
    if (isset($query['combined']['entities'])) {
      $entry->entities = $query['combined']['entities'];
    }

    $entry->save();

    return $this->render(['status' => 'Entry updated successfully', '_id' => $entry->_id]);
  }

  public function get(Request $request)
  {

    if ($this->me == false) {
      $this->addOption('structure', 'required|regex:/[0-9a-fA-F]{24}/|exists:structure,_id');
    } else {
      $this->addOption('structure', 'regex:/[0-9a-fA-F]{24}/|exists:structure,_id');
    }

    $this->addOption('_id', 'regex:/[0-9a-fA-F]{24}/|exists:entry,_id');
    $this->addOption('view', "in:true,false", "false");

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $entries = Entry::query();

    if ($this->me !== false) {
      $clients = Client::whereRaw(['users' => ['$elemMatch' => ['id' => $this->me->_id]]]);
      $entries = $entries->whereIn('client.id', $clients->get()->pluck('_id'));
    }

    if (isset($query['combined']['structure'])) {
      $entries = $entries->where(['structure.id' => $query['combined']['structure']]);
    }

    if (isset($query['combined']['_id'])) {
      $entries = $entries->where(['_id' => $query['combined']['_id']]);
    }

    $entries = $entries->paginate(20);
    $this->addPaginate($entries);

    $view = false;
    if ($query['combined']['view'] === 'true') {
      $view = view('partial.entries', ['entries' => $entries->items()])->render();
    }

    return $this->render($entries->items(),$view);

  }

}
