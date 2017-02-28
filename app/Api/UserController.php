<?php

namespace App\Api;

use App\Models\User;
use App\Models\Client;
use Illuminate\Http\Request;
use Validator;

class UserController extends MetApiController
{

  private $me = false;

  public function __construct(Request $request)
  {
    parent::__construct($request);
    $this->me = User::loggedIn();
  }

  public function get(Request $request)
  {

    $this->addOption('view', "in:true,false", "false");
    $this->addOption('me', "in:true,false", "true");

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $users = User::query();

    if (isset($query['combined']['me']) & $query['combined']['me'] == 'false')
    {
      $users = $users->where('_id', '!=', $this->me->_id);
    }

    $users = $users->paginate(20);
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

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $user = User::find($_id);

    if (isset($query['combined']['admin'])) {
      $user->admin = (bool) $query['combined']['admin'];
    }

    $user->save();

    return $this->render(['status' => 'Update Successful', 'user' => $user]);

  }

}
