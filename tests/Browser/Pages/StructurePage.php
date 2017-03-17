<?php

namespace Tests\Browser\Pages;

use App\Models\Structure;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Page as BasePage;

class StructurePage extends BasePage
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

    public static function createTestStructure()
    {

    }


    public static function removeTestStructure()
    {

      $structure = Structure::where('name', 'Test Structure')->first();
      $structure->forceDelete();

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
