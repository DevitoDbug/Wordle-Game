const inputs = document.querySelectorAll(".wordle__input");

let WORD = 'SPOON';
let validIndexes='';
let validIndexesPositions = '';

let numberOfInputs = inputs.length;
let inputValues = '';

/**
 * 
 * we check to see if that valid letter is in the right position and record that position
 */

function validateLetterPosition(){
    //checking if the correct letters are also in the correct position
    let i;
    for(i=0 ; i < validIndexes.length ; i++){
        if (WORD[i].toLowerCase() === inputValues[i].toLowerCase()){
            validIndexesPositions += i ;
        }
    }
}
function solved(){
    alert("You have gotten the correct word");
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
            if(WORD[i].toLowerCase() === word[j].toLowerCase()){
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
                    validateInputs(inputValues);
                    console.log(validIndexes, validIndexesPositions);
                    inputValues = '';
                    validIndexes='';
                    validIndexesPositions = '';
                }
            }
        }
    })
})