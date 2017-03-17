<?php

namespace Tests\Browser\Pages;

use App\Models\Client;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Page as BasePage;

class ClientPage extends BasePage
{
    /**
     * Get the URL for the page.
     *
     * @return string
     */
    public function url()
    {
        return '/';
    }

    public static function createTestClient($name='Test Client')
    {

      $client = new Client();
      $client->name = $name;
      $client->profile = 'https://s3.amazonaws.com/basal/hWc1sEx0TBjgyCJe71tnhvj72q0M9dimtSt8W3rZ.jpeg';
      $client->users = [
        [
          'id'      => '58c109b03f5f19b9db6f9206',
          'email'   => 'basaltestign@gmail.com',
          'name'    => 'kevin olson',
          'picture' => 'https://lh6.googleusercontent.com/-HEP4u587YgI/AAAAAAAAAAI/AAAAAAAAAAs/gdJ8zJMGJt8/photo.jpg',
          'role'    => 'owner'
        ]
      ];

      $client->save();

    }

    public static function removeTestClient($name='Test Client')
    {

      $client = Client::where('name', $name)->first();
      $client->forceDelete();

    }

    /**
     * Assert that the browser is on the page.
     *
     * @return void
     */
    public function assert(Browser $browser)
    {
        $browser->assertPathIs($this->url());
    }

    /**
     * Get the element shortcuts for the page.
     *
     * @return array
     */
    public function elements()
    {
        return [
            '@element' => '#selector',
        ];
    }
}
