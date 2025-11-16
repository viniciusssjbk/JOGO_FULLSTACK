var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

/* ---------------- CANVAS DO TUTORIAL E REFERENCIAS---------------- */
var tutorial = document.getElementById("tutorialCanvas");
var tctx = tutorial.getContext("2d");

var referencias = document.getElementById("referencias");
var rctx = referencias.getContext("2d");

/* ---------------- IMAGENS DO TUTORIAL ---------------- */
var imgAndando = new Image();
var imgAndando2 = new Image();
var imgsegunrado = new Image();
imgAndando.src = "imagens/personagem/andando_direita.png";
imgAndando2.src = "imagens/personagem/costas.png";
imgsegunrado.src = "imagens/personagem/segurando_parado_direita4.png";

var imgItem1 = new Image();
var imgItem2 = new Image();
var imgItem3 = new Image();
var imgItem4 = new Image();
var imgItem5 = new Image();
var imgItem6 = new Image();
var imgItem7 = new Image();
var imgItem8 = new Image();

   imgItem1.src="imagens/item1.png"
   imgItem2.src="imagens/item2.png"
   imgItem3.src="imagens/item3.png"
   imgItem4.src="imagens/item4.png"
   imgItem5.src="imagens/item5.png"
   imgItem6.src="imagens/item6.png"
   imgItem7.src="imagens/item7.png"
   imgItem8.src="imagens/item8.png"

/* ---------------- ANIMAÇÃO BÁSICA ---------------- */
var frame = 0;

function desenharTutorial() {
    tctx.clearRect(0, 0, tutorial.width, tutorial.height);

    tctx.font = "21px monospace";
    tctx.fillStyle = "white";

    // --- TÍTULO ---
    tctx.fillText("TUTORIAL", 55, 70);

    // --- ANDAR PARA OS LADOS ---
    tctx.fillText("MOVER:", 70, 120);
    tctx.fillText("←  →", 75, 160);
    tctx.drawImage(imgAndando, 70 + Math.sin(frame * 0.1) * 10, 180, 60, 60);
    tctx.fillText("↑  ↓", 78, 270);
    tctx.drawImage(imgAndando2, 78, Math.sin(frame * 0.1) * 5 + 300, 50, 50);

    // --- PEGAR ITEM ---
    tctx.fillText('Precione Espaço', 15, 390); 
    tctx.fillText('paga pegar', 45, 422); 
    tctx.fillText('e soltar itens', 20, 455); 
    tctx.drawImage(imgsegunrado, 75, 490, 60, 60);



    //-- REFERENCIAS --

    rctx.font = "21px monospace";
    rctx.fillStyle = "white";

    // --- TÍTULO ---
    rctx.fillText("REFERÊNCIAS", 40, 70);

       /* --- REFERENCIAS DE ITENS --- */

    /* --- REFERENCIAS DE ITENS --- */

    let baseY = 120;  // primeira linha das referências
    let gap = 120;    // espaço vertical entre grupos

    rctx.fillStyle = "red";
    rctx.fillText("VERMELHO", 59, baseY);
    rctx.drawImage(imgItem1, 55, baseY + 20, 52, 52);
    rctx.drawImage(imgItem2, 110, baseY + 20, 52, 52);

    rctx.fillStyle = "cyan";
    rctx.fillText("AZUL", 83 , baseY + gap);
    rctx.drawImage(imgItem3, 55, baseY + gap + 20, 52, 52);
    rctx.drawImage(imgItem4, 110, baseY + gap + 20, 52, 52);

    rctx.fillStyle = "yellow";
    rctx.fillText("AMARELO", 65, baseY + gap * 2);
    rctx.drawImage(imgItem5, 55, baseY + gap * 2 + 20, 52, 52);
    rctx.drawImage(imgItem6, 110, baseY + gap * 2 + 20, 52, 52);


    rctx.fillStyle = "lime";
    rctx.fillText("VERDE", 76, baseY + gap * 3);
    rctx.drawImage(imgItem7, 53, baseY + gap * 3 + 20, 52, 52);
    rctx.drawImage(imgItem8, 110, baseY + gap * 3 + 20, 52, 52);

    // volta cor do texto
    rctx.fillStyle = "white";


    frame++;
}

var botao = { x: 350, y: 250, w: 200, h: 80, click:false };

// Desenha a tela de início
function desenharMenu() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText("Clique no botão para começar o jogo", 150, 150);

    ctx.fillStyle = "#222";
    ctx.fillRect(botao.x, botao.y, botao.w, botao.h);

    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("COMEÇAR", botao.x + 25, botao.y + 50);
}

desenharMenu();


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
  item.velocidadeX = 1;
  item.velocidadeY = -0.55;
  item.ativo = true;
  item.caixaDestino = null;

  item.mover = function () {
    var ponto = 0
    item.x += item.velocidadeX;
    item.y += item.velocidadeY;
    if (item.x > 650) {
      item.ativo = false;
      ponto = -75
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
document.addEventListener("keydown", function (e) { teclas[e.key] = true;  e.preventDefault(); });
document.addEventListener("keyup", function (e) { teclas[e.key] = false;  e.preventDefault();});

/*------- FUNDO -------*/
var fundo = {
  desenhar: function (personagem,pontos,timer) {
    this.desenharImagemProxima('imagens/4.png', 50, 250, 200, 240, personagem, "1");
    this.desenharImagemProxima('imagens/1.png', 155, 222, 200, 240, personagem, "2");
    this.desenharImagemProxima('imagens/3.png', 270, 161, 200, 240, personagem, "3");
    this.desenharImagemProxima('imagens/2.png', 385, 130, 200, 240, personagem, "4");
    this.desenharImagem('imagens/score.png', 755, -5, 100, 80);
    this.desenharImagem('imagens/timer.png', 0, 10, 90, 50);
     this.desenharImagem('imagens/fase_3.png', 330, 0, 250, 200);
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
      pontos = 100
    }
      else{
      pontos = -100
    }
    
  }
    else if (x >= 115 && x <= 280 && y >= 315 && y <= 325) {
      perto = true
         if(item==2){
      pontos = 100
    }
      else{
      pontos = -100

    }
      }
      
    else if (x >= 270 && x <= 390 && y >= 265 && y <= 275) { 
      perto = true
      if(item==3){
      pontos = 100
    }
      else{
      pontos = -100
    }
    }
    else if (x >= 370 && x <= 540 && y >= 220 && y <= 230) { 
      perto = true
       if(item==4){
      pontos = 100
    }
      else{
        pontos = -100
      }
    }
    return[perto,pontos]
    
}



/*------- LOOP PRINCIPAL -------*/
var i = 0;
var tempoTroca = 0;
var intervaloTroca = 30;
var tempoItem = 0;
var intervaloItem = 210;
var pontos_global = 50
var timer = 50;
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
  desenharTutorial();

  requestAnimationFrame(loop);
}
function fim_game(pontos){
  if(pontos>=-1000){
   


    function fogo() {
    var cores = ["red", "yellow", "orange", "white", "pink", "lightblue"];
    for (var i = 0; i < 30; i++) {
        var x = Math.random() * canvas.width; 
        var y =  Math.random() * canvas.height;
        ctx.fillStyle = cores[Math.floor(Math.random() * cores.length)];
        ctx.beginPath();
        ctx.arc(x, y, Math.random() * 5 + 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath()
     ctx.font = "40px Arial";     
    ctx.fillStyle = "white"; 
    ctx.fillText("PARABENS!!!!!!!!!!!!", 300,300)
    ctx.fillText("Parabens por completar o jogo", 170, 400)
    ctx.closePath()
    fogo();
    requestAnimationFrame(animar);
}

animar();


  }
  else{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath()
     ctx.font = "20px Arial";     
    ctx.fillStyle = "white"; 
    ctx.fillText("Você perdeu :(", 300,300)
    ctx.fillText("Recarregue a pagina para reniciar", 300, 400)
    ctx.closePath()
  }
  
}

canvas.addEventListener("click", function(e){
    let rect = canvas.getBoundingClientRect();
    let mx = e.clientX - rect.left;
    let my = e.clientY - rect.top;

    // Se clicou no botão → executa o "próximo"
    if (mx > botao.x && mx < botao.x + botao.w &&
        my > botao.y && my < botao.y + botao.h && botao.click==false) {

        // Limpando a tela e indo para a próxima etapa
        ctx.clearRect(0,0,canvas.width,canvas.height);
        botao.click= true;
        loop();

    
    }
});