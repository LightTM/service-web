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

    getLoansByUserId(req, res){
        const loans = this.loanRepository.getLoansByUserId(req.params.userId)
        res.json(loans);
    }


    /** by loan_Id */

    getLoan(req, res){
        const loan = this.loanRepository.getLoan(req.params.loanId)
        res.json(loan);
    }

    update(req, res){
        const loan = this.loanRepository.update(req.params.loanId, req.body)
        res.status(200).send(loan);
    }

    delete(req, res){
         this.loanRepository.delete(req.params.loanId);
        res.status(204).send(null);
    }


}

module.exports = LoanController;