export default class User {
  constructor(data) {
    const { name, email, password } = data;

    if ( [typeof name, typeof email, typeof password].includes("undefined") )
      throw new Error("Invalid user properties");

    if ( [name.length > 5, User.validateEmail(email), User.validatePassword(password)].includes(false) )
      throw new Error("Incomplete user properties");

    for (const key in data)
      this[key] = data[key];
  }

  static validatePassword(password) {
    return true;
  }

  static validateEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }
}
