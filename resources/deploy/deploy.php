<?php include(getenv('REDIRECT_FILE')); ?>

AUI.setDefaults({
	combine: true,
	root: './../../build/',
	comboBase: YUI.config.base + '../lib/yui-combo/combo.php?',
	groups: {
		alloy: {
			combine: true
		}
	}
});