function strToJson(badJson) {
	return badJson.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
}
let keys = ['Team ID', 'UpTime', 'Count', 'Altitude', 'Velocity', 'Latitude', 'Longtitude', 'Image']

strToJson('{2073,11999,11,0.39,-0.05,0.00,0.001}')

module.exports  = strToJson;