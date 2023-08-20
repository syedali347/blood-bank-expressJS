// models/BloodRequest.js
class BloodRequest {
    constructor(request_id, patient_name, blood_group, contact_number, location_latitude, location_longitude, request_date, status, donor_id) {
        this.request_id = request_id;
        this.patient_name = patient_name;
        this.blood_group = blood_group;
        this.contact_number = contact_number;
        this.location_latitude = location_latitude;
        this.location_longitude = location_longitude;
        this.request_date = request_date;
        this.status = status;
        this.donor_id = donor_id;
    }
}

module.exports = BloodRequest;
