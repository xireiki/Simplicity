var http = require("http");
var fs = require("fs");
var url = require("url");

var port = 8080;

http.createServer(function (request, response) {
  var path = url.parse(request.url, true).pathname;
  var query = url.parse(request.url, true).query;
  if (path == "/"){
    fs.access("./index.html", fs.constants.F_OK, function(err){
      if (!err){
        response.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
        file = fs.readFileSync("./index.html");
        response.write(file);
        response.end();
      } else {
        response.write("\n");
        response.end();
      }
    });
  } else {
    fs.access("." + path, fs.constants.F_OK, function(err){
      if (!err){
        response.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
        var file = fs.readFileSync("." + path);
        response.write(file);
        response.end();
      } else {
        response.write("\n");
        response.end();
      }
    });
  }
}).listen(port, function(err){
  console.log('Server running on port ' + port);
});
