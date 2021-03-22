import {
    EventEmitter,
    Component,
    Input,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation,
    AfterViewInit, HostListener, OnChanges, SimpleChanges
} from '@angular/core';
import {count} from 'rxjs/operators';
import {NameEntityRecognitionService} from '../name-entity-recognition.service';
import {style, trigger, state, transition, animate} from '@angular/animations';

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
export class NameEntityRecognitionComponent implements OnInit, AfterViewInit, OnChanges {

    @ViewChild('nameEntityRecognition') el;
    @ViewChild('panel') panel;
    @ViewChild('header') header;
    @ViewChild('content') content;
    @ViewChild('buttons') buttons;
    @Output() onSave: EventEmitter<any> = new EventEmitter<any>();
    // @Input() text = 'Barack Hussein Obama II (born August 4, 1961) is an American attorney and politician who served as the 44th President of the United States from January 20, 2009, to January 20, 2017. A member of the Democratic Party, he was the first African American to serve as president. He was previously a United States Senator from Illinois and a member of the Illinois State Senate.';
    @Input() text = '';
    @Input() entitiesTypes: any = [];
    charsMap = [];
    charsMapInProgress = false;
    charsMapTimeout: any;
    colors = [];
    startOffset = 0;
    endOffset = 0;
    chunks: any[] = [];
    textIndent = {}
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
    animatedEntitiesModel = false;
    modalOpen = false;
    entityPositions: any = [
        // {
        //     id: 'E1',
        //     prob: 0,
        //     start_offset: 7,
        //     end_offset: 14,
        //     entity_id: '1',
        //     recordIds: 'R1',
        //     relationsIds: ''
        // }
    ];
    entitiesMap:any = [];
    showEntitiesMap = false;
    onContentScroll = false;
    onContentScrollTimeout;
    constructor(
        private nameEntityRecognitionService: NameEntityRecognitionService
    ) {
        this.colors = this.nameEntityRecognitionService.colors;
    }

    ngOnInit(): void {
        // const colors = this.randomColors(this.entitiesTypes.length)
        // colors = colors.sort( () => .5 - Math.random();
        this.setCharsMap();
        this.initPositions();
        this.generateEntities(this.colors);
        // this.chunks = this.getChunks();
        // this.initAnnotations();
    }

    scrollPos = 0;
    ColScroll(event: any) {
        const pos = event.target.scrollTop;
        this.scrollPos = Math.floor(pos / 132);
    }

    contentScroll() {
        this.onContentScroll = true;
        clearTimeout(this.onContentScrollTimeout);
        this.onContentScrollTimeout = setTimeout(() => {
            this.onContentScroll = false;
        })
    }

    ngAfterViewInit(): void {
        this.initFixedHeader();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes.entitiesTypes && !changes.entitiesTypes.firstChange) {
            this.resetPosAndMap();
            this.resetChartMap();
            // this.setCharsMap2(0, '', true);
            // this.charsMapInProgress = true;
            // this.setCharsMap2(0, '', true);
            this.setCharsMap();
            this.initPositions();
            this.generateEntities(this.colors);
            setTimeout(() => {
                this.initFixedHeader();
            })
            // console.log('entitiesTypes' , this.entitiesTypes);
            if(!changes.entitiesTypes.firstChange) {

            }
        }
        if(changes.text && !changes.text.firstChange) {
            this.resetPosAndMap();
            this.resetChartMap();
            this.setCharsMap();
        }
    }

    resetPosAndMap() {
        this.entityPositions = [];
        this.entitiesMap = [];
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.initFixedHeader();
    }


    initFixedHeader() {
        const parentHeight = this.panel.nativeElement.parentNode.clientHeight;
        const panelHeight = this.panel.nativeElement.clientHeight;
        const headerHeight = this.header.nativeElement.clientHeight;
        const buttonsHeight = this.buttons.nativeElement.clientHeight;
        this.panel.nativeElement.style.paddingTop = headerHeight + 'px';
        this.panel.nativeElement.style.paddingBottom = buttonsHeight + 'px';
        this.content.nativeElement.style.height = (parentHeight - headerHeight - buttonsHeight) + 'px';
        // this.content.nativeElement.style.height = (panelHeight - headerHeight - buttonsHeight) + 'px';
        // this.content.nativeElement.style.height = headerHeight + 'px';
        // console.log('headerHeight', headerHeight)
    }

    resetChartMap() {
        clearTimeout(this.charsMapTimeout)
        this.charsMap = [];
    }
    setCharsMap2(i, startChar, show) {
        if(i < this.text.length - 1) {
            let startTag = false;
            let endTag = false;
            if(!startChar) {
                if (this.text[i] === '<') {
                    startChar = this.text[i];
                    show = false;
                    startTag = true;
                }
            }
            if(startChar) {
                if (this.text[i] === '>') {
                    endTag = true;
                }
            }
            this.charsMap.push({
                char: this.text[i],
                show: show,
                startTag: startTag,
                endTag: endTag,
                entities: '',
                classes: '',
                colors: '',
                backgrounds: ''
            })
            if(startChar) {
                if (this.text[i] === '>') {
                    show = true;
                    startChar = '';
                }
            }
            i++;
            this.charsMapTimeout = setTimeout(() => {
                this.setCharsMap2(i, startChar, show);
            })
        } else {
            this.charsMapInProgress = false;
            this.initPositions();
        }
    }
    setCharsMap3(pos, startChar, show) {
        const step = 1000;
        if (pos < this.text.length - 1) {
            for (let i = pos; i < pos + step; i++) {
                let startTag = false;
                let endTag = false;
                if (!startChar) {
                    if (this.text[i] === '<') {
                        startChar = this.text[i];
                        show = false;
                        startTag = true;
                    }
                }
                if (startChar) {
                    if (this.text[i] === '>') {
                        endTag = true;
                    }
                }
                this.charsMap.push({
                    char: this.text[i],
                    show: show,
                    startTag: startTag,
                    endTag: endTag,
                    entities: '',
                    classes: '',
                    colors: '',
                    backgrounds: ''
                })
                if (startChar) {
                    if (this.text[i] === '>') {
                        show = true;
                        startChar = '';
                    }
                }
            }
            pos = pos + step;
            requestAnimationFrame(() => {
                this.setCharsMap3(pos, startChar, show);
            })
        } else {
            this.charsMapInProgress = false;
            this.initPositions();
        }
    }

    setCharsMap() {
        this.charsMapInProgress = true;
        this.charsMap = [];
        setTimeout(() => {
            let startChar = '';
            let show = true;
            for(let i = 0; i < this.text.length; i++) {
                let startTag = false;
                let endTag = false;
                if(!startChar) {
                    if (this.text[i] === '<') {
                        startChar = this.text[i];
                        show = false;
                        startTag = true;
                    }
                }
                if(startChar) {
                    if (this.text[i] === '>') {
                        endTag = true;
                    }
                }
                this.charsMap.push({
                    char: this.text[i],
                    show: show,
                    startTag: startTag,
                    endTag: endTag,
                    entities: '',
                    classes: '',
                    colors: '',
                    backgrounds: ''
                })
                if(startChar) {
                    if (this.text[i] === '>') {
                        show = true;
                        startChar = '';
                    }
                }
            }
            this.charsMapInProgress = false;
        })
    }

    initPositions() {
        for (const i in this.entityPositions) {
            const entitiesMap = this.entitiesTypes.map((o) => o.id.toString());
            const entityIndex = entitiesMap.indexOf(this.entityPositions[i].entity_id.toString());
            if(entityIndex > -1) {
                const entity_type = this.entitiesTypes[entityIndex];
                const start = this.entityPositions[i].start_offset;
                const end = this.entityPositions[i].end_offset;
                this.entityPositions[i].entity_type = entity_type;
                this.addEntityToCharsMap(entity_type, this.entityPositions[i].id, start, end);
                this.addToEntityMap(this.entityPositions[i]);
            }
        }
    }

    addEntityToCharsMap(entity, entity_id, start, end) {
        let cls = '';
        for(let i = start; i < end; i++) {
            if(i === start) {
                cls = 'first'
            } else if (i === end - 1) {
                cls = 'last'
            } else {
                cls = '';
            }
            // if(this.charsMap[i].entities.indexOf(entity.id) === -1) {
                const charsMap: any = {...this.charsMap[i]};
                const entities = charsMap.entities ? charsMap.entities.split(',') : [];
                entities.push(entity.id);
                charsMap.entities = entities.join(',')
                // const colors = charsMap.colors ? charsMap.colors.split(',') : [];
                // colors.push(entity.background_color);
                // charsMap.colors = colors.join(',');
                if(!charsMap.backgrounds) {
                    charsMap.backgrounds = [];
                }
                if(!charsMap.colors) {
                    charsMap.colors = [];
                }
                charsMap.backgrounds.push(entity.background_color);
                charsMap.colors.push(entity.text_color);
                const classes = charsMap.classes ? charsMap.classes.split(' ') : [];
                classes.push('labeled');
                if(cls) {
                    classes.push(entity.id + '_' + entity_id + '_' + cls);
                    if(start === end - 1) {
                        classes.push(entity.id + '_' + entity_id + '_last');
                    }
                }
                charsMap.classes = classes.join(' ')
                this.charsMap[i] = charsMap;
            // }
            // console.log(this.charsMap, this.charsMap)
        }
    }

    removeEntityFromCharsMap(entity, entity_id, start, end) {
        for(let i = start; i < end; i++) {
            if(this.charsMap[i].entities.indexOf(entity.id) > -1) {
                const entities = this.charsMap[i].entities.split(',');
                const index = entities.indexOf(entity.id);
                if(index > -1) {
                    const charsMap: any = {...this.charsMap[i]};
                    entities.splice(index, 1);
                    // if(entities.indexOf(entity.id) === -1) {
                        // const colors = charsMap.colors.split('),');
                        const bgColorIndex = charsMap.backgrounds.indexOf(entity.background_color);
                        if(bgColorIndex > -1) {
                            charsMap.backgrounds.splice(bgColorIndex, 1);
                        }
                        const colorIndex = charsMap.colors.indexOf(entity.text_color);
                        if(colorIndex > -1) {
                            charsMap.colors.splice(colorIndex, 1);
                        }
                        // console.log('charsMap.colors', charsMap.colors)
                        // console.log('charsMap.classes', charsMap.classes)
                        const classes = charsMap.classes.split(' ');
                        const lastIndex = classes.indexOf(entity.id + '_' + entity_id + '_last');
                        const firstIndex = classes.indexOf(entity.id + '_' + entity_id + '_first');
                        // console.log('lastIndex', lastIndex)
                        // console.log('firstIndex', firstIndex)
                        if(lastIndex > -1) {
                            classes.splice(lastIndex, 1);
                            charsMap.classes = classes.join(' ');
                        }
                        if(firstIndex > -1) {
                            classes.splice(firstIndex, 1);
                            charsMap.classes = classes.join(' ');
                        }
                        const labeledIndex = classes.indexOf('labeled');
                        if(labeledIndex > -1) {
                            classes.splice(labeledIndex, 1);
                            charsMap.classes = classes.join(' ');
                        }
                    // }
                    charsMap.entities = entities.join(',');
                    this.charsMap[i] = charsMap;
                }
            }
        }
        // this.setCharsMap();
        // this.initPositions();
    }

    addEntityToPositions(entity) {
        const entitiesMap = this.entityPositions.map((o) => o.id.toString());
        const nextId = this.getNextId(entitiesMap);
        const position = {
            id: this.entityIdPrefix + nextId,
            prob: 0.0,
            start_offset: this.startOffset,
            end_offset: this.endOffset,
            entity_id: entity.id,
            entity_type: entity,
            recordIds: this.selectedEntities.join(','),
            relationsIds: ''
        };
        this.entityPositions.push(position);

        // console.log('this.entityPositions', this.entityPositions)
        this.addToEntityMap(position);
        return position;
    }

    removeEntitiesFromPositions(last) {
        const sort = this.entityPositions.sort((a, b) => {
            return a.id > b.id ? -1 : 1;
        });
        const map = sort.map((o) => o.end_offset);
        const index = map.indexOf(last);
        if(index > -1) {
            const entityToRemove = this.entityPositions[index];
            this.entityPositions.splice(index, 1);
            this.removeFromEntityMap(entityToRemove);
            const entitiesMap = this.entitiesTypes.map((o) => o.id.toString());
            const entityIndex = entitiesMap.indexOf(entityToRemove.entity_id.toString());
            if(entityIndex > -1) {
                this.removeEntityFromCharsMap(this.entitiesTypes[entityIndex], entityToRemove.id, entityToRemove.start_offset, entityToRemove.end_offset);
            }
        }
        // console.log('sort', sort)
        // console.log('map', map)
        // console.log('index', index);
        // console.log('last', last);
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
            // console.log('range', range)
            // console.log('preSelectionRange', preSelectionRange)
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
        // console.log(start, end);
        if(this.currentEntity && start < end) {
            const newPos = this.addEntityToPositions(this.currentEntity);
            this.addEntityToCharsMap(this.currentEntity, newPos.id, start, end);
            this.clearSelection();
            // this.addEntity(this.currentEntity.id);
        }
    }

    clearSelection() {
        if (window.getSelection) {
            if (window.getSelection().empty) {  // Chrome
                window.getSelection().empty();
            } else if (window.getSelection().removeAllRanges) {  // Firefox
                window.getSelection().removeAllRanges();
            }
        } else if (document.selection) {  // IE?
            document.selection.empty();
        }
    }

    openEntity(charIndex) {
        const sort = this.entityPositions.sort((a, b) => {
            return a.id > b.id ? -1 : 1;
        });
        let index = -1;
        for(const i in sort) {
            if(sort[i].start_offset <= charIndex && sort[i].end_offset >= charIndex) {
                index = parseInt(i,0)
                break;
            }
        }
        if(index > -1) {
            const currentEntity = this.entityPositions[index];
            if(this.startOffset === this.endOffset) {
                this.currentRelationsEntity = currentEntity;
                this.animatedModel = true;
                setTimeout(() => {
                    this.modalOpen = true;
                })
            }
        }
    }
    mouseUp(e) {
        const sel = window.getSelection().getRangeAt(0);
        console.log('sel', sel)
        const parent = sel.startContainer.parentNode;
        const start = window.getSelection().anchorOffset;
        const end = window.getSelection().focusOffset;
        if (start < end) {
            const start = window.getSelection().anchorOffset;
            const end = window.getSelection().focusOffset;
        } else {
            const start = window.getSelection().focusOffset;
            const end = window.getSelection().anchorOffset;
        }
        console.log(window.getSelection().toString());
        console.log(start + ', ' + end);
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
                // return false;
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
            let indent = 0;
            console.log('this.startOffset', this.startOffset)
            console.log('this.textIndent', this.textIndent)
            for( const pos in this.textIndent) {
                if (parseInt(pos, 0) <= this.startOffset) {
                    indent += this.textIndent[pos];
                }
            }
            console.log('indent before add', indent)
            const entitiesMap = this.entityPositions.map((o) => o.id.toString());
            const nextId = this.getNextId(entitiesMap);
            const entity = {
                id: this.entityIdPrefix + nextId,
                prob: 0.0,
                start_offset: this.startOffset + indent,
                end_offset: this.endOffset + indent,
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
        this.entitiesMap = [];
        this.chunks = this.getChunks();
    }

    removeEntity(entity) {
        console.log('entity', entity);
        const entitiesMap = this.entityPositions.map((o) => o.id);
        const entityIndex = entitiesMap.indexOf(entity.id);
        if (entityIndex > -1) {
            // const e = this.entityPositions[entityIndex];
            // console.log('this.textIndent[entity.indent_from]', this.textIndent[entity.indent_from])
            // console.log('entity.indent', entity.indent)
            if (entity.indent_from) {
                this.textIndent[entity.indent_from] -= entity.indent;
            }
            this.entityPositions.splice(entityIndex, 1);
            this.removeFromEntityMap(entity);
            this.onAddedEntity();
        }
        // this.$emit('remove-entity', index);
    }

    open(entity) {
        if(this.startOffset === this.endOffset) {
            this.currentRelationsEntity = entity;
            this.animatedModel = true;
            setTimeout(() => {
                this.modalOpen = true;
            })
        }
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
        let selectionStartPosition = 0;
        let selectionEndPosition = 0;
        const entitiesMap = this.entitiesTypes.map((o) => o.id.toString());
        const sortedPositions = this.sortedEntityPositions();
        for (const i in this.textIndent) {
            this.textIndent[i] = 0;
        }
        for (let i = 0; i < sortedPositions.length; i++) {
            const e: any = sortedPositions[i];
            let indent = 0;
            if(e.start_offset <= selectionEndPosition) {
                indent = e.end_offset - e.start_offset
                if(e.end_offset <= selectionEndPosition) {
                    console.log('on middle')
                    indent = indent + (selectionEndPosition - e.end_offset);
                }
                console.log('indent', indent)
                const from = selectionEndPosition;
                console.log('form', from);
                if(!this.textIndent[from]) {
                    this.textIndent[from] = 0;
                    // this.textIndent[from + (e.end_offset - e.start_offset)] = 0;
                }
                console.log('from + e.end_offset', from + (e.end_offset - e.start_offset))
                this.textIndent[from] += indent;
                // this.textIndent[from + (e.end_offset - e.start_offset)] -= (indent - (e.end_offset - e.start_offset));
                console.log('e.end_offset', e.end_offset)
                console.log('this.textIndent[from]', this.textIndent[from])
                e.indent = indent;
                e.indent_from = from;
            }
            console.log('e', e)
            // if(selectionEndPosition < e.start_offset) {
                const chunk: any = this.createEntity(selectionEndPosition, e.start_offset);
                res.push(chunk);
            // }
            this.addEntityTypeIfExist(entitiesMap, e);
            res.push(e);
            // if(selectionEndPosition <= e.end_offset) {
                selectionEndPosition = e.end_offset; // go to end of current entity
            // }
            selectionStartPosition = e.start_offset; // go to end of current entity
        }
        const l = this.createEntity(selectionEndPosition, this.text.length);
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
        const res: any = {records: entity.recordIds, relationsIds: entity.relationsIds};
        if(entityIndex > -1) {
            res.id = entity.id;
            res.entity_type = this.entitiesTypes[entityIndex].name;
            res.entity_id = this.entitiesTypes[entityIndex].id;
            res.entity_color = this.entitiesTypes[entityIndex].text_color;
            res.entity_background = this.entitiesTypes[entityIndex].background_color;
            res.start_index = entity.start_offset;
            res.end_index = entity.end_offset;
        }
        this.entitiesMap.push({key, id: entity.id, res});
    }
    removeFromEntityMap(entity) {
        // const key = this.text.slice(entity.start_offset, entity.end_offset);
        const map = this.entitiesMap.map((o) => o.id);
        const index = map.indexOf(entity.id);
        if(index > -1) {
            this.entitiesMap.splice(index, 1);
        }
        // delete this.entitiesMap[key];
    }
    updateEntityRecords(entity) {
        const map = this.entitiesMap.map((o) => o.id);
        const index = map.indexOf(entity.id);
        if(index > -1) {
            this.entitiesMap[index].res.records = entity.recordIds;
        }
        // const key = this.text.slice(entity.start_offset, entity.end_offset);
        // this.entitiesMap[key].records = entity.recordIds;
    }
    updateEntityRelations(entity) {
        const map = this.entitiesMap.map((o) => o.id);
        const index = map.indexOf(entity.id);
        if(index > -1) {
            this.entitiesMap[index].res.relationsIds = entity.relationsIds;
        }
        // const key = this.text.slice(entity.start_offset, entity.end_offset);
        // this.entitiesMap[key].relationsIds = entity.relationsIds;
    }
    rempveRecordFromEntityMap(entity, entityId) {
        // const key = this.text.slice(entity.start_offset, entity.end_offset);
        // const arr = this.entitiesMap[key].records.split(',');
        // const index = arr.indexOf(entityId);
        // if(index > -1) {
        //     arr.splice(index, 1);
        //     this.entitiesMap[key].records = arr.join(',');
        //
        // }

        const map = this.entitiesMap.map((o) => o.id);
        const index = map.indexOf(entity.id);
        if(index > -1) {
            const e = this.entitiesMap[index].records;
            const arr = e.records.split(',');
            const i = arr.indexOf(entityId);
            if(i > -1) {
                arr.splice(i, 1);
                e.records = arr.join(',');

            }
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

    removeRecordFromEntities(recordId) {
        for (const i in this.entityPositions) {
            const arr = this.entityPositions[i].recordIds.split(',').map( String );
            const index = arr.indexOf(recordId.toString());
            if(index > -1) {
                arr.splice(index, 1);
                this.entityPositions[i].recordIds = arr.join(',');
                this.updateEntityRecords(this.entityPositions[i])

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

    showResults() {
        this.animatedEntitiesModel = true;
        setTimeout(() => {
            this.showEntitiesMap = true;
        })
    }

    hideResults() {
        this.showEntitiesMap = false;
        setTimeout(() => {
            this.animatedEntitiesModel = false;
            this.currentRelationsEntity = {};
        }, 300)
    }

    buildResults() {
        const results = {};
        for(const i in this.entitiesMap) {
            const text_annotation = this.entitiesMap[i];
            const records = text_annotation.res.records.split(',');
            for(const j in records) {
                if (!results[records[j]]) {
                    results[records[j]] = {};
                }
                if (!results[records[j]][text_annotation.res.entity_type]) {
                    results[records[j]][text_annotation.res.entity_type] = [];
                }
                if (text_annotation.key) {
                    results[records[j]][text_annotation.res.entity_type].push({
                        text: text_annotation.key,
                        // id: text_annotation.id,
                        relationsIds: text_annotation.res.relationsIds,
                        start_index: text_annotation.res.start_index,
                        end_index: text_annotation.res.end_index
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
