function cal(arr) {
    switch(arr[1]) {
        case cal_list[0]:
            if( !( arr[2] == 0)) {
                show_decimal(arr[0]/arr[2])
            }
            break
        case cal_list[1]:
            show_decimal(arr[0]*arr[2])
            break
        case cal_list[2]:
            show_decimal(arr[0]-arr[2])    
            break
        case cal_list[3]:
            show_decimal(arr[0]+arr[2])
            break
    }
}
function show_decimal(res_num) {
    clear_next = true
    let res = `${res_num}`
    elements.display.innerText = ''
    if( res.length > 9) {
        let decimal = res.indexOf('.')
        if(decimal != -1) {
            for( let c in res) {
                elements.display.innerText += res[c]
                if( res[c] == '.') {
                    break
                }
            }
            for( let c = decimal+1; c < 14+decimal - elements.display.innerText.length; c++) {
                elements.display.innerText += res[c]
            }
        } else {
            // elements.display.innerHTML = '<span style="font-size: 10px;"> Muito grande one-chan... &#x1F449; &#x1F448; </span>'
            elements.display.innerHTML = '<span style="font-size: 10px;"> Número muito alto... </span>'
        }
    } else {
        elements.display.innerText = res
    }
}


let final = []
let clear_next = false
const elements = {
    display: document.querySelector( 'span#display'),
    numbers: document.querySelectorAll( 'button.num'),
    calculation: document.querySelectorAll( 'button.cal')
}
let cal_list = []
for( let c = 3; c < 7; c++) {
    cal_list.push( elements.calculation[c].innerText)
}

for( let c = 0; c < 9; c++) {
    elements.calculation[c].addEventListener( 'click', function() {
        switch(c) {
            case 0:
                elements.display.innerText = ''
                clear_next = false
                final = []
                break
            case 1:
                if( Number(elements.display.innerText) > 0) {
                    elements.display.innerText = '-' +elements.display.innerText
                } else if( Number(elements.display.innerText) < 0) {
                    let text_01 = ''
                    for( let c in elements.display.innerText) {
                        if( c != 0) {
                            text_01 += elements.display.innerText[c]
                        }
                    }
                    elements.display.innerText = text_01
                }
                break
            case 2:
                if( !( Number(elements.display.innerText) < 0)) {
                    show_decimal(Number(elements.display.innerText) **(1/2))
                }
                break
            case 3: case 4: case 5: case 6:
                if( final.length > 1) {
                    final = []
                }
                final.push( Number(elements.display.innerText), cal_list[c-3])
                clear_next = true
                break
            case 7:
                if( elements.display.innerText.length == 0 || clear_next) {
                    elements.display.innerText = '0.'
                    clear_next = false
                } else if( elements.display.innerText.indexOf('.') == -1) {
                    elements.display.innerText += '.'
                }
                break
            case 8:
                final.push( Number(elements.display.innerText))
                if( final.length == 1) {
                    show_decimal( Number(elements.display.innerText))
                } else {
                    cal(final)
                }
        }
    })
}

for( let c = 0; c < 10; c++) {
    elements.numbers[c].addEventListener( 'click', function() {
        if(!( elements.display.innerText.length > 9)) {
            if(clear_next) {
                elements.display.innerText = ''
                clear_next = false
            }
            if( elements.display.innerText === '0') {
                elements.display.innerText = elements.numbers[c].innerText
            } else {
                elements.display.innerText += elements.numbers[c].innerText
            }
        }
    })
}
