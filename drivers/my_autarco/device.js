'use strict';

const { Device } = require('homey');
const fetch = require('node-fetch');

class MyDevice extends Device {

  /**
   * onInit is called when the device is initialized.
   */
  async onInit() {
    this.settings = this.getSettings();

    await this.getPower();

    this.intervalID = setInterval(async () => {
      await this.getPower();
    }, 60 * 1000);

    this.log('MyDevice has been initialized');
  }

  /**
   * onAdded is called when the user adds the device, called just after pairing.
   */
  async onAdded() {
    this.log('MyDevice has been added');
  }

  async getPower() {
    const api_power = `https://my.autarco.com/api/m1/site/${this.settings.site}/power`;
    const basic = Buffer.from(`${this.settings.username}:${this.settings.password}`)
      .toString('base64');
    const headers = {
      'Authorization': `Basic ${basic}`
    };

    const response = await fetch(api_power, { headers: headers });
    const data = await response.json();
    this.setCapabilityValue('measure_power', data.stats.kpis.pv_now).catch(this.error);
  }

  /**
   * onSettings is called when the user updates the device's settings.
   * @param {object} event the onSettings event data
   * @param {object} event.oldSettings The old settings object
   * @param {object} event.newSettings The new settings object
   * @param {string[]} event.changedKeys An array of keys changed since the previous version
   * @returns {Promise<string|void>} return a custom message that will be displayed
   */
  async onSettings({ oldSettings, newSettings, changedKeys }) {
    this.settings = newSettings;
    this.log('MyDevice settings where changed');
  }

  /**
   * onRenamed is called when the user updates the device's name.
   * This method can be used this to synchronise the name to the device.
   * @param {string} name The new name
   */
  async onRenamed(name) {
    this.log('MyDevice was renamed');
  }

  /**
   * onDeleted is called when the user deleted the device.
   */
  async onDeleted() {
    this.log('MyDevice has been deleted');
  }

}

module.exports = MyDevice;
