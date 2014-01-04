<?php

include('../../bin/parse_url.inc.php');

header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');

$cmd="../../bin/json.py $fileIn ".$query['var']." ".$digits;
passthru($cmd, $ret);

if ($ret!=0) {
  throw new ProcessingException('gdal_translate failed');
}
