import { Configuration } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: 'YOUR_CLIENT_ID',
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: '/',
  },
};

export const loginRequest = {
  scopes: ['User.Read'],
};
