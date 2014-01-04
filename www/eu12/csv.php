<?php

include('../../bin/parse_url.inc.php');

header('Content-type: text/csv');
header('Access-Control-Allow-Origin: *');

$cmd="../../bin/csv.py $fileIn ".$query['var']." ".$digits;
passthru($cmd, $ret);

if ($ret!=0) {
  throw new ProcessingException('gdal_translate failed');
}
