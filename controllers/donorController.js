// controllers/donorDonationController.js

const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig'); // Your database configuration
const pool = mysql.createPool(dbConfig.db);


// Other controller functions (createDonorDonation, updateDonorDonation, deleteDonorDonation) would go here



const registerDonor = async (req, res) => {
    try {

        console.log('register')
        const { username, email, phone_number, Blood_Group, DOB, password, First_name, Last_name } = req.body;

        const connection = await pool.getConnection();

        // Create a new user entry in the users table with role_id = 3 (assuming role_id 3 is for donors)
        const userQuery = `
        INSERT INTO users(username, email, phone_number, password, roleId)
        VALUES(?, ?, ?, ?, ?)
            `;
        const userValues = [username, email, phone_number, password, 3];
        const [userResult] = await connection.execute(userQuery, userValues);

        const user_id = userResult.insertId; // Get the generated user_id

        // Create a new donor entry in the Donors table
        const donorQuery = `
        INSERT INTO Donors(First_name, Last_name, Blood_Group, DOB, user_id)
        VALUES(?, ?, ?, ?, ?)
            `;
        const donorValues = [First_name, Last_name, Blood_Group, DOB, user_id];
        await connection.execute(donorQuery, donorValues);

        connection.release();
        res.status(200).json({ message: 'Donor registered successfully', user_id });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
};


const updateDonorDonationStatus = async (req, res) => {
    try {
        console.log('updateDonorDonationStatus');
        const { user_id, is_available_for_donation } = req.body;
        const connection = await pool.getConnection();
        if (user_id) {
            const updateQuery = 'UPDATE Donors SET is_available_for_donation = ? WHERE user_id = ?';
            const updateUserValues = [is_available_for_donation, user_id];  // Corrected order of values
            await connection.execute(updateQuery, updateUserValues);
            connection.release();
            res.status(200).json({ message: 'Donor Status updated successfully', user_id });
        } else {
            res.status(200).json({ message: 'Invalid user_id', user_id });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
}

const updateDonorLocation = async (req, res) => {
    try {
        console.log('updateDonorLocation');
        const user_id = req.body.user_id;
        const newLatitude = req.body.latitude;
        const newLongitude = req.body.longitude;
        const connection = await pool.getConnection();
        if (user_id) {
            const updateQuery = 'UPDATE Donors SET current_location_latitude = ?, current_location_longitude = ? WHERE user_id = ?';;
            const updateUserValues = [newLatitude, newLongitude, user_id];  // Corrected order of values
            await connection.execute(updateQuery, updateUserValues);
            connection.release();
            res.status(200).json({ message: 'Donor Location updated successfully', user_id });
        } else {
            res.status(200).json({ message: 'Invalid user_id', user_id });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
}

const registerOrUpdateDonor = async (req, res) => {
    try {
        console.log('registerOrUpdate');

        const { user_id, username, email, phone_number, Blood_Group_Id, DOB, password, First_name, Last_name, health_record, current_location_longitude, current_location_latitude, is_available_for_donation } = req.body;

        const connection = await pool.getConnection();

        if (user_id) {
            // Update existing user's information
            const updateUserQuery = `
                UPDATE users
                SET username = ?, email = ?, phone_number = ?, password = ?
            WHERE id = ?
                `;
            const updateUserValues = [username, email, phone_number, password, user_id];
            await connection.execute(updateUserQuery, updateUserValues);

            // Update donor information
            const updateDonorQuery = `
                UPDATE Donors
                SET First_name = ?, Last_name = ?, Blood_Group_Id = ?, DOB = ?, current_location_longitude = ?, current_location_latitude = ? , is_available_for_donation = ?,
            health_record = ? WHERE user_id = ?`;
            const updateDonorValues = [First_name, Last_name, Blood_Group_Id, DOB, current_location_longitude, current_location_latitude, is_available_for_donation,health_record,user_id];
            await connection.execute(updateDonorQuery, updateDonorValues);

            connection.release();
            res.status(200).json({ message: 'Donor information updated successfully', user_id });
        } else {
            // Create a new user entry in the users table with role_id = 3 (assuming role_id 3 is for donors)
            const userQuery = `
                INSERT INTO users(username, email, phone_number, password, roleId)
        VALUES(?, ?, ?, ?, ?)
            `;
            const userValues = [username, email, phone_number, password, 3];
            const [userResult] = await connection.execute(userQuery, userValues);

            const new_user_id = userResult.insertId; // Get the generated user_id

            // Create a new donor entry in the Donors table
            const donorQuery = `
                INSERT INTO Donors(First_name, Last_name, Blood_Group_Id, DOB, user_id, current_location_longitude, current_location_latitude, is_available_for_donation, health_record)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            console.log("hello world ");
            const donorValues = [First_name, Last_name, Blood_Group_Id, DOB, new_user_id, current_location_longitude, current_location_latitude, is_available_for_donation, health_record];
            await connection.execute(donorQuery, donorValues);

            connection.release();
            res.status(200).json({ message: 'Donor registered successfully', user_id: new_user_id });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
};

module.exports = {
    registerDonor,
    registerOrUpdateDonor,
    updateDonorDonationStatus,
    updateDonorLocation,
    // Export other controller functions as well
};
