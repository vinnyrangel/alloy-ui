/**
 * The Tooltip Utility - A standard tooltip implementation for providing additional information when hovering over a target element.
 *
 * @module aui-tooltip
 */

var L = A.Lang,
	isString = L.isString,
	isUndefined = L.isUndefined,
	isBoolean = L.isBoolean,

	ALIGN = 'align',
	ARROW = 'arrow',
	ATTR = 'attr',
	BL = 'bl',
	BLANK = '',
	BODY_CONTENT = 'bodyContent',
	BOUDING_BOX = 'boundingBox',
	CONTENT_BOX = 'contentBox',
	CURRENT_NODE = 'currentNode',
	INNER = 'inner',
	SECTION = 'section',
	SHOW_ARROW = 'showArrow',
	TITLE = 'title',
	TR = 'tr',
	TOOLTIP = 'tooltip',
	TRIGGER = 'trigger',

	getCN = A.getClassName,

	CSS_TOOLTIP = getCN(TOOLTIP),
	CSS_TOOLTIP_ARROW = getCN(TOOLTIP, ARROW),
	CSS_TOOLTIP_INNER = getCN(TOOLTIP, INNER),

	TPL_TOOLTIP_ARROW = '<div class="' + CSS_TOOLTIP_ARROW + '"></div>';

/**
 * <p><img src="assets/images/aui-tooltip/main.png"/></p>
 *
 * A base class for Tooltip, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>Additional information when hovering over a target element</li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * <pre><code>var instance = new A.Tooltip({
 *	trigger: '#element',
 *	align: { points: [ 'lc', 'rc' ] },
 *	bodyContent: 'Simple tooltip'
 * }).render();
 * </code></pre>
 *
 * Check the list of <a href="Tooltip.html#configattributes">Configuration Attributes</a> available for
 * Tooltip.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class Tooltip
 * @constructor
 * @extends OverlayContextPanel
 */
var Tooltip = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property Tooltip.NAME
		 * @type String
		 * @static
		 */
		NAME: TOOLTIP,

		/**
		 * Static property used to define the default attribute
		 * configuration for the Tooltip.
		 *
		 * @property Tooltip.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {
			/**
			 * See <a href="OverlayContextPanel.html#config_anim">OverlayContextPanel anim</a>.
			 *
			 * @attribute anim
			 * @default { show: false }
			 * @type Object
			 */
			anim: {
				value: {
					show: false
				}
			},

			/**
			 * See <a href="Overlay.html#config_align">OverlayContextPanel align</a>.
			 *
			 * @attribute align
			 * @default { node: null, points: [ BL, TR ] }
			 * @type Object
			 */
			align: {
				value: { node: null, points: [ BL, TR ] }
			},

			/**
			 * See <a href="OverlayContext.html#config_showOn">OverlayContext showOn</a>.
			 *
			 * @attribute showOn
			 * @default mouseover
			 * @type String
			 */
			showOn: {
				value: 'mouseover'
			},

			/**
			 * See <a href="OverlayContext.html#config_showOn">OverlayContext showOn</a>.
			 *
			 * @attribute hideOn
			 * @default mouseout
			 * @type String
			 */
			hideOn: {
				value: 'mouseout'
			},

			/**
			 * Prevents display:none from being applied to the tooltip when it is hidden because we
			 * cannot properly align a hidden tooltip with display:none since we can't accurately
			 * get its computed x and y position.
			 */
			hideClass: {
				value: false
			},

			/**
			 * See <a href="OverlayContext.html#config_hideDelay">OverlayContext hideDelay</a>.
			 *
			 * @attribute hideDelay
			 * @default 500
			 * @type Number
			 */
			hideDelay: {
				value: 500
			},

			/**
			 * Use the content of the <code>title</code> attribute as the Tooltip
	         * content.
			 *
			 * @attribute title
			 * @default false
			 * @type boolean
			 */
			title: {
				value: false,
				validator: isBoolean
			}
		},

		EXTENDS: A.OverlayContextPanel,

		prototype: {
			/**
			 * Bind the events on the Tooltip UI. Lifecycle.
			 *
			 * @method bindUI
			 * @protected
			 */
			bindUI: function() {
				var instance = this;

				Tooltip.superclass.bindUI.apply(instance, arguments);
			},

			renderUI: function () {
				var instance = this;
				var boundingBox = instance.get(BOUDING_BOX);
				var contentBox = instance.get(CONTENT_BOX);

				boundingBox.addClass(CSS_TOOLTIP);
				contentBox.addClass(CSS_TOOLTIP_INNER);

				Tooltip.superclass.renderUI.apply(instance, arguments);

				if (instance.get(SHOW_ARROW)) {
					instance._pointerNode.addClass(CSS_TOOLTIP_ARROW);
				}
			},

			/**
			 * Align the arrow based on common classes of bootstrap
			 * bottom, top, right, left
			 *
			 * @method alignArrow
			 */
			alignArrow: function () {
				var instance = this;
				var align = instance.get(ALIGN);
				var alignMap = {
					b: 'bottom',
					c: 'top',
					l: 'left',
					r: 'right',
					t: 'top'
				}

				var firstLetter = align.points[1].substring(0,1);
				var arrowClass = getCN(alignMap[firstLetter]);

				instance.get(BOUDING_BOX).addClass(arrowClass);
			},

			/**
			 * Over-ride the <code>show</code> to invoke the
		     * <a href="Tooltip.html#method__loadBodyContentFromTitle">_loadBodyContentFromTitle</a>.
		     * See <a href="OverlayContext.html#config_show">OverlayContext show</a>.
			 *
			 * @method show
			 */
			show: function() {
				var instance = this;
				var bodyContent = instance.get(BODY_CONTENT);

				Tooltip.superclass.show.apply(instance, arguments);

				if (instance.get(TITLE)) {
					instance._loadBodyContentFromTitle( instance.get(CURRENT_NODE) );
				}

				instance.alignArrow();
			},

			/**
			 * Use the <code>title</code> content of the <code>currentNode</code> as
		     * the content of the Tooltip.
			 *
			 * @method _loadBodyContentFromTitle
			 * @param {Node} currentNode Current node being used by the Tooltip
			 * @protected
			 */
			_loadBodyContentFromTitle: function(currentNode) {
				var instance = this;
				var trigger = instance.get(TRIGGER);

				if (!instance._titles) {
					instance._titles = trigger.attr(TITLE);

					// prevent default browser tooltip for title
					trigger.attr(TITLE, BLANK);
				}

				if (currentNode) {
					var index = trigger.indexOf(currentNode);
					var title = instance._titles[index];

					instance.set(BODY_CONTENT, title);
				}
			},

			/**
			 * Fires after the attribute <code>bodyContent</code> change.
			 *
			 * @method _afterBodyChange
			 * @param {EventFacade} e
			 * @protected
			 */
			_afterBodyChange: function(e) {
				var instance = this;

				Tooltip.superclass._afterBodyChange.apply(this, arguments);

				// need to refreshAlign() after body change
				instance.refreshAlign();
			}
		}
	}
);

A.Tooltip = Tooltip;