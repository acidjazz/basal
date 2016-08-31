<?php

namespace App\Api;

use Laravel\Lumen\Application;
use Laravel\Lumen\Routing\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

abstract class MetApiController extends Controller
{

  protected $request;
  protected $benchmark;
  protected $query = [
    'defaults' => [],
    'options' => [],
    'params' => [],
    'combined' => [],
  ];

  protected $meta = [];
  protected $compiled = false;

  public function __construct(Request $request) {
    $this->benchmark = microtime(true);
    $this->request = $request;
  }

  protected function addOption($name, $type) {
    $this->query['options'][$name] = $type;
  }
  protected function addDefault($name, $type) {
    $this->query['defaults'][$name] = $type;
  }

  protected function addMeta($name, $value) {
    $this->meta[$name] = $value;
  }

  protected function addPaginate($collection) {

    return $this->addMeta('paginate', [
      'total' => $collection->total(),
      'per_page' => $collection->perPage(),
      'current_page' => $collection->currentPage(),
      'last_page' => $collection->lastPage(),
      'next_page_url' => $collection->nextPageUrl(),
      'prev_page_url' => $collection->previousPageUrl(),
    ]);

  }

  protected function compileQuery() {

    foreach ($this->query['options'] as $option=>$type) {

      switch ($type) {

        case is_array($type): 
          if (!empty($this->request->query($option)) && in_array($this->request->query($option), $type)) {
            $this->query['params'][$option] = $this->request->query($option);
          }

          break;

        case 'number':
          if (!empty($this->request->query($option)) && is_numeric($this->request->query($option))) {
            $this->query['params'][$option] = (float) $this->request->query($option);
          }

        case 'boolean':
          if (!empty($this->request->query($option)) && in_array($this->request->query($option), ['true','false'])) {
            if ($this->request->query($option) === 'true') {
              $this->query['params'][$option] = true;
            } else {
              $this->query['params'][$option] = false;
            } 
          }

          break;
      }

    }

    $this->query['combined'] = $this->query['defaults'];

    foreach ($this->query['params'] as $key=>$value) {
      $this->query['combined'][$key] = $value;
    }

  }

  protected function getCombined() {
    $this->compileQuery();
    return $this->query['combined'];
  }

  protected function getQuery() {
    $this->compileQuery();
    return $this->query;
  }

  protected function getMeta() {
    $this->meta['benchmark'] = microtime(true)-$this->benchmark;
    return $this->meta;
  }

  protected function getParam($key) {
    $this->compileQuery();

    if (!isset($this->query['params'][$key])) {
      return false;
    }

    return $this->query['params'][$key];

  }

  protected function error($message,$type='Invalid') {

    return Response()->json([
      'error' => [
        'status' => 500,
        'type' => $type,
        'message' => $message,
        'file' => null,
        'line' =>  null,
      ]
    ], 500);

  }

  protected function render($data) {

    $response = $this->getMeta();
    $response['query'] = $this->getQuery();
    $response['data'] = $data;

    if ($this->request->query('callback') !== null) {
      $json = json_encode($response, JSON_PRETTY_PRINT);
      $response = ['callback' => $this->request->query('callback'),'json' => $json];
      return response(view('pages.jsonp', $response))->header('Content-type', 'text/javascript');
    }

    if (strpos($this->request->header('accept'),'text/html') !== false) {
      return view('pages.json', ['json' => json_encode($response, JSON_PRETTY_PRINT)]);
    }

    return $response;

  }

}
