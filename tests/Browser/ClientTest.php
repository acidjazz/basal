<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

use App\Models\Client;
use App\Models\User;
use Tests\CreatesApplication;

use Tests\Browser\Pages\ClientPage;

class ClientTest extends DuskTestCase
{

  private static $me = false;

  use CreatesApplication;

  public function __construct() {
    $app = $this->createApplication();
    parent::__construct();
  }

  /*
   * test the adding and removing of a client
   */

  public function testClientAdd()
  {

    $this->browse(function ($browser) {

      $browser->visit('/')->assertSee('welcome to basal');

      self::$me = \App\Models\User::loginAs('basaltesting@gmail.com', $browser);

      $browser
        ->visit('/clients')
        ->assertSee('New Client')
        ->visit('/clients/new')
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
        ->pause(1000);

        \App\Models\User::logoutAs('basaltesting@gmail.com', $browser);

    });

    $client = Client::where('name', 'Test Client')->first();
    $this->assertTrue($client !== null);
    $this->assertEquals($client->users[0]['email'], 'basaltesting@gmail.com');
    ClientPage::removeTestClient();

  }

}
