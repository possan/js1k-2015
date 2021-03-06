
if (process.argv.length < 4) {
	console.log('Syntax: stringify.js [inputfile] [outputfile] [variablename]');
	return;
}

var fs = require('fs');
var code = fs.readFileSync(process.argv[2], 'utf8').trim();
var varname = process.argv[4].trim();

code = code.replace(/^[ \t]*/img, "");
code = code.replace(/\/\/.*$/img, "");
code = code.replace(/\n/g, " ");
code = code.replace(/[ ]{2,}/g, " ");
code = code.replace(/;\ /g, ";");
code = code.replace(/,\ /g, ",");
code = code.replace(/[ ]+=[ ]+/g, "=");
code = code.replace(/[ ]+\+[ ]+/g, "+");
code = code.trim();

code = "var " + varname + '=\"' + code + '\";\n\n';

fs.writeFileSync(process.argv[3], code, 'ascii');
