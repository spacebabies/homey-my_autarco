'use strict';

const Homey = require('homey');

class App extends Homey.App {

  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.log('App has been initialized');
  }

}

module.exports = App;