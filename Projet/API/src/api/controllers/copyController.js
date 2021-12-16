class copyController {
    constructor(copyRepository) {
        this.copyRepository = copyRepository;
    }


    getAll(req, res) {
        const users = this.copyRepository.getAll(req.bookId);
        res.json(users);
    }

}

module.exports = copyController;