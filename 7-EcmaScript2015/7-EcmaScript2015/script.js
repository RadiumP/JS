//let and const

//ES5
var name5 ='Jane Smith';
var age5 =23;

//ES6: block scoped, not function scoped
const name6 ='Jane';//cannot be modified
let age6 = 23;

//ES5 

var i = 23;
for(var i =0; i<5; i++){
    
}
//i == 5;

//ES6

let i = 23;

//same loop with let

//i == 23;



//Blocks and IIFEs

//ES6
{
    const a = 1;
    let b = 2;
}

//a + b is not accessible here (outside the block)

//ES5
//Use IIFEs to achieve the same thing


//Strings

//ES5 use '+' to combine strings

//ES6 template literal
//`This is  ${string}`












