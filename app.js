 var express = require('express');
var app = express();
var path = require('path');
var compression = require('compression');
var fs = require('fs');
var favicon = require('serve-favicon');
// var parse = require('csv-parse');
var obj;
var halfWeekInMs = 304800000;

app.use(compression());
app.use(express.static('public'));
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
// var csvStream = fs.createReadStream('community_college_data.csv');
// var writeStream = fs.createWriteStream('communit_college_data.json');

// var parser = parse({columns: true}, function (err, data) {
//   writeStream.write(JSON.stringify(data));
// });

// csvStream.pipe(parser);

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname+'/public/index.html'), { lastModified: true });
});

app.get('/data.json', function (req, res) {
  fs.readFile('./public/data/community_college_data.min.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    res.setHeader('Cache-Control', 'public, max-age=' + halfWeekInMs.toString());
    res.json(obj);
  });
});

app.listen(process.env.PORT || 3000);