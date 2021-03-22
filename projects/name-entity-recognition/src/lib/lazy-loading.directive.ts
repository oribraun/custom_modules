import {Directive, ElementRef, HostListener, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from "@angular/core";

@Directive({
    selector: '[lazyLoading]'
})
export class LazyLoadingDirective implements OnInit, OnChanges {
    private onViewPort = false;
    @Input() manualCheck = false;
    @Input() lazyLoading: string;
    @Input() content: any;
    @Input() hideWhenNotVisible = false;
    @Input() offsetTop = 0;
    @Input() offsetRight = 0;
    @Input() offsetBottom = 0;
    @Input() offsetLeft = 0;

    constructor(
        private renderer: Renderer2,
        private elem: ElementRef
    ) {}

    ngOnInit(): void {
        this.onViewPort = this.isInViewPort(this.elem.nativeElement);
        if(!this.onViewPort) {
            this.elem.nativeElement.style.display = 'none';
        }
        this.toggleClass();
        this.offsetTop = parseInt(this.offsetTop.toString(), 0);
        this.offsetLeft = parseInt(this.offsetLeft.toString(), 0);
        this.offsetBottom = parseInt(this.offsetBottom.toString(), 0);
        this.offsetRight = parseInt(this.offsetRight.toString(), 0);
    }

    isInViewPort(elem) {
        const bounding: any = elem.getBoundingClientRect();
        let height = window.innerHeight || document.documentElement.clientHeight;
        let width = window.innerWidth || document.documentElement.clientWidth;
        let contentHeight = 0;
        let contentWidth = 0;
        let contentTop = 0;
        let contentRight = 0;
        let contentBottom = 0;
        let contentLeft = 0;
        if(this.content) {
            contentHeight = this.content.clientHeight;
            contentWidth= this.content.clientWidth;
            const b: any = this.content.getBoundingClientRect();
            contentTop = b.top;
            contentLeft = b.left;
            contentBottom = (b.bottom);
            contentRight = (b.right);
            // height = h;
            // width = w;
        }
        // console.log('bounding.bottom', bounding.top - contentTop)
        // console.log('contentBottom', contentBottom)
        // console.log('bounding.bottom', bounding.right + this.offsetRight <= width - contentLeft)
        // console.log('height - contentHeight', height - contentHeight)
        // console.log('bounding.bottom', height)
        return (
            (bounding.top - contentTop) + this.offsetTop >= 0 &&
            (bounding.left - contentLeft) + this.offsetLeft >= 0 &&
            (bounding.bottom - contentTop) + this.offsetBottom <= (contentBottom ? contentBottom : height) &&
            (bounding.right - contentLeft) + this.offsetRight <= (contentRight ? contentRight : width)
        )
    }

    @HostListener('scroll', ['$event'])
    onWindowScroll($event) {
        console.log('asdf')
        // this.onViewPort = this.isInViewPort(this.elem.nativeElement);
        // this.toggleClass();
    }

    toggleClass() {
        if(this.onViewPort) {
            this.renderer.addClass(this.elem.nativeElement, this.lazyLoading);
        } else {
            if(this.hideWhenNotVisible) {
                this.renderer.removeClass(this.elem.nativeElement, this.lazyLoading);
            }
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes.manualCheck && !changes.manualCheck.firstChange) {
            this.onViewPort = this.isInViewPort(this.elem.nativeElement);
            this.toggleClass();
        }
    }


}
