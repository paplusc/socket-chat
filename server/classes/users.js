class Users {

    constructor() {
        this.people = [];
    }

    addUser(id, name, room) {
        let user = { id, name, room };
        this.people.push(user);

        return this.people;
    }

    getUserById(id) {
        let user = this.people.filter(user => user.id === id)[0];
        return user;
    }

    getUsers() {
        return this.people;
    }

    //TODO
    getUsersByRoom(room) {
        let peopleRoom = this.people.filter(user => user.room === room);
        return peopleRoom;
    }

    deleteUser(id) {
        let userDeleted = this.getUserById(id);
        this.people = this.people.filter(user => user.id != id);
        return userDeleted;
    }
}

module.exports = {
    Users
}