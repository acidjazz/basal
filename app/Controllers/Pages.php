<?php

namespace App\Controllers;

class Pages extends Controller
{
  public function index()
  {
    return view('pages.index');
  }
  public function guide()
  {
    return view('pages.guide');
  }
  public function loading()
  {
    return view('pages.loading');
  }
}
