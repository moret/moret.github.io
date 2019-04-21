function setCookie(name, value)
{
	var expiration = (new Date("December 31, 2099 23:59:59 GMT")).toGMTString();
	var cookie = name + "=" + value + "; expires=" + expiration + "; domain=moret.pro.br;";
	document.cookie = cookie;
}

function getCookie(name)
{
	var documentCookie = document.cookie;
	var prefix = name + "=";
	var begin = documentCookie.indexOf("; " + prefix);
	if (begin == -1)
	{
		begin = documentCookie.indexOf(prefix);
		if (begin != 0)
		{
			return null;
		}
	}
	else
	{
		begin += 2;
	}

	var end = documentCookie.indexOf(";", begin);
	if (end == -1)
	{
		end = documentCookie.length;
	}

	return unescape(documentCookie.substring(begin + prefix.length, end));
}

function loadUserConfigurations()
{
	var CSSColor = getCookie("init4-CSSColor");
	var CSSLayout = getCookie("init4-CSSLayout");

	if (CSSColor == "off")
	{
	   	document.getElementById("style-color").href = "";
	}
	else if (CSSColor != null)
	{
	   	document.getElementById("style-color").href = CSSColor;
	}

	if (CSSLayout == "off")
	{
   		document.getElementById("style-layout").href = "";
	}
	else if (CSSLayout != null)
	{
   		document.getElementById("style-layout").href = CSSLayout;
	}
}

function changeCSSColor(CSS)
{
	if (CSS == "" || CSS == null || CSS == "off")
	{
	   	document.getElementById("style-color").href = "";
		setCookie("init4-CSSColor","off");
	}
	else
	{
	   	document.getElementById("style-color").href = CSS;
		setCookie("init4-CSSColor",CSS);
	}
}

function changeCSSLayout(CSS)
{
	if (CSS == "" || CSS == null || CSS == "off")
	{
	   	document.getElementById("style-layout").href = "";
		setCookie("init4-CSSLayout","off");
	}
	else
	{
	   	document.getElementById("style-layout").href = CSS;
		setCookie("init4-CSSLayout",CSS);
	}
}