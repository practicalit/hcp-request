// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  server:'http://yetena.balemuya.net',
  //server:'http://localhost:8082',
  balemuyaEndPoint: '/ajax.php?action=addBalemuya',
  volunteerEndPoint: '/ajax.php?action=addVolunteer',
  dashboardEndPoint: '/ajax.php?action=dashboard',
  individualUpdateEndPoint: '/ajax.php?action=update-individual',
  individualAddressUpdateEndPoint: '/ajax.php?action=update-individual-address',
  authEndPoint: '/ajax.php?action=login',
  requestEndPoint: '/ajax.php?action=request',
  requestListEndPoint: '/ajax.php?action=list-request',
  requestByIdEndPoint: '/ajax.php?action=request-by-id',
  requestPickedEndPoint: '/ajax.php?action=request-picked',
  addCommentEndPoint: '/ajax.php?action=add-comment',
  requestRemoveEndPoint: '/ajax.php?action=remove-request',
  settingsEndpoint: '/ajax.php?action=settings',
  commentsListEndPoint: '/ajax.php?action=list-comments&request_id',
  awesomeVolunteerEndPoint: '/ajax.php?action=awesome-volunteers',
  professionalListEndPoint: '/ajax.php?action=list-professionals',
  volunteerListEndPoint: '/ajax.php?action=list-volunteers',
  oAuthLogin: '/ajax.php?action=oauth-login',
  statesEndPoint: '/ajax.php?action=list-states',
  citiesEndPoint: '/ajax.php?action=list-cities',
  changeActiveStatusEndPoint: '/ajax.php?action=change-active-status',
  forgotPasswordEndPoint:'/ajax.php?action=forgot-password',
  firebase: {
    apiKey: "AIzaSyCWj9mkUKqWAkywvXkK0-wg8X4OSyHXhpw",
    authDomain: "login-ng-a0220.firebaseapp.com",
    databaseURL: "https://login-ng-a0220.firebaseio.com",
    projectId: "login-ng-a0220",
    storageBucket: "login-ng-a0220.appspot.com",
    messagingSenderId: "620412013881",
    appId: "1:620412013881:web:1bb10969de99cacc90ece8"
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
