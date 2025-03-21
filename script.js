const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const fromFlag = document.getElementById("fromFlag");
const toFlag = document.getElementById("toFlag");
const amount = document.getElementById("amount");
const convertBtn = document.getElementById("convert");
const resetBtn = document.getElementById("reset");
const result = document.getElementById("result");


// definir as API's como constante para não serem alteradas
const EXCHANGE_API = "https://api.exchangerate-api.com/v4/latest/USD";
const COUNTRY_API = "https://restcountries.com/v3.1/currency/";

let currencyData = {}; // Guardará os dados da API de moedas

// Buscar moedas e preencher os selects
fetch(EXCHANGE_API)
    .then(response => response.json())
    .then(data => {
        currencyData = data.rates; 
        Object.keys(currencyData).forEach(currency => {
            fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
            toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
        });
        fromCurrency.value = "USD";
        // Define padrão inicial
        // faz a busca na API  com base no nome indicado pela moeda como uma string 
        toCurrency.value = "BRL";
        updateFlags(); 
        // Atualiza bandeiras iniciais
    });

// Buscar bandeiras dos países para cada moeda
function updateFlags() {
    fetch(COUNTRY_API + fromCurrency.value.toLowerCase())
        .then(response => response.json())
        .then(data => {
            fromFlag.src = data[0].flags.svg; 
        })
        .catch(() => fromFlag.src = "default-flag.png"); 

    fetch(COUNTRY_API + toCurrency.value.toLowerCase())
        .then(response => response.json())
        .then(data => {
            toFlag.src = data[0].flags.svg;
        })
        .catch(() => toFlag.src = "default-flag.png"); 
}

// Atualizar bandeiras ao trocar moeda
fromCurrency.addEventListener("change", updateFlags);
toCurrency.addEventListener("change", updateFlags);

// Impedir entrada de caracteres inválidos
amount.addEventListener("input", () => {
    amount.value = amount.value.replace(/[^0-9.]/g, ""); 
});

// Converter moeda
convertBtn.addEventListener("click", () => {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const value = amount.value;

    if (!value) {
        result.innerText = "Preencha o campo de valor.";
        return;
    }

    if (from === to) {
        result.innerText = "Escolha moedas diferentes.";
        return;
    }

    fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[to];
            result.innerText = `Resultado: ${(value * rate).toFixed(2)} ${to}`;
        })
        .catch(() => result.innerText = "Erro ao buscar taxa de câmbio.");
});

// Resetar valores
resetBtn.addEventListener("click", () => {
    amount.value = "";
    result.innerText = "Resultado: -";
});
