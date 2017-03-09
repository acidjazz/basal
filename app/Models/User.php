<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\SoftDeletes;

class User extends \Moloquent
{

  use SoftDeletes;

  protected $collection = 'user';
  protected $primaryKey = '_id';

  protected $fillable = [
    'name', 'email','sessions'
  ];

  protected $dateFormat = 'c';
  protected $dates = ['deleted_at'];

  /*
   * Look for a session
   * look for a set cookie and verify in the DB that its active
   */

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

  /*
   * Create a session
   * add to sessions and place a session cookie
   */

  public function sessionize($browser=false)
  {

    $session = \Summon\Summon::set($this->_id, $this->sessions, $browser);
    $session['sessions'] = \Summon\Summon::clean($session['sessions']);
    $this->sessions = $session['sessions'];
    $this->save();

    return true; 

  }

  /*
   * Kill our current session
   * removes the associated cookie and data inside sessions
   */

  public function logout($browser=false)
  {

    $this->sessions = \Summon\Summon::remove($this->sessions,$browser);
    $this->save();

    return true;

  }

  /*
   * Simuulate a login
   * mostly used for unit testing
   * @param $email - e-mail address to login with
   */

  public static function loginAs($email, $browser)
  {

    $user = User::where(['email' => $email])->get()->first();

    if ($user !== null) {
      $user->sessionize($browser);
    }

    return $user;

  }

  /*
   * Simuulate a lgoout
   * mostly used for unit testing
   * @param $email - e-mail address to lgoout with
   */

  public static function logoutAs($email, $browser=false)
  {

    $user = User::where(['email' => $email])->get()->first();

    if ($user->exists()) {
      $user->logout($browser);
    }

    return $user;

  }

}
