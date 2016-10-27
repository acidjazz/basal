<?php

namespace App\Api;

use App\Models\User;
use App\Models\Client;
use App\Models\Invite;

use Illuminate\Http\Request;

class InviteController extends MetApiController
{

  private $me = false;

  public function __construct(Request $request)
  {
    parent::__construct($request);
    $this->me = User::loggedIn();
  }

  public function invite(Request $request)
  {
    if (!$this->me) {
      return $this->addError('auth', 'session.required')->error();
    }

    $this->addOption('client', 'required|regex:/[0-9a-fA-F]{24}/|exists:client,_id');

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $client = Client::find($query['combined']['client']);

    $invite = new Invite;

    $invite->client = [
      "id" => $client->_id,
      "name" => $client->name,
      "profile" => $client->profile,
    ];

    $invite->hash = bin2hex(mcrypt_create_iv(22, MCRYPT_DEV_URANDOM));

    $invite->save();

    return $this->render(['status' => 'Invite generated successfully','invite' => $invite]);

  }

}
