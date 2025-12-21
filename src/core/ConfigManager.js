export default {
  store (config) {
    window.localStorage.setItem('config',config);
  },
  getAll() {
    return window.localStorage.getItem('config');
  },
  get(configName){
    return this.getAll[configName];
  },
  removeAll(){
    window.localStorage.removeItem('config');
  }
}
