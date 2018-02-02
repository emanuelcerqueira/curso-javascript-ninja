(function(){
  'use strict';
  /*
  Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
  As regras são:

  - Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
  diretamente;
  - O input deve iniciar com valor zero;
  - Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
  - Deve haver 4 botões para as operações principais: soma (+), subtração(-),
  multiplicação(x) e divisão(÷);
  - Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
  que irá limpar o input, deixando-o com valor 0;

  - A cada número pressionado, o input deve atualizar concatenando cada valor
  digitado, como em uma calculadora real;
  - Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
  operação no input. Se o último caractere no input já for um símbolo de alguma
  operação, esse caractere deve ser substituído pelo último pressionado.
  Exemplo:
  - Se o input tem os valores: "1+2+", e for pressionado o botão de
  multiplicação (x), então no input deve aparecer "1+2x".
  - Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
  input;
  - Ao pressionar o botão "CE", o input deve ficar zerado.
  */

  var $screenCalculator = document.querySelector('[data-js="screen"]');
  var $numbers = document.querySelectorAll('[data-js="number"]');
  var $operators = document.querySelectorAll('[data-js="operator"]');
  var $equal = document.querySelector('[data-js="equal"]');
  var $clear = document.querySelector('[data-js="clear"]');

  $numbers.forEach(function(number) {
    number.addEventListener('click', handleClickNumber, false);
  });

  $clear.addEventListener('click', handleClickclear, false);

  $operators.forEach(function(operator) {
    operator.addEventListener('click', handleClickOperator, false);
  });

  $equal.addEventListener('click', handleClickEqual, false);

  function handleClickNumber(event) {
    $screenCalculator.value += this.value;
  }

  function handleClickclear(event) {
    $screenCalculator.value = 0;
  }

  function handleClickOperator(event) {
    var lastIndexScreen = $screenCalculator.value.length - 1;
    var lastScreenValue = $screenCalculator.value[lastIndexScreen];

    if (lastScreenValue === '+' || lastScreenValue === '-'
    || lastScreenValue === 'x' || lastScreenValue === '÷') {
      $screenCalculator.value = $screenCalculator.value.substring(lastIndexScreen, 0) + this.value;
    }
    else {
      $screenCalculator.value += this.value;
    }
  }

  function handleClickEqual() {
    var $numbersSplited = $screenCalculator.value.split(/[\+\-\x\÷]/g).map(function(number){
      return parseInt(number);
    });
    var $operatorsSplited = $screenCalculator.value.split(/\d/g).filter(function(operator) {
      return operator !== '';
    });

    var result = $numbersSplited.reduce(function(acumulated, number, index, arr) {
      return operation(acumulated, number, $operatorsSplited[index - 1]);
    });

    $screenCalculator.value = result;
  }

  function operation(num1, num2, operator) {
    var op = {
      '+': function() {
        return num1 + num2;
      },
      '-': function() {
        return num1 - num2;
      },
      'x': function() {
        return num1 * num2;
      },
      '÷': function() {
        return num1 / num2;
      }
    }
    return op[operator]();
  }

})();
