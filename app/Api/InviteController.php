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

  public function get(Request $request)
  {
    $this->addOption('hash', 'required|regex:/[0-9a-fA-F]{8}/|exists:invite,hash');

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $invite = Invite::where(['hash' => $query['combined']['hash']])->first();

    return $this->render(['status' => 'Invite found', 'invite' => $invite]);

  }

  public function add(Request $request)
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

    $invite->hash = substr(md5(uniqid(rand(), true)), 0, 8);

    $invite->save();

    return $this->render(['status' => 'Invite generated successfully','invite' => $invite]);

  }

}
