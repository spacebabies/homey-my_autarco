'use strict';

const Homey = require('homey');

class MyAutarco extends Homey.App {

  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.log('MyAutarco has been initialized');
  }

}

module.exports = MyAutarco;