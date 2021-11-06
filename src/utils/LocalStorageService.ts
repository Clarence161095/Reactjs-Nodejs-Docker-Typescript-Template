const LocalStorageService = (
  function () {
    return {
      getUser() {
        if (localStorage.getItem('user')) {
          return JSON.parse(localStorage.getItem('user') || '{}');
        }
        return null;
      },
      getToken() {
        if (localStorage.getItem('token')) {
          return JSON.parse(localStorage.getItem('token') || '{}');
        }
        return '';
      },
      removeUser() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      },
      setToken(token: any) {
        localStorage.setItem('token', JSON.stringify(token));
      },
      setUser(user: any) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    }
  })();

export default LocalStorageService;