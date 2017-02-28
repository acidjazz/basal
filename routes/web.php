<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" _iddleware group. Now create something great!
|
*/

//Route::get('/', function () { return view('welcome'); });

Route::pattern('_id', '[0-9a-fA-F]{24}');
Route::pattern('_idn', '[0-9a-fA-F]{24}|new');

Route::get('/', function() { return view('pages.home'); });
Route::get('guide', function() { return view('pages.guide'); });
Route::get('loading', function() { return view('pages.loading'); });
Route::get('users', function() { return view('pages.users'); });
Route::get('clients', function() { return view('pages.clients'); });
Route::get('clients/{_idn}', function() { return view('pages.client'); });
Route::get('structures', function() { return view('pages.structures'); });
Route::get('structures/{_idn}', function() { return view('pages.structure'); });
Route::get('entries', function() { return view('pages.entries'); });
Route::get('entries/{_idn}', function() { return view('pages.entry'); });

Route::get('invite/{_id}', function() { return view('pages.invite'); });


Route::group([
  'prefix' => 'api',
  'namespace' => 'Api',
], function() {

  Route::get('auth', 'AuthController@auth');
  Route::get('auth/google', 'AuthController@google');
  Route::get('auth/logout', 'AuthController@logout');

  Route::get('users', 'UserController@get');
  Route::get('users/update/{_id}', 'UserController@update');

  Route::get('clients', 'ClientController@get');
  Route::get('clients/add', 'ClientController@add');
  Route::get('clients/update/{_id}', 'ClientController@update');

  Route::get('structures', 'StructureController@get');
  Route::get('structures/add', 'StructureController@add');
  Route::get('structures/update/{_id}', 'StructureController@update');
  Route::get('structures/delete/{_id}', 'StructureController@delete');

  Route::get('entries', 'EntryController@get');
  Route::get('entries/add', 'EntryController@add');
  Route::get('entries/update/{_id}', 'EntryController@update');
  Route::get('entries/delete/{_id}', 'EntryController@delete');

  Route::get('invite/add', 'InviteController@add');
  Route::get('invite/get', 'InviteController@get');



});
  
