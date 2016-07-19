# Mobile Client for Project Unify
[![Build Status](https://semaphoreci.com/api/v1/agileventures/project_unify_mobile/branches/develop/badge.svg)](https://semaphoreci.com/agileventures/project_unify_mobile)


### Features
#### Main
* User can sign up as a [Mentor](https://en.wiktionary.org/wiki/mentor#English) or [Mentee](https://en.wiktionary.org/wiki/mentee) 
* User can add Skills (Areas of interest) 
* User can search for matches
  * Mentors can serach for Mentees
  * Mentees can search for Mentors and other Mentees

#### Secondary
* User can send messages to other users
* User can access a Facebook timeline for the organisation running the system

### Setup instructions
Fork and clone the repository.

Inside the project folder - install the dependencies by running the bower and npm install commands:

```shell
$ bower install
$ npm install
```

You want to install the latest version of angular when prompted.

Finish the process by updating the `$ionicCoreSettings factory.

```shell
$ ionic config build
````
Note that without taking this step you might encounter errors while running unit tests. 

### Tests

We are using Karma runner with Jasmine for unit tests and Protractor (also using Jasmine) for acceptance tests


Running unit tests:
```
$ karma start tests/spec.conf.js --debug
```

To run acceptance tests make sure that you run `$ ionic serve` and execute the tests with 
```
$ protractor tests/features.conf.js
```

Test coverage is measured with Coveralls

[![Coverage Status](https://coveralls.io/repos/github/AgileVentures/project_unify_mobile/badge.svg?branch=master)](https://coveralls.io/github/AgileVentures/project_unify_mobile?branch=develop)