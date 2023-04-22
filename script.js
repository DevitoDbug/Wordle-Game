const WORD_URL = "https://words.dev-apis.com/word-of-the-day"
const WORD_Validation_URL = "https://words.dev-apis.com/validate-word"
const inputs = document.querySelectorAll(".wordle__input");
const animate = document.querySelector(".load");
const infoText = document.querySelector(".info");
const infoIcon =document.querySelector("#infoID");
const refreshIcon = document.querySelector("#refreshID");

let WORD = 'night';
let WORD_parts = WORD.split("");
let validIndexes ='';
let validIndexesPositions = '';

let numberOfInputs = inputs.length;
let inputValues = '';

let rowPosition = 0 ;

let isSolved = false;

/**
 * 
 * @param {input from the user} word 
 * 
 * uses the API to check if it is an existing correct five letter word
 */
async function wordValidation(word){
    const body = { word: word };
    const options = {
        method: "POST",
        body: JSON.stringify(body)
    };

    try {
        const response = await fetch(WORD_Validation_URL, options);
        const data = await response.json();
        return data.validWord;
    } catch (error) {
        console.error("Error validating word:", error);
        return null;
    }
}
async function fetchWord(){
    const promise = await fetch(WORD_URL);
    const processedPromise = await promise.json();
    WORD =processedPromise.word;
}

function initialize(){
    for(i = 0 ; i < inputs.length ; i++){
        inputs[i].value = ''; 
        inputs[i].style.backgroundColor = 'white';
    }
}
function colorBoxes(){
    for(i = 0 ; i < validIndexesPositions.length ; i++){
            inputs[parseInt(validIndexesPositions[i]) + rowPosition].classList.add('greenHighlights');
    }
    for(i = 0 ; i < validIndexes.length ; i++){
            inputs[parseInt(validIndexes[i]) + rowPosition].classList.add ('yellowHightlights');
    }   
}

/**
 * 
 * we check to see if that valid letter is in the right position and record that position
 */
function solved(){
    for(i = 0 ; i < 5 ; i++){
        inputs[i+rowPosition].classList.add('greenHighlights');
        inputs[i+rowPosition].style.transform = "scale(1.4)"
    }   
    inputs.forEach(input =>{
        input.disabled =true;
    })  
    isSolved = true; 
}
/**
 * 
 * @param {input from the user} word 
 * 
 * try to find any letter that can also be found on the solution
 */
function validateEachletter(word){
    let obj = makeMap(WORD);
    //getting indexes of letters that are correct and in the right position
    for (i = 0 ; i < word.length ; i++){
            if (WORD[i] === word[i]){
                validIndexesPositions += i;
                obj[word[i]]--;
            } 
    }  
    //getting indexes of letters that are correct but in the wrong positon
    for (i = 0 ; i < word.length ; i++){
            if (WORD[i] === word[i]){
                //do nothing
            }else{
                if (obj[word[i]]){
                    //the letter is correct but in a wrong position
                    obj[word[i]]--;
                    validIndexes += i;
                }else{
                    //do nothing the letter is wrong
                }
            }
    }
    console.log("Valid index positions:",validIndexesPositions , " Valid indexes wrong position: ",validIndexes); 
}
async function validateInputs(something){
    let checker = true
    await wordValidation(something);
    if(checker === true){
        if(something === WORD){
            solved();
            setTimeout(function() {
                alert("You have won!!!🥳🥳🥳🥳🥳🥳");
              }, 1000);
        }else{
            validateEachletter(something);
        }
        colorBoxes();
    }else if (checker === false){
        alert("Come on! That is not a real word");
    }else{
        alert("An error occurred! Check your internet connection");
    }
}
function loading(start){
    if (start === true){
        animate.style.visibility = 'visible'
        inputs.forEach(input =>{
            input.disabled =true;
        })  
    }else if (start ===  false){
        animate.style.visibility = 'hidden'
        inputs.forEach(input =>{
            input.disabled =false;
        })  
    }
}
function youLose(){
    inputs.forEach(input =>{
        input.disabled =true;
    }) 
}
function disabledPreviousRows(){
    inputs.forEach((input, index)=>{
        if (index < (rowPosition))
        input.disabled =true;
    })  
}
inputs.forEach( function(input , index){
    input.addEventListener("input" ,async function(){
        inputValues += input.value;
        if (input.value.length === 1){
            //checking to see if only one character has been entered
            if(index <= numberOfInputs-1){
                if(index != 29){//the is no next input after postion 30
                inputs[index + 1].focus();}
                inputs[index].disabled = true;
                if ((index+1)%5 === 0){
                    //checking to see if we already have five values we can validate
                    loading(true);
                    await validateInputs(inputValues.toLowerCase());
                    if ( isSolved === false){
                        loading(false);
                    }else{
                        animate.style.visibility ="hidden";
                    }
                    if(index != 29)
                    inputs[index + 1].focus();
                    rowPosition+=5;
                    inputValues = '';
                    validIndexes='';
                    validIndexesPositions = '';
                    disabledPreviousRows();
                }
            }
            if (index >= 29){
                youLose();
            } 
        }
    })
})

//utility function
function makeMap(array){
    const obj = {};
    for(i = 0 ; i < array.length ; i++){
        const letter = array[i]
        if (obj[letter]){
            obj[letter]++;
        }else{
            obj[letter] = 1;
        }
    }
    return obj;
}
//Adding event listener to the info icon
document.addEventListener("click" , function(event){
    if (event.target === infoIcon){
        infoText.style.visibility = infoText.style.visibility === "visible" ? "hidden": "visible";
        infoIcon.style.color = "black";
    }else{
        infoText.style.visibility = "hidden"; 
        infoIcon.style.color = "rgba(0, 0, 0, 0.671)";
        refreshIcon.style.color = "rgba(0, 0, 0, 0.671)";
    }
});
//adding event listener to the refresh button
refreshIcon.addEventListener("click", function (){
    refreshIcon.style.color = "black";
    location.reload();
})

fetchWord();
