import {Component, EventEmitter, OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    _text = 'test'
    title = 'ng-trix';
    entitiesTypes = [
        {
            name: 'first',
            // background_color: '#209cee',
            // text_color: '#ffffff',
        },
        {
            name: 'last',
            // background_color: '#ffcc00',
            // text_color: '#333333',
        },
        {
            name: 'prefix',
            // background_color: '#333333',
            // text_color: '#ffffff',
        },
        {
            name: 'address',
            // background_color: '#33cc99',
            // text_color: '#ffffff',
        },
        {
            name: 'phones',
            // background_color: '#ff3333',
            // text_color: '#ffffff',
        },
        {
            name: 'emails',
            // background_color: '#9933ff',
            // text_color: '#ffffff',
        },
    ]
    text = 'Barack Hussein Obama II (born August 4, 1961) is an American attorney and politician who served as the 44th President of the United States from January 20, 2009, to January 20, 2017. A member of the Democratic Party, he was the first African American to serve as president. He was previously a United States Senator from Illinois and a member of the Illinois State Senate.';

    constructor() {

    }

    ngOnInit(): void {

    }

    onSave(results) {
        console.log('results', results);
    }
}
