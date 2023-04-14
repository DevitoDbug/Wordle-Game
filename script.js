const inputs = document.querySelectorAll(".wordle__input");
let numberOfInputs = inputs.length;
let inputValues = '';

function validateInputs(something){
    console.log(something);
}
inputs.forEach( function(input , index){
    input.addEventListener("input" ,function(){
        inputValues += input.value;
        if (input.value.length === 1){
            //checking to see if only one character has been entered
            if(index <= numberOfInputs-1){
                if(index != 29)
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