// controllers/userController.js
const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig'); // Your database configuration
const pool = mysql.createPool(dbConfig.db);


const getAllUsersDetails = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const query = `SELECT * FROM users u
        JOIN donors d ON u.id = d.user_id`
        const [results] = await connection.query(query);
        connection.release();
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getUser = async (req, res) => {
    const connection = await pool.getConnection();

    try {
        const { username, email, password, role } = req.body;
        let query;
        if (role) {
            query =
                'SELECT * FROM users u INNER JOIN adminusers d ON d.user_id = u.id WHERE (username = ? OR email = ?) AND password = ?';
        }
        else {
            query =
                'SELECT * FROM users u INNER JOIN donors d ON d.user_id = u.id WHERE (username = ? OR email = ?) AND password = ?';
        }

        // const query = `SELECT * FROM users u inner join donors d on d.user_id = u.id WHERE (username = ? OR email = ?) AND password = ?'
        let userValues;
        if (email) {
            userValues = [null, email, password];
        }
        else if (username) {
            userValues = [username, null, password];
        }

        const [results] = await connection.query(query, userValues)

        if (results.length > 0) {
            // res.json(results);
            res.status(200).json({ message: 'User found', status: 200, Data: results })
            console.log('User found:', res);
            // Do something with the user information
        } else {
            res.status(200).json({ message: 'User not found', status: '200' });
            console.log('User not found');
            // Handle case where user is not found
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle database error
    } finally {
        // Close the database connection
        connection.release();
    }
}











// Other controller functions (createUser, updateUser, deleteUser) would go here

module.exports = {
    getUser,
    getAllUsersDetails
    // Export other controller functions as well
};