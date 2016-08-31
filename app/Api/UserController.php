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

  public function get()
  {

    $users = User::paginate(20);
    $this->addPaginate($users);

    return $this->render($users->items());

  }

}
