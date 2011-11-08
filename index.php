<!DOCTYPE html>

<html>
<head>
	<script src="build/aui/aui.js" type="text/javascript"></script>

	<link rel="stylesheet" href="build/aui-skin-classic/css/aui-skin-classic-all-min.css" type="text/css" media="screen" />

	<style type="text/css" media="screen">
		body {
			font-size: 16px;
		}

		#wrapper {
			padding: 10px;
		}

		#wrapper h2 span {
			font-size: 16px;
			color: #777;
		}

		#wrapper ul {
			list-style: none;
		}

		#wrapper ul ul {
			margin: 0 1em 1em 0.5em;
			border-left: 0.5em solid #DEDEDE;
			padding-left: 0.5em;
		}

		#wrapper li {
			position: relative;
		}

		#wrapper li.directory {
			padding-left: 2em;
		}

		#wrapper li.directory-start {
			margin: 1em 0 0;
		}

		#wrapper li h3 {
			position: absolute;
			top: 0;
			left: 0;
			margin: 0;
			text-transform: uppercase;
		}

		#wrapper li a {
			text-transform: capitalize;
		}

		#wrapper li li {
			font-size: 14px;
			color: #777;
		}

		#wrapper li li a {
			text-transform: lowercase;
			color: #959DAB;
		}

		#wrapper li li.other-files-header {
			font-weight: bold;
			font-size: 12px;
			color: #A7A7A7;
		}
	</style>
</head>

<body>

<div id="wrapper">
	<ul>
		<?php
		$demos = 'demos';
		define('DEMOS_PATH', dirname(__FILE__) . '/' . $demos);

		$files = getFiles(DEMOS_PATH, 'dirs');

		?>
			<h1>AlloyUI</h1>
			<h2>Demos <span>(<?php echo count($files['dirs']) ?> modules)</span></h2>
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
