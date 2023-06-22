'use strict';

const { Driver } = require('homey');

class MyAutarco extends Driver {

  /**
   * onInit is called when the driver is initialized.
   */
  async onInit() {
    this.log('MyAutarco has been initialized');
  }

  /**
   * onPairListDevices is called when a user is adding a device
   * and the 'list_devices' view is called.
   * This should return an array with the data of devices that are available for pairing.
   */
  async onPairListDevices() {
    return [
      {
        name: 'My inverter',
        data: {
          id: 'my-inverter',
        },
        store: {
          address: '127.0.0.1',
        },
        settings: {
          site: "kthxbai"
        }
      },
    ];
  }

}

module.exports = MyAutarco;
