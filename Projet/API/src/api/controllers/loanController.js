/** TODO */
class LoanController {
    constructor(loanRepository) {
        this.loanRepository = loanRepository;
    }


    getAll(req, res) {
        const copies = this.loanRepository.getAll();
        res.json(copies);
    }

    create(req, res) {
        const loan = this.loanRepository.add(req.body);
        res.location('/loans/' + loan.id);
        res.status(201).send(loan);
    }

    getLoans(req, res){
        const loans = this.loanRepository.getLoansByUserId(req.params.userId)
        res.json(loans);
    }

}

module.exports = LoanController;