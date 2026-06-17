const bcrypt = require('bcryptjs');
const isValid = bcrypt.compareSync('admin', '$2a$10$tZ2E7o95J.U4S/k10wF/BupYFDEr.lS1p4/7P0oE0Wl1b7eGZ/5t2');
console.log('Is valid:', isValid);
