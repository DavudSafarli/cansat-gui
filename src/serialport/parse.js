var db = require("./db");

function parseData(badJson) {
	var cleverJson = badJson.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
	db.saveTelemetry(cleverJson)
}

var badJson  = `{a:4}`;
parseData(badJson);