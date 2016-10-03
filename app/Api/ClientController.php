<?php

namespace App\Api;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends MetApiController
{

  public function __construct(Request $request)
  {
    parent::__construct($request);
  }

  public function add(Request $request)
  {

    $this->addOption('name', 'required|string|unique:client');

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $client = new Client();
    $client->name = $query['combined']['name'];
    $client->save();

    return $this->render(['status' => 'Client added successfully', '_id' => $client->_id]);
  }

  public function update(Request $request, $_id)
  {

    $request->request->add(['_id' => $_id]);

    $this->addOption('_id', 'required|regex:/[0-9a-fA-F]{24}/|exists:client,_id');
    $this->addOption('name', 'string');

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $client = Client::find($_id);

    if (isset($query['combined']['name'])) {
      $client->name = $query['combined']['name'];
    }

    $client->save();

    return $this->render(['status' => 'Client updated successfully', '_id' => $client->_id]);

  }

  public function get(Request $request)
  {

    $this->addOption('view', "in:true,false", "false");
    $this->addOption('_id', 'regex:/[0-9a-fA-F]{24}/');

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $clients = Client::with('structures','entries');

    if (isset($query['combined']['_id'])) {
      $clients = $clients->where(['_id' => $query['combined']['_id']]);
    }

    $clients = $clients->paginate(20);
    $this->addPaginate($clients);

    $view = false;
    if ($query['combined']['view'] === 'true') {
      $view = view('partial.clients', ['clients' => $clients->items()])->render();
    }

    return $this->render($clients->items(),$view);

  }

}
