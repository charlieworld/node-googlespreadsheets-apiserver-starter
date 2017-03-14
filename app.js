
var express = require('express');
var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/data', function (req, res) {
    get_gs_data(res);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


function get_gs_data(res){
    var doc = new GoogleSpreadsheet('sheet id'); // 這邊輸入目標 GoogleSpreadsheet 的id
    var keyfile = 'key.json' // 這邊輸入 key 檔 
    var sheet;
    var rowlength;
    var data_list = [];

    async.series([
        function setAuth(step) {
            // Step 1 Auth
            var creds = require('./'+ keyfile);
            doc.useServiceAccountAuth(creds, step);
        },
        function getInfoAndWorksheets(step) {
            // Step 2 get sheet info
            doc.getInfo(function(err, info) {
            console.log('\nLoaded doc: '+info.title+' by '+info.author.email);
            sheet = info.worksheets[0];
            console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
            step();
            });
        },
        function workingWithRows(step) {
            // Step 2 read rows data
            sheet.getRows({
            offset: 1,
            limit: 20,
            orderby: 'col1'
            }, function( err, rows ){
            rowlength = rows.length
            step();
            });
        },
        function workingWithCells(step) {
            sheet.getCells({
            'min-row': 1,
            'max-row': 5,
            'return-empty': true
            }, function(err, cells) {
            res.send(cells);
             //step();
            });
        }
    ]);

}