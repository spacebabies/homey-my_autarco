'use strict';

const Homey = require("homey");

class Driver extends Homey.Driver {

  /**
   * onInit is called when the driver is initialized.
   */
  async onInit() {
    this.log('MyAutarco has been initialized');
  }

  async onPair(session) {
    let username, password;

    // Runs after login_credentials is submitted.
    session.setHandler("login", async (data) => {
      username = data.username;
      password = data.password;

      return true;
    });

    session.setHandler("list_devices", async () => {
      return {
        name: "My inverter",
        data: {
          id: "kthxbai"
        },
        settings: {
          username,
          password
        },
        store: {
          site: 'kthxbai'
        }
      };
    });
  }

}

module.exports = MyAutarco;
