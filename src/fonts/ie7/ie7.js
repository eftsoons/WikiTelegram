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
		'icon-Attern': '&#xe912;',
		'icon-Block': '&#xe913;',
		'icon-Citate': '&#xe914;',
		'icon-Close': '&#xe915;',
		'icon-Done': '&#xe916;',
		'icon-Edit': '&#xe917;',
		'icon-Email': '&#xe918;',
		'icon-icon': '&#xe919;',
		'icon-image': '&#xe91a;',
		'icon-info': '&#xe91b;',
		'icon-infowindow': '&#xe91c;',
		'icon-Lapp': '&#xe91d;',
		'icon-Mapp': '&#xe91e;',
		'icon-Menu': '&#xe91f;',
		'icon-Plus': '&#xe920;',
		'icon-Sapp': '&#xe921;',
		'icon-Text': '&#xe922;',
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
