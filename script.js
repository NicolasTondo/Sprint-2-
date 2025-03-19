// referencia para os elementos HTML
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const convertBtn = document.getElementById("convert");
const resetBtn = document.getElementById("reset");
const result = document.getElementById("result");

// requisição ao https 
// uso do arquivo csv com json  
    fetch("https://economia.awesomeapi.com.br/xml/available")
    .then(response => response.json())

    // uso de then para definir a data de cada moeda da API
    .then(data => {
        Object.keys(data).forEach(currency => {
            fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
            toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
        });
    });

convertBtn.addEventListener("click", () => {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const value = amount.value;
    
    if (from === to) {
        result.innerText = "Escolha moedas diferentes.";
        return;
    }
});

resetBtn.addEventListener("click", () => {
    amount.value = "";
    result.innerText = "Resultado: -";
});