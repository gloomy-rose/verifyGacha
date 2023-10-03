var banner1 = {
  26: "Jackspot: Role 1d100",
  11: "Resetador de Atributo",
  22: "6 Runas A",
  33: "350exp",
  44: "10kg material + 20 Pedras de energia condensada",
  55: "1 Artefato A",
  66: "3 Artefato B",
  77: "Resetador de Atributo",
  88: "1 Artefato A",
  99: "350exp",
  100: "10kg material + 20 Pedras de energia condensada",
  111: "6 Runas A",
  122: "3 Artefato B"
};

var banner2 = {
  26: "Jackspot: Role 1d100",
  11: "350exp",
  22: "1 nível do passe de batalha",
  33: "Mida’s Blessing 100% (5 turnos)",
  44: "Athena’s Blessing 100% (5 turnos)",
  55: "Ares’s Blessing 10% (5 turnos)",
  66: "Hekate’s Blessing 10% (5 turnos)",
  77: "350exp",
  88: "1 nível do passe de batalha",
  99: "Mida’s Blessing 100% (5 turnos)",
  100: "Athena’s Blessing 100% (5 turnos)",
  111: "Ares’s Blessing 10% (5 turnos)",
  122: "Hekate’s Blessing 10% (5 turnos)",
};

var bannerSelecionado = banner1;

function ultimaOcorrencia(numero, string) {
  // Remove espaços extras no início e no final da string e divide usando múltiplos espaços como delimitador
  const partes = string.trim().split(/\s+/);
  
  let ultimaPosicao = -1;
  
  // Percorre as partes para encontrar a última ocorrência do número desejado
  for (let i = 0; i < partes.length; i++) {
      // Converte a parte para um número inteiro
      const parteNumero = parseInt(partes[i]);
      
      // Verifica se a parte é igual ao número desejado e atualiza a última posição
      if (parteNumero === numero) {
          ultimaPosicao = i;
      }
  }
  
  // Retorna a última posição encontrada (ou -1 se não houver ocorrência)
  return ultimaPosicao + 1;
}


function gerarResultados() {
  var numerosSorteadosInput = document.getElementById("numerosSorteadosInput");
  var numerosSorteadosDiscord = numerosSorteadosInput.value.trim();

  // Verificar se o input está vazio
  if (numerosSorteadosDiscord === "") {
    // Limpar a tabela de resultados
    document.getElementById("resultsTableBody").innerHTML = "";
    // Resetar o número de dracmas e quantidade de números
    document.getElementById("nroDracmas").textContent = "0";
    document.getElementById("quantidadeNumeros").textContent = "0";
    document.getElementById("quantidadeQuatroEstrelas").textContent = "0";
    document.getElementById("quantidadeTresEstrelas").textContent = "0";
    document.getElementById("quantidadeJackspot").textContent = "0";
    document.getElementById("ultimaOcorrenciaJackspot").textContent = "0";
    return; // Encerrar a função
  }

  var numbers = numerosSorteadosDiscord.split(/\s+/); // Utiliza expressão regular para considerar múltiplos espaços em branco
  var premioDracmas = 200;

  var tableBody = document.getElementById("resultsTableBody");
  var nroDracmas = 0;
  var jackspot = 26;

  // Limpar tabela antes de gerar os novos resultados
  tableBody.innerHTML = "";
  var qtdCincoEstrelas = 0; // Inicializa o contador como 0

  numbers.forEach(function(number) {
    var row = document.createElement("tr");
    if (number == jackspot) {
      qtdCincoEstrelas++; 
    }
    var resultCell = document.createElement("td");
    if (bannerSelecionado.hasOwnProperty(number)) {
      resultCell.textContent = number + " - " + bannerSelecionado[number];
      row.appendChild(resultCell);
      tableBody.appendChild(row);
    } else {
      nroDracmas++;
    }
  });

  document.getElementById("nroDracmas").textContent = nroDracmas * premioDracmas;
  document.getElementById("quantidadeQuatroEstrelas").textContent =  numbers.length - nroDracmas - qtdCincoEstrelas;
  document.getElementById("quantidadeTresEstrelas").textContent = nroDracmas;
  document.getElementById("quantidadeNumeros").textContent = numbers.length;
  document.getElementById("quantidadeJackspot").textContent = qtdCincoEstrelas;
  document.getElementById("ultimaOcorrenciaJackspot").textContent = ultimaOcorrencia(jackspot , numerosSorteadosDiscord);
}

// Aguardar o documento ser carregado
document.addEventListener("DOMContentLoaded", function() {
  // Obtém a referência ao elemento bannerSelectInput
  var bannerSelectInput = document.getElementById("bannerSelectInput");
  bannerSelectInput.addEventListener("change", function() {
    if (this.value === "banner1") {
      bannerSelecionado = banner1;
    } else if (this.value === "banner2") {
      bannerSelecionado = banner2;
    }
  });
});

function copiarResultado() {
  var resultadoDiv = document.getElementById("totalDeGanhos");
  var resultadoTexto = resultadoDiv.innerText || resultadoDiv.textContent; // Obtém o conteúdo de texto da div

  // Cria um elemento temporário para copiar o texto
  var tempInput = document.createElement("textarea");
  tempInput.value = resultadoTexto;

  // Define o estilo do elemento temporário para torná-lo invisível
  tempInput.style.position = "absolute";
  tempInput.style.left = "-9999px";

  // Adiciona o elemento temporário à página
  document.body.appendChild(tempInput);

  // Seleciona e copia o texto do elemento temporário
  tempInput.select();
  document.execCommand("copy");

  // Remove o elemento temporário
  document.body.removeChild(tempInput);

  // Exibe uma mensagem ou realiza outras ações de feedback
  alert("Resultado copiado para a área de transferência!");
}
