/*
Crie uma variável qualquer, que receba um array com alguns valores aleatórios
- ao menos 5 - (fica por sua conta os valores do array).
*/
var arr = [1, 1, 2, 3, 5, 8]; 

/*
Crie uma função que receba um array como parâmetro, e retorne esse array.
*/
function getArr(arr) {
    return arr;
}

/*
Imprima o segundo índice do array retornado pela função criada acima.
*/
console.log(getArr(arr)[1]); // 1

/*
Crie uma função que receba dois parâmetros: o primeiro, um array de valores; e o
segundo, um número. A função deve retornar um índice do array que foi passado
no primeiro parâmetro. O índice a ser retornado, deve ser o número passado no
segundo parâmetro.
*/
function getArrByIndex(arr, index) {
    return arr[index];
}

/*
Declare uma variável que recebe um array com 5 valores, de tipos diferentes.
*/
var arr2 = [10, 'javascript', true, {nome: 'Emanuel', idade: 18}, null];

/*
Invoque a função criada acima, fazendo-a retornar todos os valores do último
array criado.
*/
console.log(getArrByIndex(arr2, 0)); // 10
console.log(getArrByIndex(arr2, 1)); // 'Javascript'
console.log(getArrByIndex(arr2, 2)); // true
console.log(getArrByIndex(arr2, 3)); // {nome: 'Emanuel', idade: 18}
console.log(getArrByIndex(arr2, 4)); // null

/*
Crie uma função chamada `book`, que recebe um parâmetro, que será o nome do
livro. Dentro dessa função, declare uma variável que recebe um objeto com as
seguintes características:
- esse objeto irá receber 3 propriedades, que serão nomes de livros;
- cada uma dessas propriedades será um novo objeto, que terá outras 3
propriedades:
    - `quantidadePaginas` - Number (quantidade de páginas)
    - `autor` - String
    - `editora` - String
- A função deve retornar o objeto referente ao livro passado por parâmetro.
- Se o parâmetro não for passado, a função deve retornar o objeto com todos
os livros.
*/
function book(nomeLivro) {
	var obj = {
		'java': {
			quantidadePaginas: 700, 
			autor: 'Deitel',
			editora: 'Pearson'
		},

		'javascript': {
			quantidadePaginas: 569, 
			autor:'John Brown', 
			editora: 'D.D.H'
		},

		'design':	{
			quantidadePaginas: 450 , 
			autor: 'Jack Jackson', 
			editora: 'amazing pixels'
		}
	};
	 
	return !nomeLivro ? obj : obj[nomeLivro];
}

/*
Usando a função criada acima, imprima o objeto com todos os livros.
*/
conosle.log(book());


/*
Ainda com a função acima, imprima a quantidade de páginas de um livro qualquer,
usando a frase:
"O livro [NOME_DO_LIVRO] tem [X] páginas!"
*/
var book1 = 'java';
console.log('O livro '+book1+' tem '+book(book1).quantidadePaginas+' página!');


/*
Ainda com a função acima, imprima o nome do autor de um livro qualquer, usando
a frase:
"O autor do livro [NOME_DO_LIVRO] é [AUTOR]."
*/
console.log('O autor do livro '+book1+' é '+book(book1).autor+'.')

/*
Ainda com a função acima, imprima o nome da editora de um livro qualquer, usando
a frase:
"O livro [NOME_DO_LIVRO] foi publicado pela editora [NOME_DA_EDITORA]."
*/
console.log('O livro '+book1+' foi publicado pela editora '+book(book1).editora+'.');
