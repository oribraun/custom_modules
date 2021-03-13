import {EventEmitter, Component, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {count} from 'rxjs/operators';
import {NameEntityRecognitionService} from "../name-entity-recognition.service";

declare var document: any;
@Component({
    selector: 'lib-name-entity-recognition',
    templateUrl: './name-entity-recognition.component.html',
    styleUrls: ['./name-entity-recognition.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class NameEntityRecognitionComponent implements OnInit {

    @ViewChild('nameEntityRecognition') el;
    @Output() onSave: EventEmitter<any> = new EventEmitter<any>();
    @Input() text = 'Barack Hussein Obama II (born August 4, 1961) is an American attorney and politician who served as the 44th President of the United States from January 20, 2009, to January 20, 2017. A member of the Democratic Party, he was the first African American to serve as president. He was previously a United States Senator from Illinois and a member of the Illinois State Senate.';
    @Input() labels: any = [
        {
            text: 'first',
            // background_color: '#209cee',
            // text_color: '#ffffff',
        },
        {
            text: 'last',
            // background_color: '#ffcc00',
            // text_color: '#333333',
        },
        {
            text: 'prefix',
            // background_color: '#333333',
            // text_color: '#ffffff',
        },
        {
            text: 'address',
            // background_color: '#33cc99',
            // text_color: '#ffffff',
        },
        {
            text: 'phones',
            // background_color: '#ff3333',
            // text_color: '#ffffff',
        },
        {
            text: 'emails',
            // background_color: '#9933ff',
            // text_color: '#ffffff',
        },
    ];
    colors = [
        'rgb(204, 41, 41)',
        'rgb(230, 43, 23)',
        'rgb(255, 49, 0)',
        'rgb(179, 89, 54)',
        'rgb(204, 103, 41)',
        'rgb(230, 121, 23)',
        'rgb(255, 146, 0)',
        'rgb(179, 137, 54)',
        'rgb(204, 165, 41)',
        'rgb(230, 200, 23)',
        'rgb(255, 243, 0)',
        'rgb(173, 179, 54)',
        'rgb(181, 204, 41)',
        'rgb(180, 230, 23)',
        'rgb(170, 255, 0)',
        'rgb(125, 179, 54)',
        'rgb(119, 204, 41)',
        'rgb(102, 230, 23)',
        'rgb(73, 255, 0)',
        'rgb(77, 179, 54)',
        'rgb(56, 204, 41)',
        'rgb(23, 230, 23)',
        'rgb(0, 255, 24)',
        'rgb(54, 179, 77)',
        'rgb(41, 204, 87)',
        'rgb(23, 230, 102)',
        'rgb(0, 255, 121)',
        'rgb(54, 179, 125)',
        'rgb(41, 204, 150)',
        'rgb(23, 230, 180)',
        'rgb(0, 255, 219)',
        'rgb(54, 179, 173)',
        'rgb(41, 196, 204)',
        'rgb(23, 200, 230)',
        'rgb(0, 194, 255)',
        'rgb(54, 137, 179)',
        'rgb(41, 134, 204)',
        'rgb(23, 121, 230)',
        'rgb(0, 97, 255)',
        'rgb(54, 89, 179)',
        'rgb(41, 72, 204)',
        'rgb(23, 43, 230)',
        'rgb(0, 0, 255)',
        'rgb(65, 54, 179)',
        'rgb(72, 41, 204)',
        'rgb(82, 23, 230)',
        'rgb(97, 0, 255)',
        'rgb(113, 54, 179)',
        'rgb(134, 41, 204)',
        'rgb(161, 23, 230)',
        'rgb(194, 0, 255)',
        'rgb(161, 54, 179)',
        'rgb(196, 41, 204)',
        'rgb(230, 23, 220)',
        'rgb(255, 0, 219)',
        'rgb(179, 54, 149)',
        'rgb(204, 41, 150)',
        'rgb(230, 23, 141)',
        'rgb(255, 0, 121)',
        'rgb(179, 54, 101)',
        'rgb(204, 41, 87)',
        'rgb(230, 23, 62)',
        'rgb(255, 0, 24)',
        'rgb(179, 54, 179)'
    ];
    startOffset = 0;
    endOffset = 0;
    chunks: any[] = [];
    // entityPositions = [{startOffset: 10, endOffset: 15, label_id: 1}];
    entities = [
        {
            id: 1,
            background_color: '#209cee',
            text_color: '#ffffff',
        },
    ];
    selectedEntities = [1];
    labelPositions: any = [
        {
            end_offset: 23,
            entityIds: '1',
            id: 1,
            label_id: 1,
            prob: 0,
            start_offset: 0,
        },
        {
            id: 2,
            prob: 0.0,
            label_id: 2,
            entityIds: '1',
            start_offset: 121,
            end_offset: 138,
        },

    ];
    labelsMap = {}
    constructor(
        private nameEntityRecognitionService: NameEntityRecognitionService
    ) {
        this.colors = this.nameEntityRecognitionService.colors;
    }

    ngOnInit(): void {
        // const colors = this.randomColors(this.labels.length)
        // colors = colors.sort( () => .5 - Math.random();
        this.generateLabels(this.colors);
        this.chunks = this.getChunks();
        // this.initAnnotations();
    }

    generateLabels(colors) {
        let count = 1;
        for (const i in this.labels) {
            const color = colors[count - 1];
            this.labels[i].id = count;
            // this.labels[i].background_color = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            if (!this.labels[i].background_color) {
                this.labels[i].background_color = color;
            }
            if (!this.labels[i].text_color) {
                this.labels[i].text_color = this.nameEntityRecognitionService.getTextColor(color);
            }
            count++
        }
        // console.log('this.labels', this.labels)
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
        for (let i = 0; i < this.labelPositions.length; i++) {
            const e = this.labelPositions[i];
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

    addLabel(labelId) {
        if (this.validRange()) {
            const labelMap = this.labelPositions.map((o) => o.id);
            const maxId = Math.max.apply(null, labelMap) | 0;
            const label = {
                id: maxId + 1,
                prob: 0.0,
                start_offset: this.startOffset,
                end_offset: this.endOffset,
                label_id: labelId,
                entityIds: this.selectedEntities.join(','),
            };
            this.labelPositions.push(label);
            this.onAddedLabel();
            // this.$emit('add-label', label);
        }
    }

    onAddedLabel() {
        this.chunks = this.getChunks();
    }

    removeLabel(label) {
        console.log('label', label);
        const labelMap = this.labelPositions.map((o) => o.start_offset);
        const labelIndex = labelMap.indexOf(label.start_offset);
        if (labelIndex > -1) {
            const label = this.labelPositions[labelIndex];
            this.labelPositions.splice(labelIndex, 1);
            this.rempveFromLabelMap(label);
            this.onAddedLabel();
        }
        // this.$emit('remove-label', index);
    }

    createLabel(startOffset, endOffset) {
        const label = {
            id: 0,
            label_id: -1,
            start_offset: startOffset,
            end_offset: endOffset,
        };
        return label;
    }

    annotate(labelId) {
        // this.$refs.annotator.addLabel(labelId);
    }

    // addLabel(annotation) {
    // this.annotations[this.pageNumber].push(annotation);
    // }

    sortedLabelPositions() {
        return this.labelPositions.sort((a, b) => a.start_offset - b.start_offset);
    }

    // getChunks1() {
    //     this.chunks = [];
    //     const res = [];
    //     let left = 0;
    //     const labelMap = this.labels.map((o) => o.id);
    //     const sortedPositions = this.sortedLabelPositions();
    //     for (let i = 0; i < sortedPositions.length; i++) {
    //         const e: any = sortedPositions[i];
    //         e.real_label = {
    //             text_color: '',
    //             background_color: '',
    //         };
    //         const currentLabel: any = this.makeLabel(left, e.start_offset);
    //         if (e.label_id > -1) {
    //             currentLabel.id = e.id;
    //             currentLabel.label_id = e.label_id;
    //         }
    //         const labelIndex = labelMap.indexOf(currentLabel.label);
    //         if (labelIndex > -1) {
    //             currentLabel.real_label = this.labels[labelIndex];
    //         }
    //         res.push(currentLabel);
    //         res.push(e);
    //         left = e.end_offset;
    //     }
    //     const l: any = this.makeLabel(left, this.text.length);
    //     l.real_label = {
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
        const labelIds = this.labels.map((o) => o.id);
        const sortedPositions = this.sortedLabelPositions();
        for (let i = 0; i < sortedPositions.length; i++) {
            const e: any = sortedPositions[i];
            if(selectionPosition < e.start_offset) {
                const chunk = this.createLabel(selectionPosition, e.start_offset);
                res.push(chunk);
            }
            this.setLabeledLabel(labelIds, e);
            res.push(e);
            selectionPosition = e.end_offset; // go to end of current label
        }
        const l = this.createLabel(selectionPosition, this.text.length);
        res.push(l);

        return res;
    }

    setLabeledLabel(labelIds, e) {
        const labelIndex = labelIds.indexOf(e.label_id);
        if (labelIndex > -1) {
            // if this block already labeled
            e.label = this.labels[labelIndex];
            this.addToLabelMap(e);
        }
    }

    addToLabelMap(label) {
        const key = this.text.slice(label.start_offset, label.end_offset);
        const labelsMap = this.labels.map((o) => o.id);
        const labelIndex = labelsMap.indexOf(label.label_id);
        const res: any = {entities: label.entityIds}
        if(labelIndex > -1) {
            res.label = this.labels[labelIndex].text;
            res.label_id = this.labels[labelIndex].id;
            res.start_index = label.start_offset;
            res.end_index = label.end_offset;
        }
        this.labelsMap[key] = res;
    }
    rempveFromLabelMap(label) {
        const key = this.text.slice(label.start_offset, label.end_offset);
        delete this.labelsMap[key];
    }
    updateLabelEntities(label) {
        const key = this.text.slice(label.start_offset, label.end_offset);
        this.labelsMap[key].entities = label.entityIds;
    }
    rempveEntityFromLabelMap(label, entityId) {
        const key = this.text.slice(label.start_offset, label.end_offset);
        const arr = this.labelsMap[key].entities.split(',');
        const index = arr.indexOf(entityId);
        if(index > -1) {
            arr.splice(index, 1);
            this.labelsMap[key].entities = arr.join(',');

        }
    }
    // id2label() {
    //     let id2label = {};
    //     // default value;
    //     id2label[-1] = {
    //         text_color: '',
    //         background_color: '',
    //     };
    //     for (let i = 0; i < this.labels.length; i++) {
    //         const label = this.labels[i];
    //         id2label[label.id] = label;
    //     }
    //     return id2label;
    // }

    // initAnnotations() {
    //     const labelMap = this.labels.map((o) => o.id);
    //     for (const i in this.annotations) {
    //         const obj: any = this.annotations[i];
    //         const id = obj.id;
    //         const prob = obj.prob;
    //         const labelId = obj.label;
    //         const start_offset = obj.start_offset;
    //         const end_offset = obj.end_offset;
    //         const labelIndex = labelMap.indexOf(labelId);
    //         const label = this.labels[labelIndex];
    //         const labelBackground = label.background_color;
    //         const labelColor = label.text_color;
    //         const template = `
    //         <span class="labeled ${label.text}" style="background-color: ${label.background_color}; color: ${label.text}">
    //             ${this.text.substr(start_offset, end_offset - start_offset)}
    //         </span>
    //         `;
    //         const newText = this.text.substr(0, start_offset - 1) + template + this.text.substr(end_offset + 1);
    //         console.log('newText', newText)
    //     }
    // }

    addEntity() {
        const labelMap = this.entities.map((o) => o.id);
        const maxId = Math.max.apply(null, labelMap) | 0;
        const data = {
            id: maxId + 1,
            background_color: '#209cee',
            text_color: '#ffffff',
        };
        this.entities.push(data)
    }

    removeEntity(id) {
        if(this.entities.length === 1) {
            return;
        }
        const labelMap = this.entities.map((o) => o.id);
        const labelIndex = labelMap.indexOf(id);
        if (labelIndex > -1) {
            const entityId = this.entities[labelIndex].id;
            this.entities.splice(labelIndex, 1);
            this.removeEntityFromSelectedLabels(entityId)
            this.removeEntityFromLabels(entityId)
        }
        // this.$emit('remove-label', index);
    }

    removeEntityFromSelectedLabels(entityId) {
        const index = this.selectedEntities.indexOf(entityId);
        if(index > -1) {
            this.selectedEntities.splice(index, 1);
        }
    }

    removeEntityFromLabels(entityId) {
        for (const i in this.labelPositions) {
            const arr = this.labelPositions[i].entityIds.split(',').map( Number );
            const index = arr.indexOf(entityId);
            if(index > -1) {
                arr.splice(index, 1);
                this.labelPositions[i].entityIds = arr.join(',');
                this.updateLabelEntities(this.labelPositions[i])

            }
        }
    }
    selectEntity(id) {
        const index = this.selectedEntities.indexOf(id);
        if(index > -1) {
            this.selectedEntities.splice(index, 1);
        } else {
            this.selectedEntities.push(id);
        }
    }

    save() {
        // console.log(this.labelPositions);
        const data = {
            text: this.text,
            labels: this.labels,
            positions: this.labelPositions,
            entities: this.entities,
            results: this.buildResults()
        }
        this.onSave.emit(data);
    }

    buildResults() {
        const results = {};
        for(const label_text in this.labelsMap) {
            const text_annotation = this.labelsMap[label_text];
            const entities = text_annotation.entities.split(',');
            for(const j in entities) {
                if (!results[entities[j]]) {
                    results[entities[j]] = {};
                }
                if (!results[entities[j]][text_annotation.label]) {
                    results[entities[j]][text_annotation.label] = [];
                }
                if (label_text) {
                    results[entities[j]][text_annotation.label].push({
                        text: label_text,
                        start_index: text_annotation.start_index,
                        end_index: text_annotation.end_index
                    })
                }

            }
        }

        return results
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
