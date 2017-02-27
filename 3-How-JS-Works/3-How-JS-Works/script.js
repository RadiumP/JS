///////////////////////////////////////
// Lecture: Hoisting

calculateAge(1990);

function calculateAge(year)
{
    console.log(2016 - year);
}

//not working with fun expression
// retirement(1990);
// var retirement = function(year)
// {
//     console.log(65 - (2016 - year));
// }














///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword

//window obj
console.log(this);

calculateAge(1985);

function calculateAge(year)
{
    console.log(2016 - year);
    //still window
    console.log(this);
}

var john = {
    name:'John'
    calculateAge:function()
    {
        //to john object
        console.log(this);

        function innerFunction()
        {
            //to window obj
            console.log(this);
        }

        innerFunction();
    }
};

john.calculateAge();

var mike = 
{
    name:'Mike',

};

//method borrowing
mike.calculateAge = john.calculateAge;
mike.calculateAge();
