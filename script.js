const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const convertBtn = document.getElementById("convert");
const resetBtn = document.getElementById("reset");
const result = document.getElementById("result");
const calcula = document.getElementById("calcula");

// Buscar 
fetch("https://api.frankfurter.app/currencies")
    .then(response => response.json())
    .then(data => {
        Object.keys(data).forEach(currency => {
            fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
            toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
        });
    });

//calcula.addEventListener(''

//  moeda
convertBtn.addEventListener("click", () => {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const value = amount.value;
    if (!value) {
        return false;
    }
    
    if (from === to) {
        result.innerText = "Escolha moedas diferentes.";
        return;
    }
    
    fetch(`https://api.frankfurter.app/latest?amount=${value}&from=${from}&to=${to}`)
        .then(response => response.json())
        .then(data => {
            result.innerText = `Resultado: ${data.rates[to]} ${to}`;
        });
});

// Resetar valores
resetBtn.addEventListener("click", () => {
    amount.value = "";
    result.innerText = "Resultado: -";
});