var handlers = require('./handlers.js');

function router(request, response) {
    var url = request.url;
    if (url === "/") {
        handlers.homeHandler(request, response);
    } else if (url === "/create/post") {
        handlers.createPostHandler(request, response);
    } else if (url === "/posts") {
        handlers.getPostsHandler(request, response);
    } else {
        handlers.staticFileHandler(request, response);
    }
}

module.exports = router;