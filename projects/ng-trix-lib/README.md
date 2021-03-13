# NgTrixLib `Trix 1.1.1`

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.0.

## Code scaffolding

Run `npm i --save ng-trix-lib`. 

## How To Use

* npm install trix - npm i --save trix. 
* add to angular.json project trix files

    "styles": ["node_modules/trix/dist/trix.css"]

    "scripts": ["node_modules/trix/dist/trix.js"]

* use as in 'https://www.npmjs.com/package/trix#creating-an-editor'

## Example 

    <input id="x" type="hidden" name="content">
    <trix-editor input="x"></trix-editor>
    

## Example Using ngModel

    <trix-editor [(ngModel)]="putYourClassVar"></trix-editor>
