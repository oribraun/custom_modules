import {EventEmitter, Component, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {count} from 'rxjs/operators';
import {NameEntityRecognitionService} from "../name-entity-recognition.service";
import {style, trigger, state, transition, animate} from "@angular/animations";

declare var document: any;
@Component({
    selector: 'lib-name-entity-recognition',
    templateUrl: './name-entity-recognition.component.html',
    styleUrls: ['./name-entity-recognition.component.less'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('show-panel', [
            state('true', style({height: '*', opacity: 1})),
            state('false', style({height: 0, opacity: 0})),
            transition('true <=> false', [
                animate(300)
            ])
        ])
    ]
})
export class NameEntityRecognitionComponent implements OnInit {

    @ViewChild('nameEntityRecognition') el;
    @Output() onSave: EventEmitter<any> = new EventEmitter<any>();
    // @Input() text = 'Barack Hussein Obama II (born August 4, 1961) is an American attorney and politician who served as the 44th President of the United States from January 20, 2009, to January 20, 2017. A member of the Democratic Party, he was the first African American to serve as president. He was previously a United States Senator from Illinois and a member of the Illinois State Senate.';
    @Input() text = '';
    @Input() entitiesTypes: any = [
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
    ];
    colors = [];
    startOffset = 0;
    endOffset = 0;
    chunks: any[] = [];
    // entityPositions = [{startOffset: 10, endOffset: 15, entity_id: 1}];
    recordIdPrefix = 'R';
    entityIdPrefix = 'E';
    records = [
        {
            id: this.recordIdPrefix + (1).toString(),
            background_color: '#209cee',
            text_color: '#ffffff',
        },
    ];
    selectedEntities: any = [this.records[0].id];
    currentEntity: any = {};
    currentRelationsEntity: any = {};
    animatedModel = false;
    modalOpen = false;
    entityPositions: any = [
        // {
        //     end_offset: 23,
        //     recordIds: 'R1',
        //     relationsIds: '',
        //     id: 'E1',
        //     entity_id: 1,
        //     prob: 0,
        //     start_offset: 0,
        // },
        // {
        //     end_offset: 138,
        //     recordIds: 'R1',
        //     relationsIds: '',
        //     id: 'E2',
        //     entity_id: 2,
        //     prob: 0.0,
        //     start_offset: 121,
        // },

    ];
    entitiesMap:any = {};
    showEntitiesMap = false;
    constructor(
        private nameEntityRecognitionService: NameEntityRecognitionService
    ) {
        this.colors = this.nameEntityRecognitionService.colors;
    }

    ngOnInit(): void {
        // const colors = this.randomColors(this.entitiesTypes.length)
        // colors = colors.sort( () => .5 - Math.random();
        this.generateEntities(this.colors);
        this.chunks = this.getChunks();
        // this.initAnnotations();
    }

    generateEntities(colors) {
        let count = 1;
        for (const i in this.entitiesTypes) {
            const color = colors[count - 1];
            this.entitiesTypes[i].id = count.toString();
            // this.entitiesTypes[i].background_color = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            if (!this.entitiesTypes[i].background_color) {
                this.entitiesTypes[i].background_color = color;
            }
            if (!this.entitiesTypes[i].text_color) {
                this.entitiesTypes[i].text_color = this.nameEntityRecognitionService.getTextColor(color);
            }
            count++;
        }
        if(this.entitiesTypes.length) {
            this.currentEntity = this.entitiesTypes[0];
        }
        // console.log('this.entitiesTypes', this.entitiesTypes)
    }

    setSelectedRange(e) {
        let start;
        let end;
        if (window.getSelection) {
            const selection = window.getSelection();
            if (!selection.anchorNode) {
                return;
            }
            const range = window.getSelection().getRangeAt(0);
            const preSelectionRange = range.cloneRange();
            preSelectionRange.selectNodeContents(this.el.nativeElement);
            preSelectionRange.setEnd(range.startContainer, range.startOffset);
            start = preSelectionRange.toString().length;
            end = start + range.toString().length;
        } else if (document.selection && document.selection.type !== 'Control') {
            const selectedTextRange = document.selection.createRange();
            const preSelectionTextRange = document.body.createTextRange();
            preSelectionTextRange.moveToElementText(this.el.nativeElement);
            preSelectionTextRange.setEndPoint('EndToStart', selectedTextRange);
            start = preSelectionTextRange.text.length;
            end = start + selectedTextRange.text.length;
        }
        this.startOffset = start;
        this.endOffset = end;
        console.log(start, end);
        if(this.currentEntity) {
            this.addEntity(this.currentEntity.id);
        }
    }

    mouseUp(e) {
        const sel = window.getSelection().getRangeAt(0);
        console.log('sel', sel)
        const parent = sel.startContainer.parentNode;
        var start = window.getSelection().anchorOffset;
        var end = window.getSelection().focusOffset;
        if (start < end) {
            var start = window.getSelection().anchorOffset;
            var end = window.getSelection().focusOffset;
        } else {
            var start = window.getSelection().focusOffset;
            var end = window.getSelection().anchorOffset;
        }
        console.log(window.getSelection().toString());
        console.log(start + ", " + end);
    }

    validRange() {
        if (this.startOffset === this.endOffset) {
            return false;
        }
        if (this.startOffset > this.text.length || this.endOffset > this.text.length) {
            return false;
        }
        if (this.startOffset < 0 || this.endOffset < 0) {
            return false;
        }
        for (let i = 0; i < this.entityPositions.length; i++) {
            const e = this.entityPositions[i];
            if(
                this.startOffset < e.start_offset && this.endOffset <= e.start_offset ||
                this.endOffset > e.end_offset && this.startOffset >= e.end_offset
            ) {

            } else {
                return false;
            }
            // if ((e.start_offset <= this.startOffset) && (this.startOffset <= e.end_offset)) {
            //     return false;
            // }
            // if ((e.start_offset <= this.endOffset) && (this.endOffset <= e.end_offset)) {
            //     return false;
            // }
        }
        return true;
    }

    resetRange() {
        this.startOffset = 0;
        this.endOffset = 0;
    }

    selectEntity(entity) {
        this.currentEntity = entity;
    }

    addEntity(entityId) {
        if (this.validRange()) {
            const entitiesMap = this.entityPositions.map((o) => o.id.toString());
            const nextId = this.getNextId(entitiesMap);
            const entity = {
                id: this.entityIdPrefix + nextId,
                prob: 0.0,
                start_offset: this.startOffset,
                end_offset: this.endOffset,
                entity_id: entityId,
                recordIds: this.selectedEntities.join(','),
                relationsIds: ''
            };
            this.entityPositions.push(entity);
            this.onAddedEntity();
            // this.$emit('add-entity', entity);
        }
    }

    onAddedEntity() {
        this.chunks = this.getChunks();
    }

    removeEntity(entity) {
        console.log('entity', entity);
        const entitiesMap = this.entityPositions.map((o) => o.start_offset);
        const entityIndex = entitiesMap.indexOf(entity.start_offset);
        if (entityIndex > -1) {
            // const entity = this.entityPositions[entityIndex];
            this.entityPositions.splice(entityIndex, 1);
            this.rempveFromEntityMap(entity);
            this.onAddedEntity();
        }
        // this.$emit('remove-entity', index);
    }

    open(entity) {
        this.currentRelationsEntity = entity;
        this.animatedModel = true;
        setTimeout(() => {
            this.modalOpen = true;
        })
    }

    close() {
        this.modalOpen = false;
        setTimeout(() => {
            this.animatedModel = false;
            this.currentRelationsEntity = {};
        }, 300)
    }

    toggleRelations(entity) {
        let relationsIds = [];
        if(this.currentRelationsEntity.relationsIds) {
            relationsIds = this.currentRelationsEntity.relationsIds.split(',');
        }
        const index = relationsIds.indexOf(entity.id.toString());
        if(index > -1) {
            relationsIds.splice(index, 1);
        } else {
            relationsIds.push(entity.id);
        }
        this.currentRelationsEntity.relationsIds = relationsIds.join(',');
        this.updateEntityRelations(this.currentRelationsEntity);
    }

    createEntity(startOffset, endOffset) {
        const entity = {
            id: 0,
            entity_id: -1,
            start_offset: startOffset,
            end_offset: endOffset,
        };
        return entity;
    }

    annotate(entityId) {
        // this.$refs.annotator.addEntity(entityId);
    }

    // addEntity(annotation) {
    // this.annotations[this.pageNumber].push(annotation);
    // }

    sortedEntityPositions() {
        return this.entityPositions.sort((a, b) => a.start_offset - b.start_offset);
    }

    // getChunks1() {
    //     this.chunks = [];
    //     const res = [];
    //     let left = 0;
    //     const entitiesMap = this.entitiesTypes.map((o) => o.id);
    //     const sortedPositions = this.sortedEntityPositions();
    //     for (let i = 0; i < sortedPositions.length; i++) {
    //         const e: any = sortedPositions[i];
    //         e.real_entity = {
    //             text_color: '',
    //             background_color: '',
    //         };
    //         const currentEntity: any = this.makeEntity(left, e.start_offset);
    //         if (e.entity_id > -1) {
    //             currentEntity.id = e.id;
    //             currentEntity.entity_id = e.entity_id;
    //         }
    //         const entityIndex = entitiesMap.indexOf(currentEntity.entity);
    //         if (entityIndex > -1) {
    //             currentEntity.real_entity = this.entitiesTypes[entityIndex];
    //         }
    //         res.push(currentEntity);
    //         res.push(e);
    //         left = e.end_offset;
    //     }
    //     const l: any = this.makeEntity(left, this.text.length);
    //     l.real_entity = {
    //         text_color: '',
    //         background_color: '',
    //     };
    //     res.push(l);
    //     this.chunks = res;
    //     console.log('this.chunks', this.chunks)
    // }

    getChunks() {
        const res = [];
        let selectionPosition = 0;
        const entitiesMap = this.entitiesTypes.map((o) => o.id.toString());
        const sortedPositions = this.sortedEntityPositions();
        for (let i = 0; i < sortedPositions.length; i++) {
            const e: any = sortedPositions[i];
            if(selectionPosition < e.start_offset) {
                const chunk = this.createEntity(selectionPosition, e.start_offset);
                res.push(chunk);
            }
            this.addEntityTypeIfExist(entitiesMap, e);
            res.push(e);
            selectionPosition = e.end_offset; // go to end of current entity
        }
        const l = this.createEntity(selectionPosition, this.text.length);
        res.push(l);

        return res;
    }

    addEntityTypeIfExist(entitiesMap, e) {
        const entityIndex = entitiesMap.indexOf(e.entity_id.toString());
        if (entityIndex > -1) {
            // if this block already entityed
            e.entity_type = this.entitiesTypes[entityIndex];
            this.addToEntityMap(e);
        }
    }

    addToEntityMap(entity) {
        const key = this.text.slice(entity.start_offset, entity.end_offset);
        const entitiesMap = this.entitiesTypes.map((o) => o.id.toString());
        const entityIndex = entitiesMap.indexOf(entity.entity_id.toString());
        const res: any = {records: entity.recordIds, relationsIds: entity.relationsIds}
        if(entityIndex > -1) {
            res.id = entity.id;
            res.entity_type = this.entitiesTypes[entityIndex].name;
            res.entity_id = this.entitiesTypes[entityIndex].id;
            res.entity_color = this.entitiesTypes[entityIndex].text_color;
            res.entity_background = this.entitiesTypes[entityIndex].background_color;
            res.start_index = entity.start_offset;
            res.end_index = entity.end_offset;
        }
        this.entitiesMap[key] = res;
    }
    rempveFromEntityMap(entity) {
        const key = this.text.slice(entity.start_offset, entity.end_offset);
        delete this.entitiesMap[key];
    }
    updateEntityEntities(entity) {
        const key = this.text.slice(entity.start_offset, entity.end_offset);
        this.entitiesMap[key].records = entity.recordIds;
    }
    updateEntityRelations(entity) {
        const key = this.text.slice(entity.start_offset, entity.end_offset);
        this.entitiesMap[key].relationsIds = entity.relationsIds;
    }
    rempveRecordFromEntityMap(entity, entityId) {
        const key = this.text.slice(entity.start_offset, entity.end_offset);
        const arr = this.entitiesMap[key].records.split(',');
        const index = arr.indexOf(entityId);
        if(index > -1) {
            arr.splice(index, 1);
            this.entitiesMap[key].records = arr.join(',');

        }
    }
    // id2entity() {
    //     let id2entity = {};
    //     // default value;
    //     id2entity[-1] = {
    //         text_color: '',
    //         background_color: '',
    //     };
    //     for (let i = 0; i < this.entitiesTypes.length; i++) {
    //         const entity = this.entitiesTypes[i];
    //         id2entity[entity.id] = entity;
    //     }
    //     return id2entity;
    // }

    // initAnnotations() {
    //     const entitiesMap = this.entitiesTypes.map((o) => o.id);
    //     for (const i in this.annotations) {
    //         const obj: any = this.annotations[i];
    //         const id = obj.id;
    //         const prob = obj.prob;
    //         const entityId = obj.entity;
    //         const start_offset = obj.start_offset;
    //         const end_offset = obj.end_offset;
    //         const entityIndex = entitiesMap.indexOf(entityId);
    //         const entity = this.entitiesTypes[entityIndex];
    //         const entityBackground = entity.background_color;
    //         const entityColor = entity.text_color;
    //         const template = `
    //         <span class="entityed ${entity.text}" style="background-color: ${entity.background_color}; color: ${entity.text}">
    //             ${this.text.substr(start_offset, end_offset - start_offset)}
    //         </span>
    //         `;
    //         const newText = this.text.substr(0, start_offset - 1) + template + this.text.substr(end_offset + 1);
    //         console.log('newText', newText)
    //     }
    // }

    addRecord() {
        const recordsMap = this.records.map((o) => o.id.toString());
        const nextId = this.getNextId(recordsMap);
        const data = {
            id: this.recordIdPrefix + nextId.toString(),
            background_color: '#209cee',
            text_color: '#ffffff',
        };
        this.records.push(data)
    }

    removeRecord(id) {
        if(this.records.length === 1) {
            return;
        }
        const recordsMap = this.records.map((o) => o.id.toString());
        const recordIndex = recordsMap.indexOf(id.toString());
        if (recordIndex > -1) {
            const recordId = this.records[recordIndex].id;
            this.records.splice(recordIndex, 1);
            this.removeRecordFromSelectedEntities(recordId);
            this.removeRecordFromEntities(recordId);
        }
        // this.$emit('remove-entity', index);
    }

    removeRecordFromSelectedEntities(entityId) {
        const index = this.selectedEntities.indexOf(entityId);
        if(index > -1) {
            this.selectedEntities.splice(index, 1);
            if(!this.selectedEntities.length) {
                this.selectedEntities.push(this.records[0].id);
            }
        }
    }

    removeRecordFromEntities(entityId) {
        for (const i in this.entityPositions) {
            const arr = this.entityPositions[i].recordIds.split(',').map( Number );
            const index = arr.indexOf(entityId);
            if(index > -1) {
                arr.splice(index, 1);
                this.entityPositions[i].recordIds = arr.join(',');
                this.updateEntityEntities(this.entityPositions[i])

            }
        }
    }
    selectRecord(id) {
        const index = this.selectedEntities.indexOf(id);
        if(index > -1) {
            if(this.selectedEntities.length <= 1) {
                return;
            }
            this.selectedEntities.splice(index, 1);
        } else {
            this.selectedEntities.push(id);
        }
    }

    save() {
        // console.log(this.entityPositions);
        const data = {
            text: this.text,
            entitiesTypes: this.entitiesTypes,
            positions: this.entityPositions,
            records: this.records,
            results: this.buildResults()
        }
        this.onSave.emit(data);
    }

    buildResults() {
        const results = {};
        for(const entity_text in this.entitiesMap) {
            const text_annotation = this.entitiesMap[entity_text];
            const records = text_annotation.records.split(',');
            for(const j in records) {
                if (!results[records[j]]) {
                    results[records[j]] = {};
                }
                if (!results[records[j]][text_annotation.entity_type]) {
                    results[records[j]][text_annotation.entity_type] = [];
                }
                if (entity_text) {
                    results[records[j]][text_annotation.entity_type].push({
                        text: entity_text,
                        // id: text_annotation.id,
                        relationsIds: text_annotation.relationsIds,
                        start_index: text_annotation.start_index,
                        end_index: text_annotation.end_index
                    })
                }

            }
        }

        return results
    }

    getNextId(arr, prefix?) {
        let id = 0;
        if(arr.length) {
            id = arr.reduce((r, o) => {
                return r < o ? o : r;
            });
        }
        id = parseInt(id.toString().replace(/^[^0-9]+/, ''), 0);
        // console.log('id', id)
        id++;
        if(prefix) {
            id = prefix + id;
        }
        return id;
    }

    toggleEntitiesMap() {
        this.showEntitiesMap = !this.showEntitiesMap;
    }

    compareEntity(a: any, b: any) {
        return 0;
    }
    randomColors(t)
    {
        t = parseInt(t);
        if (t < 2)
            throw new Error('\'t\' must be greater than 1.');

        // distribute the colors evenly on
        // the hue range (the 'H' in HSV)
        const i = 360 / (t - 1);

        // hold the generated colors
        const r = [];
        let sv = 70;
        for (let x = 0; x < t; x++) {
            // alternate the s, v for more
            // contrast between the colors.
            sv = sv > 90 ? 70 : sv+10;
            r.push(this.hsvToRgb(i * x, sv, sv));
        }
        return r;
    }

    hsvToRgb(h,s,v)
    {
        let r, g, b;
        let i;
        let f, p, q, t;

        // Make sure our arguments stay in-range
        h = Math.max(0, Math.min(360, h));
        s = Math.max(0, Math.min(100, s));
        v = Math.max(0, Math.min(100, v));

        // We accept saturation and value arguments from 0 to 100 because that's
        // how Photoshop represents those values. Internally, however, the
        // saturation and value are calculated from a range of 0 to 1. We make
        // That conversion here.
        s /= 100;
        v /= 100;

        if (s == 0) {
            // Achromatic (grey)
            r = g = b = v;
            return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
        }

        h /= 60; // sector 0 to 5
        i = Math.floor(h);
        f = h - i; // factorial part of h
        p = v * (1 - s);
        q = v * (1 - s * f);
        t = v * (1 - s * (1 - f));

        switch (i) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;

            case 1:
                r = q;
                g = v;
                b = p;
                break;

            case 2:
                r = p;
                g = v;
                b = t;
                break;

            case 3:
                r = p;
                g = q;
                b = v;
                break;

            case 4:
                r = t;
                g = p;
                b = v;
                break;

            default: // case 5:
                r = v;
                g = p;
                b = q;
        }

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

}
