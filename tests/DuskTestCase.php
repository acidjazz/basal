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
        if (env('CIRCLE') === true) {
            return RemoteWebDriver::create(
              "http://".env('SAUCE_USERNAME').':'.env('SAUCE_ACCESS_KEY')
                .'@localhost:4445/wd/hub', DesiredCapabilities::chrome()
              //'http://localhost:4445/wd/hub', DesiredCapabilities::chrome()
              //'http://localhost:9515', DesiredCapabilities::phantomjs()
              //"https://".env('SAUCE_USERNAME').':'.env('SAUCE_ACCESS_KEY')
                //.'@ondemand.saucelabs.com:443/wd/hub', DesiredCapabilities::chrome()
            );
        }

        return RemoteWebDriver::create(
            'http://localhost:9515', DesiredCapabilities::chrome()
        );
    }
}
