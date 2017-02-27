
//module pattern
var budgetController = (function () {
    
    //private
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    
    Expense.prototype.calculatePercentage = function(totalIncome){
        if(totalIncome > 0)
            this.percentage = Math.round(this.value / totalIncome * 100);
        else this.percentage = -1;
    };
    
    Expense.prototype.getPercentage = function() {
        return this.percentage;
    }
    
    
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var sumUp = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(cur){
           sum += cur.value; 
        });
        
        data.totals[type] = sum;
    };
    
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budge: 0,
        percentage: -1
        
    };
    
  
    //public
    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            
            //ID = last ID + 1
            if(data.allItems[type].length > 0)
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            else ID = 0;
            
            
            //create new item based on inc / exp
            if(type === 'exp'){
                newItem = new Expense(ID, des, val);
            }else if(type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            
            //store into data
            data.allItems[type].push(newItem);
            
            
            return newItem;
        },
        
        
        deleteItem: function(type, id){
            var ids, index;
            //id = 6
            //ids = [1,2,3,6,8]
            //index = 3
            ids = data.allItems[type].map(function(cur){
                return cur.id;
            }); 
            index = ids.indexOf(id);
            if(index !== -1){
                data.allItems[type].splice(index, 1);
            }
        },
        
        calcualteBudge: function(){
            sumUp('exp');
            sumUp('inc');
            
            data.budge = data.totals.inc - data.totals.exp;
            if(data.totals.inc > 0){
                 data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }else{
                data.percentage = -1;
            }
            
           
        },
        calculatePercentage: function() {
            data.allItems.exp.forEach(function(cur){
                cur.calculatePercentage(data.totals.inc);
            });
        },
        
        getPercentage: function(){
          var allPer = data.allItems.exp.map(function(cur){
             return cur.getPercentage(); 
          });  
            
            return allPer;
        },
        
        getBudget: function(){
            return {
                budget: data.budge,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage,
            }
        },
        
        testing: function() {
            console.log(data);
        }
    }
    
})();

var UIController = (function() {
    
    //make changes easier
    var DOMstrings = {
        inputType : '.add__type',
        inputDescription : '.add__description',
        inputValue : '.add__value',
        inputBtn : '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incLabel: '.budget__income--value',
        expLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expperLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };
    
    var formatNumber =  function(num, type){
            //+ 1,500.00
            var numSplit, int, dec, sign;
            num = Math.abs(num);
            num = num.toFixed(2);
            
            numSplit = num.split('.');
            int = numSplit[0];
            dec = numSplit[1];
            
            if(int.length > 3){
                int = int.substr(0,int.length - 3) + ',' + int.substr(int.length - 3,3);
            }
            
            
            return (type === 'exp' ?'-' :'+') + ' ' + int +'.'+ dec;
        };
     //first class function
         var nodeListForEach = function(list, callback){
                for(var i = 0; i < list.length; i++){
                    callback(list[i], i);
                }
            };
    
    return {
        getinput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // inc / exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
           
        },
        
        addListItem: function(obj, type) {
            //Create HTML with placeholder
            var html, newHtml, element;
            if(type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%decription%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete">                      <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if(type === 'exp'){
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%decription%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                element = DOMstrings.expensesContainer;
            }
            
            //Replace placeholder
            newHtml = html.replace('%id%', obj.id);    //search a string and then replace
            newHtml = newHtml.replace('%decription%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
            
            //insert HTML to DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            
            
        },
        
        deleteListItem: function(selectorID){
            //can only removeChild
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },
        
        clearFields: function() {
            var field, filedArr;            
            field = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            
            //trick Array to think field list to be an Array
            filedArr = Array.prototype.slice.call(field);
            //console.log(filedArr);
            filedArr.forEach(function(current, index, array) {
                current.value = "";
            });
            
            filedArr[0].focus();
            
        },
        
        displayBudget: function(obj){
            var type;
            obj.budget >= 0 ? type ='inc' : type = 'exp';
            console.log(obj.budget);
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget,type);
            document.querySelector(DOMstrings.incLabel).textContent = formatNumber(obj.totalInc,'inc');
            document.querySelector(DOMstrings.expLabel).textContent = formatNumber(obj.totalExp,'exp');
            
            if(obj.percentage>0)
            document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            else  document.querySelector(DOMstrings.percentageLabel).textContent = '----';
        },
        
        displayPercentage: function(perc){
            var fields = 
            document.querySelectorAll(DOMstrings.expperLabel);
            
           
            
            nodeListForEach(fields, function(cur, id){
                if(perc[id] > 0)
                cur.textContent = perc[id] + '%';
                else cur.textContent = '----';
            });
        },
        
        displayMonth: function() {
            var now, year, month, months;
            now = new Date();
            year = now.getFullYear();
            months = ['Jan', 'Feb', 'Mar','Apr', 'May','Jun','Jul','Aug', 'Sep','Oct','Nov','Dec'];
            month = now.getMonth();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
            
        },
        
        changeType: function(){
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' + 
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue
            );
            nodeListForEach(fields, function(cur){
               cur.classList.toggle('red-focus'); 
            });
            
            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
        },
        
        getDOMstrings: function() {
            return DOMstrings;
        }
    }
})();

//connect modules
var controller = (function(budgetCtrl, UICtrl) {


    
    //setup
    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();
        //add btn
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    
        //response to any key
        document.addEventListener('keypress', function(event) {
            if(event.keyCode === 13 || event.which === 13) {
                
                ctrlAddItem();
            }
        });
        
        
        document.querySelector(DOM.container).addEventListener('click', ctrlDelItem);
        
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);
        
    };
    
    var updateBudget = function() {
        budgetCtrl.calcualteBudge();
        var budget = budgetCtrl.getBudget();
        //console.log(budget);
        UICtrl.displayBudget(budget);
    };
    
    var updatePercentage = function () {
        budgetCtrl.calculatePercentage();
        var perc = budgetCtrl.getPercentage();
        UICtrl.displayPercentage(perc);
    };
    
    var ctrlAddItem = function() {      
        var input, newItem;
        input = UICtrl.getinput();
        
        if(input.description !== "" && !isNaN(input.value) && input.value > 0){
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            UICtrl.addListItem(newItem, input.type);
            UICtrl.clearFields();
            updateBudget(); 
            updatePercentage();
        }
       
        
    };
    
    //event delegation
    var ctrlDelItem = function(event){
        //DOM traverse
        var itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemID){
            //inc-1
            //array ["inc", "1"];
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            
            budgetCtrl.deleteItem(type, ID);
            UICtrl.deleteListItem(itemID);
            updateBudget();
            updatePercentage();
        }
    };
    
        
    
   //init
    return {
        init: function() {
            console.log('App started');
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1,
            });
            UICtrl.displayMonth();
            setupEventListeners();
        }
    }
    
    
})(budgetController, UIController);




controller.init();



