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

      if (env('CIRCLE') === false) {
        static::startChromeDriver();
      }

    }

    /**
     * Create the RemoteWebDriver instance.
     *
     * @return \Facebook\WebDriver\Remote\RemoteWebDriver
     */
    protected function driver()
    {
        //'tunnel-identifier' => env('CIRCLE_BUILD_NUM')
        if (env('CIRCLE') === true) {

          $user = User::where(['email' => 'basaltesting@gmail.com'])->get()->first();

          if ($user === null) {
            $user = new User();
            $user->id = '101164611300758761960';
            $user->email = 'basaltesting@gmail.com';
            $user->name = 'kevin olson';
            $user->picture = 'https://lh6.googleusercontent.com/-HEP4u587YgI/AAAAAAAAAAI/AAAAAAAAAAs/gdJ8zJMGJt8/photo.jpg';
            $user->provider = 'google';
            $user->sessions = [];
            $user->save();
          }

          $capabilities = DesiredCapabilities::chrome();
          $capabilities->setCapability('name', env('CIRCLE_PROJECT_REPONAME'));
          $capabilities->setCapability('build', env('CIRCLE_BUILD_NUM'));
          $capabilities->setCapability('tunnelIdentifier', env('CIRCLE_BUILD_NUM').':'.env('CIRCLE_NODE_INDEX'));

          $driver = RemoteWebDriver::create(
            "http://".env('SAUCE_USERNAME').':'.env('SAUCE_ACCESS_KEY')
            .'@localhost:4445/wd/hub', $capabilities 
            //'http://localhost:4445/wd/hub', DesiredCapabilities::chrome()
            //'http://localhost:9515', DesiredCapabilities::phantomjs()
            //"https://".env('SAUCE_USERNAME').':'.env('SAUCE_ACCESS_KEY')
              //.'@ondemand.saucelabs.com:443/wd/hub', DesiredCapabilities::chrome()
          );

          return $driver;
        }

        return RemoteWebDriver::create(
            'http://localhost:9515', DesiredCapabilities::chrome()
        );
    }

    protected function tearDown()
    {

    }
}
