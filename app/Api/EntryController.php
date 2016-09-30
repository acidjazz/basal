<?php

namespace App\Api;

use App\Models\Entry;
use Illuminate\Http\Request;
use App\Entities\Kernel;

class EntryController extends MetApiController
{

  public function __construct(Request $request)
  {
    parent::__construct($request);
  }

  public function add(Request $request)
  {

    $this->addOption('name', 'required|string');
    $this->addOption('entries', 'required|array');
    $this->addOption('entries.*.type', 'required|in:'.implode((new Kernel())->getEntities(), ','));
    $this->addOption('entries.*.value', 'required');

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $entry = new Entry();
    $entry->name = $query['combined']['name'];
    $entry->entries = $query['combined']['entries'];
    $entry->save();

    return $this->render(['status' => 'Entry added successfully', '_id' => $entry->_id]);
  }


  public function update(Request $request, $_id)
  {
    $request->request->add(['_id' => $_id]);

    $this->addOption('_id', 'required|regex:/[0-9a-fA-F]{24}/|exists:entry,_id');

    $this->addOption('name', 'string');
    $this->addOption('entries', 'array');
    $this->addOption('entries.*.type', 'in:'.implode((new Kernel())->getEntities(), ','));

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $entry = Entry::find($_id);

    if (isset($query['combined']['name'])) {
      $entry->name = $query['combined']['name'];
    }
    if (isset($query['combined']['entries'])) {
      $entry->entries = $query['combined']['entries'];
    }

    $entry->save();

    return $this->render(['status' => 'Entry updated successfully', '_id' => $entry->_id]);
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
