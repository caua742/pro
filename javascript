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
