<!DOCTYPE html>

<html>
<head>
	<script src="build/aui/aui.js" type="text/javascript"></script>

	<link rel="stylesheet" href="build/aui-skin-classic/css/aui-skin-classic-all-min.css" type="text/css" media="screen" />

	<style type="text/css" media="screen">
		body {
			font-size: 16px;
			background-color: #EEE;
		}

		h1, h2, h3, h4, h5, h6 {
			text-shadow: 1px 1px #fff;
		}

		h1 {
			margin: 1em 0 0 20px;
		}

		h2, h3 {
			margin: 10px;
		}

		span.module-count {
			font-size: 16px;
			color: #777;
		}

		#wrapper {
			padding: 10px;
			padding-left: 20px;
		}

		#wrapper ul {
			list-style: none;
		}

		#wrapper ul ul {
			margin: 0 1em 1em 0.5em;
			border-left: 0.5em solid #DEDEDE;
			padding-left: 0.5em;
		}

		.modules li {
			position: relative;
		}

		.modules li.directory {
			padding-left: 2em;
		}

		.modules li.directory-start {
			margin: 1em 0 0;
		}

		.modules li h3 {
			position: absolute;
			top: 0;
			left: 0;
			margin: 0;
			text-transform: uppercase;
		}

		.modules li a {
			text-transform: capitalize;
		}

		#wrapper li li {
			font-size: 14px;
			color: #777;
		}

		.modules li li a, .modules li .docs-link {
			text-transform: lowercase;
			color: #959DAB;
		}

		.modules li .docs-link, .rev-info {
			font-size: 12px;
			margin-left: 5px;
			color: #fff;
			background-color: #0E5894;
			border-radius: 5px;
			padding: 1px 5px;
			text-decoration: none;
			text-shadow: 1px 1px #00335D;
		}

		h1 span.title, .rev-info {
			vertical-align: middle;
		}

		.rev-info {
			background-color: #555;
			padding: 2px 10px;
		}

		.modules li li.other-files-header {
			font-weight: bold;
			font-size: 12px;
			color: #A7A7A7;
		}
	</style>
</head>

<body>

<h1><span class="title">AlloyUI</span> <a href="http://github.com/liferay/alloy-ui" class="rev-info">Latest commit: <?php system('git log --pretty="%h" master -1') ?></a></h1>

<div id="wrapper">
	<?php
	$demos = 'demos';
	define('DEMOS_PATH', slashify(dirname(__FILE__) . '/' . $demos));
	define('API_PATH', slashify(dirname(__FILE__) . '/api'));

	$files = getFiles(DEMOS_PATH, 'dirs');
	?>

	<h2><span class="title">Documentation</span></h2>
	<ul class="docs">
		<li><a href="./api/">API Documentation</a></li>
		<li><a href="./docs/">Convert/Compare jQuery, YUI, and AlloyUI</a></li>
	</ul>

	<h2><span class="title">Demos</span> <span class="module-count">(<?php echo count($files) ?> modules)</span></h2>

	<ul class="modules">
			
		<?php

		showFiles($files, false);

		function showFiles($files, $sub=false, $dir = '') {
			$demos = $GLOBALS['demos'];
			$alpha = '';
			$prev_alpha = '';

			$last = count($files) - 1;

			$dir = slashify($dir);
			$path = "./$demos/$dir";

			foreach ($files as $index => $value) {
				if (!$sub) {
					$prev_alpha = $alpha;
					$alpha = $value[0];
				}

				$directory_start = (!empty($alpha) && $alpha != $prev_alpha);

				if ($sub && $index == 0) {
				?>

					<ul>
						<li class="other-files-header">Other files</li>

				<?php
				}
			?>

				<li class="<?php echo !$sub ? 'directory' : ''  ?> <?php echo $index == 0 ? 'first' : '' ?> <?php echo $index == $last ? 'last' : '' ?> <?php echo $directory_start ? 'directory-start' : '' ?>">
					<?php
						if ($directory_start) {
					?>

						<h3><?php echo $alpha ?></h3>

					<?php
					}
					?>

						<a href="<?php echo "$path$value"; ?>"><?php echo $value; ?></a>

					<?php
						if (!$sub) {
							$api_module_path = "module_aui-$value.html";

							if (file_exists(API_PATH . $api_module_path)) {
							?>
								<a class="docs-link" href="./api/<?php echo $api_module_path; ?>">docs</a>
							<?php
								
							}

							$subfiles = getFiles(DEMOS_PATH."/$value", 'files', 0, '/^(?:(?!index).*)\.html$/i');

							showFiles($subfiles, true, $value);
						}
					?>
				</li>

			<?php
			
				if ($sub && $index == $last) {
				?>
					</ul>
				<?php
				}
			}
		}

		function getFiles($dir, $type = 'all', $recursive = 0, $regex_filter = '') {
			if (is_dir($dir) && ($dh = opendir($dir))) {
				$filearr = array(
					'dirs' => array(),
					'files' => array()
				);

				$dirs = scandir($dir);

				foreach ($dirs as $index => $file) {
					$dir_path = "$dir/$file";
					$is_dir = is_dir($dir_path);

					$not_relative_parent = ($file != '.' && $file != '..');

					if (!$is_dir && $not_relative_parent && ($regex_filter != '' && preg_match($regex_filter, $file))) {
						$filearr['files'][] = $file;
					}
					elseif ($is_dir && $not_relative_parent && !$recursive) {
						$filearr['dirs'][] = $file;
					}

					if ($recursive) {
						if ($is_dir && $not_relative_parent) {
							$filearr['dirs'][$file] = getFiles($dir_path, 'all', 1);
						}
					}
				}
			}

			if ($type == 'files') {
				$filearr = $filearr['files'];
			}
			elseif ($type == 'dirs') {
				$filearr = $filearr['dirs'];
			}

			return $filearr;
		}

		function slashify($str) {
			$str = trim($str);

			return ($str != '' && substr($str, -1) != '/') ? $str . '/' : $str;
		}
		?>

	</ul>
</div>

</body>
</html>
