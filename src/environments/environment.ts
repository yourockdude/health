// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api: 'http://localhost:3000/yourockhosp_api',
  allowedFiles: [
    'pdf',
    'doc',
    'docx',
    'png'
  ],
  socketUrl: 'http://localhost:8080',
  googleClientId: '922589824238-oun24bfdtqradtddtunhat91ifm09mb1.apps.googleusercontent.com',
  facebookClientId: '1904601646427730',
  facebookApiVersion: 'v2.9',
  facebookApi: 'https://graph.facebook.com',
  facebookFields: [
    'id',
    'email',
    'name',
    'first_name',
    'last_name'
  ],
  vkontakteClientId: '6052961',
  adminId: '5'
};
