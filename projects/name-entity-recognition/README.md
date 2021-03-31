# NameEntityRecognition

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.1.

## description

This library is for Name entity recognition labeling,

those are the params you should pass.<br>
* entitiesType - a list of entity names and colors you want to label from text
* positions - a list of current position already labeled from text
* text - the text you want to labeled entities from
* onSave - emitter that will get the final result object
* onChange - emitter that will be triggered for every entity change and will get current results, positions and records
* onShowEntities - by default there is a simple popup to show current selected entities list, you can bypass it and design your entities view by passing this emitter
* showResults - by default there is a simple popup to show current results object, you can bypass it and design your results view by passing this emitter 
## example
```js

class ExampleComponent {
    const entitiesTypes = [
         {
             text: 'first',
             background_color: '#209cee', // optional
             text_color: '#ffffff', // optional
         },
         {
             text: 'last',
             background_color: '#ffcc00', // optional
             text_color: '#333333', // optional
         },
         {
             text: 'prefix',
             background_color: '#333333', // optional
             text_color: '#ffffff', // optional
         },
         {
             text: 'address',
             background_color: '#33cc99', // optional
             text_color: '#ffffff', // optional
         },
         {
             text: 'phones',
             background_color: '#ff3333', // optional
             text_color: '#ffffff', // optional
         },
         {
             text: 'emails',
             background_color: '#9933ff', // optional
             text_color: '#ffffff', // optional
         },
     ];
     const positions = [];
     const text = 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups';
     
     onSave(results) {
         console.log('results', results);
     }
     onChange(results) {
         console.log('onChange', results);
     }
     onShowEntities(results) {
         console.log('onShowEntities', results);
     }
     onShowResults(results) {
         console.log('onShowResults', results);
     }
 }
```

#how to use
```html
<lib-name-entity-recognition
    [text]="text"
    [entitiesTypes]="entitiesTypes"
    [entityPositions]="positions"
    (onSave)="onSave($event)"
    (onChange)="onChange($event)"
    (onShowEntities)="onShowEntities($event)"
    (onShowResults)="onShowResults($event)"
></lib-name-entity-recognition>
```
