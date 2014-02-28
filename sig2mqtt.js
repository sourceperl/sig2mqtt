// node gateway between sigfox backend callback and local MQTT broker

// - every message receive on the HTTP server are JSONified and send to
//   the MQTT topic "pub/sigfox/json_msg"
//
// - we must defined this callback to send every sigfox DATA common variables :
// http://<your IP>:8080/sigfox?device={device}&time={time}&signal={signal}
// &avgSignal={avgSignal}&station={station}&lat={lat}&lng={lng}&rssi={rssi}&data={data}

// somes const
const MQTT_HOST        = 'localhost'
const MQTT_PORT        = 1883
const MQTT_MSG_TOPIC   = 'pub/sigfox/json_msg'
const HTTP_LISTEN_PORT = 8080

// node modules
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var mqtt = require('mqtt')

// connect to MQTT broker
client = mqtt.createClient(MQTT_PORT, MQTT_HOST)

var server = http.createServer(function(req, res) {
  var params = querystring.parse(url.parse(req.url).query);
  var path = url.parse(req.url).pathname;
  // check mandatory params
  if (path == '/sigfox' & 'device' in params && 'time' in params) {
    // good request
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write('OK');
    // publish to MQTT
    client.publish(MQTT_MSG_TOPIC, JSON.stringify(params));
  } else {
    // bad request
    res.writeHead(400, {"Content-Type": "text/plain"});
    res.write('KO');
  }
  res.end();
});

server.listen(HTTP_LISTEN_PORT);
