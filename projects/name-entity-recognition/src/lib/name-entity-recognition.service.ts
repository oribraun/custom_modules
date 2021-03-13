import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NameEntityRecognitionService {

    private _colors = [
        'rgb(0,255,255)',
        'rgb(0,128,128)',
        'rgb(68,205,151)',
        'rgb(255,0,255)',
        'rgb(255,255,0)',
        'rgb(218, 67, 21)',
        'rgb(0,0,255)',
        'rgb(181, 204, 41)',
        'rgb(23, 121, 230)',
        'rgb(97, 0, 255)',
        'rgb(194, 0, 255)',
        'rgb(21, 218, 21)',
        'rgb(218, 165, 21)',
        'rgb(21, 145, 218)',
        'rgb(230, 23, 62)',
        'rgb(150, 46, 210)',
        'rgb(169,218,167)',
        'rgb(74,97,218)',
        'rgb(21, 218, 211)',
        'rgb(123,218,208)',
        'rgb(218,192,56)',
        'rgb(218,99,14)',

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
    constructor() { }


    get colors(): string[] {
        return this._colors;
    }

    set colors(value: string[]) {
        this._colors = value;
    }

    getRandomColors() {
        return this._colors.sort( () => .5 - Math.random());
    }

    getTextColor(color) {
        const rgb = color.replace('rgb(', '').replace(')', '').split(',');
        const brightness = Math.round(((parseInt(rgb[0]) * 299) +
            (parseInt(rgb[1]) * 587) +
            (parseInt(rgb[2]) * 114)) / 1000);
        return (brightness > 125) ? '#000' : '#fff';
    }
}
