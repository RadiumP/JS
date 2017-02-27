
//module pattern
var budgetController = (function() {
    
//    //private
//    var x = 23;
//    var add =function(a) {
//        return x + a;
//    }
//    
//    //public
//    return {
//        publicTest: function(b) {
//            console.log(add(b));
//            return add(b);
//        }
//    }

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };  

    
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };
    
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
        expensesContainer: '.expenses__list'
    }
    
    return {
        getinput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // inc / exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
           
        },
        
        addListItem: function(obj, type) {
            //Create HTML with placeholder
            var html, newHtml, element;
            if(type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%decription%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete">                      <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if(type === 'exp'){
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%decription%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                element = DOMstrings.expensesContainer;
            }
            
            //Replace placeholder
            newHtml = html.replace('%id%', obj.id);    //search a string and then replace
            newHtml = newHtml.replace('%decription%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            
            //insert HTML to DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            
            
        },
        
        clearFields: function() {
            var field, filedArr;            
            field = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            
            //trick Array to think field list to be an Array
            filedArr = Array.prototype.slice.call(field);
            console.log(filedArr);
            filedArr.forEach(function(current, index, array) {
                current.value = "";
            });
            
            filedArr[0].focus();
            
        },
        getDOMstrings: function() {
            return DOMstrings;
        }
    }
})();

//connect modules
var controller = (function(budgetCtrl, UICtrl) {

//    var z = budgetCtrl.publicTest(5);
//    return {
//        anotherPublic: function() {
//            console.log(z);
//        }
//    }
    
    
    //setup
    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();
        //add btn
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    
        //response to any key
        document.addEventListener('keypress', function(event) {
            if(event.keyCode === 13 || event.which === 13) {
                //console.log('Enter key.');
                ctrlAddItem();
            }
        });
    };
    
  
    
    var ctrlAddItem = function() {      
        var input, newItem;
        input = UICtrl.getinput();
        //console.log(input);
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        //console.log(newItem);
        UICtrl.addListItem(newItem, input.type);
        UICtrl.clearFields();
        
    }
    
   //init
    return {
        init: function() {
            console.log('App started');
            setupEventListeners();
        }
    }
    
    
})(budgetController, UIController);




controller.init();



