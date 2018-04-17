// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false
};

export const tradeServerInfo = {
  serverAddress : 'http://tradeserver.test',
  username : 'test',
  password : 'test',

  priceApi : '/price/{currency}',
  availableCurrenciesApi : '/availableCurrencies'
};

export const userServerInfo = {
  serverAddress : 'http://192.168.1.62:3000',
  username : 'test',
  password : 'test',

  baseinfoApi : '/api/v1/profile/',
};
