// Very common passwords, and passwords based on app name
// Should be extended to at least top 1k common passwords in non demo apps
export const restrictedPasswords = [
  'barsvp',
  '123456',
  'password',
  '12345678',
  'qwerty',
  '12345',
  '123456789',
  'football',
  '1234',
  '1234567',
  'baseball',
  'welcome',
  '1234567890',
  'abc123',
  '123abc',
  '111111',
  '1qaz2wsx',
  'dragon',
  'master',
  'monkey',
  'letmein',
  'login',
  'princess',
  'qwertyuiop',
  'passw0rd',
  'starwars',
  'default',
];

export const ratingToFile = (rating) => {
  const str = rating.toString();
  let url = `regular_${str.charAt(0)}`;
  if (str.length > 1) {
    url += '_half';
  }
  url += '.png';
  return url;
};

export const appUrl = location.origin;
