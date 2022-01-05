var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {
    console.log('request starting...');
    var filePath;
    var contentType;

    if(request.url === '/ipa'){
        filePath = './ipa/s.ipa';
        contentType = 'application/octet-stream';
    }else if (request.url === '/plist') {
        contentType = 'application/x-plist';
        filePath = './download.plist';
    }

    fs.readFile(filePath, function(error, content) {
        if (error) {

                response.writeHead(500);
                response.end('An Error Occured: '+error.code+' ..\n');
                response.end(); 
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content);
        }
    });

}).listen(8888);
