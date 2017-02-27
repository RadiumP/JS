//IIFE: make sure all the var in this function wont be interfered by others
(function(){
   var Question = function(quiz, choice, ans){
    this.quiz = quiz;
    this.choice = choice;
    this.ans = ans;
    this.showQuiz = function(){
        console.log('Q: ' + this.quiz + '\ ');
        for(var i = 0; i < this.choice.length; i++){
            console.log(i + ': ' + this.choice[i] + '\ ');
        }
    };
    this.checkAns = function(ans,callback){
        var sc;
        if(ans === this.ans){
            console.log('Correct. '); 
            sc = callback(true);
        }
        else{
            console.log('Wrong. ');
            sc = callback(false);
        }
        this.displayScore(sc);
    }
};

var quizArray = [];
var choice = [];
var isPlaying = true;

Question.prototype.displayScore = function(score){
    console.log(score);
}

quizArray.push(new Question('1+1 = ?',['1','2'],1));
quizArray.push(new Question('pow(2,4) = ?',['16','32'],0));

//closure
function score(){
    var sc = 0;
    return function(correct){
        if(correct){
            sc++;
        }
        return sc;
    }
}
    
var keepScore = score();    
    
while(isPlaying){
    var i = Math.floor(Math.random() * quizArray.length);
    //console.log(i);
    quizArray[i].showQuiz();


    var input = prompt('Your ans: ');
    if(input === 'exit'){
        isPlaying = false;        
        break;
    }
    //console.log(input);
    quizArray[i].checkAns(parseInt(input), keepScore);
}
 
})();



