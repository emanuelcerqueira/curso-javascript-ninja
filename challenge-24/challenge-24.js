(function(win, doc){
  'use strict';
  /*
  Nossa calculadora agora está funcional! A ideia desse desafio é modularizar
  o código, conforme vimos na aula anterior. Quebrar as responsabilidades
  em funções, onde cada função faça somente uma única coisa, e faça bem feito.

  - Remova as duplicações de código;
  - agrupe os códigos que estão soltos em funções (declarações de variáveis,
  listeners de eventos, etc);
  - faça refactories para melhorar esse código, mas de forma que o mantenha com a
  mesma funcionalidade.
  */
  var $ = doc.querySelector.bind(doc);
  var $all = doc.querySelectorAll.bind(doc);

  var $visor = $('[data-js="visor"]');
  var $buttonsNumbers = $all('[data-js="button-number"]');
  var $buttonsOperations = $all('[data-js="button-operation"]');
  var $buttonCE = $('[data-js="button-ce"]');
  var $buttonEqual = $('[data-js="button-equal"]');

  function initEvents() {
    Array.prototype.forEach.call($buttonsNumbers, function(button) {
      button.addEventListener('click', handleClickNumber, false);
    });
    Array.prototype.forEach.call($buttonsOperations, function(button) {
      button.addEventListener('click', handleClickOperation, false);
    });
    $buttonCE.addEventListener('click', handleClickCE, false);
    $buttonEqual.addEventListener('click', handleClickEqual, false);
  }

  function init() {
    initEvents();
  }

  function handleClickNumber() {
    $visor.value += this.value;
  }

  function handleClickOperation() {
    $visor.value = removeLastItemIfItIsAnOperator($visor.value);
    $visor.value += this.value;
  }

  function handleClickCE() {
    $visor.value = 0;
  }

  function isLastItemAnOperation(number) {
    var lastItem = number.split('').pop();
    return getOperators().some(function(operator) {
      return operator === lastItem;
    });
  }

  function getOperators() {
    return Array.prototype.map.call($buttonsOperations, function(operator) {
      return operator.value;
    });
  }

  function removeLastItemIfItIsAnOperator(number) {
    if(isLastItemAnOperation(number)) {
      return number.slice(0, -1);
    }
    return number;
  }

  function calculateAllValues(accumulated, actual) {
    var firstValue = accumulated.slice(0, -1);
    var operator = accumulated.split('').pop();
    var lastValue = removeLastItemIfItIsAnOperator(actual);
    var lastOperator = isLastItemAnOperation(actual) ? actual.split('').pop() : '';
    return doOperation(firstValue, lastValue, operator) + lastOperator;
  }

  function handleClickEqual() {
    $visor.value = removeLastItemIfItIsAnOperator($visor.value);
    var regexAllValues = new RegExp('\\d+['+getOperators().join('')+']?', 'g');
    var allValues = $visor.value.match(regexAllValues);
    $visor.value = allValues.reduce(calculateAllValues);
  }

  function doOperation(firstValue, lastValue, operator) {
    firstValue = Number(firstValue);
    lastValue = Number(lastValue);

    switch(operator) {
      case getOperators()[0]:
        return firstValue + lastValue;
      case getOperators()[1]:
        return firstValue - lastValue;
      case getOperators()[2]:
        return firstValue * lastValue;
      case getOperators()[3]:
        return firstValue / lastValue;
    }
  }

  init();
})(window, document);
