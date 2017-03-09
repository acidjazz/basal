<?php

namespace Tests;

use Laravel\Dusk\TestCase as BaseTestCase;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\Remote\DesiredCapabilities;

use App\Models\User;

abstract class DuskTestCase extends BaseTestCase
{
    use CreatesApplication;

    /**
     * Prepare for Dusk test execution.
     *
     * @beforeClass
     * @return void
     */
    public static function prepare()
    {
        if (env('CIRCLE') == false) {
          static::startChromeDriver();
        } else {

          // CIRCLE means remote testing, empty DB, lets take care of that
          $user = User::where(['email' => 'basaltesting@gmail.com'])->get()->first();

          if ($user->exists() === false) {

            $user = new User();
            $user->id = '101164611300758761960';
            $user->email = 'basaltesting@gmail.com';
            $user->name = 'kevin olson';
            $user->picture = 'https://lh6.googleusercontent.com/-HEP4u587YgI/AAAAAAAAAAI/AAAAAAAAAAs/gdJ8zJMGJt8/photo.jpg';
            $user->provider = 'google';
            $user->sessions = [];
            $user->save();

          }

        }
    }

    /**
     * Create the RemoteWebDriver instance.
     *
     * @return \Facebook\WebDriver\Remote\RemoteWebDriver
     */
    protected function driver()
    {
        if (env('CIRCLE') == true) {
            return RemoteWebDriver::create(
                'http://localhost:9515', DesiredCapabilities::phantomjs()
            );
        }

        return RemoteWebDriver::create(
            'http://localhost:9515', DesiredCapabilities::chrome()
        );
    }
}
