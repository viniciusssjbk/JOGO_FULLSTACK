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

/*------- ITENS NA ESTEIRA -------*/
class Item {
  constructor(x, y, imagem) {
    this.x = x;
    this.y = y;
    this.imagem = new Image();
    this.imagem.src = imagem;
    this.velocidadeX = 2; // movimento horizontal (direita)
    this.velocidadeY = -1; // movimento vertical (subindo em diagonal)
    this.angulo = 0;
    this.ativo = true;
  }

  mover() {
    // movimenta o item em diagonal
    this.x += this.velocidadeX;
    this.y += this.velocidadeY;
    this.angulo += 0.1; // rotação leve

    // desativa quando sai da tela
    if (this.x > 600 || this.y < -50) {
      this.ativo = false;
    }
  }

  desenhar(ctx) {
    if (!this.ativo) return;
    ctx.save();
    ctx.translate(this.x + 30, this.y + 30);
    ctx.rotate(this.angulo);
    ctx.drawImage(this.imagem, -30, -30, 60, 60);
    ctx.restore();
  }
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
  let img = imagensItens[Math.floor(Math.random() * imagensItens.length)];
  // gera o item na parte inferior da esteira, com variação leve no Y
  let novoItem = new Item(
    esteira.x + 80,                       // posição inicial X
    esteira.y + 340, // posição inicial Y
    img
  );
  itens.push(novoItem); // adiciona à lista
  console.log("Item gerado:", img);
}
// ↑↑↑ IMPLEMENTAÇÃO ATUALIZADA: agora o item sobe em diagonal ↑↑↑


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

    // limites diagonais (entre caixas e esteira)
    let yMin, yMax;
    if (this.x < 150) {
      yMin = 330;
      yMax = 440;
    } else if (this.x < 250) {
      yMin = 315;
      yMax = 425;
    } else if (this.x < 360) {
      yMin = 265;
      yMax = 375;
    } else if (this.x < 490) {
      yMin = 220;
      yMax = 310;
    } else {
      yMin = 220;
      yMax = 225;
    }

    this.x = Math.max(100, Math.min(this.x, 570));
    this.y = Math.max(yMin, Math.min(this.y, yMax));

    console.log(`X: ${this.x}, Y: ${this.y}`);
  }
};

/*------- TECLAS -------*/
var teclas = {};
document.addEventListener("keydown", e => teclas[e.key] = true);
document.addEventListener("keyup", e => teclas[e.key] = false);

/*------- FUNDO -------*/
function desenhar_fundo(personagem) {
  desenharImagemProxima('imagens/4.png', 50, 250, 200, 240, personagem);
  desenharImagemProxima('imagens/1.png', 155, 222, 200, 240, personagem);
  desenharImagemProxima('imagens/3.png', 270, 161, 200, 240, personagem);
  desenharImagemProxima('imagens/2.png', 385, 130, 200, 240, personagem);
  desenharImagem('imagens/score.png', 755, -5, 100, 80);
}

function desenharImagemProxima(src, x, y, w, h, personagem) {
  var img = new Image();
  img.src = src;
  let dx = personagem.x - x;
  let dy = personagem.y - y;
  let distancia = Math.sqrt(dx * dx + dy * dy);
  let fator = distancia < 150 ? 1.2 : 1;
  ctx.drawImage(img, x - (w * (fator - 1) / 2), y - (h * (fator - 1) / 2), w * fator, h * fator);
}

function desenharImagem(src, x, y, w, h) {
  var img = new Image();
  img.src = src;
  ctx.drawImage(img, x, y, w, h);
}

/*------- LOOP PRINCIPAL -------*/
var i = 0;
var tempoTroca = 0;
var intervaloTroca = 30;
var tempoItem = 0;
var intervaloItem = 120;

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // fundo e esteira
  esteira.desenhar(ctx, i);
  desenhar_fundo(personagem);

  // desenha e move itens
  for (let item of itens) {
    item.mover();
    item.desenhar(ctx);
  }
  itens = itens.filter(i => i.ativo);

  // gera novo item a cada intervalo
  tempoItem++;
  if (tempoItem >= intervaloItem) {
    gerarItem();
    tempoItem = 0;
  }

  // movimentação personagem
  personagem.andando = false;
  if (teclas["ArrowLeft"]) { personagem.lado = "esquerda"; personagem.andando = true; }
  if (teclas["ArrowRight"]) { personagem.lado = "direita"; personagem.andando = true; }
  if (teclas["ArrowUp"]) { personagem.lado = "subindo"; personagem.andando = true; }
  if (teclas["ArrowDown"]) { personagem.lado = "descendo"; personagem.andando = true; }

  personagem.mover();
  personagem.gerar(ctx);

  // alterna imagens da esteira
  tempoTroca++;
  if (tempoTroca >= intervaloTroca) {
    i = (i + 1) % 2;
    tempoTroca = 0;
  }

  requestAnimationFrame(loop);
}

loop();
