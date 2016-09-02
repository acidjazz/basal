<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class Config extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'config';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Return the current config in JSON';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        echo json_encode(config()->all());
    }
}
