/*
 *   EC544 - Challenge 2: Data Visualization
 *
 *   Main purpose of this file is to use AngularJS to make $http requests for reading data coming in from xbee readings.
 */

var app = angular.module('xbeedata', ['ngRoute', 'ngCookies'])

app.controller('xbee', function($scope, $http, $interval) {

    //Using interval function, the http request is being constantly made to retrieve new temperatures
    //$scope.testTimer = function() {
    $interval(function() {

        $http.get('/api/xbee6')
            .then(function(response) {

                $scope.xbee1 = response.data[0]["temp"];

                //console.log("ran the http function again! ")
            });

        $http.get('/api/xbee10')
            .then(function(response) {

                $scope.xbee2 = response.data[0]["temp"];

            });

        $http.get('/api/xbee120')
            .then(function(response) {

                $scope.xbee3 = response.data[0]["temp"];

            });

        $http.get('/api/xbee196')
            .then(function(response) {

                $scope.xbee4 = response.data[0]["temp"];

            });

        $http.get('/api/xbee236')
            .then(function(response) {

                $scope.xbee5 = response.data[0]["temp"];

            });

    }, 1000);
    //};

    //Initial, one-time loading of xbee temperatures
    $http.get('/api/xbee6')
        .then(function(response) {

            $scope.xbee1 = response.data[0]["temp"];

            temp1[0] = response.data[0]["temp"];
        });


    $http.get('/api/xbee10')
        .then(function(response) {

            $scope.xbee2 = response.data[0]["temp"];

        });

    $http.get('/api/xbee120')
        .then(function(response) {

            $scope.xbee3 = response.data[0]["temp"];

        });

    $http.get('/api/xbee196')
        .then(function(response) {

            $scope.xbee4 = response.data[0]["temp"];

        });

    $http.get('/api/xbee236')
        .then(function(response) {

            $scope.xbee5 = response.data[0]["temp"];

        });

});

/*-----------------------------------------------------------------------------------------------------------*/
/* This is where the real-time graph is drawn by making intervaled-http requests to continously update data  */
/*-----------------------------------------------------------------------------------------------------------*/

app.controller('canvas', function($scope, $http, $interval) {

    var graphdata1 = [];
    var graphdata2 = [];
    var graphdata3 = [];
    var graphdata4 = [];
    var graphdata5 = [];

    var graphtime1 = [];
    var graphtime2 = [];
    var graphtime3 = [];
    var graphtime4 = [];
    var graphtime5 = [];


    //interval function retrievew new temperatures every 90 milli-seconds.
    $interval(function() {

        $http.get('/api/xbee6')
            .then(function(response) {

                graphdata1[0] = response.data[0]["temp"];
                graphtime1[0] = response.data[0]["date"];
                //console.log("Ran the http function for canvas! ")
            });

        $http.get('/api/xbee10')
            .then(function(response) {

                graphdata2[0] = response.data[0]["temp"];
                graphtime2[0] = response.data[0]["date"];
            });

        $http.get('/api/xbee120')
            .then(function(response) {

                graphdata3[0] = response.data[0]["temp"];
                graphtime3[0] = response.data[0]["date"];
            });

        $http.get('/api/xbee196')
            .then(function(response) {

                graphdata4[0] = response.data[0]["temp"];
                graphtime4[0] = response.data[0]["date"];
            });

        $http.get('/api/xbee236')
            .then(function(response) {

                graphdata5[0] = response.data[0]["temp"];
                graphtime5[0] = response.data[0]["date"];
            });
    }, 90);


    /*------------------Live Data of Xbee 1 --------------------*/
    $scope.loading = function() {

        var dps = []; // dataPoints

        var chart = new CanvasJS.Chart("xbee1", {
            title: {
                text: "Xbee1 Live Data"
            },
            axisY: {
                includeZero: false,
                suffix: " °F",
                //maximum: 90,
                //minimum: 50,
                gridThickness: 1
            },

            data: [{
                type: "line",
                dataPoints: dps
            }]
            /*
                            options: {
                                scales: {
                                    xAxes: [{
                                        time: {
                                            unit: 'h:mm:ss a'
                                        }
                                    }]
                                }
                            }
            */
        });

        var xVal = 0;
        var yVal = 100;
        var updateInterval = 100;
        var dataLength = 500; // number of dataPoints visible at any point

        var updateChart = function(count) {
            count = count || 1;
            // count is number of times loop runs to generate random dataPoints.

            for (var j = 0; j < count; j++) {
                yVal = graphdata1[0];
                //xVal = graphtime1[0];
                dps.push({
                    x: xVal,
                    y: yVal
                });
                xVal++;
            }

            if (dps.length > dataLength) {
                dps.shift();
            }

            chart.render();

        };
        // generates first set of dataPoints
        updateChart(dataLength);

        // update chart after specified time.
        setInterval(function() {
            updateChart()
        }, updateInterval);

    };

    /*------------------Live Data of Xbee 2 --------------------*/
    $scope.loading2 = function() {

        var dps = []; // dataPoints
        var chart = new CanvasJS.Chart("xbee2", {
            title: {
                text: "Xbee2 Live Data"
            },
            axisY: {
                includeZero: false,
                suffix: " °F",
                //maximum: 90,
                //minimum: 0,
                gridThickness: 1
            },
            data: [{
                type: "line",
                dataPoints: dps
            }]
        });

        var xVal = 0;
        var yVal = 100;
        var updateInterval = 100;
        var dataLength = 500; // number of dataPoints visible at any point

        var updateChart = function(count) {
            count = count || 1;
            // count is number of times loop runs to generate random dataPoints.
            for (var j = 0; j < count; j++) {
                yVal = graphdata2[0];
                dps.push({
                    x: xVal,
                    y: yVal
                });
                xVal++;
            }
            if (dps.length > dataLength) {
                dps.shift();
            }
            chart.render();
        };
        updateChart(dataLength); // generates first set of dataPoints

        setInterval(function() { // update chart after specified time.
            updateChart()
        }, updateInterval);

    };

    /*------------------Live Data of Xbee 3 --------------------*/
    $scope.loading3 = function() {

        var dps = []; // dataPoints
        var chart = new CanvasJS.Chart("xbee3", {
            title: {
                text: "Xbee3 Live Data"
            },
            axisY: {
                includeZero: false,
                suffix: " °F",
                //maximum: 90,
                //minimum: 0,
                gridThickness: 1
            },
            data: [{
                type: "line",
                dataPoints: dps
            }]
        });

        var xVal = 0;
        var yVal = 100;
        var updateInterval = 100;
        var dataLength = 500; // number of dataPoints visible at any point

        var updateChart = function(count) {
            count = count || 1;
            // count is number of times loop runs to generate random dataPoints.
            for (var j = 0; j < count; j++) {
                yVal = graphdata3[0];
                dps.push({
                    x: xVal,
                    y: yVal
                });
                xVal++;
            }
            if (dps.length > dataLength) {
                dps.shift();
            }
            chart.render();
        };
        updateChart(dataLength); // generates first set of dataPoints

        setInterval(function() { // update chart after specified time.
            updateChart()
        }, updateInterval);

    };

    /*------------------Live Data of Xbee 4 --------------------*/
    $scope.loading4 = function() {

        var dps = []; // dataPoints
        var chart = new CanvasJS.Chart("xbee4", {
            title: {
                text: "Xbee4 Live Data"
            },
            axisY: {
                includeZero: false,
                suffix: " °F",
                //maximum: 90,
                //minimum: 0,
                gridThickness: 1
            },
            data: [{
                type: "line",
                dataPoints: dps
            }]
        });

        var xVal = 0;
        var yVal = 100;
        var updateInterval = 100;
        var dataLength = 500; // number of dataPoints visible at any point

        var updateChart = function(count) {
            count = count || 1;
            // count is number of times loop runs to generate random dataPoints.
            for (var j = 0; j < count; j++) {
                yVal = graphdata4[0];
                dps.push({
                    x: xVal,
                    y: yVal
                });
                xVal++;
            }
            if (dps.length > dataLength) {
                dps.shift();
            }
            chart.render();
        };
        updateChart(dataLength); // generates first set of dataPoints

        setInterval(function() { // update chart after specified time.
            updateChart()
        }, updateInterval);

    };

    /*------------------Live Data of Xbee 5 --------------------*/

    $scope.loading5 = function() {

        var dps = []; // dataPoints
        var chart = new CanvasJS.Chart("xbee5", {
            title: {
                text: "Xbee5 Live Data"
            },
            axisY: {
                includeZero: false,
                suffix: " °F",
                //maximum: 90,
                //minimum: 0,
                gridThickness: 1
            },
            data: [{
                type: "line",
                dataPoints: dps
            }]
        });

        var xVal = 0;
        var yVal = 100;
        var updateInterval = 100;
        var dataLength = 500; // number of dataPoints visible at any point

        var updateChart = function(count) {
            count = count || 1;
            // count is number of times loop runs to generate random dataPoints.
            for (var j = 0; j < count; j++) {
                yVal = graphdata5[0];
                dps.push({
                    x: xVal,
                    y: yVal
                });
                xVal++;
            }
            if (dps.length > dataLength) {
                dps.shift();
            }
            chart.render();
        };
        updateChart(dataLength); // generates first set of dataPoints

        setInterval(function() { // update chart after specified time.
            updateChart()
        }, updateInterval);

    }



});
