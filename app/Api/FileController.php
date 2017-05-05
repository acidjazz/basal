<?php

namespace App\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use App\Entities\Kernel;

use \Eventviva\ImageResize;

class FileController extends MetApiController
{
  public function __construct(Request $request)
  {
    parent::__construct($request);
  }

  public function upload(Request $request)
  {

    $this->addOption('file', 'required|file|max:1000');

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    if (Storage::disk('s3')->exists($request->file->hashName()) !== true) {

      $result = Storage::disk('s3')->getDriver()->put(
        $request->file->hashName(),
        file_get_contents($request->file->path()),
        [
          'visibility' => 'public', 
          'ContentType' => $request->file->getMimeType(),
        ]
      );

      /* create thumbnails if this is an image */
      if (in_array($request->file->extension(), ['jpeg', 'jpg', 'gif', 'png'])) {

        foreach (Kernel::getThumbnails() as $size) {

          $result = Storage::disk('s3')->getDriver()->put(
            pathinfo($request->file->hashName(), PATHINFO_FILENAME)."-{$size}.{$request->file->extension()}",
            (string) (new ImageResize($request->file->path()))->resizeToHeight($size),
            [
              'visibility' => 'public', 
              'ContentType' => $request->file->getMimeType(),
            ]
          );
        }

      }

    } else {
      $result = 'exists';
    }

    return $this->render(['result' => $result, 'url' => Storage::disk('s3')->url($request->file->hashName())]);
  }
  public function test(Request $request)
  {

  }

}
