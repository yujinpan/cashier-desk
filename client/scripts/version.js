const { readFileSync, writeFileSync } = require("fs");
const { resolve } = require("path");

const version = require("../package.json").version;
const configXMLPath = resolve(__dirname, "../config.xml");
const configXML = readFileSync(configXMLPath).toString();

writeFileSync(
  configXMLPath,
  configXML.replace(/(.*widget[^>]*version=")[^"]*(".*)/, `$1${version}$2`)
);
