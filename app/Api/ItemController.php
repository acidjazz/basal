<?php

namespace App\Api;

use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends MetApi
{

  public function __construct(Request $request) {
    view()->share('user', false);
    parent::__construct($request);
  }

  public function get($id, Request $request) {

    return $this->render(Item::find($id));

  }

  public function update(Request $request) {

    $response = $request->input();

    if (!isset($response['data']) || !is_array($response['data'])) {
      return $this->error('Invalid data');
    }

    $data = $response['data'];

    if (!isset($data['id'])  || !is_numeric($data['id'])) {
      return $this->error('Invalid ID');
    }

    if (!isset($data['id'])  || !is_numeric($data['id'])) {
      return $this->error('Invalid ID');
    }

    if (!$item = item::find($data['id'])) {
      return $this->error('Record Not Found');
    }

    foreach ($data['attributes'] as $key=>$value) {
      $item->$key = $value;
    }

    $item->save();

    return $this->render($item);

  }

  public function items(Request $request) {

    $this->addOption('page', 'number');
    $this->addOption('html', 'boolean');
    $this->addDefault('page', 1);

    $items = Item::paginate(20);

    $paginate = [
      'total' => $items->total(),
      'per_page' => $items->perPage(),
      'current_page' => $items->currentPage(),
      'last_page' => $items->lastPage(),
      'next_page_url' => $items->nextPageUrl(),
      'prev_page_url' => $items->previousPageUrl(),
    ];

    $this->addMeta('paginate', $paginate);

    $items = $items->items();

    if ($this->getParam('html')) {
      $html = view('partial.itemList', ['items' => $items])->render();
      $this->addMeta('html', $html);
    }
    
    return $this->render($items);

  }

}
