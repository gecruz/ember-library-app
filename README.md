# library-app

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Ember CLI](https://ember-cli.com/)

## Installation

* `git clone`
* `cd library-app`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --prod` (production)

### Setup a server on Firebase

Firebase is a server and API service. Very easy to use. http://firebase.google.com

1. Create an account.
2. You can read the latest Readme on EmberFire website: https://github.com/firebase/emberfire (You can find the earlier version’s guide and help section here: https://www.firebase.com/docs/web/libraries/ember/guide.html)
3. First, run the following command in your terminal:
* `ember install emberfire`
4. You will see instructions in the console. We have to manually add a few lines to our configuration file. Copy and paste those lines in config/environment.js. (Please note you may have to update a few single quotes to double-quotes in contentSecurityPolicy, check my code snippet below, double-quotes are corrected there.)
5. Go back to Firebase and create an app there. When your new firebase database ready, click on the purple icon on Overview page (“Add Firebase to your web app”). Check those params in the popup window (“apiKey”, “authDomain”, etc.) and copy-paste the values in your config/environment.js file in your Ember application accordingly.

```javascript
// config/environment.js

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'library-app',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',

    firebase: {
      apiKey: 'xyz',
      authDomain: 'YOUR-FIREBASE-APP.firebaseapp.com',
      databaseURL: 'https://YOUR-FIREBASE-APP.firebaseio.com',
      storageBucket: 'YOUR-FIREBASE-APP.appspot.com',
      messagingSenderId: '1234'
    },

    // if using ember-cli-content-security-policy
    contentSecurityPolicy: {
      'script-src': "'self' 'unsafe-eval' apis.google.com",
      'frame-src': "'self' https://*.firebaseapp.com",
      'connect-src': "'self' wss://*.firebaseio.com https://*.googleapis.com"
    },

    EmberENV: {
      FEATURES: { ...
```

### Deploy your app using Firebase Hosting service

* `npm install -g firebase-tools`
* `ember build --prod`
* `firebase login`
* `firebase init`

And deploy:

* `firebase deploy`
* `firebase open`

Select Hosting: Deployed Site

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
