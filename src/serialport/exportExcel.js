var fs = require('fs')
var json2xls = require('json2xls');
var db = require('./db')

var json = db.getTelemetry()

var xls = json2xls(json);
fs.writeFileSync('dato.xlsx', xls, 'binary');
