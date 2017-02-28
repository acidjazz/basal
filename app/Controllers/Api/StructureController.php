<?php

namespace App\Controllers\Api;

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
    $this->addOption('client', 'required|regex:/[0-9a-fA-F]{24}/|exists:client,_id');
    $this->addOption('clientAccess', "required|in:true,false", "false");
    $this->addOption('entities', 'required|array');
    $this->addOption('entities.*.name', 'required|regex:/^[a-zA-Z0-9\/_\- ]+$/|distinct');
    $this->addOption('entities.*.type', 'required|in:'.implode((new Kernel())->getEntities(), ','));

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $structure = new Structure();

    $structure->name = $query['combined']['name'];
    $structure->clientAccess = $query['combined']['clientAccess'] === 'true' ? true : false;
    $structure->entities = $query['combined']['entities'];

    $client = Client::find($query['combined']['client']);
    $structure->client = [
      'id' => $client->_id,
      'name' => $client->name,
      'profile' => $client->profile,
    ];

    $structure->user = [
      'id' => $this->me->_id,
      'name' => $this->me->name,
      'picture' => $this->me->picture,
    ];

    $structure->save();

    return $this->render(['status' => 'Structure added successfully', '_id' => $structure->_id]);
  }

  public function delete(Request $request, $_id)
  {
    if (!$this->me) {
      return $this->addError('auth', 'session.required')->error();
    }

    $request->request->add(['_id' => $_id]);
    $this->addOption('_id', 'required|regex:/[0-9a-fA-F]{24}/|exists:structure,_id');

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    if (Entry::where(['structure.id' => $_id])->count() > 0) {
      return $this->addError('disabled', 'entries.exist')->error();
    }

    $structure = Structure::find($_id);

    // verify the user is of the same client
    $client = Client::where(['_id'=> $structure->client['id']])
      ->whereRaw(['users' => ['$elemMatch' => ['id' => $this->me->_id]]])->get();

    if ($client->count() < 1) {
      return $this->addError('auth', 'restricted')->error();
    }

    $structure->delete();

    return $this->render(['status' => 'Structure deleted successfully']);
  }

  public function update(Request $request, $_id)
  {
    if (!$this->me) {
      return $this->addError('auth', 'session.required')->error();
    }

    $request->request->add(['_id' => $_id]);

    $this->addOption('_id', 'required|regex:/[0-9a-fA-F]{24}/|exists:structure,_id');

    $this->addOption('name', 'required|string');
    $this->addOption('client', 'regex:/[0-9a-fA-F]{24}/|exists:client,_id');
    $this->addOption('clientAccess', "in:true,false", "false");
    $this->addOption('entities', 'required|array');
    $this->addOption('entities.*.name', 'required|regex:/^[a-zA-Z0-9\/_\- ]+$/|distinct');
    $this->addOption('entities.*.type', 'required|in:'.implode((new Kernel())->getEntities(), ','));

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $structure = Structure::find($_id);

    if (isset($query['combined']['name'])) {

      $entries = Entry::where(['structure.id' => $_id]);

      foreach ($entries->get() as $key=>$value) {
        $entrystruct = $value->structure;
        $entrystruct['name'] = $query['combined']['name'];
        $value->structure = $entrystruct;
        $value->save();
      }

      $structure->name = $query['combined']['name'];
    }

    if (isset($query['combined']['clientAccess'])) {
      $structure->clientAccess = $query['combined']['clientAccess'] === 'true' ? true : false;
    }

    if (isset($query['combined']['client'])) {
      $client = Client::find($query['combined']['client']);
      $structure->client = [
        'id' => $client->_id,
        'name' => $client->name,
        'profile' => $client->profile,
      ];
    }

    if (isset($query['combined']['entities'])) {

      $structure->entities = $query['combined']['entities'];

      if (Entry::where(['structure.id' => $_id])->count() > 0) {
        if ($structure->isDirty() && isset($structure->getDirty()['entities'])) {
          return $this->addError('disabled', 'entries.exist')->error();
        }
      }

    }

    $structure->save();

    return $this->render(['status' => 'Structure updated successfully', '_id' => $structure->_id]);

  }

  public function get(Request $request)
  {

    $this->addOption('view', 'in:true,false,filters', 'false');
    $this->addOption('client', 'regex:/[0-9a-fA-F]{24}/|exists:client,_id');
    $this->addOption('_id', 'regex:/[0-9a-fA-F]{24}/');

    $this->addOption('name', 'regex:/[0-9a-zA-z]/');
    $this->addOption('client_name', 'regex:/[0-9a-zA-z]/');

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    if ($this->me) {
      $clients = Client::whereRaw(['users' => ['$elemMatch' => ['id' => $this->me->_id]]]);
      $structures = Structure::with('entries')->whereIn('client.id', $clients->get()->pluck('_id'));

      # filter only client accessable structures for client-based users
      if ($this->me->client && count($this->me->client) === 3) {
        $structures = $structures->where(['client.id' => $this->me->client['id'], 'clientAccess' => true]);
      }

    } else {
      $structures = Structure::with('entries');
    }

    if (isset($query['combined']['client'])) {
      $structures = $structures->where(['client.id' => $query['combined']['client']]);
    }

    if (isset($query['combined']['_id'])) {
      $structures = $structures->where(['_id' => $query['combined']['_id']]);
    }

    if (isset($query['combined']['name'])) {
      $structures = $structures->where('name', 'regexp',
        new \MongoDB\BSON\Regex($query['combined']['name'], 'i'));
    }

    if (isset($query['combined']['client_name'])) {
      $structures = $structures->where('client.name', 'regexp',
        new \MongoDB\BSON\Regex($query['combined']['client_name'], 'i'));
    }

    $structures = $structures->orderBy('updated_at', 'desc');

    $structures = $structures->paginate(20);

    $this->addPaginate($structures);

    $view = false;
    if ($query['combined']['view'] === 'true') {
      $view = view('partial.structures', ['structures' => $structures->items()])->render();
    }
    if ($query['combined']['view'] === 'filters') {
      $view = view('partial.listing_filters_values', ['items' => $structures->items()])->render();
    }

    return $this->render($structures->items(),$view);

  }

}
