<?php

namespace App\Models;

class User extends \Moloquent
{

  protected $collection = 'user';
  protected $primaryKey = '_id';

  protected $fillable = [
    'name', 'email','sessions'
  ];

  protected $dateFormat = 'c';

  public static function loggedIn() {

    \Summon\Summon::$verifyAgent = false;

    if ($data = \Summon\Summon::check()) {

      $user = self::find($data['user_id']);

      if ($user != null && isset($user->sessions[$data['hash']])) {
        return $user;
      }

    }

    return false;

  }

  public function sessionize() {

    $session = \Summon\Summon::set($this->_id, $this->sessions);
    $session['sessions'] = \Summon\Summon::clean($session['sessions']);
    $this->sessions = $session['sessions'];
    $this->save();

    return true; 

  }

  public function logout() {

    $this->sessions = \Summon\Summon::remove($this->sessions);
    $this->save();

    return true;

  }

}
