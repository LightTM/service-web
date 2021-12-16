/** un utilisateur a un nom et un age */
const { v4: uuid } = require('uuid');
const _ = require('lodash');
const ValidationError = require('./validationError');


class userRepository {
    constructor(db) {
        this.db = db;
    }
    getAll() {
        return this.db.getData("/users");
    }

    add(user) {
        user.id = uuid();
        this.db.push("/users[]", user);
        return user;
    }

    get(id) {
        const users = this.getAll();
        return _.find(users, { id });
    }

    update(id, user) {
        if (user.id == undefined) {
            user.id = id
        }

        if (user.id !== id) {
            throw new ValidationError('You cannot change the identifier.');
        }

        const path = this.getIdPath(id);
        if (path == null) {
            throw new ValidationError('This user does not exists');
        }

        this.db.push(path, user);
        console.log(path)

        return user;
    }

    
    getIdPath(id) {
        const users = this.getAll();
        const index = _.findIndex(users, { id });
        if (index == -1) {
            return null;
        }

        return '/users[' + index + ']';
    }


    delete(id) {
        const path = this.getIdPath(id);
        if (path != null) {
            console.log("The user with id " + id + "has been deleted")
            this.db.delete(path);
        }
        
    }
}

module.exports = userRepository;