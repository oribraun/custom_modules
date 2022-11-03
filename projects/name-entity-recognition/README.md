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
    public entitiesTypes = [
         {
             name: 'first',
             background_color: '#f5f5f5',
             text_color: '#888888',
         },
         {
             name: 'last',
             background_color: '#f5f5f5',
             text_color: '#888888',
         },
         {
             name: 'prefix',
             background_color: '#f5f5f5',
             text_color: '#888888',
         },
         {
             name: 'address',
             background_color: '#f5f5f5',
             text_color: '#888888',
         },
         {
             name: 'phones',
             background_color: '#f5f5f5',
             text_color: '#888888',
         },
         {
             name: 'emails',
             background_color: '#f5f5f5',
             text_color: '#888888',
         },
     ];
     public positions = [];
     public relationOptions = ['option 1', 'option 2', 'option 3'];
     public text = 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups';
     public design = {
         header: {
             'background-color': '#fff',
             'color': '#000',
         },
         tag: {
             'border': 'solid 1px #f5f5f5',
         },
         tag_active: {
             'background-color': '#fff',
             'border': 'solid 1px green',
             'color':'green',
             'box-shadow': '2px 2px 5px #8a8a8a',
         },
         record: {
             tile: {
                 'border': 'solid 1px #f5f5f5',
             }
         },
         record_active: {
             tile: {
                 'background-color': '#209cee',
                 'color':'#fff',
                 'border': 'solid 1px #14496d',
                 'box-shadow': '2px 2px 5px #8a8a8a',
             }
         }
     };
     public allowLabelMultipleRecords = false;
     public allowMultipleEntities = false;
     public showEntityInText = true;
     public dashboardItems: any[]= [
         {key: 'website', val: 'https://google.com'},
         {key: 'website2', val: 'https://google.comasfasdfasdfasdfasdfasdfasdfasdf', link: true},
         {key: 'website2', val: 'https://google.com', link: true},
         {key: 'website2', val: 'https://google.com', link: true}
         ];
     parentHeight = '500px';
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
* ParentHeightChanged - just trigger re arrange lib header and body based on new height
```html
<lib-name-entity-recognition
    [ParentHeightChanged]="parentHeight"
    [text]="text"
    [design]="design"
    [entitiesTypes]="entitiesTypes"
    [entityPositions]="positions"
    [relationOptions]="relationOptions"
    [hideSaveButton]="false"
    [hideEntitiesButton]="false"
    [hideResultsButton]="false"
    [allowLabelMultipleRecords]="allowLabelMultipleRecords"
    [allowMultipleEntities]="allowMultipleEntities"
    [showEntityInText]="showEntityInText"
    [dashboardItems]="dashboardItems"
    (onSave)="onSave($event)"
    (onChange)="onChange($event)"
    (onShowEntities)="onShowEntities($event)"
    (onShowResults)="onShowResults($event)"
></lib-name-entity-recognition>
```
