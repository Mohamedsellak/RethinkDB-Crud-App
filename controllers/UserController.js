const r = require('rethinkdb');
const dbConnection = require('../db');


class User {
    constructor() {}

    async getAllUsers(req, res) {
        try {
            const conn = await dbConnection();
            const result = await r.table('users').run(conn).then((cursor)=> cursor.toArray());
            res.render('index', { data: result ,pageTitle:'List Of Users'});
            // console.log(result)
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getUserById(req, res) {
        const userId = req.params.id;

        try {
            const conn = await dbConnection();
            const result = await r.table('users').get(userId).run(conn);

            if (result) {
                res.render('update', { user: result ,pageTitle:'Update User'});
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async createUsers(req, res) {
        const newUser = req.body;

        try {
            const conn = await dbConnection();
            const result = await r.table('users').insert(newUser).run(conn);
            res.redirect('/'); // Redirect to the user listing page
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updateUser(req, res) {
        const userId = req.params.id;
        const updatedUserData = req.body;

        try {
            const conn = await dbConnection();
            const result = await r.table('users').get(userId).update(updatedUserData).run(conn);
            res.redirect('/'); // Redirect to the user listing page
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deleteUser(req, res) {
        const userId = req.params.id;

        try {
            const conn = await dbConnection();
            const result = await r.table('users').get(userId).delete().run(conn);
            res.redirect('/'); // Redirect to the user listing page
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = User;
