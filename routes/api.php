<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

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
Route::get('structures/restore/{_id}', 'StructureController@restore');
Route::get('structures/force/{_id}', 'StructureController@force');

Route::get('entries', 'EntryController@get');
Route::post('entries/add', 'EntryController@add');
Route::post('entries/update/{_id}', 'EntryController@update');
Route::get('entries/update/{_id}', 'EntryController@update');
Route::get('entries/delete/{_id}', 'EntryController@delete');
Route::get('entries/restore/{_id}', 'EntryController@restore');
Route::get('entries/force/{_id}', 'EntryController@force');

Route::post('upload', 'FileController@upload');

Route::get('invite/add', 'InviteController@add');
Route::get('invite/get', 'InviteController@get');

