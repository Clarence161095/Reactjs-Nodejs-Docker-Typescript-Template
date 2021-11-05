import { ERROR_MESSAGE, login } from "constants/global";

const UserApi = {
  login: ({ username, password }) => {
    // Mock Call API #TODO
    return new Promise((resolve, reject) => {

      setTimeout(() => {
        const user = login(username, password)
        if (user) {
          resolve(user)
        } else {
          reject(new Error(ERROR_MESSAGE.LOGIN_FAILED))
          return;
        }
      }, 500);

    })
  }
}

export default UserApi;