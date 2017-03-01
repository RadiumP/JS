class Town{
    constructor(name, year){
        this.name = name;
        this.year = year;
        this.age = 0;
    }
}

Town.prototype.getAge = function (){
   const curYear = new Date().getFullYear();
    this.age = curYear - this.year;
    
};
//ES6
//another way
//const ages = p.map(el => curYear - el.year)

class Parks extends Town{
    constructor(name, year, numOfTrees, area){
        super(name, year);
        this.numOfTrees = numOfTrees;
        this.area = area;
        this.density = 0;
    }
    
    
}

Parks.prototype.getTreeDensity = function() {
    this.density = this.numOfTrees / this.area;
}

Parks.prototype.init = function () {
    this.getAge();
    this.getTreeDensity();
}
Parks.prototype.printInfo = function () {
    console.log(`${this.name} has a tree density of ${this.density}`);
}
Parks.prototype.hasMoreTrees = function () {
    return this.numOfTrees > 1000;
}

const aSite = new Town('Town', 1780);
const allParks = [
    new Parks('Park1', 1789, 100, 30),
    new Parks('Park2', 1889, 200, 4),
    new Parks('Park3', 1989, 5000, 13)
];

let avgAge = 0, moreTree;

allParks.forEach(function(cur){
    cur.init();
    avgAge += cur.age / allParks.length;
});

//ES6
//a better sum and avg
function calc(arr){
    const sum = arr.reduce((prev, cur, index) => prev + current, 0);
    //[3,5,6] => sum = 14;
    return [sum, sum / arr.length];
}


//Print
//console.log(allParks);
console.log(`----Parks Report----`);
console.log(`Our ${allParks.length} parks have an average age of ${avgAge} years.`);

allParks.forEach(function(cur){
    cur.printInfo();
    if(cur.hasMoreTrees){
        moreTree = cur.name;
    }
});
//ES6
//a better way
//moreTree = allParks.map(el => el.numTrees).findIndex(el = > el >= 1000);

console.log(`${moreTree} has more than 1000 trees`);

//Streets
class Streets extends Town{
    constructor(name, year, length){
        super(name, year);
        this.length = length;
        
    }
 //another way   
//    classifyStreet () {
//        const classification = new Map();
//        classification.set(1, 'tiny');
//        ...
//    }
}

Streets.prototype.getSize = function() {
    if(this.length > 0 && this.length <= 500)this.size = 'tiny';
    if(this.length > 500 && this.length < 2000)this.size = 'small';
    if(this.length >= 2000 && this.length < 5000)this.size = 'normal';
    if(this.length >= 5000 && this.length < 7000)this.size = 'big';
    if(this.length >= 7000 )this.size = 'huge';
}

Streets.prototype.printInfo = function () {
    console.log(`${this.name}, built in ${this.year}, is a ${this.size} street`);
}


let avgLen = 0, totalLen = 0;
const allStreets = [
    new Streets('Street1', 1781, 1123),
    new Streets('Street2', 1889, 3342),
    new Streets('Street3', 1989, 500),
    new Streets('Street4', 2009, 6213)
];

allStreets.forEach(function(cur){
    cur.getSize();
    totalLen += cur.length;// allStreets.length;
    
});

avgLen = totalLen / allStreets.length;

//Print
//console.log(allStreets);
console.log(`----Streets Report----`);
console.log(`Our ${allStreets.length} streets have a total length of ${totalLen}m, with an average of ${avgLen}m.`);

//ES5
//allStreets.forEach(function(cur){
//    cur.printInfo();
//   
//});
//ES6
allStreets.forEach(cur => cur.printInfo());
//console.log(`${moreTree} has more than 1000 trees`);



