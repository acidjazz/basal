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
$app->group([
  'namespace' => 'App\Controllers',
], function($app) {

  $app->get('guide', ['uses' => 'Pages@guide']);
  $app->get('/', ['uses' => 'Pages@home']);
  $app->get('/loading', ['uses' => 'Pages@loading']);
  $app->get('/dashboard', ['uses' => 'Pages@dashboard']);
  $app->get('users', ['uses' => 'Pages@users']);
  $app->get('clients', ['uses' => 'Pages@clients']);
  $app->get('clients/{_id: [0-9a-fA-F]{24}|new}', ['uses' => 'Pages@client']);
  $app->get('structures', ['uses' => 'Pages@structures']);
  $app->get('structures/{_id: [0-9a-fA-F]{24}|new}', ['uses' => 'Pages@structure']);
  $app->get('entries', ['uses' => 'Pages@entries']);
  $app->get('entries/{_id: [0-9a-fA-F]{24}|new}', ['uses' => 'Pages@entry']);
  $app->get('invite/{_id: [0-9a-fA-F]{8}}', ['uses' => 'Pages@invite']);

  }
);

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
    $app->get('clients/update/{_id: [0-9a-fA-F]{24}}', ['uses' =>'ClientController@update']);

    $app->get('structures', ['uses' =>'StructureController@get']);
    $app->get('structures/add', ['uses' =>'StructureController@add']);
    $app->get('structures/update/{_id: [0-9a-fA-F]{24}}', ['uses' =>'StructureController@update']);
    $app->get('structures/delete/{_id: [0-9a-fA-F]{24}}', ['uses' =>'StructureController@delete']);

    $app->get('entries', ['uses' =>'EntryController@get']);
    $app->get('entries/add', ['uses' =>'EntryController@add']);
    $app->get('entries/update/{_id: [0-9a-fA-F]{24}}', ['uses' =>'EntryController@update']);

    $app->post('upload', ['uses' =>'FileController@upload']);

    $app->get('invite/add', ['uses' =>'InviteController@add']);
    $app->get('invite/get', ['uses' =>'InviteController@get']);

  }
);
