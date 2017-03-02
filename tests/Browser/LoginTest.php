<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

use App\Models\Client;

class LoginTest extends DuskTestCase
{

  /**
   * @group testLogin
   */

  public function testLogin($result=null)
  {

    $this->browse(function ($browser) {

      // login to google
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
        //->waitFor('.notice.success.on') 
        //->assertSee('Login successful')
        ->waitFor('.collections')
        ->assertVisible('.collections');

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
        ->pause(5000);


      $client = Client::where('name', 'Test Client')->first();
      $this->assertTrue($client !== null);
      $client->forceDelete();

    });

  }

  /**
   * @group testLogout
   */

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

}
