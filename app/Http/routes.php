<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('guide', ['uses' => 'Pages@guide']);

$app->get('/loading', ['uses' => 'Pages@loading']);

$app->get('/', ['uses' => 'Pages@dashboard']);
$app->get('users', ['uses' => 'Pages@users']);
$app->get('clients', ['uses' => 'Pages@clients']);
$app->get('structures', ['uses' => 'Pages@structures']);
$app->get('entries', ['uses' => 'Pages@entries']);

$app->group([

  'prefix' => 'api',
  'namespace' => 'App\Api',

], function($app) {

    $app->get('auth', ['uses' =>'AuthController@auth']);
    $app->get('auth/google', ['uses' =>'AuthController@google']);
    $app->get('auth/logout', ['uses' =>'AuthController@logout']);

    $app->get('users', ['uses' =>'UserController@get']);
    $app->get('users/update/{_id: [0-9a-fA-F]{24}}', ['uses' =>'UserController@update']);

    $app->get('clients', ['uses' =>'ClientController@get']);
    $app->get('clients/add', ['uses' =>'ClientController@add']);

    $app->get('structures', ['uses' =>'StructureController@get']);
    $app->get('structures/add', ['uses' =>'StructureController@add']);

    $app->get('entries', ['uses' =>'EntryController@get']);
    $app->get('entries/add', ['uses' =>'EntryController@add']);

  }
);
