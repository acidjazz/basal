<?php

namespace App\Controllers\Api;

use App\Models\Client;
use App\Models\User;
use Illuminate\Http\Request;

class ClientController extends MetApiController
{

  private $me = false;

  public function __construct(Request $request)
  {
    parent::__construct($request);
    $this->me = User::loggedIn();
  }

  public function add(Request $request)
  {

    $this->addOption('name', 'required|string|unique:client');
    $this->addOption('profile', 'url');
    $this->addOption('users', 'array');
    $this->addOption('users.*', 'regex:/[0-9a-fA-F]{24}/|exists:user,_id');

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $client = new Client();
    $client->name = $query['combined']['name'];

    if (isset($query['combined']['profile'])) {
      $client->profile = $query['combined']['profile'];
    }

    $client->users = $this->users($query);
    $client->save();

    return $this->render(['status' => 'Client added successfully', '_id' => $client->_id]);
  }

  public function update(Request $request, $_id)
  {

    $request->request->add(['_id' => $_id]);

    $this->addOption('_id', 'required|regex:/[0-9a-fA-F]{24}/|exists:client,_id');
    $this->addOption('name', 'string');
    $this->addOption('profile', 'url');
    $this->addOption('users', 'array');
    $this->addOption('users.*', 'regex:/[0-9a-fA-F]{24}/|exists:user,_id');

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $client = Client::find($_id);

    if (isset($query['combined']['name'])) {
      $client->name = $query['combined']['name'];
    }

    if (isset($query['combined']['profile'])) {
      $client->profile = $query['combined']['profile'];
    }

    if (isset($query['combined']['users'])) {
      $client->users = $this->users($query);
    }

    $client->save();

    return $this->render(['status' => 'Client updated successfully', '_id' => $client->_id]);

  }

  private function users($query)
  {
    $users = [];

    $users[] = [
      'id' => $this->me->_id,
      'email' => $this->me->email,
      'name' => $this->me->name,
      'picture' => $this->me->picture,
      'role' => 'owner',
    ];

    if (isset($query['combined']['users']) && is_array($query['combined']['users'])) {
      foreach (User::whereIn('_id', $query['combined']['users'])->get() as $user) {
        $users[] = [
          'id' => $user->_id,
          'email' => $user->email,
          'name' => $user->name,
          'picture' => $user->picture,
          'role' => 'collaborator',
        ];
      }
    }

    return $users;
  }

  public function get(Request $request)
  {

    if (!$this->me) {
      return $this->addError('auth', 'session.required')->error();
    }

    $this->addOption('view', "in:true,false,filters,dashboard", "false");
    $this->addOption('_id', 'regex:/[0-9a-fA-F]{24}/');

    $this->addOption('name', 'regex:/[0-9a-zA-z]/');

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $clients = Client::with('structures','entries');

    $clients = $clients->whereRaw(['users' => ['$elemMatch' => ['id' => $this->me->_id]]]);

    if (isset($query['combined']['_id'])) {
      $clients = $clients->where(['_id' => $query['combined']['_id']]);
    }

    if (isset($query['combined']['name'])) {
      $clients = $clients->where('name', 'regexp',
        new \MongoDB\BSON\Regex($query['combined']['name'], 'i'));
    }

    $clients = $clients->paginate(20);
    $this->addPaginate($clients);

    $view = false;

    if ($query['combined']['view'] === 'true') {
      $view = view('partial.clients', ['clients' => $clients->items()])->render();
    }

    if ($query['combined']['view'] === 'filters') {
      $view = view('partial.listing_filters_values', ['items' => $clients->items()])->render();
    }

    if ($query['combined']['view'] === 'dashboard') {
      $view = view('partial.collections', ['clients' => $clients->items()])->render();
    }

    return $this->render($clients->items(),$view);

  }

}
