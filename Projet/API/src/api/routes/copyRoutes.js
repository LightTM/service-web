module.exports = function(app, copyController) {
    app.route('/books/:bookId/copies')
        .get(copyController.getAll.bind(copyController));
}