var http = require('http');
var fs = require('fs');
const myArgs = process.argv.slice(2);
var ipaddress = myArgs[0]
http.createServer(function (request, response) {
    console.log('request starting...');
    var filePath;
    var contentType;
    console.log(request.url);

    if(request.url === '/ipa'){
        filePath = './serve/ipa/s.ipa';
        contentType = 'application/octet-stream';
    }else if (request.url === '/plist') {
        contentType = 'application/x-plist';
        filePath = './serve/download.plist';
    }
    if(filePath){
    fs.readFile(filePath, function(error, content) {
        if (error) {

                response.writeHead(500);
                response.end('An Error Occured: '+error.code+' ..\n');
                response.end(); 
        }
        else {
            var theString=content.toString();

            response.writeHead(200, { 'Content-Type': contentType });
            response.end(theString.replace("mysite", ipaddress));
        }
    });
}

}).listen(8888);
