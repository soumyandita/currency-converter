const api = "https://api.frankfurter.dev";

const dropdowns = document.querySelectorAll(".dropdown select");
const exchange = document.querySelector(".dropdown i");
let fromSelect, toSelect;
let btn = document.querySelector("button");
let msg = document.querySelector(".msg");
let amount = document.querySelector("#amount");

for(select of dropdowns) {
    for(code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        select.append(newOption);

        if(select.name === "from" && code === "USD") {
            fromSelect = select;
            newOption.selected = "true";
        }
        if(select.name === "to" && code === "INR") {
            toSelect = select;
            newOption.selected = "true";
        }
    }

    select.addEventListener("change", (element) => {
        updateFalg(element.target);
    });
}

function updateFalg(element) {
    element.parentElement.querySelector("img").src = `https://flagsapi.com/${countryList[element.value]}/flat/64.png`;
}

let angle = 0;

exchange.addEventListener("click", () => {
    let option1 = fromSelect.value;
    let option2 = toSelect.value;

    fromSelect.value = option2;
    toSelect.value = option1;
    
    fromSelect.parentElement.querySelector("img").src = `https://flagsapi.com/${countryList[fromSelect.value]}/flat/64.png`;
    toSelect.parentElement.querySelector("img").src = `https://flagsapi.com/${countryList[toSelect.value]}/flat/64.png`;

    angle += 180;
    exchange.style.transform = `rotate(${angle}deg)`;
});

btn.addEventListener("click", async (event) => {
    event.preventDefault();
    const URL = `${api}/v2/rate/${fromSelect.value.toLowerCase()}/${toSelect.value.toLowerCase()}`;

    if(amount.value == "" || amount.value < 1) {
        amount.value = 1;
    }

    let response = await fetch(URL);
    let data = await response.json();

    msg.innerText = `${amount.value} ${fromSelect.value} = ${amount.value * data.rate} ${toSelect.value}`
    console.log(data);
});