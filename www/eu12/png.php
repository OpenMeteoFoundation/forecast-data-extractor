<?php

include('../../bin/parse_url.inc.php');

$in="netcdf:$fileIn:".$query['var'];

header('Content-type: image/png');
$cmd="gdal_translate -of png -q $in /vsistdout/";
passthru($cmd, $ret);

if ($ret!=0) {
  throw new ProcessingException('gdal_translate failed');
}

