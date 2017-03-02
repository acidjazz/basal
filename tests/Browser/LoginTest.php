<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

use Facebook\WebDriver;

use App\Models\Client;

class LoginTest extends DuskTestCase
{

  public function testLogin($result=null)
  {

    $this->browse(function ($browser) {

      $browser->driver->manage()->window()->setSize(new \Facebook\WebDriver\WebDriverDimension(1024, 900));
      
      // login to google to start our session
      $browser
        ->visit('https://accounts.google.com/login')
        ->assertSee('Sign in with your Google Account')
        ->type('Email', env('TEST_OAUTH_GOOGLE_EMAIL'))
        ->press('Next')
        ->waitFor('#Passwd')
        ->type('Passwd', env('TEST_OAUTH_GOOGLE_PASSWORD'))
        ->waitFor('#signIn')
        ->press('#signIn');

      // login to basal via oauth
      $browser
        ->visit('/')
        ->assertSee('basal')
        ->press('.oauth_google')
        ->waitFor('.collections')
        ->assertVisible('.collections')
        ->pause(2000);

    });

  }

  public function testClientAdd()
  {

    $this->browse(function ($browser) {

      $browser
        ->visit('/clients')
        ->assertSee('New Client')
        ->clickLink('New Client')
        ->assertSee('Client Name')
        ->type('.input-name > input', 'Test Client')
        ->attach('.input-image > input', __DIR__.'/images/logo.png')
        ->assertVisible('.cr-image')
        ->press('Submit')
        ->waitFor('.notice.success.on') 
        ->assertSee('File uploaded successfully')
        ->waitUntilMissing('.notice.success.on') 
        ->waitFor('.notice.success.on') 
        ->assertSee('Client added successfully')
        ->pause(3000);

    });

  }

  public function testClientDelete()
  {

    $client = Client::where('name', 'Test Client')->first();
    $this->assertTrue($client !== null);
    $client->forceDelete();

  }

  public function testLogout($result=null)
  {

    $this->browse(function ($browser) {

      $browser
        ->click('.logout')
        ->waitFor('.prompt.on') 
        ->pause(700)
        ->assertSee('Are you sure you want to log out?')
        ->click('.option.option_1')
        ->waitFor('.notice.success.on') 
        ->assertSee('Logout successful');

    });
  }


  public function TakeScreenshot($browser, $element=null) {

    // how you do it :
    //$this->TakeScreenshot($browser);

    $screenshot = __DIR__.'/screenshots/' . time() . ".png";

    // Change the driver instance
    $browser->driver->takeScreenshot($screenshot);

    if(!file_exists($screenshot)) {
        throw new Exception('Could not save screenshot');
    }

    if( ! (bool) $element) {
        return $screenshot;
    }

    $element_screenshot = __DIR__.'/screenshots/' . time() . ".png"; // Change the path here as well

    $element_width = $element->getSize()->getWidth();
    $element_height = $element->getSize()->getHeight();

    $element_src_x = $element->getLocation()->getX();
    $element_src_y = $element->getLocation()->getY();

    // Create image instances
    $src = imagecreatefrompng($screenshot);
    $dest = imagecreatetruecolor($element_width, $element_height);

    // Copy
    imagecopy($dest, $src, 0, 0, $element_src_x, $element_src_y, $element_width, $element_height);

    imagepng($dest, $element_screenshot);

    // unlink($screenshot); // unlink function might be restricted in mac os x.

    if( ! file_exists($element_screenshot)) {
        throw new Exception('Could not save element screenshot');
    }

    return $element_screenshot;
}

}