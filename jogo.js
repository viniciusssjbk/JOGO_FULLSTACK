var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

/*------- ESTEIRA -------*/
var esteira = {
  imagens: ['imagens/esteira1.png', 'imagens/esteira2.png'],
  img: new Image(),
  caixa: new Image(),
  x: 240,
  y: 152,
  largura: 620,
  altura: 530,
  desenhar: function (ctx, i) {
    this.img.src = this.imagens[i];
    this.caixa.src = 'imagens/caixa_esteira.png';
    ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura);
    ctx.drawImage(this.caixa, 112, 402, 400, 310);
  }
};

/*------- ITEM -------*/
function Item(x, y, imagem) {
  var item = {};
  item.x = x;
  item.y = y;
  item.imagem = new Image();
  item.imagem.src = imagem;
  item.velocidadeX = 0.5;
  item.velocidadeY = -0.27;
  item.ativo = true;

  item.mover = function () {
    item.x += item.velocidadeX;
    item.y += item.velocidadeY;
    if (item.x > 650) {
      item.ativo = false;
    }
  }

  item.desenhar = function (ctx) {
    if (!item.ativo) return;
    ctx.save();
    ctx.translate(item.x + 30, item.y + 30);
    ctx.drawImage(item.imagem, -30, -30, 60, 60);
    ctx.restore();
  };

  return item;
}

var itens = [];
var imagensItens = [
  'imagens/item1.png', 'imagens/item2.png',
  'imagens/item3.png', 'imagens/item4.png',
  'imagens/item5.png', 'imagens/item6.png',
  'imagens/item7.png', 'imagens/item8.png'
];

/*------- GERAR ITEM -------*/
function gerarItem() {
  var img = imagensItens[Math.floor(Math.random() * imagensItens.length)];
  var novoItem = Item(esteira.x + 80, esteira.y + 340, img);
  itens.push(novoItem);
}

/*------- PERSONAGEM -------*/
var personagem = {
  img: new Image(),
  x: 400,
  y: 280,
  velocidade: 5,
  andando: false,
  lado: "direita",
  diretorio: {
    "esquerda": ['imagens/personagem/parado_esquerda.png', 'imagens/personagem/andando_esquerda.png'],
    "direita": ['imagens/personagem/parado_direita.png', 'imagens/personagem/andando_direita.png'],
    "subindo": ['imagens/personagem/costas.png', 'imagens/personagem/costas.png'],
    "descendo": ['imagens/personagem/frente.png', 'imagens/personagem/frente.png']
  },
  gerar: function (ctx) {
    this.img.src = this.diretorio[this.lado][this.andando ? 1 : 0];
    ctx.drawImage(this.img, this.x, this.y, 100, 100);
  },
  mover: function () {
    if (!this.andando) return;

    if (this.lado === "esquerda") this.x -= this.velocidade;
    if (this.lado === "direita") this.x += this.velocidade;
    if (this.lado === "subindo") this.y -= this.velocidade;
    if (this.lado === "descendo") this.y += this.velocidade;

    var yMin, yMax;
    /*Antes da caixa 1 */
   if (this.x < 120) { 
  yMin = 340; yMax = 440; // início da esteira, mais baixo
}
/* entre caixa 1 e 2 */
else if (this.x < 180) { 
  yMin = 330; yMax = 420;
}
else if (this.x < 230) { 
  yMin = 315; yMax = 400;
}
/* entre caixa 2 e 3 */
else if (this.x < 280) { 
  yMin = 290; yMax = 370;
}
else if (this.x < 320) { 
  yMin = 275; yMax = 355;
}
/* entre caixa 3 e 4 */
else if (this.x < 360) { 
  yMin = 265; yMax = 340;
}
else if (this.x < 420) { 
  yMin = 250; yMax = 320;
}
else if (this.x < 460) { 
  yMin = 235; yMax = 300;
}
/* depois da caixa 4 */
else if (this.x < 520) { 
  yMin = 225; yMax = 285;
}
else { 
  yMin = 220; yMax = 225; // final da diagonal, bem no alto
}

    if (this.x < 100) this.x = 100;
    if (this.x > 570) this.x = 570;
    if (this.y < yMin) this.y = yMin;
    if (this.y > yMax) this.y = yMax;
  }
};

/*------- TECLAS -------*/
var teclas = {};
document.addEventListener("keydown", function (e) { teclas[e.key] = true; });
document.addEventListener("keyup", function (e) { teclas[e.key] = false; });

/*------- FUNDO -------*/
var fundo = {
  desenhar: function (personagem) {
    this.desenharImagemProxima('imagens/4.png', 50, 250, 200, 240,personagem, "1");
    this.desenharImagemProxima('imagens/1.png', 155, 222, 200, 240,personagem,  "2");
    this.desenharImagemProxima('imagens/3.png', 270, 161, 200, 240,personagem,  "3");
    this.desenharImagemProxima('imagens/2.png', 385, 130, 200, 240,personagem,  "4");
    this.desenharImagem('imagens/score.png', 755, -5, 100, 80,personagem);
  },

  desenharImagemProxima: function (src, x, y, largura, altura,personagem, id) {
    var img = new Image();
    img.src = src;
    //CAIXA 1
    if(personagem.x>=50 && personagem.x<=120 && personagem.y>=330 && personagem.y<=340 && id == "1")
      {largura+=20,altura+=20}
    //CAIXA 2
    if(personagem.x>=115 && personagem.x<=280 && personagem.y>=315 && personagem.y<=325 && id == "2"){
      largura+=20,altura+=20}
    //CAIXA 3
    if(personagem.x>=270 && personagem.x<=390 && personagem.y>=265 && personagem.y<=275 && id == "3")
      {largura+=20,altura+=20}
    //CAIXA 4
    if(personagem.x>=370 && personagem.x<=540 && personagem.y>=220 && personagem.y<=230 && id == "4")
      {largura+=20,altura+=20}
    ctx.drawImage(img, x, y, largura, altura);


  },

  desenharImagem: function (src, x, y, largura, altura) {
    var img = new Image();
    img.src = src;
    ctx.drawImage(img, x, y, largura, altura);
  }
};

/*------- LOOP PRINCIPAL -------*/
var i = 0;
var tempoTroca = 0;
var intervaloTroca = 30;
var tempoItem = 0;
var intervaloItem = 120;

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
    // chão (quadrado verde)
ctx.fillStyle = "rgba(30, 255, 0, 0.685)";
ctx.beginPath();
ctx.arc(445, 425, 40, 0*Math.PI,2*Math.PI); // x=435, y=415, raio=35
ctx.closePath();
ctx.fill();

  esteira.desenhar(ctx, i);
  fundo.desenhar(personagem);

  var j;
  for (j = 0; j < itens.length; j++) {
    itens[j].mover();
    itens[j].desenhar(ctx);
  }

  var novos = [];
  for (j = 0; j < itens.length; j++) {
    if (itens[j].ativo) novos.push(itens[j]);
  }
  itens = novos;

  tempoItem++;
  if (tempoItem >= intervaloItem) {
    gerarItem();
    tempoItem = 0;
  }

  personagem.andando = false;
  if (teclas["ArrowLeft"]) { personagem.lado = "esquerda"; personagem.andando = true; }
  if (teclas["ArrowRight"]) { personagem.lado = "direita"; personagem.andando = true; }
  if (teclas["ArrowUp"]) { personagem.lado = "subindo"; personagem.andando = true; }
  if (teclas["ArrowDown"]) { personagem.lado = "descendo"; personagem.andando = true; }

  personagem.mover();
  personagem.gerar(ctx);

  tempoTroca++;
  if (tempoTroca >= intervaloTroca) {
    i = (i + 1) % 2;
    tempoTroca = 0;
  }

  requestAnimationFrame(loop);
}

loop();
