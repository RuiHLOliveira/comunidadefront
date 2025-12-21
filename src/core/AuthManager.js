export default {
  debug: false,
  storeToken (token) {
    window.localStorage.setItem('token',token);
  },
  storeRefreshToken (refreshToken) {
    window.localStorage.setItem('refreshToken',refreshToken);
  },
  getRefreshToken() {
    return window.localStorage.getItem('refreshToken');
  },
  getToken(){
    return window.localStorage.getItem('token');
  },
  getHeader(){
    if(!this.isLoggedIn()){
      throw 'User not Logged In'
    }
    let token = this.getToken()
    return new Headers({'Authorization': token});
  },
  isLoggedIn(){
    if(this.debug) console.log('loggedin', this.getToken() != null)
    if(this.debug) console.log(this.getToken());
    return this.getToken() != null;
  },
  logout(){
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('refreshToken');
  }
}
