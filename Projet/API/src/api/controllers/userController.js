class userController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }


    getAll(req, res) {
        const users = this.userRepository.getAll();
        res.json(users);
    }

}

module.exports = userController;