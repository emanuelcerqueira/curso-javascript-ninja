(function(){
  'use strict';

  /*
  Aproveitando a lib DOM que fizemos na semana anterior, crie agora para ela
  métodos semelhantes aos que existem no array, mas que sirvam para os
  elementos do DOM selecionados.
  Crie os seguintes métodos:
  - forEach, map, filter, reduce, reduceRight, every e some.

  Crie também métodos que verificam o tipo do objeto passado por parâmetro.
  Esses métodos não precisam depender de criar um novo elmento do DOM, podem
  ser métodos estáticos.

  Métodos estáticos não obrigam o uso do `new`, podendo ser usados diretamente
  no objeto, como nos exemplos abaixo:
  DOM.isArray([1, 2, 3]); // true
  DOM.isFunction(function() {}); // true
  DOM.isNumber('numero'); // false

  Crie os seguintes métodos para verificação de tipo:
  - isArray, isObject, isFunction, isNumber, isString, isBoolean, isNull.
  O método isNull deve retornar `true` se o valor for null ou undefined.
  */

  function DOM(elements) {
    this.element = document.querySelectorAll(elements);
  }

  DOM.prototype.on = function on(eventType, callback) {
    Array.prototype.forEach.call(this.element, function(element) {
      element.addEventListener(eventType, callback, false);
    });
  };

  DOM.prototype.off = function off(eventType, callback) {
    Array.prototype.forEach.call(this.element, function(element) {
      element.removeEventListener(eventType, callback, false);
    });
  };

  DOM.prototype.get = function get() {
    return this.element;
  };

  DOM.prototype.forEach = function forEach(callback) {
    return Array.prototype.forEach.call(this.element, callback);
  }

  DOM.prototype.map = function map(callback) {
    return Array.prototype.map.call(this.element, callback);
  }

  DOM.prototype.filter = function filter(callback) {
    return Array.prototype.filter.call(this.element, callback);
  }

  DOM.prototype.reduce = function reduce(callback) {
    return Array.prototype.reduce.call(this.element, callback);
  }

  DOM.prototype.reduceRight = function reduceRight(callback) {
    return Array.prototype.reduceRight.call(this.element, callback);
  }

  DOM.prototype.every = function every(callback) {
    return Array.prototype.every.call(this.element, callback);
  }

  DOM.prototype.some = function some(callback) {
    return Array.prototype.some.call(this.element, callback);
  }

  DOM.is = function is(obj) {
    return Object.prototype.toString.call(obj);
  }

  DOM.isArray = function isArray(param) {
    return DOM.is(param) === '[object Array]';
  }

  DOM.isFunction = function isFunction(param) {
    return DOM.is(param) === '[object Function]';
  }

  DOM.isNumber = function isNumber(param) {
    return typeof param === 'number';
  }

  DOM.isBoolean = function isBoolean(param) {
    return typeof param === 'boolean';
  }

  DOM.isNull = function isNull(param) {
    return DOM.is(param) === '[object Null]' || DOM.is(param) === '[object Undefined]';
  }

})();
