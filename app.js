
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cors = require('cors');
var hbase = require('hbase');


var app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'false' }));
app.use(express.static(path.join(__dirname, 'front')));
// Permit server to receive heavy file
app.use(bodyParser());
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));
// Port Number 
const port=process.env.PORT || 8000;


app.get('/hello', function(req,res) {
  var client = new hbase.Client({
    host: 'beetlejuice',
    port: 9000
});
client.version( function( error, version ){
  console.log( version );
} );  
  
  res.end(JSON.stringify({message: 'Hello ' }));
})

app.get('*', (req, res) => {
  
  res.sendFile(path.join(__dirname, 'front/index.html'));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});





module.exports = app;