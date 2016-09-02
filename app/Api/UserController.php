<?php

namespace App\Api;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends MetApiController
{

  public function __construct(Request $request)
  {
    parent::__construct($request);
  }

  public function get(Request $request)
  {

    $this->addOption('view', "in:true,false");

    if (!$query = $this->getQuery()) {
      return $this->error();
    }


    $users = User::paginate(20);
    $this->addPaginate($users);

    echo $bob;

    $view = false;
    if ($query['combined']['view'] === 'true') {
      $view = view('partial.users', ['users' => $users->items()])->render();
    }

    return $this->render($users->items(),$view);

  }

}
