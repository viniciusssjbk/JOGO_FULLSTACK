var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

function imagem(url, x, y) {
  var img = new Image();
  img.src = url;
  img.onload = function () {
    ctx.drawImage(img, x, y, 240, 280);
  };
  return img;
}

// Chamando a função para cada imagem com sua posição
var caixa_vermelho = imagem('imagens/4.png', 20, 170);
var caixa_azul = imagem('imagens/1.png', 165, 114);
var caixa_amarelo = imagem('imagens/3.png', 310, 30);
var caixa_verde = imagem('imagens/2.png', 455, -15);




function imagem2(url, x, y) {
  var img2 = new Image();
  img2.src = url;
  img2.onload = function () {
    ctx.drawImage(img2, x, y, 800, 710);
  };
  return img2;
}

// Chamando a função para cada imagem com sua posição
var esteira = imagem2('imagens/esteira.png', 40, 82);


 // Lista dos frames (substitua pelos caminhos corretos das imagens)
 const frames = [
  "imagens/lixeirafogo_frame_dif_1.png",
  // "imagens/lixeirafogo_frame_dif_5.png",
  "imagens/lixeirafogo_frame_dif_10.png"
];

const images = [];
let currentFrame = 0;

// Carregar as imagens
frames.forEach((src, i) => {
  const img = new Image();
  img.src = src;
  images.push(img);
});

function animate() {
  const img = images[currentFrame];
  if (img.complete) {
    ctx.drawImage(img, 650, 170, 170, 220);
  }
  currentFrame = (currentFrame + 1) % images.length;
  setTimeout(animate, 300); // muda a velocidade da animação
}

// Inicia a animação quando as imagens estiverem carregadas
window.onload = () => {
  animate();
};
