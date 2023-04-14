const inputs = document.querySelectorAll(".wordle__input");

let WORD = 'SPOON';

let numberOfInputs = inputs.length;
let inputValues = '';


function validateLetterPosition(){

}
function solved(){
    alert("You have gotten the correct word");
}
function validateEachletter(word){
    let i,j;
    let validIndexes='';
    for(i = 0 ; i < WORD.length ; i++){
        for(j = 0 ; j < word.length ;j++){
            if(WORD[i] == word[j]){
                validIndexes +=j;//storing the index of the corrext letter
            }
        } 
    }
    validateLetterPosition();
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
                    console.log(index);
                    inputValues = '';
                }
            }
        }
    })
})