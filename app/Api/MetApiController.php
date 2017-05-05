<?php

namespace App\Api;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Validator;
use League\Fractal;

abstract class MetApiController extends BaseController
{

  protected $request;
  protected $benchmark;

  protected $query = [
    'defaults' => [],
    'options' => [],
    'params' => [],
    'combined' => [],
  ];

  protected $errors = [];

  protected $meta = [];
  protected $compiled = false;

  public function __construct(Request $request) {
    $this->benchmark = microtime(true);
    $this->request = $request;
  }

  protected function addOption($name, $type, $default=false) {
    $this->query['options'][$name] = $type;
    if ($default !== false) {
      $this->query['defaults'][$name] = $default;
    }
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

    // https://laravel.com/docs/5.3/validation#available-validation-rules
    $validate = Validator::make($this->request->all(), $this->query['options']);

    if ($validate->fails()) {

      foreach ($validate->errors()->toArray() as $key=>$value) {
        foreach($value as $error) {
          $this->addError($key, $error);
        }
      }

      return false;

    }

    foreach ($this->request->all() as $key=>$value) {
      if (isset($this->query['options'][$key])) {
        $this->query['params'][$key] = $value;
      }
    }

    $this->query['combined'] = $this->query['defaults'];

    foreach ($this->query['params'] as $key=>$value) {
      $this->query['combined'][$key] = $value;
    }

    return $this->query;

  }

  protected function getQuery() {
    return $this->compileQuery();
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

  protected function addError($type,$message,$file=null,$line=null)
  {
    $this->errors[] = [
      'type' => $type,
      'message' => $message,
      'file' => $file,
      'line' => $line,
    ];

    return $this;
  }

  /**
   * render errors
   * returns $this->errors w/ no view, transforme,r and an error code of 500
   */

  protected function error() {
    return $this->render(['errors' => $this->errors], false, false, 500);
  }

  /**
   * Final output 
   * @param array $data data to be sent
   * @param string $view optional rendered view
   * @param Transformer $transformer optioanl transformer to be merged
   * @param integer $code resposne code, defaulting to 200
   */
  protected function render($data=false,$view=false,$transformer=false, $code=200) {

    if ($transformer !== false) {
      $resource = new Fractal\Resource\Collection($data, $transformer);
      $fractal = new Fractal\Manager();
      $data = $fractal->createdata($resource)->toArray()['data'];
    }

    if ($code === 500 || count($this->errors) > 0) {
      $response = $data;
      $code = 500;
    } else {
      $response = $this->getMeta();
      $response['query'] = $this->getQuery();
      $response['data'] = $data;
      $response['view'] = $view;
    }

    if ($this->request->query('callback') !== null) {
      $json = json_encode($response, JSON_PRETTY_PRINT);
      $response = ['callback' => $this->request->query('callback'),'json' => $json];
      return response(view('pages.jsonp', $response), 200)->header('Content-type', 'text/javascript');
    }

    if (strpos($this->request->header('accept'),'text/html') !== false && config('app.debug') === true) {
      return response(view('pages.json', ['json' => json_encode($response, JSON_PRETTY_PRINT)]), $code);
    }

    return response()->json($response, $code);

  }

}
