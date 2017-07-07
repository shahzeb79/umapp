/**
 * @author all
 * @version 1.0
 *
 * Starting point of app
 * Initializes the app including the routing
 * The app uses crosswalk to optimize for especially older devices
 *
 * @see http://ionicframework.com/docs/
 * @see https://docs.angularjs.org/guide
 * @see https://cordova.apache.org/docs/en/latest/
 * @see https://github.com/crosswalk-project/cordova-plugin-crosswalk-webview
 *
 * @uses ionic.service.core
 * @uses ionic.service.push
 * @uses ngCordova
 * @uses ion-sticky
 * @uses pascalprecht.translate
 * @uses ionic-native-transitions
 * @uses crosswalk
 */

// settings start
var server = ""; //secret
var notification = 0;
var http_user = ""; //secret
var http_password = ""; //secret
// settings end

var app = angular.module('umapp', ['ionic','ionic.service.core', 'ionic.service.push','ngCordova',  'ion-sticky', 'pascalprecht.translate', 'ionic-native-transitions']);


app.run(function($ionicPlatform, $http, $rootScope, $ionicPush, $ionicUser, $sce) {

  // set $http authentication
  $http.defaults.headers.common.Authorization = "Basic " + base64(http_user + ':' + http_password); // base64 encryption
  //$http.defaults.useXDomain = true;

  $ionicPlatform.ready(function() {

    /* hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    } */

  });
})

.filter('allowHTML', function ($sce) {
  return function (text) {
    return $sce.trustAsHtml(text);
  };
})

.config(function($stateProvider, $urlRouterProvider, $translateProvider,$ionicAppProvider,$ionicNativeTransitionsProvider, $ionicConfigProvider) {
   if (!ionic.Platform.isIOS()) {
    $ionicConfigProvider.scrolling.jsScrolling(false);
  }

  // cache max 8 views
  $ionicConfigProvider.views.maxCache(8);

  // app identifier
  $ionicAppProvider.identify({
    // Your App ID
    app_id: '409c6220',
    // The public API key services will use for this app
    api_key: '9a7af58502967d48aae4308b6b4d9683c0f427d10a15ac7b',
    // Your GCM sender ID/project number (Uncomment if supporting Android)
    gcm_id: '142604880517'
  });
  // Language
  $translateProvider.useStaticFilesLoader({
    prefix: 'lang/',
    suffix: '.json'
  });

  // Settings for pascalprecht.translate
  $ionicNativeTransitionsProvider.setDefaultOptions({
    duration: 400, // in milliseconds (ms), default 400,
    slowdownfactor: 4, // overlap views (higher number is more) or no overlap (1), default 4
    iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in, default -1
    androiddelay: -1, // same as above but for Android, default -1
    winphonedelay: -1, // same as above but for Windows Phone, default -1,
    fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
    fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
    triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
    backInOppositeDirection: false // Takes over default back transition and state back transition to use the opposite direction transition to go back
  });

  // needed for ionic-native-transitions
  $ionicConfigProvider.platform.android.scrolling.jsScrolling(false);

  // register available languages
  $translateProvider.registerAvailableLanguageKeys(['en', 'de'], {
    'en-UK': 'en',
    'de-DE': 'de'
  });

  // get language from local storage or choose english as default
  if(typeof window.localStorage['lang'] == "undefined" || (window.localStorage['lang'] != "de" &&  window.localStorage['lang'] != "en")) {
    $translateProvider.preferredLanguage('de');
    window.localStorage['lang'] = "de";
    //$translateProvider.use('en');
  }
  else {
    $translateProvider.preferredLanguage(window.localStorage['lang']);
    //$translateProvider.use(window.localStorage['lang']);
  }

  // needed for translation
  $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

  // Routing
  $stateProvider
    // intro
    .state('intro', {
      url: '/intro',
      cache: false,
      templateUrl: 'modules/intro/intro.html',
      controller: 'introCtrl'
    })

    // session
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'modules/session/session.html',
      controller: 'sessionCtrl'
    })

    // contacts
    .state('app.contacts', {
      url: '/contacts',
      views: {
        'menuContent': {
          templateUrl: 'modules/contacts/contacts.html',
          controller: 'contactsCtrl'
        }
      }
    })
    .state('app.contacts.detail', {
      url:'/:title',
      views: {
        'menuContent@app': {
          templateUrl: 'modules/contacts/contactsDetail.html',
          controller: 'contactsDetailCtrl'

        }
      }
    })

    // portal2
    .state('app.portal2', {
      url: "/portal2",
      views: {
        'menuContent': {
          templateUrl: "modules/portal2/portal2.html",
          controller: 'portal2Ctrl'
        }
      }
    }).state('app.portal2.detail', {
    url: '/:id',
    views: {
      'menuContent@app': {
        templateUrl: 'modules/portal2/portal2Detail.html',
        controller: 'portal2Ctrl'
      }
    }
  })

    // events
    .state('app.events', {
      url: '/events',
      views: {
        'menuContent': {
          templateUrl: 'modules/events/events.html',
          controller: 'eventsCtrl'
        }
      }
    })
    .state('app.events.detail', {
      url: '/:id',
      views: {
        'menuContent@app': {
          templateUrl: 'modules/events/eventsDetail.html',
          controller: 'eventsCtrl'
        }
      }
    })

    // feedback
    .state('app.feedback', {
      url: '/feedback',
       cache: false,
      views: {
        'menuContent': {
          templateUrl: 'modules/feedback/feedback.html',
          controller: 'feedbackCtrl'
        }
      }
    })

    // home
    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'modules/home/home.html',
          controller: 'homeCtrl'
        }
      }
    })

    // information
    .state('app.information', {
      url: '/information',
       cache: false,
      views: {
        'menuContent': {
          templateUrl: 'modules/information/information.html',
          controller: 'informationCtrl'
        }
      }
    })

    // library
    .state('app.library', {
      url: '/library',
      views: {
        'menuContent': {
          templateUrl: 'modules/library/library.html',
          controller: 'libraryCtrl'
        }
      }
    })

    // map
    .state('app.map', {
      url: '/map',
      views: {
        'menuContent': {
          templateUrl: 'modules/map/map.html',
          controller: 'mapsearchCtrl'
        }
      }
    })
    .state('app.map.mapview', {
      url: '/:building',
      views: {
        'menuContent@app': {
          templateUrl: 'modules/map/mapDetail.html',
          controller: 'mapsearchCtrl'
        }
      }
    })

    .state('app.map.mapview.campusmap', {
      url: '/:building',
      views: {
        'menuContent@app': {
          templateUrl: 'modules/map/mapView.html',
          controller: 'mapCtrl'
        }
      }
    })

    // mensa
    .state('app.mensa', {
      url: '/mensa',
      views: {
        'menuContent': {
          templateUrl: 'modules/mensa/mensa.html',
          controller: 'mensaCtrl'
        }
      }
    })

    // news
    .state('app.news', {
      url: '/news',
      views: {
        'menuContent': {
          templateUrl: 'modules/news/news.html',
        controller: 'newsCtrl'
        }
      }
    })
    .state('app.news.detail', {
      url: '/:id',
      views: {
        'menuContent@app': {
          templateUrl: 'modules/news/newsDetail.html',
        controller: 'newsCtrl'
        }
      }
    })

    /* notifications
    .state('app.notifications', {
      url: '/notifications',
       cache: false,
      views: {
        'menuContent': {
          templateUrl: 'modules/notifications/notifications.html',
          controller: 'notiCtrl'
        }
      }
    })
*/
    // organizations
    .state('app.organizations', {
      url: '/organizations',
        cache: false,
      views: {
        'menuContent': {
          templateUrl: 'modules/organizations/organizations.html',
          controller: 'organizationsCtrl'
        }
      }
    })
    .state('app.organizations.detail', {
      url: '/:id',
      views: {
        'menuContent@app': {
          templateUrl: 'modules/organizations/organizationsDetail.html',
          controller: 'organizationsCtrl'
        }
      }
    })

    // radio
    .state('app.radio',{
      url: '/radio',
        cache: false,
      views: {
        'menuContent':{
          templateUrl: 'modules/radio/radio.html',
          controller: 'radioCtrl'
        }
      }
    })

    // settings
    .state('app.settings', {
      url: '/settings',
      views: {
        'menuContent': {
          templateUrl: 'modules/settings/settings.html',
          controller: 'settingsCtrl'
        }
      }
    })

    // sport
    /*
    .state('app.sport', {
      url: '/sport',
      views: {
      'menuContent': {
        templateUrl: 'modules/sport/sport.html'
        }
      }
    })
     */

    // timetable
    .state('app.timetable', {
      url: '/timetable',
      views: {
        'menuContent': {
          templateUrl: 'modules/timetable/timetable.html',
          controller: 'timetableCtrl'
        }
      }
    })
    .state('app.timetable.detail', {
      url: '/:id',
      views: {
        'menuContent@app': {
          templateUrl: 'modules/timetable/timetableDetail.html',
          controller: 'timetableCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  if(typeof window.localStorage['intro'] == "undefined") {
    $urlRouterProvider.otherwise('/intro');
    //window.localStorage['intro'] = 'true';
  }
  else {
    $urlRouterProvider.otherwise('/app/home');
  }
});
