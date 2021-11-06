const exec = require('child_process').exec;
var fs = require('fs');
const sys = require('sys');
const util = require('util');
const router = require('express').Router();
const os = require('os');
var ping = require('ping');
const bodyParser = require('body-parser');
const express = require('express')


router.post('/bare', (req, res) => {
  var ip = req.body.ip._value;

  var host = ip;
  console.log(host)
  //bare pinging
  function puts(error, stdout, stderr) {
    if (error) {
      console.log(error);

    }
    if (stderr) {
      res.send(stderr)
    }
    if (stdout) {
      res.send(stdout)
    }
  }
  exec(`ping -c 3 ${host}`, puts);
})


router.post('/',(req, res) => {
    console.log('waiting for ip');
    const ip = [req.body.ip._value];

    var hosts = ip;



    hosts.forEach(function(host){
        ping.sys.probe(host, function(isAlive){

            let dt = new Date();
            var pingId = dt.getMonth() + '//' + dt.getDate() + '//' + dt.getFullYear();
            console.log(pingId)
            var msg = isAlive ?   host + ': This server is up and running---Success' : host + ': This server is down or invalid---Failed' ;

            const path = './logs/logs.txt';

            if(fs.existsSync(path)) {
                fs.appendFileSync(path, pingId + "---------" + msg  + os.EOL + os.EOL, 'utf-8', function(err, data){
                    if(err) {
                        console.log(err)
                    } else {
                        id= pingId;
                    }
                });
            } else {
                fs.writeFileSync(path, msg + "/r/n",  'utf-8', function(err, data){
                    if (err) {
                        console.log(err)
                    } else {
                        id= pingId;
                    }
                })
            }


            res.send(msg);

        });
    });



});

router.get('/logs', (req, res) => {
   fs.readFile('./logs/logs.txt', 'utf-8', (err, data) => {
     if (err) {
       console.log(err);
     } else {
       res.send(data)
     }
   });


})

router.delete('/logs/del', (req, res) => {
  if (fs.existsSync('./logs/logs.txt')) {
    fs.unlink('./logs/logs.txt', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send('Logs Deleted')
      }
    });
  } else {
    res.send('There are no logs to delete')
  }
})


module.exports = router;
