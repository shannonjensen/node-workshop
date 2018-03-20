var fs = require('fs');
var queryString = require('querystring');
var oldPosts = require('./posts.json');

function homeHandler(request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    fs.readFile(__dirname+"/../public/index.html", function(error, file) {
        if (error) {
            console.log(error);
            return;
        }
        response.end(file);
    });
};

function createPostHandler(request, response) {
    var blogPost = '';
    request.on('data', function(dataChunk) {
        blogPost += dataChunk;
    });
    request.on('end', function() {
        var parsedPost = queryString.parse(blogPost);
        var timePosted = Date.now();
        var blogEntries = oldPosts;
        blogEntries[timePosted] = parsedPost.post;
        fs.writeFile('./src/posts.json', JSON.stringify(blogEntries), function (error) {
            if (error) {
                return console.log(error);
            }
        });
        response.writeHead(307, {
            'Location': '/'
        });
        response.end();
    });
};

function getPostsHandler(request, response) {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(oldPosts));
};

function staticFileHandler(request, response) {
    var extensionType = {
        html: 'text/html',
        css: 'text/css',
        js: 'application/javascript',
        ico: 'image/x-icon',
        jpg: 'image/jpg',
        png: 'image/png'
    };
    var extension = request.url.split('.')[1];
    fs.readFile(__dirname+"/../public" + request.url, function(error, file) {
        if (error) {
            console.log(error);
            return;
        }
        response.writeHead(200, {
            'Content-Type': extensionType[extension]
        });
        response.end(file);
    });
};

module.exports = { homeHandler, createPostHandler, getPostsHandler, staticFileHandler };