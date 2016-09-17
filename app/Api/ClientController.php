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

    $this->addOption('name', 'required|alpha_dash|unique:client');

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $client = new Client();
    $client->name = $query['combined']['name'];
    $client->save();

    return $this->render(['status' => 'Client added successfully']);
  }

  public function get(Request $request)
  {

    $this->addOption('view', "in:true,false");

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $clients = Client::paginate(20);
    $this->addPaginate($clients);

    $view = false;
    if ($query['combined']['view'] === 'true') {
      $view = view('partial.clients', ['clients' => $clients->items()])->render();
    }

    return $this->render($clients->items(),$view);

  }

}
