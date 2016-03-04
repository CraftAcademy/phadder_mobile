## Set up
Create a new application
```
$ ionic start project_unify_mobile blank -a ProjectUnifyMobile
```

Add SAAS support
```
$ ionic setup sass
```
You can start to write your sass in your ./scss/ionic.app.scss file.

Add platform support
```
$ ionic platform ios android
```
Note! Is added when initiating a new app

### Testing
Adding Karma and Phantom js
```
$ npm install karma karma-jasmine karma-phantomjs-launcher --save-dev
```

Let's prepare the folder structure
```
$ mkdir tests
$ mkdir tests/specs
$ touch tests/specs/.keep #to make sure this foder falls under varsion control until we write out first test
```
And run the Karma configuration script
```
$ cd tests
$ karma init spec.conf.js

```

Go through the configuration process. Point Karma to the `specs` folder when asked where your test are located.
```
What is the location of your source and test files ?
You can use glob patterns, eg. "js/*.js" or "test/**/*Spec.js".
Enter empty string to move to the next question.

> specs/**/*.spec.js
```
Please note that we will need to name our test files wuth the following syntax: `*.spec.js` 

Add Angular mocks
```
$ bower install angular-mocks --save-dev
```

In `spec.conf.js` modify the file list

```
// list of files / patterns to load in the browser
files: [
  //Angular/Ionic source
  '../www/lib/ionic/js/ionic.bundle.js',
  '../www/lib/ionic/js/angular/angular.js',
  '../www/lib/angular-mocks/angular-mocks.js',

  //App code
  '../www/js/*.js',

  //Test/Spec files
  '**/*_spec.js'
],
```
We'd like to get test coverage and use Coveralls.io
Install Karma Coverage and Karma Coveralls

```
$ npm install karma-coverage --save-dev
$ npm install karma-coveralls --save-dev
```

Add these plugins to your `tests/spec.conf.js`

```
plugins: [
  'karma-jasmine',
  'karma-chrome-launcher',
  'karma-coverage',
  'karma-coveralls'
],
```

And add `coveralls` and `coverage` to your reporters:

```
reporters: ['progress', 'coverage', 'coveralls'],
```

We'd also like to see a more verbose output in out test files. For that we can use the `karma-spec-reporter` plugin.
Install it with:
```
$ npm install karma-spec-reporter --save-dev
```

Now you can chage the reporter `progress` to `spec` in your `tests/spec.conf.js`
```
reporters: ['spec', 'coverage', 'coveralls'],
```


### Running the app locally

Get the iIonic server running wit the `serve` command.

```
$ ionic serve
```

Now you can access the application at
```
http://localhost:8100/
```

If you want to see both the iOS and Android version at the same time (side by side). Visit:
```
http://localhost:8100/ionic-lab
```

