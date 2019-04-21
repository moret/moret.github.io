var passwdMaster, passwdUrl, passwdGenerated, passwdLength, protocolCB,
  domainCB, subdomainCB, pathCB, leetLevelLB,
  saveMasterPasswordCB, hashAlgorithmLB, whereLeetLB, usernameTB, counter;

function init()
{
	passwdMaster = document.getElementById("passwdMaster");
	passwdUrl = document.getElementById("passwdUrl");
	passwdGenerated = document.getElementById("passwdGenerated");
	passwdLength = document.getElementById("passwdLength");
	domainCB = document.getElementById("domainCB");
	protocolCB = document.getElementById("protocolCB");
	subdomainCB = document.getElementById("subdomainCB");
	pathCB = document.getElementById("pathCB");
	leetLevelLB = document.getElementById("leetLevelLB");
	hashAlgorithmLB = document.getElementById("hashAlgorithmLB");
	saveMasterPasswordCB = document.getElementById("saveMasterPasswordCB");
	leetLevelLB = document.getElementById("leetLevelLB");
	whereLeetLB = document.getElementById("whereLeetLB");
  usernameTB = document.getElementById("usernameTB");
  counter = document.getElementById("counter");

  var settingsAsXML = unescape(getCookie("settings"));
  if (settingsAsXML) {
    var settings = Sarissa.getDomDocument();
    settings.loadXML(settingsAsXML);
    // We don't use Sarissa XPath routines because they're
    // not currently supported by KHTML-based browsers (e.g., Safari and Konqueror)
    var rootElem = settings.firstChild;
    if (rootElem) {
      saveMasterPasswordCB.checked = rootElem.getAttribute("save-master-password") == "true";
      passwdLength.value = rootElem.getAttribute("password-length");
      protocolCB.checked = rootElem.getAttribute("protocol") == "true";
      domainCB.checked = rootElem.getAttribute("domain") == "true";
      subdomainCB.checked = rootElem.getAttribute("subdomain") == "true";
      pathCB.checked = rootElem.getAttribute("path") == "true";
      leetLevelLB.selectedIndex = getIndexOfValue(leetLevelLB, rootElem.getAttribute("leet-level"));
      hashAlgorithmLB.selectedIndex = getIndexOfValue(hashAlgorithmLB, rootElem.getAttribute("hash-algorithm"));
      whereLeetLB.selectedIndex = getIndexOfValue(whereLeetLB, rootElem.getAttribute("where-leet"));
      passwdUrl.value = rootElem.getAttribute("url");
      usernameTB.value = rootElem.getAttribute("username");
      counter.value = rootElem.getAttribute("counter");
      var key = rootElem.getAttribute("key");
      var master = rootElem.getAttribute("encrypted-master-password");
      if (key && master) {
        // Decrypt the encrypted master pw
        passwdMaster.value = byteArrayToString(rijndaelDecrypt(hexToByteArray(master), hexToByteArray(key), "CBC"));
      }

      //@TODO...
      //if (rootElem.getAttribute("maskGeneratedPassword") == "true");
        //passwdGenerated.setAttribute("type", "password");
    }
  }
	toggleWhereLeetLB();
  generatepassword();
	passwdMaster.focus();
}

function getIndexOfValue(lb, value) {
  // Find the index of the option to select
  for (var i=0; i<lb.options.length; i++) {
    if (lb[i].value == value)
      return i;
  }
  return 0; // can't find it!
}

function generatepassword() {
   var hashFunction = hashAlgorithmLB.options[hashAlgorithmLB.options.selectedIndex].value;
   var password = eval(hashFunction + "()");
   
   // use l33t again?
   var whereToUseL33t = whereLeetLB.options[whereLeetLB.options.selectedIndex].value;
   password = (whereToUseL33t == "both" || whereToUseL33t == "after-hashing") ? 
	   convertToL33t(leetLevelLB.options[leetLevelLB.options.selectedIndex].value, password) :
	   password;

   passwdGenerated.value = password.substring(0, passwdLength.value);
}

function makeHashKeyByConcatenation()
{
	var ret = passwdMaster.value + passwdUrl.value + usernameTB.value + counter.value;

  // use l33t?
  var whereToUseL33t = whereLeetLB.options[whereLeetLB.options.selectedIndex].value;
  return (whereToUseL33t == "both" || whereToUseL33t == "before-hashing") ?
   convertToL33t(leetLevelLB.options[leetLevelLB.options.selectedIndex].value, ret) : ret;
}

function getHMACHashKey()
{
  var ret = passwdMaster.value;

  // use l33t?
  var whereToUseL33t = whereLeetLB.options[whereLeetLB.options.selectedIndex].value;
  return (whereToUseL33t == "both" || whereToUseL33t == "before-hashing") ?
	   convertToL33t(leetLevelLB.options[leetLevelLB.options.selectedIndex].value, ret) : ret;
}

function getHMACData()
{
	var ret = passwdUrl.value + usernameTB.value + counter.value;

   // use l33t?
   var whereToUseL33t = whereLeetLB.options[whereLeetLB.options.selectedIndex].value;
   return (whereToUseL33t == "both" || whereToUseL33t == "before-hashing") ?
	   convertToL33t(leetLevelLB.options[leetLevelLB.options.selectedIndex].value, ret) : ret;
}

function populateURL()
{
  var temp = location.href.match("([^://]*://)([^/]*)(.*)");
  var domainSegments = temp[2].split(".");
  var displayMe = protocolCB.checked ? temp[1] : ''; // set the protocol or empty string

  if (subdomainCB.checked) {
	  // The subdomain is all domainSegments
	  // except the final two.
	  for (var i=0; i<domainSegments.length-2;i++) {
	    displayMe += domainSegments[i];
        // Add a dot if this isn't the final subdomain
	    if (i+1 < domainSegments.length-2)
		  displayMe += ".";
	  }			
  }

  if (domainCB.checked) {
	  if (displayMe != "" && displayMe[displayMe.length-1]  != ".")
	    displayMe += ".";
      displayMe += domainSegments[domainSegments.length-2] + "." + domainSegments[domainSegments.length-1];
  }

  if (pathCB.checked)
	  displayMe += temp[3];

  passwdUrl.value = displayMe;	  
  generatepassword();
}

function toggleWhereLeetLB()
{
  leetLevelLB.disabled = whereLeetLB.options[whereLeetLB.options.selectedIndex].value == "off";
}

function destroy()
{
  // Set cookie expiration date
  var expires = new Date();
  // Fix the bug in Navigator 2.0, Macintosh
  fixDate(expires);
  // Expire the cookie in 5 years
  expires.setTime(expires.getTime() + 5 * 365 * 24 * 60 * 60 * 1000);

  // Save the settings
  setCookie("settings", escape(exportPreferences()), expires);
}

// Return an XML document representing the state of the UI
function exportPreferences() {
  var doc = Sarissa.getDomDocument();
  var root = doc.createElement("passwordmaker-preferences");
  doc.appendChild(root);
  root.setAttribute("save-master-password", saveMasterPasswordCB.checked ? "true" : "false");
  root.setAttribute("password-length", passwdLength.value);
  root.setAttribute("protocol", protocolCB.checked ? "true" : "false");
  root.setAttribute("domain", domainCB.checked ? "true" : "false");
  root.setAttribute("subdomain", subdomainCB.checked ? "true" : "false");
  root.setAttribute("path", pathCB.checked ? "true" : "false");
  root.setAttribute("url", passwdUrl.value);
  root.setAttribute("leet-level", leetLevelLB.value);
  root.setAttribute("hash-algorithm", hashAlgorithmLB.value);
  root.setAttribute("where-leet", whereLeetLB.value);
  root.setAttribute("username", usernameTB.value);
  root.setAttribute("counter", counter.value);

  //root.setAttribute("mask-generated-password", maskGeneratedPassword.checked ? "true" : "false");

  if (saveMasterPasswordCB.checked) {
	  // User wants to store the master password, too
	  var key = makeKey();
	  // Encrypt the master pw for browsers like Firefox 1.0, which store
	  // cookies in plain text.
    root.setAttribute("key", key);
    root.setAttribute("encrypted-master-password", byteArrayToHex(rijndaelEncrypt(passwdMaster.value, hexToByteArray(key), "CBC")));
  }
  return Sarissa.serialize(doc);
}

function makeKey()
{
  var ret = "";
  while (true) {
	var rnd = Math.random().toString();
    ret +=  rnd.substring(rnd.lastIndexOf(".")+1);
	if (ret.length >= 32)
	  return ret.substring(0, 32);
  }
}
