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
function Item(x, y, imagem,id) {
  var item = {};
  item.id=id;
  item.x = x;
  item.y = y;
  item.imagem = new Image();
  item.imagem.src = imagem;
  item.velocidadeX = 0.5;
  item.velocidadeY = -0.27;
  item.ativo = true;
  item.caixaDestino = null;

  item.mover = function () {
    var ponto = 0
    item.x += item.velocidadeX;
    item.y += item.velocidadeY;
    if (item.x > 650) {
      item.ativo = false;
      ponto = -80
    }
    return ponto;
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

var mapaCaixas = {
  1: ['imagens/item1.png', 'imagens/item2.png'],
  2: ['imagens/item3.png', 'imagens/item4.png'],
  3: ['imagens/item5.png', 'imagens/item6.png'],
  4: ['imagens/item7.png', 'imagens/item8.png']
};

/*------- GERAR ITEM -------*/
function gerarItem() {
  var iditem = Math.floor(Math.random() * imagensItens.length)
  var img = imagensItens[iditem];
  var novoItem = Item(esteira.x + 100, esteira.y + 330, img, iditem);

  for (var caixaId in mapaCaixas) {
  var lista = mapaCaixas[caixaId];

  for (var i = 0; i < lista.length; i++) {
    if (lista[i] === img) { 
      novoItem.caixaDestino = caixaId;
      break;
    }
  }
}
  itens.push(novoItem);
  

}

/*------- PERSONAGEM -------*/
var personagem = {
  img: new Image(),
  x: 400,
  y: 280,
  velocidade: 5,
  andando: false,
  segurando: [false,0,0],
  lado: "direita",
diretorio: {
  "esquerda": [
    ['imagens/personagem/parado_esquerda.png', 'imagens/personagem/andando_esquerda.png'],

    ['imagens/personagem/segurando_parado_esquerda1.png', 'imagens/personagem/segurando_andando_esquerda1.png'],
    ['imagens/personagem/segurando_parado_esquerda2.png', 'imagens/personagem/segurando_andando_esquerda2.png'],
    ['imagens/personagem/segurando_parado_esquerda3.png', 'imagens/personagem/segurando_andando_esquerda3.png'],
    ['imagens/personagem/segurando_parado_esquerda4.png', 'imagens/personagem/segurando_andando_esquerda4.png'],
    ['imagens/personagem/segurando_parado_esquerda5.png', 'imagens/personagem/segurando_andando_esquerda5.png'],
    ['imagens/personagem/segurando_parado_esquerda6.png', 'imagens/personagem/segurando_andando_esquerda6.png'],
    ['imagens/personagem/segurando_parado_esquerda7.png', 'imagens/personagem/segurando_andando_esquerda7.png'],
    ['imagens/personagem/segurando_parado_esquerda8.png', 'imagens/personagem/segurando_andando_esquerda8.png']
  ],

  "direita": [
    ['imagens/personagem/parado_direita.png', 'imagens/personagem/andando_direita.png'],

    ['imagens/personagem/segurando_parado_direita1.png', 'imagens/personagem/segurando_andando_direita1.png'],
    ['imagens/personagem/segurando_parado_direita2.png', 'imagens/personagem/segurando_andando_direita2.png'],
    ['imagens/personagem/segurando_parado_direita3.png', 'imagens/personagem/segurando_andando_direita3.png'],
    ['imagens/personagem/segurando_parado_direita4.png', 'imagens/personagem/segurando_andando_direita4.png'],
    ['imagens/personagem/segurando_parado_direita5.png', 'imagens/personagem/segurando_andando_direita5.png'],
    ['imagens/personagem/segurando_parado_direita6.png', 'imagens/personagem/segurando_andando_direita6.png'],
    ['imagens/personagem/segurando_parado_direita7.png', 'imagens/personagem/segurando_andando_direita7.png'],
    ['imagens/personagem/segurando_parado_direita8.png', 'imagens/personagem/segurando_andando_direita8.png']
  ],

  "subindo": [
    ['imagens/personagem/costas.png', 'imagens/personagem/costas.png'],
    ['imagens/personagem/costas.png', 'imagens/personagem/costas.png'],
    ['imagens/personagem/costas.png', 'imagens/personagem/costas.png'],
    ['imagens/personagem/costas.png', 'imagens/personagem/costas.png'],
    ['imagens/personagem/costas.png', 'imagens/personagem/costas.png'],
    ['imagens/personagem/costas.png', 'imagens/personagem/costas.png'],
    ['imagens/personagem/costas.png', 'imagens/personagem/costas.png'],
    ['imagens/personagem/costas.png', 'imagens/personagem/costas.png'],
    ['imagens/personagem/costas.png', 'imagens/personagem/costas.png']
  ],

  "descendo": [
    ['imagens/personagem/descendo.png', 'imagens/personagem/descendo.png'],

    ['imagens/personagem/segurando_descendo1.png', 'imagens/personagem/segurando_descendo1.png'],
    ['imagens/personagem/segurando_descendo2.png', 'imagens/personagem/segurando_descendo2.png'],
    ['imagens/personagem/segurando_descendo3.png', 'imagens/personagem/segurando_descendo3.png'],
    ['imagens/personagem/segurando_descendo4.png', 'imagens/personagem/segurando_descendo4.png'],
    ['imagens/personagem/segurando_descendo5.png', 'imagens/personagem/segurando_descendo5.png'],
    ['imagens/personagem/segurando_descendo6.png', 'imagens/personagem/segurando_descendo6.png'],
    ['imagens/personagem/segurando_descendo7.png', 'imagens/personagem/segurando_descendo7.png'],
    ['imagens/personagem/segurando_descendo8.png', 'imagens/personagem/segurando_descendo8.png']
  ]
},

  gerar: function (ctx) {
    if (!this.segurando[0]) {
    this.img.src = this.diretorio[this.lado][0][this.andando ? 1 : 0];}
    else {
    this.img.src = this.diretorio[this.lado][this.segurando[2]+1][this.andando ? 1 : 0];}
    ctx.drawImage(this.img, this.x, this.y, 100, 100);
  },
  mover: function () {
    if (!this.andando) return;

    if (this.lado === "esquerda") this.x -= this.velocidade;
    if (this.lado === "direita") this.x += this.velocidade;
    if (this.lado === "subindo") this.y -= this.velocidade;
    if (this.lado === "descendo") this.y += this.velocidade;

    var yMin, yMax;
    if (this.x < 120) { yMin = 340; yMax = 440; }
    else if (this.x < 180) { yMin = 330; yMax = 420; }
    else if (this.x < 230) { yMin = 315; yMax = 400; }
    else if (this.x < 280) { yMin = 290; yMax = 370; }
    else if (this.x < 320) { yMin = 275; yMax = 355; }
    else if (this.x < 360) { yMin = 265; yMax = 340; }
    else if (this.x < 420) { yMin = 250; yMax = 320; }
    else if (this.x < 460) { yMin = 235; yMax = 300; }
    else if (this.x < 520) { yMin = 225; yMax = 285; }
    else { yMin = 220; yMax = 225; }

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
  desenhar: function (personagem,pontos,timer) {
    this.desenharImagemProxima('imagens/4.png', 50, 250, 200, 240, personagem, "1");
    this.desenharImagemProxima('imagens/1.png', 155, 222, 200, 240, personagem, "2");
    this.desenharImagemProxima('imagens/3.png', 270, 161, 200, 240, personagem, "3");
    this.desenharImagemProxima('imagens/2.png', 385, 130, 200, 240, personagem, "4");
    this.desenharImagem('imagens/score.png', 755, -5, 100, 80);
    this.desenharImagem('imagens/timer.png', 0, 10, 90, 50);
     this.desenharImagem('imagens/fase_1.png', 330, 0, 250, 200);
    this.escrever(800, 80,pontos);
    this.escrever(100, 45,timer);
    
  },

  desenharImagemProxima: function (src, x, y, largura, altura, personagem, id) {
    var img = new Image();
    img.src = src;
    if (personagem.x >= 50 && personagem.x <= 120 && personagem.y >= 330 && personagem.y <= 340 && id == "1") { largura += 20; altura += 20; }
    if (personagem.x >= 115 && personagem.x <= 280 && personagem.y >= 315 && personagem.y <= 325 && id == "2") { largura += 20; altura += 20; }
    if (personagem.x >= 270 && personagem.x <= 390 && personagem.y >= 265 && personagem.y <= 275 && id == "3") { largura += 20; altura += 20; }
    if (personagem.x >= 370 && personagem.x <= 540 && personagem.y >= 220 && personagem.y <= 230 && id == "4") { largura += 20; altura += 20; }
    ctx.drawImage(img, x, y, largura, altura);
  },

  desenharImagem: function (src, x, y, largura, altura) {
    var img = new Image();
    img.src = src;
    ctx.drawImage(img, x, y, largura, altura);
  },
  escrever: function(x,y,texto){
    ctx.font = "20px Arial";     
    ctx.fillStyle = "white";     
    ctx.fillText(texto, x, y);
  }
  
};

/*--------VERIFICA PERSONAGEM PERTO DA CAIXA ----------*/
function pertocaixa(x,y,item){
  var pontos = 0
  var perto = false
    if (x >= 50 && x <= 120 && y >= 330 && y <= 340) {
      perto = true 
      if(item==1){
      pontos = 80
    }
      else{
      pontos = -80
    }
    
  }
    else if (x >= 115 && x <= 280 && y >= 315 && y <= 325) {
      perto = true
         if(item==2){
      pontos = 80
    }
      else{
      pontos = -80

    }
      }
      
    else if (x >= 270 && x <= 390 && y >= 265 && y <= 275) { 
      perto = true
      if(item==3){
      pontos = 80
    }
      else{
      pontos = -80
    }
    }
    else if (x >= 370 && x <= 540 && y >= 220 && y <= 230) { 
      perto = true
       if(item==4){
      pontos = 80
    }
      else{
        pontos = -80
      }
    }
    return[perto,pontos]
    
}



/*------- LOOP PRINCIPAL -------*/
var i = 0;
var tempoTroca = 0;
var intervaloTroca = 30;
var tempoItem = 0;
var intervaloItem = 250;
var pontos_global = 0.25
var timer = 150;
var timer2 = 50;
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(21, 21, 27, 0.52)";
  ctx.beginPath();
  ctx.arc(445, 425, 40, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();

  esteira.desenhar(ctx, i);
  if(timer2<=0){
    timer--;
    timer2 = 50;
  }
  else{
    timer2--;
  }
  fundo.desenhar(personagem,pontos_global,timer);

  for (var j = 0; j < itens.length; j++) {
    pontos_global+= itens[j].mover();
    itens[j].desenhar(ctx);

    if (itens[j].caixaDestino) {
      ctx.font = "14px Arial";

      if (itens[j].caixaDestino == 1) { ctx.fillStyle = "red";   ctx.beginPath();ctx.arc(itens[j].x, itens[j].y - 5, 5, 0, 2 * Math.PI); ctx.closePath();ctx.fill();}
      if (itens[j].caixaDestino == 2) { ctx.fillStyle = "blue";   ctx.beginPath();ctx.arc(itens[j].x, itens[j].y - 5, 5, 0, 2 * Math.PI);ctx.closePath();ctx.fill();}
      if (itens[j].caixaDestino == 3) { ctx.fillStyle = "yellow";   ctx.beginPath();ctx.arc(itens[j].x, itens[j].y - 5, 5, 0, 2 * Math.PI);ctx.closePath();ctx.fill();}
      if (itens[j].caixaDestino == 4) { ctx.fillStyle = "lime";   ctx.beginPath();ctx.arc(itens[j].x, itens[j].y - 5, 5, 0, 2 * Math.PI); ctx.closePath();ctx.fill();}
    }
  }
  var novos = [];
  for (var j = 0; j < itens.length; j++) {
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
  if(teclas[" "] && personagem.segurando[0] == false && itens.length>0 && personagem.x>=350 && personagem.x<=410 && personagem.y>=300 && personagem.y<=320) {


     personagem.segurando[0] = true; 
     personagem.segurando[1]=itens[0].caixaDestino;
     personagem.segurando[2]=itens[0].id;
     itens[0].ativo = false; 
    
    }
  else if(teclas[" "] && personagem.segurando[0] == true) {
    var perto = pertocaixa(personagem.x,personagem.y,personagem.segurando[1])
    if(perto[0]){
      personagem.segurando[0] = false;
      personagem.segurando[1] = 0;
      pontos_global += perto[1];
    }
  }

  
  personagem.mover();
  personagem.gerar(ctx);

  tempoTroca++;
  if (tempoTroca >= intervaloTroca) {
    i = (i + 1) % 2;
    tempoTroca = 0;
  }
  if(timer<=0){
    fim_game(pontos_global)
  }
  requestAnimationFrame(loop);
}
function fim_game(pontos){
  if(pontos>=800){
    window.open("fase2.html");

  }else{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath()
     ctx.font = "20px Arial";     
    ctx.fillStyle = "white"; 
    ctx.fillText("Você perdeu :(", 300,300)
    ctx.fillText("Recarregue a pagina para reniciar", 300, 400)
    ctx.closePath()
  }
}
loop();
