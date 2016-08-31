<?php

namespace App\Api;

use App\Models\User;
use Illuminate\Http\Request;

use OAuth\Common\Storage\Session;
use OAuth\Common\Consumer\Credentials;

use OAuth\OAuth2\Service\Google;

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
    $this->storage = new Session();

    parent::__construct($request);

  }

  public function auth() {
    return $this->render(['user' => $this->user]);
  }

  private function creds($provider) {

    $auth = config('auth');

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
        'provider' => 'google'
      ];

      return $this->login($params, 'google');

    }

    return $this->render(['uri' => (string) $google->getAuthorizationUri()]);
  }

  public function login($params) {

    $user = User::find($params['id']);

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

      // registration
      $user = new User();
      foreach ($params as $key=>$value) {
        $user->$key = $value;
      }

      $user->sessions = [];
      $user->save();

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


