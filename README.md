sig2mqtt
========

Simple node gateway between sigfox-backend HTTP callback and local MQTT broker

## Notes

* Every message receive on the HTTP server are JSONified and send to the MQTT topic "pub/sigfox/json_msg".

* On backend site, we must defined this callback to send every sigfox DATA common variables :
  http://[your IP]:8080/sigfox?device={device}&time={time}&signal={signal}&avgSignal={avgSignal}&station={station}&lat={lat}&lng={lng}&rssi={rssi}&data={data}

## Installation

    git clone https://github.com/sourceperl/sig2mqtt.git
    cd sig2mqtt
    npm install

## Use it

Directly on console (just for test)

    node sig2mqtt.js

Use with [supervisor](http://supervisord.org/) on debian like GNU/Linux

    sudo apt-get install supervisor
    sudo cp supervisord/sig2mqtt.conf /etc/supervisor/conf.d/
    sudo supervisorctl update
