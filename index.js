const http = require("http");
const fs = require("fs");
const path = require("path");

// const pageMap = {
// 	"/": path.join(__dirname, "public", "home", "home.html"),
// 	"/about": path.join(__dirname, "public", "about", "about.html"),
// 	"/contact-me": path.join(
// 		__dirname,
// 		"public",
// 		"contact-me",
// 		"contact-me.html"
// 	),
// };

// const server = http.createServer((req, res) => {
// 	console.log(req.url);
// 	if (pageMap[req.url]) {
// 		fs.readFile(pageMap[req.url], "utf8", (err, data) => {
// 			if (err) throw err;
// 			res.writeHead(200, { "Content-Type": "text/html" });
// 			res.end(data);
// 		});
// 	} else {
// 		fs.readFile(
// 			path.join(__dirname, "public", "404", "404.html"),
// 			"utf8",
// 			(err, data) => {
// 				if (err) throw err;
// 				res.writeHead(404, { "content-Type": "text/html" });
// 				res.end(data);
// 			}
// 		);
// 	}
// });

const server = http.createServer((req, res) => {
	const pageFolderName = req.url === "/" ? "home" : req.url.split(".")[0];
	const filePath = path.join(
		__dirname,
		"public",
		pageFolderName,
		req.url == "/" ? "home.html" : req.url
	);
	const extensionName = path.extname(filePath);
	let contentType = "text/html";
	console.log({ filePath, extensionName, pageFolderName });

	switch (extensionName) {
		case ".js":
			contentType = "text/js";
			break;
		case ".html":
			contentType = "text/html";
			break;
		case ".css":
			contentType = "text/css";
			break;
		case ".json":
			contentType = "application/json";
			break;
	}

	fs.readFile(filePath, (err, content) => {
		if (err) {
			if ((err.code = "ENOENT")) {
				fs.readFile(
					path.join(__dirname, "public", "404", "404.html"),
					(err, content) => {
						if (err) throw err;
						res.writeHead(404, { "Content-Type": contentType });
						res.end(content, "utf8");
					}
				);
			} else {
				res.writeHead(500);
				res.end(`Server error: ${err}`);
			}
		} else {
			res.writeHead(202, { "Content-Type": contentType });
			res.end(content);
		}
	});
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
