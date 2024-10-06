/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'tgico\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-Attetion': '&#xe900;',
		'icon-Author': '&#xe901;',
		'icon-Block': '&#xe902;',
		'icon-Citate': '&#xe903;',
		'icon-Close': '&#xe904;',
		'icon-Done': '&#xe905;',
		'icon-Edit': '&#xe906;',
		'icon-icon': '&#xe907;',
		'icon-image': '&#xe908;',
		'icon-info': '&#xe909;',
		'icon-infowindow': '&#xe90a;',
		'icon-Lapp': '&#xe90b;',
		'icon-Mapp': '&#xe90c;',
		'icon-Menu': '&#xe90d;',
		'icon-Play': '&#xe90e;',
		'icon-Plus': '&#xe90f;',
		'icon-Sapp': '&#xe910;',
		'icon-Share': '&#xe911;',
		'icon-Telegram': '&#xe912;',
		'icon-Text': '&#xe913;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
