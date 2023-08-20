const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig'); // Your database configuration
const pool = mysql.createPool(dbConfig.db);


const getAllBloodGroups = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const query = `SELECT * FROM bloodgroups`
        const [results] = await connection.query(query);
        connection.release();
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
const createBloodGroup = async (req, res) => {
    try {
        const { blood_group_name } = req.body;
        const connection = await pool.getConnection();
        const query = `
        INSERT INTO bloodgroups(blood_group_name) VALUES(?)`;
        const values = [blood_group_name];
        const [results] = await connection.query(query, values);
        connection.release();
        if (results.serverStatus === 2) {
            res.status(200).json({ message: "Created Successfully", status: '200' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, status: '205' });
    }
};


const deleteBloodGroup = async (req, res) => {
    try {
        const { blood_group_id } = req.body;
        const connection = await pool.getConnection();
        const query = `DELETE FROM bloodgroups WHERE blood_group_id = ?`;
        const [results] = await connection.query(query, [blood_group_id]);
        connection.release();

        if (results.affectedRows === 1) {
            res.status(200).json({ message: "Deleted Successfully", status: '200' });
        } else {
            res.status(404).json({ message: "Blood group not found", status: '404' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, status: '500' });
    }
};


// Other controller functions (createBloodRequest, updateBloodRequest, deleteBloodRequest) would go here

module.exports = {
    getAllBloodGroups,
    createBloodGroup,
    deleteBloodGroup
};
