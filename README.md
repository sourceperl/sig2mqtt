sig2mqtt
========

Simple node gateway between sigfox-backend HTTP callback and local MQTT broker

- Every message receive on the HTTP server are JSONified and send to the MQTT topic "pub/sigfox/json_msg"

- We must defined this callback to send every sigfox DATA common variables :
  http://<your IP>:8080/sigfox?device={device}&time={time}&signal={signal}&avgSignal={avgSignal}&station={station}&lat={lat}&lng={lng}&rssi={rssi}&data={data}

