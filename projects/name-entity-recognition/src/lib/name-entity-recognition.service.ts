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
        const rgba = colorValues(color)
        // const rgb = color.replace('rgb(', '').replace('rgba(', '').replace(')', '').split(',');
        const brightness = Math.round(((parseInt(rgba[0]) * 299) +
            (parseInt(rgba[1]) * 587) +
            (parseInt(rgba[2]) * 114)) / 1000);
        // console.log(rgba, (brightness > 125) ? '#000' : '#fff')
        return (brightness > 125) ? '#000' : '#fff';
    }

    generateTextColor(colors) {
        let blackCount = 0;
        let whiteCount = 0;
        for(const i in colors) {
            const color = colorValues(colors[i])
            if (color) {
                const textColor = this.getTextColor('rgba(' + color.join(',') + ')');
                if (textColor === '#fff') {
                    whiteCount++
                } else if (textColor === '#000') {
                    blackCount++;
                }
            }
        }
        return whiteCount > blackCount ? '#fff' : '#000';
    }
}

function colorValues(color)
{
    if (!color)
        return;
    if (color.toLowerCase() === 'transparent')
        return [0, 0, 0, 0];
    if (color[0] === '#')
    {
        if (color.length < 7)
        {
            // convert #RGB and #RGBA to #RRGGBB and #RRGGBBAA
            color = '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3] + (color.length > 4 ? color[4] + color[4] : '');
        }
        return [parseInt(color.substr(1, 2), 16),
            parseInt(color.substr(3, 2), 16),
            parseInt(color.substr(5, 2), 16),
            color.length > 7 ? parseInt(color.substr(7, 2), 16)/255 : 1];
    }
    if (color.indexOf('rgb') === -1)
    {
        // convert named colors
        var temp_elem = document.body.appendChild(document.createElement('fictum')); // intentionally use unknown tag to lower chances of css rule override with !important
        var flag = 'rgb(1, 2, 3)'; // this flag tested on chrome 59, ff 53, ie9, ie10, ie11, edge 14
        temp_elem.style.color = flag;
        if (temp_elem.style.color !== flag)
            return; // color set failed - some monstrous css rule is probably taking over the color of our object
        temp_elem.style.color = color;
        if (temp_elem.style.color === flag || temp_elem.style.color === '')
            return; // color parse failed
        color = getComputedStyle(temp_elem).color;
        document.body.removeChild(temp_elem);
    }
    if (color.indexOf('rgb') === 0)
    {
        if (color.indexOf('rgba') === -1)
            color += ',1'; // convert 'rgb(R,G,B)' to 'rgb(R,G,B)A' which looks awful but will pass the regxep below
        return color.match(/[\.\d]+/g).map(function (a)
        {
            return +a
        });
    }
}
