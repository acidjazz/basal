<?php

namespace App\Controllers;

class Pages extends Controller
{
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
}
