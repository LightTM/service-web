module.exports = function(app, userController) {
    app.route('/users')
        .get(userController.getAll.bind(userController))
        .post(() => { throw new Error('Veuillez implémenter cette fonctionnalité !!!!'); });
    
}