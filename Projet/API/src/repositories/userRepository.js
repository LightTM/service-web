/** TODO */
/** un utilisateur a un nom et un age */
class userRepository {
    constructor(db) {
        this.db = db;
    }
    getAll() {
        return this.db.getData("/users");
    }
}

module.exports = userRepository;