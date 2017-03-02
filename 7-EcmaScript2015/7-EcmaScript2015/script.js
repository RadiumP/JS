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

//Arrow functions

const years = [1990, 1965];

//ES5
var ages = years.map(function(el){
    
});

//ES6
//1-liner
let ages6 = years.map(el => 2016 - el);

ages6 = years.map((el, index) => `Age element ${index + 1} : ${2016 - el}.`);

//return is needed for more than 1 line
ages6 = years.map((el, index) => {
   const now = new Date().getFullYear();
    const age = now -el;
    return age;
});


//this in Arrow fucntion
//ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe : function() {
        
        var self = this;
        document.querySelector('.green').addEventListener('click', function(){
            //'this' here is not pointed to box5
            //console.log(this.color + this.position);
            console.log(self.color + self.position);            
        });
    }
}

//ES6
const box6 = {
    color: 'green',
    position: 1,
    clickMe : function() {     
        document.querySelector('.green').addEventListener('click', () => {
            //'this' here is pointed to box6           
            console.log(this.color + this.position);            
        });
    }
}

//ES6
const box66 = {
    color: 'green',
    position: 1,
    //'this' shared gobal obj
    clickMe : () => {     
        document.querySelector('.green').addEventListener('click', () => {
            //'this' here is not pointed to box6           
            console.log(this.color + this.position);            
        });
    }
}


function Person(name){
    this.name = name;
}

//ES5
Person.prototype.myFriends5 = function (friends){
    var arr = friends.map(function(el){
        //this is not pointed to person if w/o bind 
        //this.name 
    }.bind(this));
                          
                          
};

//ES6
Person.prototype.myFriends6= function (friends){
    var arr = friends.map( (el) => {
        //this is pointed to person
        //this.name 
    });                         
                          
};

//Destructuring

//ES5
var john = ['john', 26];
//var name = john[0];
//var age = john[1];

//ES6
const [name, year] = ['john', 26];

const obj = {
    firstName: 'J',
    lastName: 'S'
};
const{firstName, lastName} = obj;
const {firstName: a, lastName: b} = obj;


function calcAge(year) {
    const age = new Date().getFullYear - year;
    return [age, 65 - age];
}
//destructure
const [age, retirement] = calcAge(1990);


//Arrays

const boxes = document.querySelectorAll('.box');

//ES5

//var boxesArr5 = Array.prototype.slice.call(boxes);
//boxesArr5.forEach(function(cur){
//   ... 
//});


//ES6

const boxesArr6 = Array.from(boxes);
//boxesArr6.forEach(cur => cur.style...)


//Array loop

//ES5

//for(var i = 0; i < boxesArr5.length; i++)
//{
//    boxesArr5.className === 
//}

//ES6
for(const cur of boxesArr6){
    //cur.className.includes('blue')
}

//ES5

var ages = [12,11,54,23];

var full = ages.map(function(cur){
   return cur >= 18; 
});
//full.indexof(..)
//ages[full.indexof(...)]

//ES6
ages.findIndex(cur => cur >= 18);
ages.find(cur => cur >= 18);


//Spread operator:...

function addFour(a,b,c,d){
    return a+b+c+d;
}

var sum1 = addFour(18,30,12,21);


//ES5
var ages = [18,30,12,21];
var sum2 = addFour.apply(null, ages);

//Es6

const sum3 = addFour(...ages);

//append
//const total = [...sub1, 'sth', ...sub3];


const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');
const all = [h, ...boxes];

Array.from(all).forEach(cur => cur.style.color = 'purple');



//Rest parameters


//ES5
function isFullAge5(limit){
    //arguments
    
    //use slice to cast
    //123 is limit
    //we need to slice(arguments, 1)
}

isFullAge5(123,1,2,3);//arguments is an array-like obj, have to cast it into an arry to use array prototype

//ES6
function isFullAge6(limit, ...years){//years is an array
    //years.forEach...
}


//Default

//ES5 will leave un-init var in a obj with 'undefined' , use ? : to handle

//ES6
function Personm(a, b ,c = 'c'. d = 'd'){
    //this...
}


//maps

const question = new Map();
question.set('question', 'What is the official name...?');
question.(1, '1');
question.('correct', 1);

question.get('question')

//func: size, delete(key), has(key), clear(), forEach()

for(let key of question){
    
}

for(let [key, value] of question.entries()){
    
}



//Classes

//class Person6{
//    constructor (name, age, job){
//        //this...
//    }
//    
//    calcAge(){
//        ...
//    }
//static greeting(){
//    
//}
//}


//sub class

//class Athlete6 extends Person6{
//    constructor(...){
//        super(...);
//        this...
//    }
//}



