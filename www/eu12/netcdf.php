<?php

include('../../bin/parse_url.inc.php');

$fileOut="/tmp/extract-".uniqid().".nc";
$cmd=sprintf("ncks -v %s %s %s", $query['var'], $fileIn, $fileOut);

exec($cmd, $output, $ret);

if ($ret==0) {
  header('Content-type: application/netcdf');
  readfile($fileOut);
} else {
  throw new ProcessingException('ncks failed');
}

@unlink($fileOut);
