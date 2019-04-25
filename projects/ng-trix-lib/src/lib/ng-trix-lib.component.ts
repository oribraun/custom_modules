import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor} from "@angular/forms";

@Component({
    selector: 'trix-editor',
    template: '',
    styleUrls: [],
    encapsulation: ViewEncapsulation.None
})
export class NgTrixLibComponent implements ControlValueAccessor, OnInit {

    @Input() ngModel: any;
    @Input() input: any;
    @Output() ngModelChange = new EventEmitter();
    private _element: ElementRef;
    constructor(element: ElementRef) {
        this._element = element;
    }

    ngOnInit(): void {
        this._element.nativeElement.innerHTML = this.ngModel || '';
        this._element.nativeElement.addEventListener('keyup', () => {
            this.ngModelChange.emit(this._element.nativeElement.innerHTML);
        });
        console.log(this.getEditor());
        console.log(this.getDocument());
        setTimeout(() => {
            this.setSelectedRange(this.getDocument().length - 1);
        });
    }

    getElement(): any {
        return this._element.nativeElement;
    }

    getEditor(): any {
        return this.getElement().editor;
    }

    getDocument(): any {
        return this.getElement().editor.getDocument().toString();
    }

    getSelectedRange(): any {
        return this.getElement().editor.getSelectedRange();
    }

    setSelectedRange(val: any): void {
        // element.editor.setSelectedRange(1)
        // element.editor.setSelectedRange([1])
        // element.editor.setSelectedRange([1, 1])
        this.getElement().editor.setSelectedRange(val);
    }

    writeValue(obj: any): void {
    }

    registerOnChange(fn: any): void {
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean): void {
    }
}
