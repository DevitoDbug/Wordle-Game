const WORD_URL = "https://words.dev-apis.com/word-of-the-day"
const WORD_Validation_URL = "https://words.dev-apis.com/validate-word"
const inputs = document.querySelectorAll(".wordle__input");
const animate = document.querySelector(".load");

let WORD = 'SPOON'.toLocaleLowerCase();
let WORD_parts = WORD.split("");
let validIndexes='';
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
    console.log("The green:",validIndexesPositions);
    console.log("The yellow:",validIndexes);  
    for(i = 0 ; i < validIndexesPositions.length ; i++){
            inputs[parseInt(validIndexesPositions[i]) + rowPosition].style.backgroundColor = 'green';
            inputs[parseInt(validIndexesPositions[i]) + rowPosition].style.color = ' antiquewhite';
            inputs[parseInt(validIndexesPositions[i]) + rowPosition].style.fontWeight = 'bold';
    }
    for(i = 0 ; i < validIndexes.length ; i++){
            inputs[parseInt(validIndexes[i]) + rowPosition].style.backgroundColor = 'yellow';
            inputs[parseInt(validIndexes[i]) + rowPosition].style.color = ' black';
            inputs[parseInt(validIndexes[i]) + rowPosition].style.fontWeight = 'bold';
    }   
}

/**
 * 
 * we check to see if that valid letter is in the right position and record that position
 */
function solved(){
    for(i = 0 ; i < 5 ; i++){
        inputs[i+rowPosition].style.backgroundColor = 'green';
        inputs[i+rowPosition].style.color = 'white';
        inputs[i+rowPosition].style.transform= 'scale(1.4)';
        inputs[i+rowPosition].style.zIndex ="5000";
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
            } 
    }  
    
    //getting indexes of letters that are correct but in the wrong positon
    for (i = 0 ; i < word.length ; i++){
            if (WORD[i] === word[i]){
                //removing the correct letter from the letters to compare with
                obj[word[i]]--;
            }else{
                console.log(obj);
                console.log(obj[word[i]]);
                if (obj[word[i]]){
                    //the letter is correct but in a wrong position
                    obj[word[i]]--;
                    validIndexes += i;
                }else{
                    //do nothing the letter is wrong
                }
            }
    } 
}
async function validateInputs(something){
    console.log(await wordValidation(something));
    let checker = await wordValidation(something);
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
        alert("An error occured! Check your internet connection");
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
inputs.forEach( function(input , index){
    input.addEventListener("input" ,async function(){
        inputValues += input.value;
        if (input.value.length === 1){
            //checking to see if only one character has been entered
            if(index <= numberOfInputs-1){
                if(index != 29)//the is no next input after postion 30
                inputs[index + 1].focus();
                if ((index+1)%5 === 0){
                    //checking to see if we already have five values we can validate
                    console.log("The user has entered: ",inputValues);
                    loading(true);
                    await validateInputs(inputValues.toLowerCase());
                    if ( isSolved === false){
                        loading(false);
                    }else{
                        animate.style.visibility ="hidden";
                    }
                    inputs[index + 1].focus();
                    rowPosition+=5;
                    inputValues = '';
                    validIndexes='';
                    validIndexesPositions = '';
                }
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

fetchWord();