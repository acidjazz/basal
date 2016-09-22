<?php

namespace App\Api;

use App\Models\Entry;
use Illuminate\Http\Request;

class EntryController extends MetApiController
{

  public function __construct(Request $request)
  {
    parent::__construct($request);
  }

  public function add(Request $request)
  {

    $this->addOption('name', 'required|string|unique:entry');

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $entry = new Entry();
    $entry->name = $query['combined']['name'];
    $entry->save();

    return $this->render(['status' => 'Entry added successfully']);
  }

  public function get(Request $request)
  {

    $this->addOption('view', "in:true,false", "false");

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $entries = Entry::paginate(20);
    $this->addPaginate($entries);

    $view = false;
    if ($query['combined']['view'] === 'true') {
      $view = view('partial.entries', ['entries' => $entries->items()])->render();
    }

    return $this->render($entries->items(),$view);

  }

}
