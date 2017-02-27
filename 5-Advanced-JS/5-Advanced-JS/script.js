
//Constructor
var Person = function(name, year, job) {
	this.name = name;
	this.year = year;
	this.job = job;
	// this.caluAge = function(){
	// 	console.log(2016 - this.year);
	// }
};

Person.prototype.caluAge = function(){
	console.log(2016 - this.year);
}

Person.prototype.lastName = 'Smith';

//instantiation
var john = new Person('john', 1990, 'teacher');
var jane = new Person('jane', 1995, 'cop');

//inheritance
john.caluAge();
console.log(jane.lastName);



//object.create

var personProto = {
	calculateAge: function(){
		console.log(2016 - this.year);
	}
};

var jack = Object.create(personProto);
//jack.name = 'Jack';
//jakc.year = 1992;
//...OR
var mike = Object.create(personProto, 
{
	name:{value:'Mike'},
	year:{value:1989}
});


//Passing Primitves vs objects

//primitives
var a = 23;
var b = a;
a = 46;
console.log(a);
console.log(b);

//objects: act like reference in C++
var obj1 = {
	age: 26
};

var obj2 = obj1;
obj1.age = 30;
console.log(obj1.age );
console.log(obj2.age );


//function argument

var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr,fn){
	var arrRes = [];
	for(var i = 0; i < arr.length; i++){
		arrRes.push(fn(arr[i]));
	}

	return arrRes;
}


function calculateAge(el){
	return 2016 -el;
}

function isFullAge(el){
	return el >= 18;
}

function maxHeartRate(el){
	if(el >= 18 && el <= 81){
		return Math.round(206.9 - (0.67 * el));
	}
	else {
		return -1;
	}
	
}

var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(ages, isFullAge);
var rates = arrayCalc(ages, maxHeartRate);

console.log(ages);
console.log(fullAges);
console.log(rates);

//return functions

function interviewQuestion(job){
	if(job === 'designer'){
		return function(name){
			console.log(name + ', explain what is UX?');
		}
	}else if(job === 'teacher'){
		return function(name){
			console.log('What do you teach, ' + name + '?');
		}
	}
}

var teacherQuiz = interviewQuestion('teacher');

teacherQuiz('Mike');

//...OR

interviewQuestion('designer')('Mark');


//IIFE

(function(){
	var score = Math.random() * 10;
	console.log(score >= 5);
})();

(function(gg){
	var score = Math.random() * 10;
	console.log(score >= 5 - gg);
})(2);


//Closures
function retirement(Age){
	var a = ' years left.';
	return function(year){
		var age = 2016 - year;
		console.log((Age - age) + a);
	}
}

var retirementUS = retirement(66);
retirementUS(1965);

retirement(66)(1990);

function interviewQuestionClosure(job){

		return function(name){
			if(job === 'designer'){
			console.log(name + ', explain what is UX?');
		}
		else if(job === 'teacher'){
			console.log('What do you teach, ' + name + '?');
		}
	}
		
}

//Bind, call and apply

var john = {
	name:'John',
	age: 26,
	job: 'teacher',
	prez: function(style, timeofDay){
		if(style === 'f'){
			console.log('GG ' + timeofDay);
		}else if (style === 'i'){
			console.log('WP ' + timeofDay);
		}
	}
};


var emily = {
	name: 'emily',
	age: 35,
	job: 'cop'
};

john.prez.call(emily, 'i', 'afternoon');
var johnF = john.prez.bind(john, 'f');
johnF('morning');


function arrayCalc(arr,fn){
	var arrRes = [];
	for(var i = 0; i < arr.length; i++){
		arrRes.push(fn(arr[i]));
	}

	return arrRes;
}


function calculateAge(el){
	return 2016 -el;
}

function isFullAgeBind(limit, el){
	return el >= limit;
}


var ages = arrayCalc(years, calculateAge);
var fullAgesBind = arrayCalc(ages, isFullAgeBind.bind(this, 20));
console.log(fullAgesBind);

