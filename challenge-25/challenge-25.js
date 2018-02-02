(function(){
  'use strict';
  /*
  Essa semana você terá dois desafios:
  1) Revisar todo o contéudo passado até aqui, e ver se você realmente entendeu
  tudo o que foi passado! Se tiver dúvidas, anote, e então abra issues,
  ou comente no seu pull request mesmo, que eu irei ajudá-lo a entender
  o que não ficou tão claro das aulas anteriores.
  É essencial que você entenda todo o conteúdo que foi passado até aqui,
  para que possamos prosseguir para a parte mais avançada do curso :D

  2) Estudar eventos!
  Acesse a página do MDN:
  https://developer.mozilla.org/en-US/docs/Web/Events#Categories

  Tente aplicar na prática alguns dos eventos que estão ali e coloque nesse
  desafio os experimentos legais que você conseguir desenvolver :D
  */

  var $name = document.querySelector('[data-form="nome"]');
  var $phrase = document.querySelector('[data-js="frase"]');
  var $namePhrase = document.querySelector('[data-js="nome"]');
  var $form = document.querySelector('form');

  function initEvents() {
    $name.addEventListener('input', updateName);
    $form.addEventListener('submit', function(event) {
      event.preventDefault();
    });
  }

  function isInputEmpty(name) {
    return name.value.length === 0;
  }

  function updateName() {
    if (isInputEmpty($name)) {
      hideElement($phrase);
      return;
    }
    $namePhrase.textContent = this.value;
    showElement($phrase);
  }

  function hideElement(element) {
    element.style.display = 'none';
  }

  function showElement(element) {
    element.style.display = 'block';
  }

  function init() {
    initEvents();
    hideElement($phrase);
  }

  init();

})();
