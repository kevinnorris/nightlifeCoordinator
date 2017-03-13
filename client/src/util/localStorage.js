import store from '../store';

const userStorageString = 'FCC-Dynamic-Web-Boilerplate-user';
const tokenStorageString = 'FCC-Dynamic-Web-Boilerplate-token';

export const saveUser = (user) => {
  localStorage.setItem(userStorageString, JSON.stringify(user));
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
  } else {
    console.err('No user found in local storage to update');
  }
};

export const getUser = () => {
  const storedUser = localStorage.getItem(userStorageString);
  if (storedUser) {
    const {nbrClicks, ...rest} = JSON.parse(storedUser);
    return rest;
  }
  return null;
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
