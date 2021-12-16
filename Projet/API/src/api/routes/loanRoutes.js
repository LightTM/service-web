module.exports = function(app, loanController) {
    app.route('/loans')
        .get(loanController.getAll.bind(loanController))
        .post(loanController.create.bind(loanController));

    app.route('/users/:userId/loans')
        .get(loanController.getLoans.bind(loanController));
    
    // app.route('/books/:bookId')
    //     .get(loanController.get.bind(loanController))
    //     .put(loanController.update.bind(loanController))
    //     .delete(loanController.delete.bind(loanController));


    // app.route('/books/name/:name')
    //     .get(loanController.getByName.bind(loanController))

    // app.route('/books/author/:author')
    //     .get(loanController.getByAuthor.bind(loanController))
}