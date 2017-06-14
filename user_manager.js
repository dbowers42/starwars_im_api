import User from './user'

export default class UserManager {
  constructor() {
    this.users = [
      new User('BB-8', 'bb-8.png', false),
      new User('Boba Fett', 'boba-fett.png',  false),
      new User('C-3PO', 'c-3po.png', false),
      new User('Chewbacca', 'chewbacca.png', false),
      new User('Darth Vader', 'darth-vader.png', false),
      new User('Darth Maul', 'darth-maul.png', false),
      new User('Princess Amidala', 'princess-amidala.png', false),
      new User('R2 D2', 'r2-d2.png', false),
      new User('Royal Guard', 'royal-guard.png', false),
      new User('Yoda', 'yoda.png', false),
      new User('Stormtrooper', 'stormtrooper.png',false),
      new User('The Emperor', 'the-emperor.png', false)
    ]
  }

  login(screenName) {
    this.users.filter((user) => user.screenName === screenName)[0].online = true
  }

  logout(screenName) {
    this.users.filter((user) => user.screenName === screenName)[0].online = false
  }

  getAllUsers() {
    return this.users
  }

  getAvailableUsers() {
    return this.users.filter((user) => user.online === false)
  }
}
