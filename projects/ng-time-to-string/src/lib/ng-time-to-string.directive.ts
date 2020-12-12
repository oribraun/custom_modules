import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[libNgTimeToString]'
})
export class NgTimeToStringDirective implements OnInit {

  @Input('libNgTimeToString') libNgTimeToString: number;
  @Input('showDays') showDays = true;
  @Input('showHours') showHours = true;
  @Input('showSeconds') showSeconds = true;
  @Input('outputType') outputType;
  @Input('addLeadingZero') addLeadingZero = true;
  private stringOptions = {
    str: {
      day: {one: ' day, ', many: ' days, '},
      hours: {one: ' hour, ', many: ' hours, '},
      minutes: {one: ' minute, ', many: ' minutes, '},
      seconds: {one: ' second ', many: ' seconds '},
    },
    short_str: {
      day: {one: ' d, ', many: ' d, '},
      hours: {one: ' h, ', many: ' h, '},
      minutes: {one: ' m, ', many: ' m, '},
      seconds: {one: ' s ', many: ' s '},
    },
    ':': {
      day: {one: ' day ', many: ' days '},
      hours: {one: ':', many: ':'},
      minutes: {one: ':', many: ':'},
      seconds: {one: '', many: ''},
    },
    '-': {
      day: {one: ' day ', many: ' days '},
      hours: {one: '-', many: '-'},
      minutes: {one: '-', many: '-'},
      seconds: {one: '', many: ''},
    },
    '.': {
      day: {one: ' day ', many: ' days '},
      hours: {one: '.', many: '.'},
      minutes: {one: '.', many: '.'},
      seconds: {one: '', many: ''},
    },
    ' ': {
      day: {one: ' day ', many: ' days '},
      hours: {one: ' ', many: ' '},
      minutes: {one: ' ', many: ' '},
      seconds: {one: '', many: ''},
    }
  }
  constructor(
    private element: ElementRef
  ) { }

  ngOnInit(): void {
    this.element.nativeElement.innerHTML = this.convertTimeToDate(this.libNgTimeToString);
  }

  convertTimeToDate(currentSeconds) {
    if (!this.outputType || !this.stringOptions[this.outputType]) {
      this.outputType = 'str';
    }
    // let years = 0,days = 0,hours = 0,minutes = 0,seconds = 0;
    // if (currentSeconds > 60) {
    //   minutes = currentSeconds / 60;
    // }
    // return currentSeconds;
    const seconds = Number(currentSeconds);
    let d: number = Math.floor(seconds / (3600 * 24));
    let h: number = Math.floor(seconds % (3600 * 24) / 3600 + (this.showDays ? 0 : d * 24));
    let m: number = Math.floor(seconds % 3600 / 60) + (this.showHours ? 0 : h * 60);
    let s: number = Math.floor(seconds % 60);

    let hStr = h.toString();
    let mStr = m.toString();
    let sStr = s.toString();
    if (this.addLeadingZero) {
      if (h >= 0 && h < 9) {
        hStr = '0' + hStr;
      }
      if (m >= 0 && m < 9) {
        mStr = '0' + mStr;
      }
      if (s >= 0 && s < 9) {
        sStr = '0' + sStr;
      }
    }
    var dDisplay = d + (d === 1 ? this.stringOptions[this.outputType].day.one : this.stringOptions[this.outputType].day.many);
    var hDisplay = hStr + (h === 1 ? this.stringOptions[this.outputType].hours.one : this.stringOptions[this.outputType].hours.many);
    var mDisplay = mStr + (m === 1 ? this.stringOptions[this.outputType].minutes.one : this.stringOptions[this.outputType].minutes.many);
    var sDisplay = sStr + (s === 1 ? this.stringOptions[this.outputType].seconds.one : this.stringOptions[this.outputType].seconds.many);
    let res = '';
    if (this.showDays) {
      res += dDisplay;
    }
    if (this.showHours) {
      res += hDisplay;
    }
    res += mDisplay;
    if (this.showSeconds) {
      res += sDisplay;
    }
    return res;
  }
}
