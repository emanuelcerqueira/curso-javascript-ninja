(function(){
  'use strict';

  /*
  No HTML:
  - Crie um formulário com um input de texto que receberá um CEP e um botão
  de submit;
  - Crie uma estrutura HTML para receber informações de endereço:
  "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
  preenchidas com os dados da requisição feita no JS.
  - Crie uma área que receberá mensagens com o status da requisição:
  "Carregando, sucesso ou erro."

  No JS:
  - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
  deve ser limpo e enviado somente os números para a requisição abaixo;
  - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
  "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
  no input criado no HTML;
  - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
  com os dados recebidos.
  - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
  a mensagem: "Buscando informações para o CEP [CEP]..."
  - Se não houver dados para o CEP entrado, mostrar a mensagem:
  "Não encontramos o endereço para o CEP [CEP]."
  - Se houver endereço para o CEP digitado, mostre a mensagem:
  "Endereço referente ao CEP [CEP]:"
  - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
  adicionar as informações em tela.
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


  var $form = new DOM('[data-form="form"]');
  var $cep = new DOM('[data-form="cep"]').get()[0];
  var $message = new DOM('[data-js="message"]').get()[0];

  var $logradouro = new DOM('[data-cep="logradouro"]').get()[0];
  var $bairro = new DOM('[data-cep="bairro"]').get()[0];
  var $estado = new DOM('[data-cep="estado"]').get()[0];
  var $cidade = new DOM('[data-cep="cidade"]').get()[0];
  var $cepInfo = new DOM('[data-cep="cep"]').get()[0];

  $form.on('submit', handleSubmitFormCep);

  function isReponseReady(ajax) {
    return ajax.readyState === 4 && ajax.status === 200;
  }

  function isResponseLoading(ajax) {
    return (ajax.readyState >= 1 && ajax.readyState <= 3) && ajax.status === 200;
  }

  function updateMessage(message) {
    $message.textContent = message;
  }

  function messageSucess() {
    updateMessage('Endereço referente ao CEP '+$cep.value+':');
  }

  function messageLoading() {
    updateMessage('Buscando informações para o CEP '+$cep.value);
  }

  function messageError() {
    updateMessage('Não encontramos o endereço para o CEP '+$cep.value);
  }

  function parseData(data) {
    var result;
    try {
      result = JSON.parse(data);
    }
    catch(e) {
      result = null;
    }
    return result;
  }

  function getOnlyNumbers(str) {
    return str.replace(/\D/g, '');
  }

  function isCepLengthValid(cep) {
    return getOnlyNumbers(cep).length === 8;
  }

  function getCepUrl(cep) {
    return 'https://viacep.com.br/ws/'+getOnlyNumbers(cep)+'/json/';
  }

  function handleSubmitFormCep(event) {
    event.preventDefault();
    clearCepFields();

    if (isCepLengthValid($cep.value))
      findCep($cep.value);
    else
      messageError();
  }

  function findCep(cep) {
    var ajaxCep = new XMLHttpRequest();
    ajaxCep.open('GET', getCepUrl(cep));
    ajaxCep.send();
    ajaxCep.addEventListener('readystatechange', handleCepReadyStateChange)
  }

  function handleCepReadyStateChange() {
    if (isReponseReady(this)) {
      var cepObject = parseData(this.responseText);
      if (cepObject.erro === true && !cepObject) {
        messageError();
        return;
    }
    fillCepFields(cepObject);
    messageSucess();
    }
    else if (isResponseLoading(this)) {
      messageLoading();
    }
  }

  function fillCepFields(cepObject) {
    $logradouro.textContent = cepObject.logradouro;
    $bairro.textContent = cepObject.bairro;
    $estado.textContent = cepObject.uf;
    $cidade.textContent = cepObject.localidade;
    $cepInfo.textContent = cepObject.cep;
  }

  function clearCepFields() {
    $logradouro.textContent = '';
    $bairro.textContent = '';
    $estado.textContent = '';
    $cidade.textContent = '';
    $cepInfo.textContent = '';
  }

})();
