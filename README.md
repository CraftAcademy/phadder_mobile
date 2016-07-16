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
```

### Tests

We are using Karma runner with Jasmine and Protractor 


Running unit tests:
```
$ karma start tests/spec.conf.js --debug
```

To run acceptance tests make sure that you run `$ ionic serve` and execute the tests with 
```
$ protractor tests/features.conf.js
```