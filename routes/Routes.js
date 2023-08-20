// routes/users.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/usersController'); // Adjust the path accordingly
const BloodRequestController = require('../controllers/bloodRequestController'); // Adjust the path accordingly
const BloodGroupsController = require('../controllers/BloodGroupController'); // Adjust the path accordingly
const DonorController = require('../controllers/donorController'); // Adjust the path accordingly


// Define routes related to users
router.post('/registerOrUpdateDonor', DonorController.registerOrUpdateDonor);
router.post('/updateDonorDonationStatus', DonorController.updateDonorDonationStatus);
router.post('/updateDonorLocation', DonorController.updateDonorLocation);
router.get('/getAllUsersDetails', UserController.getAllUsersDetails);
router.post('/getUser', UserController.getUser);
router.get('/getAllBloodGroups', BloodGroupsController.getAllBloodGroups);
router.post('/createBloodGroup', BloodGroupsController.createBloodGroup);
router.post('/deleteBloodGroup', BloodGroupsController.deleteBloodGroup);
router.post('/createBloodRequest', BloodRequestController.createBloodRequest);
router.get('/getAllBloodRequests', BloodRequestController.getAllBloodRequests);
router.post('/updateBloodRequest', BloodRequestController.updateBloodRequest);
router.post('/deleteBloodRequest', BloodRequestController.deleteBloodRequest);

// router.put('/:id', UserController.updateUser);
// router.delete('/:id', UserController.deleteUser);
// Define routes related to bloodbanks
// router.get('/', BloodBanksController.getUserById);
// router.get('/:id', BloodBanksController.getUserById);
// router.post('/', BloodBanksController.createUser);
// router.put('/:id', BloodBanksController.updateUser);
// router.delete('/:id', BloodBanksController.deleteUser);
// Define routes related to BlodRequest
// router.get('/', BloodRequestController.getAllUsers);
// router.get('/:id', BloodRequestController.getUserById);
// router.post('/', BloodRequestController.createUser);
// router.put('/:id', BloodRequestController.updateUser);
// router.delete('/:id', BloodRequestController.deleteUser);
// Define routes related to users
// router.get('/', DonorController.getAllUsers);
// router.get('/:id', DonorController.getUserById);
// router.post('/', DonorController.createUser);
// router.put('/:id', DonorController.updateUser);
// router.delete('/:id', DonorController.deleteUser);

module.exports = router;
