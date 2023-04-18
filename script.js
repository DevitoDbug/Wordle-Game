const WORD_URL = "https://words.dev-apis.com/word-of-the-day"
const inputs = document.querySelectorAll(".wordle__input");

let WORD = 'SPOON'.toLocaleLowerCase();
let validIndexes='';
let validIndexesPositions = "";

let numberOfInputs = inputs.length;
let inputValues = '';

let rowPosition = 0 ;


async function fetchWord(){
    const parse = await fetch(WORD_URL);
    const processedPromise = await parse.json();
    WORD =processedPromise.word;
    console.log(WORD);
}

function initialize(){
    for(i = 0 ; i < inputs.length ; i++){
        inputs[i].value = ''; 
        inputs[i].style.backgroundColor = 'white';
    }
}
function colorBoxes(){
    for(i = 0 ; i < validIndexes.length ; i++){
        console.log(rowPosition);
        //before we colour a given box the first if checks if the position is correct
        if (validIndexesPositions.includes(validIndexes[i])){
            inputs[parseInt(validIndexes[i]) + rowPosition].style.backgroundColor = 'green';
            inputs[parseInt(validIndexes[i]) + rowPosition].style.color = ' antiquewhite';
            inputs[parseInt(validIndexes[i]) + rowPosition].style.fontWeight = 'bold';
        }else{
            inputs[parseInt(validIndexes[i]) + rowPosition].style.backgroundColor = 'yellow';
            inputs[parseInt(validIndexes[i]) + rowPosition].style.color = ' antiquewhite';
            inputs[parseInt(validIndexes[i]) + rowPosition].style.fontWeight = 'bold';
        }
    }   
}
/**
 * 
 * we check to see if that valid letter is in the right position and record that position
 */

function validateLetterPosition(){
    //checking if the correct letters are also in the correct position
    let i;
    for(i=0 ; i < validIndexes.length ; i++){
        if (WORD[parseInt(validIndexes[i])]=== inputValues[parseInt(validIndexes[i])]){
            console.log(WORD[parseInt(validIndexes[i])] ,inputValues[parseInt(validIndexes[i])])
            validIndexesPositions += validIndexes[i] ;
        }
    }
    console.log("Valid indexes: "+validIndexes , "ValidIndexPositions: "+validIndexesPositions);
}
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
    alert("You win🥳🥳🥳🥳🥳");
}
/**
 * 
 * @param {input from the user} word 
 * 
 * try to find any letter that can also be found on the solution
 */
function validateEachletter(word){
    let i,j;
    for(i = 0 ; i < WORD.length ; i++){
        for(j = 0 ; j < word.length ;j++){
            console.log(WORD,word);
            if(WORD[i] === word[j]){
                validIndexes +=j;
            }
        } 
    }
    validateLetterPosition(validIndexes);
}
function validateInputs(something){
    if(something === WORD){
        solved();
    }else{
        validateEachletter(something);
    }
}
inputs.forEach( function(input , index){
    input.addEventListener("input" ,function(){
        inputValues += input.value;
        if (input.value.length === 1){
            //checking to see if only one character has been entered
            if(index <= numberOfInputs-1){
                if(index != 29)//the is no next input after postion 30
                inputs[index + 1].focus();
                if ((index+1)%5 === 0){
                    //checking to see if we already have five values we can validate
                    validateInputs(inputValues.toLowerCase());
                    colorBoxes();
                    rowPosition+=5;
                    inputValues = '';
                    validIndexes='';
                    validIndexesPositions = '';
                }
            }
        }
    })
})
 fetchWord();