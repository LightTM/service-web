/** TODO */
class copyController {
    constructor(copyRepository) {
        this.copyRepository = copyRepository;
    }


    getAll(req, res) {
        const copies = this.copyRepository.getAll(req.params.bookId);
        res.json(copies);
    }

}

module.exports = copyController;