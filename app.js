 var express = require('express');
var app = express();
var path = require('path');
var compression = require('compression');
var fs = require('fs');
var favicon = require('serve-favicon');
// var parse = require('csv-parse');
var obj;
var yearInMs = 31536000000;

app.use(compression());
app.use(express.static('public', { maxAge: yearInMs }));
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
// var csvStream = fs.createReadStream('community_college_data.csv');
// var writeStream = fs.createWriteStream('communit_college_data.json');

// var parser = parse({columns: true}, function (err, data) {
//   writeStream.write(JSON.stringify(data));
// });

// csvStream.pipe(parser);

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname+'/index.html'), { maxAge: yearInMs });
});

app.get('/data.json', function (req, res) {
  fs.readFile('./public/data/community_college_data.min.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    res.setHeader('Cache-Control', 'public, max-age=' + yearInMs.toString());
    res.json(obj);
  });
});

app.listen(process.env.PORT || 3000);