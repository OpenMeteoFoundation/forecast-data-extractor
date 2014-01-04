<?php

$pattern='^(?P<file>pp|raw)-(?P<var>[\d\w]+)\.(?P<run>\d{10})_(?P<frame>\d+)^';

if (!preg_match($pattern, $_GET['f'], $query)) {
  throw new NotFoundException('Bad url');
}

$fileIn=sprintf('/ssd/eu12-%s_%d_%d.nc', $query['file'], $query['run'], $query['frame']);

if (!file_exists($fileIn)) {
  throw new NotFoundException('File not found');
}

$digits=0;
if (array_key_exists('digits', $_GET) && is_numeric($_GET['digits'])) {
  $digits=$_GET['digits'];
}
