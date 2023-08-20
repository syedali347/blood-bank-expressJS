class User {
    constructor(user_id, name, email, roleId, phone, blood_group, registration_date, password, bb_name, username, bb_contactno, longitude, latitude) {
        this.user_id = user_id;
        this.name = name;
        this.email = email;
        this.roleId = roleId;
        this.phone = phone;
        this.blood_group = blood_group;
        this.registration_date = registration_date;
        this.password = password;
        this.bb_name = bb_name;
        this.username = username;
        this.bb_contactno = bb_contactno;
        this.longitude = longitude;
        this.latitude = latitude;
    }
}

module.exports = User;
