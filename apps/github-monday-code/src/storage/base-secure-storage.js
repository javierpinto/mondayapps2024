import { SecureStorage } from '@mondaycom/apps-sdk';

/**
 * This is the way to store sensitive customer data (i.e access tokens generated by OAuth for example)
 * Has 3 different modes (dependent on where it is used)
 * Secure storage - when used in a deployed <monday-code/> project it will automatically utilize the real secure storage
 * Local "secure storage" - a local mock db which will mimic the api exposed by the real secure storage. Will work in this mode when sdk is used locally.
 * If there are no permissions to write files on the disk, Local "secure storage" will not be persisted
 */
class BaseSecureStorage {
  constructor() {
    this.storage = new SecureStorage();
    this.prefix = '';
  }

  _getFinalKey(key) {
    return `${this.prefix}${key}`;
  }

  /**
   * Sets a value in the storage.
   * @param {string} key - The key for the value.
   * @param {*} value - The value to be stored (must be serializable).
   * @returns {Promise} A Promise representing the completion of the set operation.
   */
  async set(key, value) {
    return await this.storage.set(this._getFinalKey(key), value);
  }
  /**
   * Retrieves a value from the storage.
   * @param {string} key - The key for the value.
   * @returns {Promise} A Promise representing the retrieved value.
   */
  async get(key) {
    return await this.storage.get(this._getFinalKey(key));
  }

  /**
   * Deletes a value from the storage.
   * @param {string} key - The key for the value to delete.
   * @returns {Promise} A Promise representing the completion of the delete operation.
   */
  async delete(key) {
    return await this.storage.delete(this._getFinalKey(key));
  }
}
export default BaseSecureStorage;
