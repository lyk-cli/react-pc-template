/**
 *  Storage
 */

function Storage(storage = sessionStorage) {
  /**
   * get
   */
  this.get = key => {
    const item = storage.getItem(key);
    try {
      return JSON.parse(item);
    } catch (error) {
      return item;
    }
  };

  /**
   * set
   */
  this.set = (key, value) => storage.setItem(key, JSON.stringify(value));

  /**
   * remove
   */
  this.remove = key => storage.removeItem(key);

  /**
   * clear
   */
  this.clear = () => storage.clear();
}

export const Session = new Storage();
export const Application = new Storage(localStorage);

export default { Session, Application };
