<?php

namespace App\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends MetApiController
{
  public function __construct(Request $request)
  {
    parent::__construct($request);
  }

  public function upload(Request $request)
  {

    $this->addOption('file', 'required|file|max:1000');
    #$this->addOption('file', 'required|file|image|max:1000');

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $fileName = $request->file->hashName();

    if (Storage::disk('s3')->exists($fileName) !== true) {

      $result = Storage::disk('s3')->getDriver()->put(
        $fileName,
        file_get_contents($request->file->path()),
        [
          'visibility' => 'public', 
          'ContentType' => $request->file->getMimeType(),
        ]
      );

    } else {
      $result = 'exists';
    }

    return $this->render(['result' => $result, 'url' => Storage::disk('s3')->url($fileName)]);
  }
  public function test(Request $request)
  {

  }

}
