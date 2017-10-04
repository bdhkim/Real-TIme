//Mongoose as javascript objects

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/challenge1544')

const Schema = mongoose.Schema
const xbeeSchema = new Schema({
    XbeeNumber: Number,
    temp      : Number,
    date      : { type: Date, default: Date.now },
    X         : Number,
    Y         : Number
})


const xbeedata = mongoose.model('xbeedata', xbeeSchema)



var SerialPort = require("serialport");
//var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var idArray = [];
var maxLifeSpan = 2000 * 4;
var nodeCount = 0;
var sum = 0;
var avg = 0;
var count = 0;
var idCount = 0;
var start = new Date();

var portName = "/dev/tty.usbserial-AD01SSJB",
    portConfig = {
        baudRate: 9600,
        parser: SerialPort.parsers.readline("\n")
    };
var sp;
sp = new SerialPort.SerialPort(portName, portConfig);

router.get('/data', function(req, res, next){
    xbeedata.find()
        .then(function(doc){
        res.render('index', {items: doc});
    });

    //res.sendfile('index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    nodeCount = nodeCount + 1;
    socket.on('disconnect', function(){
        nodeCount = nodeCount - 1;
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
        sp.write(msg + "\n");
    });
});

http.listen(3600, function(){
    console.log('listening on *:3000');
});



sp.on("open", function () {
    console.log('open');
    sp.on('data', function(data) {
        if (data.indexOf('>') > -1)
        {
            var arr = data.split(">");
            arr = arr.map(function (val) { return + val; });
            id = arr[0];
            temp = arr[1];
            //console.log(data);
            if(!idArray.includes(id)){
                idArray[idCount] = id;
                idArray[idCount + 1] = temp;
                /////////////////////////////////////////

                /*----------------------------------------------------------------------------------*/
                aData = new xbeedata(
                    {
                        XbeeNumber: id,
                        temp      : temp,
                        date      : start.setHours( start.getHours() - 4 ),
                        X         : 111,
                        Y         : 222
                    }
                )

                aData.save(function (err) {
                    if (err) {
                        res.send(err)
                    }
                    //send back the new person
                    else {
                        //res.send(aDialog)

                        //count = count + 1
                    }
                })
                /*----------------------------------------------------------------------------------*/

                io.emit("chat message", "XBee " + idArray[idCount] + ": " + idArray[idCount + 1] + " F");
                console.log("XBee " +  idArray[idCount] + ": " + idArray[idCount + 1] + " F");
                sum = sum + temp;
                idCount = idCount + 1;
            }


            if(Date.now() - start > 6000)
            {
                avg = sum / (idCount);
                avg = Number((avg).toFixed(2));
                io.emit("chat message", "Average " + avg + " F");
                console.log("Average: " + avg + " F");
                count = 0;
                sum = 0;
                idCount = 0;
                start = new Date();
                idArray = [];
            }
            count = count + 1;
        }

    });
});




//Retrieving Latest Data for Xbee1

router.get('/xbee6', function(req, res)
{

    xbeedata.find({"XbeeNumber": 6}).limit(1).sort({$natural:-1}).exec(function (err, results){

        res.send(results)

    })

});

//Retrieving Latest Data for Xbee2

router.get('/xbee10', function(req, res)
{

    xbeedata.find({"XbeeNumber": 10}).limit(1).sort({$natural:-1}).exec(function (err, results) {

        res.send(results)

    });

});

router.get('/xbee120', function(req, res)
{

    xbeedata.find({"XbeeNumber": 120}).limit(1).sort({$natural:-1}).exec(function (err, results) {

        res.send(results)

    });

});

router.get('/xbee196', function(req, res)
{

    xbeedata.find({"XbeeNumber": 196}).limit(1).sort({$natural:-1}).exec(function (err, results) {

        res.send(results)

    });

});

router.get('/xbee236', function(req, res)
{

    xbeedata.find({"XbeeNumber": 236}).limit(1).sort({$natural:-1}).exec(function (err, results) {

        res.send(results)

    });

});

module.exports = router




