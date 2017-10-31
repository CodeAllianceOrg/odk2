# ODK 2.0 Form Builder

[![Build Status](https://travis-ci.org/CodeAllianceOrg/odk2.svg?branch=master)](https://travis-ci.org/CodeAllianceOrg/odk2)

## Motivation

This website aims to simplify the task of creating ODK 2.0 compliant XLSX files. [Click here to learn more about the ODK project](https://opendatakit.org/). Also check out the [form builder for the previous version of ODK](https://build.opendatakit.org/).

## Major Dependencies

- [Angular](https://angular.io/) _MIT_
- [Redux](http://redux.js.org/) _MIT_
- [@angular-redux](https://github.com/angular-redux/store) _MIT_
- [Immutable](https://facebook.github.io/immutable-js/) _BSD 3-clause "New" or "Revised" License_
- [Bootstrap 4 beta](https://getbootstrap.com/) _MIT_
- [ng-bootstrap](https://github.com/ng-bootstrap/ng-bootstrap) _MIT_
- [odk2-format-converter](https://github.com/CodeAllianceOrg/odk2-json) _GPL-3.0_

## Contributing

### Pull Requests

To submit changes, please [create a pull request](https://help.github.com/articles/creating-a-pull-request/). Please use the following checklist as a guideline:

- Are all tests passing? Run the full test suite with:
    - `npm run check`
- Were tests added to confirm the validity of the changes?
- Did the pull request include a description of all changes? Does it account for any new or updated dependencies?
- Does the pull request solve more than one problem? Could it be broken down into multiple, separate PRs?

It's important to note that these are only guidelines and can and should be broken when appropriate. However a healthy code culture can be more easily cultivated when we all agree to and follow a set of simple rules.

## Angular CLI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli).

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## License

GNU General Public License v3.0
