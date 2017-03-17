<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

use App\Models\Structure;
use App\Models\Client;
use App\Models\User;

use Tests\Browser\Pages\ClientPage;
use Tests\Browser\Pages\StructurePage;

class StructureTest extends DuskTestCase
{

  private static $me = false;

  public function testStructureAdd()
  {

    $this->browse(function ($browser) {

      $browser->visit('/')->assertSee('welcome to basal');

      self::$me = \App\Models\User::loginAs('basaltesting@gmail.com', $browser);

      ClientPage::createTestClient();

      $browser
        ->visit('/structures')
        ->assertSee('New Structure')
        ->visit('/structures/new')
        ->waitFor('.page.structure') 
        ->assertSee('Client')
        ->click('.selectize-control.single')
        ->waitFor('.selectize-dropdown-content') 
        ->click('.selectize-dropdown-content > div:first-child')
        ->type('.input-name > input', 'Test Structure')
        ->type('.body > .entity > .input-entity-name > input', 'Test Entity')
        ->click('.body > .entity > .input-entity-type')
        ->click('.body > .entity > .input-entity-type .selectize-dropdown-content > div:first-child')
        ->press('Save Structure')
        ->waitFor('.notice.success.on') 
        ->assertSee('Structure added successfully')
        ->pause(500);

        \App\Models\User::logoutAs('basaltesting@gmail.com', $browser);
    });

    ClientPage::removeTestClient();

    $structure = Structure::where('name', 'Test Structure')->first();
    $this->assertTrue($structure !== null);
    $this->assertEquals($structure->entities['Test Entity']['name'], 'Test Entity');
    StructurePage::removeTestStructure();


  }

}
