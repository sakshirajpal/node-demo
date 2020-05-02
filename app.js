var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/node-demo';
var str = ""
app.route('/getUsers').get(function (req, res) {


    var flow = 0, fmid = 0, fhigh = 0;
    var mlow = 0, mmid = 0, mhigh = 0;
    var mnationality = [];
    var fnationality = [];
    MongoClient.connect(url, function (err, db) {
        var cursor = db.collection('users').find();
        cursor.each(function (err, item) {

            if (item != null) {
                if (item.gender == "female") {
                    if (item.dob.age <= 30) {
                        flow++;
                    }
                    if (item.dob.age >= 30 && item.dob.age <= 50) {
                        fmid++;
                    }
                    if (item.dob.age > 50) {
                        fhigh++;
                    }
                    fnationality.push(item.nat);
                }
                if (item.gender == "male") {
                    if (item.dob.age <= 30) {
                        mlow++;
                    }
                    if (item.dob.age >= 30 && item.dob.age <= 50) {
                        mmid++;
                    }
                    if (item.dob.age > 50) {
                        mhigh++;
                    }
                    mnationality.push(item.nat);

                }
            }
            
            str = ` <html>
                <head>
                <style>
                table, th, td {
                  border: 1px solid black;
                }
                </style>
                </head>
                <body>
                
                        <table> 
                            <thead>
                                Males
                            </thead>
                            <tr>
                                <td>Nationality</td>
                                <td>0-30</td>
                                <td>30-50</td>
                                <td>50 and above</td>
                            </tr>
                            <tr>
                                <td>${mnationality}</td>
                                <td>${mlow}</td>
                                <td>${mmid}</td>
                                <td>${mhigh}</td>
                            </tr>
                        </table>
                
                        <table>
                            <thead>
                                Females
                            </thead>
                            <tr>
                                <td>Nationality</td>
                                <td>0-30</td>
                                <td>30-50</td>
                                <td>50 and above</td>
                            </tr>
                            <tr>
                            <td>${fnationality}</td>
                            <td>${flow}</td>
                            <td>${fmid}</td>
                            <td>${fhigh}</td>
                            </tr>
                        </table>
                
                
                    </body>
                </html>`
        });

        res.send(str);
        db.close();

    });

});



var server = app.listen(3000, function () {
    console.log("starting")
});