rem create the root CA Key
openssl genrsa -des3 -out myCA.key  -passout pass:capassword 2048

rem create the root CA
openssl req -x509 -new -nodes -key myCA.key -sha256 -days 1825 -out myCA.pem -passin pass:capassword  -subj "/C=US/ST=Denial/L=Springfield/O=Dis/CN=CA.example.com"

rem create private key for site
openssl genrsa -out thesite.key -passout pass:sitepassword 2048

rem create CSR for site
openssl req -new -key thesite.key -out thesite.csr -passin pass:sitepassword -subj "/C=US/ST=Denial/L=Springfield/O=Dis/CN=site.example.com"

rem create cert for site that serves the ipa
openssl x509 -req -in thesite.csr -CA myCA.pem -CAkey myCA.key -CAcreateserial -out thesite.crt -days 825 -sha256 -extfile thesite.ext -passin pass:capassword 




