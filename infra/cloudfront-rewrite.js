function handler(event) {
    var request = event.request;
    var uri = request.uri;
    // Subfolder index: "/contact/" -> "/contact/index.html"
    if (uri.endsWith('/')) {
        request.uri += 'index.html';
    // Extensionless path: "/contact" -> "/contact/index.html".
    // Paths with a file extension (".js", ".xml", ".html") are left untouched.
    } else if (!uri.includes('.')) {
        request.uri += '/index.html';
    }
    return request;
}
