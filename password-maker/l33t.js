/**************************************************
* ECMAScript leetspeak - Version 1.0 by           *
* Eric H. Jung <grimholtz@yahoo.com>              *
*                                                 *
* Ported from Oliver Gobin's <og@ogobin.org>      *
* PHP leetspeak - Version 1.0                     *
* http://www.ogobin.org/bin/scripts/31337.php.inc *
*                                                 *
* What is leetspeak?                              *
* http://www.wikipedia.org/wiki/Leet              *
* http://www.heise.de/ct/00/11/003/               *
***************************************************/

var alphabet = new Array(/a/g, /b/g, /c/g, /d/g, /e/g, /f/g, /g/g, /h/g, /i/g, /j/g, /k/g, /l/g, /m/g, /n/g, /o/g, /p/g, /q/g, /r/g, /s/g, /t/g, /u/g, /v/g, /w/g, /x/g, /y/g, /z/g);
var level1 = new Array("4", "b", "c", "d", "3", "f", "g", "h", "i", "j", "k", "1", "m", "n", "0", "p", "9", "r", "s", "7", "u", "v", "w", "x", "y", "z");
var level2 = new Array("4", "b", "c", "d", "3", "f", "g", "h", "1", "j", "k", "1", "m", "n", "0", "p", "9", "r", "5", "7", "u", "v", "w", "x", "y", "2");
var level3 = new Array("4", "8", "c", "d", "3", "f", "6", "h", "'", "j", "k", "1", "m", "n", "0", "p", "9", "r", "5", "7", "u", "v", "w", "x", "'/", "2");
var level4 = new Array("@", "8", "c", "d", "3", "f", "6", "h", "'", "j", "k", "1", "m", "n", "0", "p", "9", "r", "5", "7", "u", "v", "w", "x", "'/", "2");
var level5 = new Array("@", "|3", "c", "d", "3", "f", "6", "#", "!", "7", "|<", "1", "m", "n", "0", "|>", "9", "|2", "$", "7", "u", "\\/", "w", "x", "'/", "2");
var level6 = new Array("@", "|3", "c", "|)", "&", "|=", "6", "#", "!", ",|", "|<", "1", "m", "n", "0", "|>", "9", "|2", "$", "7", "u", "\\/", "w", "x", "'/", "2");
var level7 = new Array("@", "|3", "[", "|)", "&", "|=", "6", "#", "!", ",|", "|<", "1", "^^", "^/", "0", "|*", "9", "|2", "5", "7", "(_)", "\\/", "\\/\\/", "><", "'/", "2");
var level8 = new Array("@", "8", "(", "|)", "&", "|=", "6", "|-|", "!", "_|", "|\(", "1", "|\\/|", "|\\|", "()", "|>", "(,)", "|2", "$", "|", "|_|", "\\/", "\\^/", ")(", "'/", "\"/_");
var level9 = new Array("@", "8", "(", "|)", "&", "|=", "6", "|-|", "!", "_|", "|\{", "|_", "/\\/\\", "|\\|", "()", "|>", "(,)", "|2", "$", "|", "|_|", "\\/", "\\^/", ")(", "'/", "\"/_");
var levels = new Array(level1, level2, level3, level4, level5, level6, level7, level8, level9);

/**
 * Convert the string in _message_ to l33t-speak
 * using the l33t level specified by _leetLevel_.
 * l33t levels are 0-8 with 0 being the simplest
 * form of l33t-speak and 8 being the most complex.
 *
 * Note that _message_ is converted to lower-case if
 * the l33t conversion is performed.
 * Future versions can support mixed-case, if we need it.
 *
 * Using a _leetLevel_ <= -1 results in the original message
 * being returned.
 *
 */
function convertToL33t(leetLevel, message)
{
	if (leetLevel > -1) {
		var ret = message.toLowerCase();
		for (var item = 0; item < alphabet.length; item++)
			ret = ret.replace(alphabet[item], levels[leetLevel][item]);
		return ret;
	}
	return message;
}