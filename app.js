var http = require("http");
var fs = require("fs");
var date = new Date();
var count = 0;
var countprice =0;

http.createServer(function(request, response){
	var url = request.url;
  countprice =0;
	// url = url.replace(/\/$/, "");

	console.log(url, date);

  fs.appendFile('res.log', url +'---'+ date + '\n', function (err) {
  if (err) throw err;
  console.log('res.log Updated!');
  });



	switch(url) {
  		case '/main':
        count++;
  			loadPage('main');
			break;
			case '/contacts':
        count++;
				loadPage('contacts');
			break;
			case '/about':
        count++;
				loadPage('about');
			break;
			case '/cat.png':{
				response.writeHead(200,{'Content-Type':'image/png'});
				fs.createReadStream("cat.png").pipe(response);
				break;
			}
			case '/style.css':{
				response.writeHead(200,{'Content-Type':'text/css'});
				fs.createReadStream("style.css").pipe(response);
				break;
			}
      case '/price.zip':{
        response.writeHead(200,{'Content-Type':'file/zip'});
        fs.createReadStream("price.zip").pipe(response);
        // console.log(response);
        countprice++;
        break;
      }

  		// 	loadPage('main');
			// break;
  		default:
 				loadPage('404');
 			break;
}
if (countprice==1) {
  fs.writeFile('count.log', 'page requested ' + count + ' times \nfile downloaded ' + countprice +'times', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
  fs.writeFile('countprice.log', 'page requested ' + countprice + ' times, timeprint ' + date +'times', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

} else {

  fs.writeFile('count.log', 'page requested ' + count + ' times', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

function loadPage(filename){
	fs.readFile('templates/header.html', function(error, data){
		var h = data.toString();
		fs.readFile(filename+'.html', function(error, data){
			h = h+data.toString() + '<p> количество загрузок: ' + count +'</p>' + '<p> кол-во загрузок файла :' + countprice +'</p>';
			fs.readFile('templates/footer.html', function(error, data){
				h = h + data.toString();
				response.end(h);
				return;
			});
		});
	});
	// 	if(error){
	// 		response.statusCode = 404;
	// 		response.end("Ресурс не найден!");
	// 	}
	// 	else{
	// 		response.end(data);
	// 	}
	// 	return;
	// });
}

}).listen(3000);
