# pro
HTML:
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Jogo da Mina 5x5</title>
  <!-- O link abaixo conecta o arquivo style.css, que define como o jogo vai parecer visualmente
       cores, tamanho do tabuleiro, dos botões, etc -->
  <link rel="stylesheet" href="style.css">
</head>

<body>

<!-- Caixa de dinheiro -->
<div id="caixinha">
  💵 <span id="dinheiro">0</span>
</div>

<!-- X para sair/voltar -->
<a href="outra-pagina.html" id="fechar">×</a>

  <!-- Título do jogo, aparece no topo da página -->
  <h2>Jogo da Mina 5x5</h2>

  <!-- Div onde o tabuleiro vai ser criado pelo JavaScript -->
  <div id="tabuleiro"></div>
  <!-- O JS vai colocar dentro dessa div 25 botões (5x5) que o jogador vai clicar -->

  <!-- Label para explicar o que o input faz -->
  <label>Quantidade de minas:</label>

<!-- Input para valor da aposta -->
<label for="valorAposta">Valor da aposta:</label>
<input type="number" id="valorAposta" min="1" value="10">

<!-- Botão de apostar -->
<button id="apostar">Apostar!</button>

  <!-- Input numérico onde o jogador escolhe quantas minas quer no tabuleiro -->
  <input type="number" id="qtdMinas" min="1" max="24" value="5">
  <!-- min=1 → não permite menos que 1 mina
       max=24 → não permite mais que 24 minas
       value=5 → valor padrão ao abrir a página -->

  <br><br> <!-- Espaço entre o input e o botão -->

  <!-- Botão que serve para Começar ou Parar o jogo -->
  <button id="controle">Começar</button>
  <!-- Quando o jogador clicar:
       - Se o jogo não estiver ativo, ele inicia o jogo
       - Se o jogo já estiver ativo, ele para o jogo -->

  <!-- Conecta o JavaScript que faz o jogo funcionar -->
  <script src="script.js"></script>

</body>
</html>
CSS:
/* Configurações gerais do corpo da página */
body{
  text-align:center; /* Centraliza todo o conteúdo horizontalmente */
  font-family:Arial; /* Define a fonte usada no jogo */
}

/* Estilo da div que vai conter o tabuleiro */
#tabuleiro{
  display:grid; /* Transforma a div em um grid para organizar os botões em linhas e colunas */
  grid-template-columns: repeat(5,60px); /* Cria 5 colunas de 60px cada */
  gap:5px; /* Espaçamento entre os botões (linha e coluna) */
  justify-content:center; /* Centraliza o tabuleiro horizontalmente dentro da div */
  margin:20px; /* Espaço ao redor do tabuleiro */
}

/* Estilo de cada casa (botão) do tabuleiro */
.casa{
  width:60px; /* Largura de cada botão */
  height:60px; /* Altura de cada botão */
  font-size:20px; /* Tamanho da fonte (para ✔ ou 💣) */
  cursor:pointer; /* Mostra o cursor de “mãozinha” quando passa por cima do botão */
}

/* Estilo do botão Começar / Parar */
#controle{
  padding:10px 30px; /* Espaço interno do botão (vertical e horizontal) */
  font-size:18px; /* Tamanho da fonte do botão */
  cursor:pointer; /* Mostra cursor de “mãozinha” quando passa por cima */
}

/* Botão X no canto superior esquerdo */
#fechar{
  position: fixed;       /* fixa no canto da tela */
  top: 10px;             /* distância do topo */
  left: 10px;            /* distância da esquerda */
  font-size: 30px;       /* tamanho do X */
  color: rgb(6, 6, 6);            /* cor do X */
  text-decoration: none; /* remove sublinhado */
  font-weight: bold;
  cursor: pointer;
  z-index: 1000;         /* fica acima de tudo */
  transition: 0.2s;
}

#fechar:hover{
  color: rgb(247, 238, 238);        /* muda cor quando passar o mouse */
}

#caixinha{
  position: fixed;       /* Fixa no canto da tela */
  top: 10px;             /* Distância do topo */
  right: 10px;           /* Distância da direita */
  background-color: rgb(1, 1, 1); /* Cor de destaque */
  color: rgb(252, 249, 249);          /* Cor do texto */
  padding: 10px 15px;    /* Espaçamento interno */
  font-size: 18px;       /* Tamanho da fonte */
  font-weight: bold;     /* Negrito */
  border-radius: 8px;    /* Cantos arredondados */
  box-shadow: 2px 2px 5px rgba(0,0,0,0.3); /* Sombra */
  z-index: 1000;         /* Fica acima de tudo */
}

#apostar{
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px; /* Espaço entre input e botão */
}
JS:

let jogoAtivo = false
let minas = []

const tabuleiro = document.getElementById("tabuleiro")
const botaoControle = document.getElementById("controle")
const inputMinas = document.getElementById("qtdMinas")

let dinheiro = 0; // saldo inicial
const displayDinheiro = document.getElementById("dinheiro");

// Função para atualizar o saldo
function atualizarDinheiro(valor){
  dinheiro += valor;           // adiciona ou subtrai
  if(dinheiro < 0) dinheiro = 0; // não permite saldo negativo
  displayDinheiro.textContent = dinheiro; // atualiza o número na tela
}

const botaoApostar = document.getElementById("apostar");
const inputAposta = document.getElementById("valorAposta");

botaoApostar.onclick = () => {
  let aposta = Number(inputAposta.value);

  // Valida aposta
  if(aposta <= 0){
    alert("Aposta precisa ser maior que zero!");
    return;
  }
  if(aposta > dinheiro){
    alert("Você não tem dinheiro suficiente para essa aposta!");
    return;
  }

  // Sorteio simples: 50% de chance de ganhar
  const ganhou = Math.random() < 0.5;

  if(ganhou){
    atualizarDinheiro(aposta); // ganha o valor apostado
    alert(`Você ganhou a aposta! +${aposta} moedas`);
  } else {
    atualizarDinheiro(-aposta); // perde o valor apostado
    alert(`Você perdeu a aposta! -${aposta} moedas`);
  }
}

// Cria o tabuleiro 5x5
function criarTabuleiro(){
  tabuleiro.innerHTML = ""
  for(let i=0;i<25;i++){
    const btn = document.createElement("button")
    btn.className = "casa"
    btn.onclick = () => clicarCasa(i,btn)
    tabuleiro.appendChild(btn)
  }
}

// Gera as minas aleatórias
function gerarMinas(){
  minas = []
  let quantidade = Number(inputMinas.value)
  if(quantidade < 1) quantidade = 1
  if(quantidade > 24) quantidade = 24

  while(minas.length < quantidade){
    let n = Math.floor(Math.random()*25)
    if(!minas.includes(n)){
      minas.push(n)
    }
  }
}

function revelarMinas() {
  // percorre todos os botões do tabuleiro
  const botoes = tabuleiro.querySelectorAll(".casa")
  minas.forEach(i => {
    const btn = botoes[i]
    // se ainda não foi aberta
    if(btn.textContent === ""){
      btn.textContent = "💣"
      btn.classList.add("aberta")
    }
  })
}


// Função que acontece quando clica numa casa
function clicarCasa(i, btn){
  if(!jogoAtivo) return
  if(btn.textContent !== "") return

  if(minas.includes(i)){
    btn.textContent = "💣"  // mina clicada
    btn.classList.add("aberta") 

    // revela todas as outras minas
    const botoes = tabuleiro.querySelectorAll(".casa")
    minas.forEach(index => {
      const b = botoes[index]
      if(b.textContent === ""){  // se ainda não estava aberta
        b.textContent = "💣"
        b.classList.add("aberta")
      }
    })

    alert("Você perdeu!")
    pararJogo()
  } else {
    btn.textContent = "💎";   // diamante para casas seguras
    btn.classList.add("aberta")
  }
}

// Inicia o jogo
function iniciarJogo(){
  jogoAtivo = true
  gerarMinas()
  criarTabuleiro()
  botaoControle.textContent = "Parar"
}

// Para o jogo
function pararJogo(){
  jogoAtivo = false
  botaoControle.textContent = "Começar"
}

// Alterna o botão Começar / Parar
botaoControle.onclick = () =>{
  if(jogoAtivo){
    pararJogo()
  }else{
    iniciarJogo()
  }
}

// Cria tabuleiro inicial ao abrir a página
criarTabuleiro()
