// #TODO
export const ERROR_MESSAGE = {
  LOGIN_FAILED: 'Please check your account or password!',
  CHECK_TOKEN: 'You are currently not logged in, please check again!'
}

export const USER = [
  {
    username: 'admin@admin.com',
    password: '123',
    name: 'John Wick',
    avatarUrl: 'https://media-cdn.laodong.vn/Storage/NewsPortal/2021/3/26/892912/John-Wick-Phan-4.jpg',
  },
];

export const login = (username, password) => {
  const index = USER.findIndex(
    (user) => user.username === username && user.password === password,
  );
  if (index >= 0) {
    return { ...USER[index], password: '*****', token: '123' };
  }
  return null;
};

export const checkToken = (token) => {
  if (token === '123') {
    return true;
  }
  return false;
};
