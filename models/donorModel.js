// models/DonorDonation.js
class DonorDonation {
    constructor(donation_id, donor_id, request_id) {
      this.donation_id = donation_id;
      this.donor_id = donor_id;
      this.request_id = request_id;
    }
  }
  
  module.exports = DonorDonation;
  