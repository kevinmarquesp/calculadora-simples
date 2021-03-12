function matematicas(arr) {
    let res
    switch( arr[1]) {
        case 'mais':
            res = arr[0] + arr[2]
            break
        case 'menos':
            res = arr[0] - arr[2]
            break
        case 'vezes':
            res = arr[0] * arr[2]
            break
        case 'dividido':
            res = arr[0] / arr[2]
            if( 'NaN' == `${res}`) {
                res = 'Roberto'
            }
            break
    }
    return res
}


let proximoLimpar = false
let conta
const operacoes = [ 'mais', 'menos', 'vezes', 'dividido']
const elements = {
    display: document.querySelector( '#display'),
    numeros: document.querySelectorAll( '.nbtn'),
    operacoes: document.querySelectorAll( '.obtn')
}

for( let c = 0; c < 10; c++) {
    elements.numeros[c].addEventListener( 'click', function() {
        if(proximoLimpar) {
            elements.display.innerText = ''
            proximoLimpar = false
        }
        elements.display.innerText += elements.numeros[c].innerText
    })
}

for( let c = 0; c < 4; c++) {
    elements.operacoes[c].addEventListener( 'click', function() {
        conta = [ Number(elements.display.innerText), operacoes[c]]
        proximoLimpar = true
    })
}

elements.operacoes[4].addEventListener( 'click', function() {
    conta = undefined
    elements.display.innerText = ''
})
elements.operacoes[5].addEventListener( 'click', function() {
    if( elements.display.innerText.indexOf('.') == -1) {
        if( elements.display.innerText.length == 0 || proximoLimpar) {
            elements.display.innerText = '0.'
        } else {
            elements.display.innerText += '.'
        }
    }
})
elements.operacoes[6].addEventListener( 'click', function() {
    if( elements.display.innerText.length != 0) {
        conta.push( Number(elements.display.innerText))
        elements.display.innerText = matematicas(conta)
        proximoLimpar = true
    }
})