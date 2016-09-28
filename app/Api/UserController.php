<?php

namespace App\Api;

use App\Models\User;
use App\Models\Client;
use Illuminate\Http\Request;
use Validator;

class UserController extends MetApiController
{

  public function __construct(Request $request)
  {
    parent::__construct($request);
  }

  public function get(Request $request)
  {

    $this->addOption('view', "in:true,false", "false");

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $users = User::paginate(20);
    $this->addPaginate($users);

    $view = false;
    if ($query['combined']['view'] === 'true') {
      $view = view('partial.users', ['users' => $users->items()])->render();
    }

    return $this->render($users->items(),$view);

  }

  public function update(Request $request, $_id)
  {

    $request->request->add(['_id' => $_id]);

    $this->addOption('_id', 'required|regex:/[0-9a-fA-F]{24}/|exists:user,_id');
    $this->addOption('admin', 'bool');
    $this->addOption('client', 'regex:/[0-9a-fA-F]{24}/|exists:client,_id');

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $user = User::find($_id);

    if (isset($query['combined']['admin'])) {
      $user->admin = (bool) $query['combined']['admin'];
    }

    if (isset($query['combined']['client'])) {
      $client = Client::find($query['combined']['client']);
      $user->client = [
        'id' => $client->_id,
        'name' => $client->name,
      ];
    }

    $user->save();

    return $this->render(['status' => 'Update Successful', 'user' => $user]);

  }

}
