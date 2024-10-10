// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyDGjRptMe2o7GwLgUjyvpvi61DMI8T3kbI",
    authDomain: "valdevergara.firebaseapp.com",
    projectId: "valdevergara",
    storageBucket: "valdevergara.appspot.com",
    messagingSenderId: "623259229896",
    appId: "1:623259229896:web:2f25e32ed95c4f2f820ffd"
  },

  //Agregar la API
  apiUrl:"https://uber-nodejs-server-git-d61f89-guillermovillacuratorres-projects.vercel.app/api/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
