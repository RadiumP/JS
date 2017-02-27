
//prompt game
var height1 = prompt('Your height');
var age1 = prompt('Your age');

var height2 = prompt('His height');
var age2 = prompt('His age');


var value1 = height1 + age1 * 5;

var value2 = height2 + age2 * 5;

if(value1 === value2)console.log('draw');
if(value1 > value2)console.log('You win with score' + value1);
if(value1 < value2)console.log('He wins with score' + value2);


//array manipulation
var years = [1993, 1995, 2000];
var age = [];

for(var i = 0; i < years.length; i++)
{
	age.push(2016 - years[i]);
}

for(var i = 0; i < age.length; i++)
{
	if(age[i] > 18)
	console.log('Yes' + age[i]);
}

var printFullAge = function(years)
{
	var age = [];
	var fullAges = [];
	for(var i = 0; i < years.length; i++)
	{
		age.push(2016 - years[i]);
	}

	for(var i = 0; i < age.length; i++)
	{
		if(age[i] > 18)
		{
			console.log('Yes' + age[i]);
			fullAges.push(true);
		}
		
	}

}

var full_1 = printFullAge(years);