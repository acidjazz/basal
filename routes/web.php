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

Route::get('/', function() { return view('pages.intro'); });
Route::get('/home', function() { return view('pages.home'); });
Route::get('guide', function() { return view('pages.guide'); });
Route::get('loading', function() { return view('pages.loading'); });
Route::get('users', function() { return view('pages.users'); });
Route::get('clients', function() { return view('pages.clients'); });
Route::get('clients/{_idn}', function() { return view('pages.client'); });
Route::get('structures', function() { return view('pages.structures'); });
Route::get('structures/{_idn}', function() { return view('pages.structure'); });
Route::get('structures/deleted', function() { return view('pages.structures'); });
Route::get('entries', function() { return view('pages.entries'); });
Route::get('entries/deleted', function() { return view('pages.entries'); });
Route::get('entries/{_idn}', function() { return view('pages.entry'); });
Route::get('invite/{id}', function() { return view('pages.invite'); });

Route::get('/vue', function() { return view('pages.vue'); });
