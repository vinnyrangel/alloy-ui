<?php
error_reporting(0);
// error_reporting(E_ALL ^ E_DEPRECATED);

include_once("settings.php");
include_once("lib/YUIFileUtil.php");
include_once("lib/YUIHeaderUtil.php");
include_once("lib/YUICombo.php");

$config = array(
	// "cache" => false,
	// "cacheCombo" => false,
	// "gzip" => false
);

$combo = new YUICombo($_GET, $config);

$combo->loadModules();
?>