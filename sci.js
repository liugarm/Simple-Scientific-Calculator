/*Global variables - Includes the first value, second value, operator and a boolean to check if the result has been
calculated or not*/
var firstval = -1;
var secondval = -1;
var operator = "";
var calculated = false;

/*pi*/
function pi(){
	if(firstval==-1 && operator==""){
		firstval = Math.PI;
	}
	else if(firstval!=-1 && operator!=""){
		secondval = Math.PI;
	}
	
	updateDisplay();
}

/*exponent*/
function exponent(){
	result = Math.exp(firstval);
	document.getElementById("calcdisplay").value = result;
}

/*log*/
function log(){
	result = Math.log(firstval);
	document.getElementById("calcdisplay").value = result;
}

/*Sinh cosh tanh*/
function sinh(){
	result = Math.sinh(firstval);
	document.getElementById("calcdisplay").value = result;
}

function cosh(){
	result = Math.cosh(firstval);
	document.getElementById("calcdisplay").value = result;
}

function tanh(){
	result = Math.tanh(firstval);
	document.getElementById("calcdisplay").value = result;
}

/*Sin cos tan*/
function sin(){
	result = Math.sin(firstval);
	document.getElementById("calcdisplay").value = result;
}

function cos(){
	result = Math.cos(firstval);
	document.getElementById("calcdisplay").value = result;
}

function tan(){
	result = Math.tan(firstval);
	document.getElementById("calcdisplay").value = result;
}

/*10 to the power of X*/
function tenPowerOfX(){
	result = Math.pow(10, firstval);
	document.getElementById("calcdisplay").value = result;
}

/*Power of 3*/
function powerOfThree(){
	result = Math.pow(firstval,3);
	document.getElementById("calcdisplay").value = result;
}

/*Power of 2*/
function powerOfTwo(){
	result = Math.pow(firstval,2);
	document.getElementById("calcdisplay").value = result;
}

/*Factorial*/
function factorial(){
	var num = firstval;
	result = firstval;
	
	while(num>=1 && (num-1)>0){
		result = result*(num-1);
		num--;
	}
	
	document.getElementById("calcdisplay").value = result;
}

/*Reciprocal*/
function reciprocal(){
	result = 1/firstval;
	
	document.getElementById("calcdisplay").value = result;
}

/*Calculate square root of first value*/
function squareRoot(){
	result = Math.sqrt(firstval);
	
	document.getElementById("calcdisplay").value = result;
}

/*Modify the div boxes by either enlarging or by making it smaller*/
function showHideScientificButtons(){
	if(document.getElementById("scibody").style.display!="none"){
		document.getElementById("scibody").style.display = "none";
		document.getElementById("calcbar").style.width = 320+'px';
		document.getElementById("banner").style.width = 300+'px';
	}
	else{
		document.getElementById("scibody").style.display = "block";
		document.getElementById("calcbar").style.width = 654+'px';
		document.getElementById("banner").style.width = 633+'px';
	}
}

/*Backspace the current entry*/
function backspaceValue(){
	
	if(calculated==false){
		if(firstval!=-1 && operator==""){
			firstval = String(firstval).substring(0,String(firstval).length-1);
		}
		else if(firstval!=-1 && operator!="" && secondval!=-1){
			secondval = String(secondval).substring(0,String(secondval).length-1);
		}
	}
	else{
		clearData();
	}
	
	updateDisplay();
}

/*Update the first value or the second value as the user is entering it*/
function updateValue(value){
	
	if(firstval!=-1 && operator=="" && calculated==true){
		clearData();
	}
	
	if(firstval==-1){
		firstval = value;
	}
	else if(operator==""){
		firstval = Number(firstval + "" + value);
	}
	else{
		if(operator!=""){
			if(secondval==-1){
				secondval = value;
			}
			else{
				secondval = Number(secondval + "" + value);
			}
		}
		else{
			console.log("You must first select an operator before choosing the second value.");
		}
	}
	
	updateDisplay();
	
	console.log("First value: "+firstval+" Second value: "+secondval);
}

/*Save the selected operator *-+/ into the operator variable which is then used later to perform calculations*/
function updateOperator(op){
	if(firstval!=-1){
		operator = op;
	}
	else{
		console.log("Please enter the first value before entering the operator.");
	}
	
	updateDisplay();
	
	console.log("Operator: "+operator);
}

/*Update the calculator display as the user is typing in the numbers*/
function updateDisplay(){
	if(firstval!=-1 && secondval==-1 && operator==""){
		document.getElementById("calcdisplay").value = firstval;
	}
	else if(firstval!=-1 && secondval==-1 && operator!=""){
		document.getElementById("calcdisplay").value =  firstval + " " + operator;
	}
	else if(firstval!=-1 && secondval!=-1 && operator!=""){
		document.getElementById("calcdisplay").value = firstval + " " + operator + " " +secondval;
	}
}

/*Calculate the result*/
function calculate(){
	
	var result = -1;
	
	if(firstval!=-1 && secondval!=-1){
		if(operator == "+"){
			result = firstval + secondval;
		}
		else if(operator == "-"){
			result = firstval - secondval;
		}
		else if(operator == "*"){
			result = firstval * secondval;
		}
		else if(operator == "/"){
			result = firstval / secondval;
		}
		else if(operator == "^"){
			result = Math.pow(firstval,secondval);
		}
		
		document.getElementById("calcdisplay").value += " =\n"+result;
		
		
		firstval = result;
		operator = "";
		secondval = -1;
		calculated = true;
	}
	
	console.log("Result: "+result);
}

/*Clear the screen*/
function clearData(){
	firstval = -1;
	secondval = -1;
	operator = "";
	calculated = false;
	document.getElementById("calcdisplay").value = "";
	
	console.log("First value: "+firstval+" Second value: "+secondval);
}

/*Listen to numbers and operators pressed by user*/
document.onkeypress = function(e){
    e = e || window.event;
    var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
	
	console.log(String.fromCharCode(charCode));
	
    if (charCode) {
	   if(!isNaN((parseFloat(String.fromCharCode(charCode)))) && isFinite(String.fromCharCode(charCode))){
		   updateValue(String.fromCharCode(charCode));
	   }
	   else if(String.fromCharCode(charCode)=="*"||String.fromCharCode(charCode)=="/"||String.fromCharCode(charCode)=="-"||String.fromCharCode(charCode)=="+"||String.fromCharCode(charCode)=="^"){
		   updateOperator(String.fromCharCode(charCode));
	   }
	   else if (charCode == 13){
		   calculate();
	   }
    }
};

/*Listen to when the user presses backspace and delete keys*/
document.onkeydown = function(e){
	var key = event.keyCode || event.charCode;
	
	/*Backspace key pressed*/
	if(key == 8){
		backspaceValue();
	}
	/*Delete key pressed*/
	else if(key == 46){
		clearData();
	}
};