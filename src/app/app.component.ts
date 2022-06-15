import {Component, EventEmitter, OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    _text = 'test'
    title = 'ng-trix';
    public design = {
        header: {
            'background-color': '#fff',
            'color': '#000',
        },
        tag: {
            'border': 'solid 1px #999999',
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
    entitiesTypes = [
        {
            name: 'first',
            background_color: 'none',
            // text_color: '#888888',
            short_key: 'f',
            as_block: true
        },
        {
            name: 'last',
            background_color: '#f5f5f5',
            text_color: '#888888',
            short_key: 'l'
        },
        {
            name: 'prefix',
            background_color: '#f5f5f5',
            text_color: '#888888',
            short_key: 'p'
        },
        {
            name: 'address',
            // background_color: '#f5f5f5',
            // text_color: '#888888',
        },
        {
            name: 'phones',
            // background_color: '#f5f5f5',
            // text_color: '#888888',
        },
        {
            name: 'emails',
            // background_color: '#f5f5f5',
            // text_color: '#888888',
        },
    ]
    positions = [
        {
            id: 'E1',
            prob: 0,
            start_offset: 7,
            end_offset: 14,
            entity_id: '1',
            recordIds: 'R1,R2',
            relationsIds: ''
        }
    ]
    relationOptions = ['option 1 asdf asdf asdf ', 'option 2', 'option 3'];
    text = `<section class="banner-padding-section">
    `;
    signature = 'Barack Hussein\nObama II (born August 4, 1961) is an American attorney and politician who served as the 44th President of the United States from January 20, 2009, to January 20, 2017. A member of the Democratic Party, he was the first African American to serve as president. He was previously a United States Senator from Illinois and a member of the Illinois State Senate.Barack Hussein Obama II (born August 4, 1961) is an American attorney and politician who served as the 44th President of the United States from January 20, 2009, to January 20, 2017. A member of the Democratic Party, he was the first African American to serve as president. He was previously a United States Senator from Illinois and a member of the Illinois State Senate.Barack Hussein Obama II (born August 4, 1961) is an American attorney and politician who served as the 44th President of the United States from January 20, 2009, to January 20, 2017. A member of the Democratic Party, he was the first African American to serve as president. He was previously a United States Senator from Illinois and a member of the Illinois State Senate.Barack Hussein Obama II (born August 4, 1961) is an American attorney and politician who served as the 44th President of the United States from January 20, 2009, to January 20, 2017. A member of the Democratic Party, he was the first African American to serve as president. He was previously a United States Senator from Illinois and a member of the Illinois State Senate.Barack Hussein Obama II (born August 4, 1961) is an American attorney and politician who served as the 44th President of the United States from January 20, 2 ff fff ffff iiiii';
    parentHeight = '0%';
    constructor() {

    }

    changeParentHeight(height) {
        this.parentHeight = height + '%';
    }
    ngOnInit(): void {

    }

    onSave(results) {
        console.log('onSave', results);
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

    click() {
        this.positions = [
            {
                id: 'E1',
                prob: 0,
                start_offset: 7,
                end_offset: 14,
                entity_id: '1',
                recordIds: 'R1,R3',
                relationsIds: ''
            }
        ];
        // this.entitiesTypes = [
        //     {
        //         name: 'first',
        //         // background_color: '#209cee',
        //         // text_color: '#ffffff',
        //     },
        //     {
        //         name: 'last',
        //         // background_color: '#ffcc00',
        //         // text_color: '#333333',
        //     },
        //     {
        //         name: 'prefix',
        //         // background_color: '#333333',
        //         // text_color: '#ffffff',
        //     },
        //     {
        //         name: 'address',
        //         // background_color: '#33cc99',
        //         // text_color: '#ffffff',
        //     },
        //     {
        //         name: 'phones',
        //         // background_color: '#ff3333',
        //         // text_color: '#ffffff',
        //     },
        //     {
        //         name: 'emails',
        //         // background_color: '#9933ff',
        //         // text_color: '#ffffff',
        //     },
        // ]
    }
}
