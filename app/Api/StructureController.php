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

    /* 
     * lets turn of the restriction of structure modification 
     * when entries exist for now, i can't really thing of any
     * severe issues coming from this besides extra/missing data
     * in entries, and that's more user-error
     *
    if (isset($query['combined']['entities'])) {

      $structure->entities = $query['combined']['entities'];

      if (Entry::where(['structure.id' => $_id])->count() > 0) {
        if ($structure->isDirty() && isset($structure->getDirty()['entities'])) {
          return $this->addError('Update Error', 'You cannot update a structure with existing entries')->error();
        }
      }

    }
     */

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
    $this->addOption('deleted', "in:true,false");

    $this->addOption('search', 'regex:/[a-zA-Z0-9 ]+/');

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

    if (isset($query['combined']['search'])) {
      $structures = $structures->where('name', 'regexp',
        new \MongoDB\BSON\Regex($query['combined']['search'], 'i'));
    }

    # deleted structures only
    if (isset($query['combined']['deleted']) && $query['combined']['deleted'] === 'true') {
      $structures = $structures->onlyTrashed();
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

  public function delete(Request $request, $_id)
  {
    return $this->soft($request, $_id, 'delete');
  }

  public function restore(Request $request, $_id)
  {
    return $this->soft($request, $_id, 'restore');
  }

  public function force(Request $request, $_id)
  {
    return $this->soft($request, $_id, 'force');
  }

  private function soft(Request $request, $_id, $type)
  {

    if (!$this->me) {
      return $this->addError('auth', 'session.required')->error();
    }

    $request->request->add(['_id' => $_id]);
    $this->addOption('_id', 'required|regex:/[0-9a-fA-F]{24}/|exists:structure,_id');

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    if ($type === 'restore' || $type === 'force') {
      $structure = Structure::withTrashed()->find($_id);
    } else {
      $structure = Structure::find($_id);
    } 

    if ($this->verifyStructure($structure) === false) {
      return $this->error();
    }


    if ($type == 'delete' || $type == 'force') {
      if (Entry::where(['structure.id' => $_id])->withTrashed()->count() > 0) {
        return $this->addError('Delete Error', 'You cannot delete a structure with existing entries (even deleted ones)')->error();
      }
    }

    if ( ($type === 'restore' || $type === 'force') && $structure->trashed() !== true) {
      return $this->addError('auth', 'invalid')->error();
    }

    if ($type === 'delete') {
      $structure->delete();
      return $this->render(['status' => 'Structure deleted successfully']);
    }

    if ($type === 'restore') {
      $structure->restore();
      return $this->render(['status' => 'Structure restored successfully']);
    }

    if ($type === 'force') {
      $structure->forceDelete();
      return $this->render(['status' => 'Structure Permanently deleted successfully']);
    }

  }

  private function verifyStructure($structure)
  {

    // verify the user is of the same client
    $client = Client::where(['_id'=> $structure->client['id']])
      ->whereRaw(['users' => ['$elemMatch' => ['id' => $this->me->_id]]])->get();

    if ($client->count() < 1) {
      return $this->addError('auth', 'restricted')->error();
      return false;
    }

    return true;

  }

}
