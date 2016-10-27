<?php

namespace App\Controllers;

class Pages extends Controller
{
  public function home()
  {
    return view('pages.home');
  }
  public function dashboard()
  {
    return view('pages.dashboard');
  }
  public function guide()
  {
    return view('pages.guide');
  }
  public function loading()
  {
    return view('pages.loading');
  }
  public function users()
  {
    return view('pages.users');
  }
  public function clients()
  {
    return view('pages.clients');
  }
  public function client()
  {
    return view('pages.client');
  }
  public function structures()
  {
    return view('pages.structures');
  }
  public function structure()
  {
    return view('pages.structure');
  }
  public function entries()
  {
    return view('pages.entries');
  }
  public function entry()
  {
    return view('pages.entry');
  }
  public function invite()
  {
    return view('pages.invite');
  }
}
