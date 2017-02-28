<?php

namespace App\Api;

use App\Models\User;
use App\Models\Client;
use App\Models\Invite;

use Illuminate\Http\Request;

use OAuth\Common\Storage\Session;
use OAuth\Common\Consumer\Credentials;

use OAuth\OAuth2\Service\Google;

use Validator;

class AuthController extends MetApiController
{

  private $serviceFactory;
  private $currentUri;
  private $storage;
  private $user = false;

  public function __construct(Request $request) {

    $this->user = User::loggedIn();

    $this->serviceFactory = new \OAuth\ServiceFactory();
    $uriFactory = new \OAuth\Common\Http\Uri\UriFactory();
    $this->currentUri = $uriFactory->createFromSuperGlobalArray($_SERVER);
    $this->currentUri->setQuery('');

    if (app()->environment() !== 'local') {
      $this->currentUri->setScheme('https');
    }

    $this->storage = new Session();

    parent::__construct($request);

  }

  public function auth() {
    return $this->render(['user' => $this->user]);
  }

  private function creds($provider) {

    $auth = config('oauth');

    return new Credentials(
      $auth[$provider]['id'],
      $auth[$provider]['secret'],
      $this->currentUri->getAbsoluteUri());
  }

  public function google(Request $request) {

    $creds = $this->creds('google');

    $scope = ['userinfo_email', 'userinfo_profile'];
    $google = $this->serviceFactory->createService('google', $creds, $this->storage, $scope);

    if (!empty($request->input('code'))) {

      $state = $request->input('state');
      $google->requestAccessToken($request->input('code'), $state);
      $result = json_decode($google->request('userinfo'), true);

      $params = [
        'id' => $result['id'],
        'email' => $result['email'],
        'name' => $result['name'],
        'picture' => $result['picture'],
        'provider' => 'google',
      ];

      $validator = Validator::make($request->all(), [
        'state' => 'required|regex:/[0-9a-fA-F]{8}/|exists:invite,hash',
      ]);

      if ($validator->fails()) {
        return $this->login($params);
      }

      return $this->login($params, $request->input('state'));

    }

    $validator = Validator::make($request->all(), [
      'invite' => 'required|regex:/[0-9a-fA-F]{8}/|exists:invite,hash',
    ]);

    if ($validator->fails()) {
      return $this->render(['uri' => (string) $google->getAuthorizationUri()]);
    }

    return $this->render([
      'uri' => (string) $google->getAuthorizationUri(['state' => $request->input('invite')])
    ]);
  }

  public function login($params, $hash=false) {

    $user = User::where(['id' => $params['id']])->get()->first();

    if ($hash !== false) {

      if ($user !== null) {
        return view('partial.error', ['title' => 'Error', 'error' => "This account already exists"]);
      }

      $invite = Invite::where(['hash' => $hash])->first();

      if ($invite === null) {
        return view('partial.error', ['title' => 'Error', 'error' => "Invite not found"]);
      }

    }

    if ($user !== null) {
      if ($user->provider != $params['provider']) {
        return view('partial.error', ['title' => 'Error', 'error' => "You already have an account with us via <b>$provider</b>"]);
      } else {

        // login
        if ($user === null) {
          return $this->error('Error logging in');
        } else {

          $user->sessionize();
          return view('partial.complete', ['user' => $user]);
        }

      }

    } else {

      if (isset($invite) && $invite !== null) {
        $params['client'] = $invite->client;
      }

      // registration
      $user = new User();
      foreach ($params as $key=>$value) {
        $user->$key = $value;
      }

      $user->sessions = [];
      $user->save();

      if (isset($invite) && $invite !== null) {

        $client = Client::find($invite->client['id']);

        $users = $client->users;

        $users[] = [
          'id' => $user->_id,
          'email' => $user->email,
          'name' => $user->name,
          'picture' => $user->picture,
          'role' => 'client',
        ];

        $client->users = $users;
        $client->save();

      }

      $user->sessionize();
    }

    return view('partial.complete', ['user' => $user]);

  }

  public function logout() {

    if ($this->user == false) {
      return $this->error('Not logged in');
    }

    return $this->render(['Logout Successful', $this->user->logout()]);

  }

}
