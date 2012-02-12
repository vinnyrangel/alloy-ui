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

// PHP replaces dots in request params with underscores, but our conversion breaks
// for files with underscores. For now, just converting underscores to ## and back to
// underscore after.

$paths = str_replace(array('_', '.'), array('##', '_'), $_SERVER['QUERY_STRING']);

$modules = preg_split('/&/', $paths);

$modules = !empty($modules) ? array_flip($modules) : $_GET;

$combo = new YUICombo($modules, $config);

$combo->loadModules();
?>