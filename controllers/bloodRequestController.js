
const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig'); // Your database configuration
const pool = mysql.createPool(dbConfig.db);

// Create Blood Request
const createBloodRequest = async (req, res) => {
    try {
        const {
            patient_name,
            blood_group_id,
            contact_number,
            request_location_address,
            request_location_latitude,
            request_location_longitude,
            request_date
        } = req.body;

        const connection = await pool.getConnection();
        const query = `
        INSERT INTO bloodrequests(
            patient_name,
            blood_group_id,
            contact_number,
            request_location_address,
            request_location_latitude,
            request_location_longitude,
            request_date
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            patient_name,
            blood_group_id,
            contact_number,
            request_location_address,
            request_location_latitude,
            request_location_longitude,
            request_date
        ];

        const [results] = await connection.query(query, values);
        connection.release();

        if (results.serverStatus === 2) {
            res.status(200).json({ message: "Blood request created successfully", status: '200' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, status: '205' });
    }
};

// Delete Blood Request
const deleteBloodRequest = async (req, res) => {
    try {
        const { request_id } = req.body;
        const connection = await pool.getConnection();
        const query = `DELETE FROM bloodrequests WHERE request_id = ?`;
        const [results] = await connection.query(query, [request_id]);
        connection.release();

        if (results.affectedRows > 0) {
            res.status(200).json({ message: "Blood request deleted successfully", status: '200' });
        } else {
            res.status(404).json({ message: "Blood request not found", status: '404' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, status: '205' });
    }
};

// Update Blood Request
const updateBloodRequest = async (req, res) => {
    try {
        const {
            request_id,
            patient_name,
            blood_group_id,
            contact_number,
            request_location_address,
            request_location_latitude,
            request_location_longitude,
            request_date,
            is_fulfilled,
            fulfilled_donor_id
        } = req.body;

        const connection = await pool.getConnection();
        const query = `
        UPDATE bloodrequests
        SET patient_name = ?, blood_group_id = ?, contact_number = ?, 
            request_location_address = ?, request_location_latitude = ?, request_location_longitude = ?, 
            request_date = ?, is_fulfilled = ?, fulfilled_donor_id = ?
        WHERE request_id = ?`;

        const values = [
            patient_name,
            blood_group_id,
            contact_number,
            request_location_address,
            request_location_latitude,
            request_location_longitude,
            request_date,
            is_fulfilled,
            fulfilled_donor_id,
            request_id
        ];

        const [results] = await connection.query(query, values);
        connection.release();

        if (results.affectedRows > 0) {
            res.status(200).json({ message: "Blood request updated successfully", status: '200' });
        } else {
            res.status(404).json({ message: "Blood request not found", status: '404' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, status: '205' });
    }
};
// Get All Blood Requests
const getAllBloodRequests = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const query = `
        SELECT * FROM bloodrequests`;

        const [results] = await connection.query(query);
        connection.release();

        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(404).json({ message: "No blood requests found", status: '404' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, status: '205' });
    }
};



module.exports = {
    getAllBloodRequests,
    createBloodRequest,
    updateBloodRequest,
    deleteBloodRequest
};