const bcrypt = require("bcryptjs");

class Encryption {
  constructor(saltRounds = 10) {
    this.saltRounds = saltRounds;
  }

  async encrypt(password) {
    try {
      const hash = await bcrypt.hash(password, this.saltRounds);
      return hash;
    } catch (error) {
      throw new Error("Encryption failed");
    }
  }

  async compare(formPass, userPass) {
    try {
      const match = await bcrypt.compare(formPass, userPass);
      return match;
    } catch (error) {
      throw new Error("Comparison failed");
    }
  }
}

module.exports = new Encryption();
