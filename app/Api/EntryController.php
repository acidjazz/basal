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

    $entries = Entry::where([
      'structure.id' =>  $query['combined']['structure'],
      'name' =>  $query['combined']['name'],
    ]);

    if ($entries->count() > 0) {
      $this->addError('name', 'validation.unique');
      return $this->error();
    }

    $entry = new Entry();
    $entry->name = $query['combined']['name'];

    $entry->entities = $this->formatEntities($query['combined']['entities']);

    $structure = Structure::find($query['combined']['structure']);

    $entry->structure = [
      "id" => $structure->_id,
      "name" => $structure->name,
    ];

    $client = Client::find($structure->client->id);

    $entry->client = [
      "id" => $client->_id,
      "name" => $client->name,
      "profile" => $client->profile,
    ];

    $entry->user = [
      'id' => $this->me->_id,
      'name' => $this->me->name,
      'picture' => $this->me->picture,
    ];

    $entry->save();

    return $this->render(['status' => 'Entry saved', '_id' => $entry->_id]);
  }


  public function update(Request $request, $_id)
  {

    if (!$this->me) {
      return $this->addError('auth', 'session.required')->error();
    }

    $request->request->add(['_id' => $_id]);
    $this->addOption('_id', 'required|regex:/[0-9a-fA-F]{24}/|exists:entry,_id');

    $this->addOption('name', 'string');
    $this->addOption('active', "in:true,false", "false");
    $this->addOption('entities', 'array');
    $this->addOption('entities.*.type', 'in:'.implode((new Kernel())->getEntities(), ','));

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $entry = Entry::find($_id);

    if (isset($query['combined']['name'])) {
      $entry->name = $query['combined']['name'];
    }

    if (isset($query['combined']['active'])) {
      $entry->active = ($query['combined']['active'] === 'true' ? true : false);
    }

    if (isset($query['combined']['entities'])) {
      $entry->entities = $this->formatEntities($query['combined']['entities']);
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

    $this->addOption('structure_name', 'regex:/[a-zA-Z0-9]+/|exists:structure,name');
    $this->addOption('_id', 'regex:/[0-9a-fA-F]{24}/|exists:entry,_id');
    $this->addOption('active', "in:true,false");
    $this->addOption('view', "in:true,false", "false");

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $entries = Entry::query();


    if ($this->me !== false) {
      $clients = Client::whereRaw(['users' => ['$elemMatch' => ['id' => $this->me->_id]]]);
      $entries = $entries->whereIn('client.id', $clients->get()->pluck('_id'));
    }

    # filter only client accessable structures for client-based users
    if ($this->me->client && count($this->me->client) === 3) {
      $structures = Structure::where(['client.id' => $this->me->client['id'], 'clientAccess' => true]);
      $entries = $entries->whereIn('structure.id', $structures->get()->pluck('_id'));
    }

    if (isset($query['combined']['active'])) {
      if ($query['combined']['active'] === 'true') {
        $entries = $entries->where(['active' => true]);
      } else {
        $entries = $entries->where(['active' => false]);
      }
    }

    if (isset($query['combined']['structure'])) {
      $entries = $entries->where(['structure.id' => $query['combined']['structure']]);
    }

    if (isset($query['combined']['structure_name'])) {
      $entries = $entries->where(['structure.name' => $query['combined']['structure_name']]);
    }

    if (isset($query['combined']['_id'])) {
      $entries = $entries->where(['_id' => $query['combined']['_id']]);
    }

    $entries = $entries->orderBy('updated_at', 'desc');
    $entries = $entries->paginate(config('settings.perpage'));

    $this->addPaginate($entries);

    $view = false;
    if ($query['combined']['view'] === 'true') {
      $view = view('partial.entries', ['entries' => $entries->items(), 'paginate' => $this->meta['paginate']])->render();
    }

    return $this->render($entries->items(),$view);

  }

  private function formatEntities($entities)
  {

    // convert non-string types into their native formats
    foreach ($entities as $key=>$entity) {
      if ($entity['type'] === 'Date') {
        $entities[$key]['date'] = new \MongoDB\BSON\UTCDateTime(strtotime($entity['value']) * 1000);
      }
    }

    return $entities;

  }

}
