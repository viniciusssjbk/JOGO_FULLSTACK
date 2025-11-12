var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

function score(url, x, y) {
  var img = new Image();
  img.src = url;
  img.onload = function () {
    ctx.drawImage(img, x, y, 100, 80);
  };
  return img;
}

// Chamando a função para cada imagem com sua posição
var score = score('imagens/score.png', 755, -5);


function imagem(url, x, y) {
  var img = new Image();
  img.src = url;
  img.onload = function () {
    ctx.drawImage(img, x, y, 200, 240);
  };
  return img;
}

// Chamando a função para cada imagem com sua posição
var caixa_vermelho = imagem('imagens/4.png', 50, 250);
var caixa_azul = imagem('imagens/1.png', 155, 222);
var caixa_amarelo = imagem('imagens/3.png', 270, 161);
var caixa_verde = imagem('imagens/2.png', 385, 130);




function imagem2(url, x, y) {
  var img2 = new Image();
  img2.src = url;
  img2.onload = function () {
    ctx.drawImage(img2, x, y, 620, 530);
  };
  return img2;
}

// Chamando a função para cada imagem com sua posição
var esteira = imagem2('imagens/esteira1.png', 240, 152);

function imagem3(url, x, y) {
  var img3 = new Image();
  img3.src = url;
  img3.onload = function () {
    ctx.drawImage(img3, x, y, 400, 310);
  };
  return img3;
}

// Chamando a função para cada imagem com sua posição
var esteira = imagem3('imagens/caixa_esteira.png', 112, 402);



