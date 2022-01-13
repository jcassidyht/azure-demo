var http = require('https');
var fs = require('fs');
const myArgs = process.argv.slice(2);
var ipaddress = myArgs[0];

const port = 8888;

const options = {
    key: fs.readFileSync('./serve/certs/thesite.key', 'utf8'),
    cert: fs.readFileSync('./serve/certs/thesite.crt', 'utf8'),
    ca: fs.readFileSync('./serve/certs/myCA.pem')
  };


http.createServer(options, function (request, response) {
    console.log('request starting...');
    var filePath;
    var contentType;

    if(request.url === '/ipa'){
        filePath = './serve/ipa/TestApp.ipa';
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
                var contentToWrite;
                if(contentType == 'application/x-plist'){
                    contentToWrite=content.toString().replace("mysite", ipaddress+':'+port+'/ipa');
                } else {
                    contentToWrite = content;
                }
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(contentToWrite);
            }
        }
    ) 

    } else {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end("hello Click the link to download an app<br><a  href='itms-services://?action=download-manifest&url=https://"+ ipaddress +":"+port+"/plist'>Download    </a>");
    }
   
}).listen(port);
