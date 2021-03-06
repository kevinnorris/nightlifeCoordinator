import store from '../store';

const userStorageString = 'nightlifeCoordinator-fjtif-user';
const tokenStorageString = 'nightlifeCoordinator-fjtif-token';

export const saveUser = (user) => {
  localStorage.setItem(userStorageString, user);
};

export const saveToken = (token) => {
  localStorage.setItem(tokenStorageString, token);
};

export const updateUser = () => {
  const storedUser = localStorage.getItem(userStorageString);
  // parse user from stored string
  if (storedUser) {
    const user = JSON.parse(storedUser);
    if (user) {
      localStorage.setItem(userStorageString, JSON.stringify({
        ...user,
        nbrClicks: {clicks: store.getState().clicks.clicks},
      }));
    }
  }
};

export const getUser = () => {
  const storedUser = localStorage.getItem(userStorageString);
  if (storedUser) {
    return storedUser;
  }
  return '';
};

export const getClicks = () => {
  const storedUser = localStorage.getItem(userStorageString);
  if (storedUser) {
    return JSON.parse(storedUser).nbrClicks.clicks;
  }
  return 0;
};

export const getToken = () => (
  localStorage.getItem(tokenStorageString)
);

export const deleteInfo = () => {
  localStorage.removeItem(userStorageString);
  localStorage.removeItem(tokenStorageString);
};
