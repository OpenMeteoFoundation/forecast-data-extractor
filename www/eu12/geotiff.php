<?php

include('../../bin/parse_url.inc.php');

$outFile="/tmp/export-".uniqid().".tif";

$proj4="+proj=lcc +lon_0=4 +lat_0=47.5 +lat_1=47.5 +lat_2=47.5 +a=6370000. +b=6370000. +no_defs";
$bounds="-2963997.87057 -1848004.2008 2964000.82884 1848004.09676";
$in="netcdf:$fileIn:".$query['var'];

$cmd="gdal_translate -co \"COMPRESS=LZW\" -a_srs \"$proj4\" -a_ullr $bounds $in $outFile";
exec($cmd, $output, $ret);

if ($ret==0) {
  header('Content-type: image/tiff');
  readfile($outFile);
} else {
  throw new ProcessingException('gdal_translate failed');
}

@unlink($outFile);

