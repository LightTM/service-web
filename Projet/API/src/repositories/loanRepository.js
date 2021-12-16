const ValidationError = require('./validationError');
const _ = require('lodash');
const { v4: uuid } = require('uuid');


class LoanRepository {
    constructor(db, bookRepository, userRepository) {
        this.db = db;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    getAll() {
        return this.db.getData("/loans");
    }

    add(loan){
        this.checkExistUser(loan)
        this.checkExistCopy(loan); 
        this.checkCopy(loan); 
        loan.id = uuid();
        this.db.push("/loans[]", loan);

        return loan;
    }

    checkExistUser(loan){
        const users = this.userRepository.getAll();
        if (_.some(users, { id: loan.userId }) == false) { 
            throw new ValidationError('The user is unknowed.');
        }
    }

    checkExistCopy(loan){
        const books = this.bookRepository.getAll();
        let exist_copy = false;
        /**foreach book, check if we can find something like { id: loan.copyId } */
        books.forEach(book => {
            if(_.some(book.copies, { id: loan.copyId }) ) 
                exist_copy = true;
        });
        if(exist_copy == false)
            throw new ValidationError('This copy is unknowed.');
    }

    checkCopy(loan){
        const loans = this.getAll();
        console.log(loans)
        console.log(loan.copyId)
        if (_.some(loans, { copyId: loan.copyId })) { 
            throw new ValidationError('This copy is already loaned.');
        }
    }

    getLoansByUserId(id_user){
        const loans = this.getAll();
        console.log(loans)
        console.log(id_user)
        return loans.filter(loan => loan.userId == id_user)
    }


    getLoan(loanId){
        const loans = this.getAll();
        return _.find(loans, {id: loanId})
    }

    update(loanId, loan){
        if (loan.id == undefined) {
            loan.id = loanId
        }

        if (loan.id !== loanId) {
            throw new ValidationError('You cannot change the identifier.');
        }

        checkBook(loan); 
        const path = this.getIdPath(loanId);
        if (path == null) {
            throw new ValidationError('This loan does not exists');
        }

        this.db.push(path, loan);

        return loan;
    }
    delete(id){
        const path = this.getIdPath(id);
        if (path != null) {
            console.log("The loan with id " + id + "has been deleted")
            this.db.delete(path);
        }
    }

    getIdPath(id) {
        const books = this.getAll();
        const index = _.findIndex(books, { id });
        if (index == -1) {
            return null;
        }

        return '/loans[' + index + ']';
    }

}

/** loan structure
 * 
 *      {
 *          id
 *          copyId
 *          userId
 *          loanDate
 *      }
 */

module.exports = LoanRepository;