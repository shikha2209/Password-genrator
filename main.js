/*background of slider & length of slider*/
const sliderPros = {
    fill: "#0B1EDF",
	background: "rgba(255, 255, 255, 0.214)",
}
const slider = document.querySelector(".range");
const slidervalue = document.querySelector(".showrange");
slider.querySelector("input").addEventListener("input",event=>{
    slidervalue.setAttribute("data-length",event.target.value);
    applyFill(event.target);
});
applyFill(slider.querySelector("input"));
function applyFill(slider){
    const percentage = (100*(slider.value - slider.min))/(slider.max - slider.min);
    const bg = `linear-gradient(90deg,${sliderPros.fill} ${percentage}%,${sliderPros.background}${percentage + 0.5}%)`;
    slider.style.background = bg;
    slidervalue.setAttribute("data-length",slider.value);
}
/*--------------- I define functions ---------------*/
const randomValue = {
    lower : getRandomlower,
    upper : getRandomupper,
    number : getRandomnumber,
    symbol : getRandomsymbol,
};
function getRandomlower(){
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
  	return alphabet[Math.floor(Math.random() * alphabet.length)]
}
function getRandomupper(){
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  	return alphabet[Math.floor(Math.random() * alphabet.length)]
}
function getRandomnumber() {
	const number = "0123456789"
  	return number[Math.floor(Math.random() * number.length)]
}
function getRandomsymbol() {
	const symbols = '~!@#$%^&*()_+{}":?><;.,';
	return symbols[Math.floor(Math.random() * symbols.length)];
}
/*DOM select*/
const resultEl = document.getElementById("display_res");
// The input slider, will use to change the length of the password
const lengthEl = document.getElementById("slider");
// Checkboxes representing the options that is responsible to create differnt type of password based on user
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numberEl = document.getElementById("numbers");
const symbolEl = document.getElementById("symbols");
// Button to generate the password
const generateBtn = document.getElementById("generate");
// Result viewbox container
const resultContainer = document.querySelector(".result");
let generatedPassword = false;
generateBtn.addEventListener("click",()=>{
    const length = +lengthEl.value;
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numberEl.checked;
	const hasSymbol = symbolEl.checked;
    generatedPassword = true;
    resultEl.innerText = generatePassword(length,hasLower,hasUpper,hasNumber,hasSymbol);
    
});
function generatePassword(length,lower,upper,number,symbol){
    let generatedPassword = "";
    const types = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);
    if (types === 0){
        let val = "🔐 CLICK TO GENERATE 🔐";
        alert("Check Atleast One Box..What type you want")
        return val;
    }
    for(let i=0;i<length;i++){
        typesArr.forEach(type=>{
            const Value = Object.keys(type)[0];
            generatedPassword = generatedPassword + randomValue[Value]();
        });
    }
    return generatedPassword.slice(0,length).split('').join('');
}