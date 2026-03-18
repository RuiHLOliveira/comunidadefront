export default {
  debug: false,
  debugNonAdmin: false,
  storeAuthData(data){
    this.storeToken(data.token)
    this.storeRefreshToken(data.refreshToken)
    this.storeUserData(data.userData)
  },
  storeToken (token) {
    window.localStorage.setItem('token',token);
  },
  storeRefreshToken (refreshToken) {
    window.localStorage.setItem('refreshToken',refreshToken);
  },
  storeUserData (userData) {
    window.localStorage.setItem('userData.role',userData.role);
  },
  getRefreshToken() {
    return window.localStorage.getItem('refreshToken');
  },
  getToken(){
    return window.localStorage.getItem('token');
  },
  getRole(){
    return window.localStorage.getItem('userData.role');
  },
  isAdmin(){
    if(this.debugNonAdmin) return this.getRole() != 'admin';
    return this.getRole() == 'admin';
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
