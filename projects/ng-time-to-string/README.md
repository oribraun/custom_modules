# NgTimeToString

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.0.

## Code scaffolding

Run `ng generate component component-name --project ng-time-to-string` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ng-time-to-string`.
> Note: Don't forget to add `--project ng-time-to-string` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build ng-time-to-string` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ng-time-to-string`, go to the dist folder `cd dist/ng-time-to-string` and run `npm publish`.

## Running unit tests

Run `ng test ng-time-to-string` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


#example use

<div
[libNgTimeToString]="100 * 60"
  [showDays]="true"
  [showHours]="true"
  [outputType]="''" // options str,short_str,:,-,' ',
  [addLeadingZero]="true"
  >
</div>
