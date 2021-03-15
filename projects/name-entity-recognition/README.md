# NameEntityRecognition

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.1.

## Code scaffolding

Run `ng generate component component-name --project name-entity-recognition` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project name-entity-recognition`.
> Note: Don't forget to add `--project name-entity-recognition` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build name-entity-recognition` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build name-entity-recognition`, go to the dist folder `cd dist/name-entity-recognition` and run `npm publish`.

## Running unit tests

Run `ng test name-entity-recognition` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

#example
```json
entitiesTypes = [
     {
         text: 'first',
         background_color: '#209cee',
         text_color: '#ffffff',
     },
     {
         text: 'last',
         background_color: '#ffcc00',
         text_color: '#333333',
     },
     {
         text: 'prefix',
         background_color: '#333333',
         text_color: '#ffffff',
     },
     {
         text: 'address',
         background_color: '#33cc99',
         text_color: '#ffffff',
     },
     {
         text: 'phones',
         background_color: '#ff3333',
         text_color: '#ffffff',
     },
     {
         text: 'emails',
         background_color: '#9933ff',
         text_color: '#ffffff',
     },
 ]
 
 text = 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups'
 
 onSave(results) {
     console.log('results', results);
 }
```

#how to use
<lib-name-entity-recognition
    [text]="text"
    [entitiesTypes]="entitiesTypes"
    (onSave)="onSave($event)"
></lib-name-entity-recognition>
