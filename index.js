var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
// Creamos el servidor HTTP
const server = http.createServer();
// Cuando se produzca una petición, ejecutamos la siguiente función
server.on('request', function (peticion, respuesta) {
    // Obtenemos la extensión
    var base = url.parse(peticion.url, true);
    var ext = path.extname(base.pathname);
    var folder;
    // Comprobamos el pathname
    var baseUrl;
    if (base.pathname == '/dni') {
        baseUrl = '/instrucciones.html';
        ext = '.html';
        //Si escribimos un numero de DNI
        if (base.query.num >= 0 && base.query.num <= 99999999) {
            //Se calcula la letra que corresponde al DNI
            var num = base.query.num;
            var resto = base.query.num % 23;
            var resultado;
            switch (resto) {
                case 0:
                    resultado = num + 'T';
                    break;
                case 1:
                    resultado = num + 'R';
                    break;
                case 2:
                    resultado = num + 'W';
                    break;
                case 3:
                    resultado = num + 'A';
                    break;
                case 4:
                    resultado = num + 'G';
                    break;
                case 5:
                    resultado = num + 'M';
                    break;
                case 6:
                    resultado = num + 'Y';
                    break;
                case 7:
                    resultado = num + 'F';
                    break;
                case 8:
                    resultado = num + 'P';
                    break;
                case 9:
                    resultado = num + 'D';
                    break;
                case 10:
                    resultado = num + 'X';
                    break;
                case 11:
                    resultado = num + 'B';
                    break;
                case 12:
                    resultado = num + 'N';
                    break;
                case 13:
                    resultado = num + 'J';
                    break;
                case 14:
                    resultado = num + 'Z';
                    break;
                case 15:
                    resultado = num + 'S';
                    break;
                case 16:
                    resultado = num + 'Q';
                    break;
                case 17:
                    resultado = num + 'V';
                    break;
                case 18:
                    resultado = num + 'H';
                    break;
                case 19:
                    resultado = num + 'L';
                    break;
                case 20:
                    resultado = num + 'C';
                    break;
                case 21:
                    resultado = num + 'K';
                    break;
                case 22:
                    resultado = num + 'E';
                    break;

                default:
                    break;
            }
            respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            respuesta.write("Su DNI completo es: " + resultado);
            respuesta.end;
        }

    } else if (base.pathname == '/escribir') {
        baseUrl = '/escribir.html';
        ext = '.html';
        //Creamos el directorio
        fs.mkdir('./Copia/', { recursive: true }, (err) => {
            if (err) throw err;
          });
        // Crear el fichero y añadir contenido
        fs.writeFile('./Copia/holaMundo.txt', 'José Ángel García Pérez', function (err) {
            if (err) {
                throw err;
            }
            console.log('Fichero creado con éxito');
            respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            respuesta.write("Se creó el fichero en la carpeta correspondiente");
            respuesta.end;
        });

    } else if (base.pathname == '/') {
        baseUrl = '/inicio.html';
        ext = '.html';
    } else {
        baseUrl = '/aviso.html';
        ext = '.html';
    }
    // Según la extensión, escribimos la cabecera e indicamos en qué carpeta debe buscar el archivo
    switch (ext) {
        case ".html":
            respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            folder = 'html';
            break;
        case ".css":
            respuesta.writeHead(200, { 'Content-Type': 'text/css;charset=utf-8' });
            folder = 'css';
            break;
        case ".js":
            respuesta.writeHead(200, { 'Content-Type': 'application/javascript;charset=utf-8' });
            folder = 'js';
            break;
    }
    // Si el tipo de archivo es conocido, tendremos una carpeta definida
    if (folder !== undefined) {
        // Abrimos el archivo indicado y lo escribimos en la respuesta
        fs.readFile(folder + baseUrl, function (err, dato) {
            if (err) {
                throw err;
            }
            respuesta.write(dato);
            respuesta.end();
        });
    }
});
// Iniciamos el servidor
server.listen(8083, "127.0.0.3");
console.log("Corriendo");