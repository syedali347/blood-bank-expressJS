// models/BloodBank.js
class BloodBank {
    constructor(id, name, location, contact_number, created_at, updated_at) {
      this.id = id;
      this.name = name;
      this.location = location;
      this.contact_number = contact_number;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
  }
  
  module.exports = BloodBank;