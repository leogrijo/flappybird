console.log('Leonardo Grijó - Flappy Bird');

const imagemFonte = new Image();
imagemFonte.src = './sprites.png';

const canvas  = document.querySelector('canvas');
const context = canvas.getContext('2d');

//Objeto que representa o FlappyBird
const flappyBird = {
    xInicialRecorte: 0, //Coordenada X de onde o recorte começa no arquivo de origem
    yInicialRecorte: 0, //Coordenada Y de onde o recorte começa no arquivo de origem
    xFinalRecorte: 33,  //Coordenada X de onde o recorte termina no arquivo de origem
    yFinalRecorte: 24,  //Coordenada Y de onde o recorte termina no arquivo de origem
    localRenderX: 10,   //Coordenada X de onde a imagem será renderizada na tela
    localRenderY: 100,  //Coordenada Y de onde a imagem será renderizada na tela
    largura: 33,        //Largura que a imagem irá aparecer na tela
    altura: 24,         //Altura que a imagem irá aparecer na tela
    gravidadeFP: 0.2,  //Incremento da posição para criar o efeito de aceleração da gravidade do FP
    velocidadeQueda: 0, //Velocidade de queda do FP - É incrementada com a gravidadeFP 
    atualiza(){         //Função para criar movimentação do FB - O movimento padrão dentro do jogo é a queda constante
      this.velocidadeQueda = this.velocidadeQueda + this.gravidadeFP; //this é a mesma coisa que usar flappyBird
      //Condicional que limita a queda até o chão
      if (flappyBird.localRenderY <= (canvas.height - chao.altura - flappyBird.altura)) { //Como o localRenderY se refere ao topo do FBird, precisa descontar isso também
        flappyBird.localRenderY = flappyBird.localRenderY + this.velocidadeQueda; //Dá o efeito de queda do Flappy Bird - Incrementa a posição no eixo Y
      }
    },
    desenha(){          //Função para desenhar a imagem na tela
      context.drawImage(
        imagemFonte, // Arquivo de origem de onde a imagem que será projetada na tela será recortada
        flappyBird.xInicialRecorte, flappyBird.yInicialRecorte, // Coordenadas para desenhar a imagem - Canto superior esquerdo do que será desenhado
        flappyBird.xFinalRecorte,   flappyBird.yFinalRecorte, // Medidas da largura e altura da imagem - Coordenada do canto inferior direito da imagem
        flappyBird.localRenderX,    flappyBird.localRenderY, // Coordenadas do local da tela onde irá ser desenhada a imagem
        flappyBird.largura,         flappyBird.altura // Tamanho do que será desenhado na tela - No caso, mesmo tamanho do recorte da imagem
      );
    }
};

//Objeto que representa o Chão
const chao = {
    xInicialRecorte: 0, //Coordenada X de onde o recorte começa no arquivo de origem
    yInicialRecorte: 610, //Coordenada Y de onde o recorte começa no arquivo de origem
    xFinalRecorte: 224,  //Coordenada X de onde o recorte termina no arquivo de origem
    yFinalRecorte: 112,  //Coordenada Y de onde o recorte termina no arquivo de origem
    localRenderX: 0,   //Coordenada X de onde a imagem será renderizada na tela
    localRenderY: canvas.height -112,  //Coordenada Y de onde a imagem será renderizada na tela
    largura: 224,        //Largura que a imagem irá aparecer na tela
    altura: 112,         //Altura que a imagem irá aparecer na tela
    desenha(){          //Função para desenhar a imagem na tela
      context.drawImage(
        imagemFonte, // Arquivo de origem de onde a imagem que será projetada na tela será recortada
        chao.xInicialRecorte, chao.yInicialRecorte, // Coordenadas para desenhar a imagem - Canto superior esquerdo do que será desenhado
        chao.xFinalRecorte,   chao.yFinalRecorte, // Medidas da largura e altura da imagem - Coordenada do canto inferior direito da imagem
        chao.localRenderX,    chao.localRenderY, // Coordenadas do local da tela onde irá ser desenhada a imagem
        chao.largura,         chao.altura // Tamanho do que será desenhado na tela - No caso, mesmo tamanho do recorte da imagem - Opcional. Função permite que esses parâmetros sejam suprimidos
      );

      //Como a imagem recortada não é suficiente para preencher toda a largura do canvas, desenha-se novamente ao lado da outra imagem
      context.drawImage(
        imagemFonte, // Arquivo de origem de onde a imagem que será projetada na tela será recortada
        chao.xInicialRecorte,             chao.yInicialRecorte, // Coordenadas para desenhar a imagem - Canto superior esquerdo do que será desenhado
        chao.xFinalRecorte,               chao.yFinalRecorte, // Medidas da largura e altura da imagem - Coordenada do canto inferior direito da imagem
        chao.localRenderX + chao.largura, chao.localRenderY, // Coordenadas do local da tela onde irá ser desenhada a imagem
        chao.largura,                     chao.altura // Tamanho do que será desenhado na tela - No caso, mesmo tamanho do recorte da imagem
      );
    }
};

//Objeto que representa o Plano de fundo
const planoDefundo = {
  xInicialRecorte: 390, //Coordenada X de onde o recorte começa no arquivo de origem
  yInicialRecorte: 0, //Coordenada Y de onde o recorte começa no arquivo de origem
  xFinalRecorte: 275,  //Coordenada X de onde o recorte termina no arquivo de origem
  yFinalRecorte: 204,  //Coordenada Y de onde o recorte termina no arquivo de origem
  localRenderX: 0,   //Coordenada X de onde a imagem será renderizada na tela
  localRenderY: canvas.height -204,  //Coordenada Y de onde a imagem será renderizada na tela
  largura: 275,        //Largura que a imagem irá aparecer na tela
  altura: 204,         //Altura que a imagem irá aparecer na tela
  desenha(){          //Função para desenhar a imagem na tela
    //Desenhando um quadrado que ocupa toda a área do canvas para representar o céu azul ao fundo
    context.fillStyle = '#70c5ce';
    context.fillRect(0, 0, canvas.width, canvas.height); //Parâmetros: Coordenadas xInicial, yInicial, xFinal, yFinal
    
    context.drawImage(
      imagemFonte, // Arquivo de origem de onde a imagem que será projetada na tela será recortada
      planoDefundo.xInicialRecorte, planoDefundo.yInicialRecorte, // Coordenadas para desenhar a imagem - Canto superior esquerdo do que será desenhado
      planoDefundo.xFinalRecorte,   planoDefundo.yFinalRecorte, // Medidas da largura e altura da imagem - Coordenada do canto inferior direito da imagem
      planoDefundo.localRenderX,    planoDefundo.localRenderY, // Coordenadas do local da tela onde irá ser desenhada a imagem
      planoDefundo.largura,         planoDefundo.altura // Tamanho do que será desenhado na tela - No caso, mesmo tamanho do recorte da imagem - Opcional. Função permite que esses parâmetros sejam suprimidos
    );

    //Como a imagem recortada não é suficiente para preencher toda a largura do canvas, desenha-se novamente ao lado da outra imagem
    context.drawImage(
      imagemFonte, // Arquivo de origem de onde a imagem que será projetada na tela será recortada
      planoDefundo.xInicialRecorte,                     planoDefundo.yInicialRecorte, // Coordenadas para desenhar a imagem - Canto superior esquerdo do que será desenhado
      planoDefundo.xFinalRecorte,                       planoDefundo.yFinalRecorte, // Medidas da largura e altura da imagem - Coordenada do canto inferior direito da imagem
      planoDefundo.localRenderX + planoDefundo.largura, planoDefundo.localRenderY, // Coordenadas do local da tela onde irá ser desenhada a imagem
      planoDefundo.largura,                             planoDefundo.altura // Tamanho do que será desenhado na tela - No caso, mesmo tamanho do recorte da imagem
    );
  }
};

//Função para fazer um loop do desenho na tela - Conceito de FPS vem daí - A imagem é desenhada na tela de forma repetida
function loop(){
  //A ordem das chamadas das funções de desenho afetam a ordem das imagens na tela
  //Chamada da função para desenhar o plano de fundo
  planoDefundo.desenha();
  
  //Chamada da função para desenhar o chão na tela
  chao.desenha();

  //Chamada da função para criar o efeito de movimentação o Flappy Bird na tela
  flappyBird.atualiza();
  
  //Chamada da função para desenhar o Flappy Bird na tela
  flappyBird.desenha();

  
  

  //Função para otimizar a forma como a animação é gerada na tela - gera a animação de forma mais suave na tela
  requestAnimationFrame(loop);

};

loop();
