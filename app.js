class Calculator{
	
	constructor(previousOperandElement,currentOperandElement){
		this.previousOperandElement = previousOperandElement;
		this.currentOperandElement  = currentOperandElement;
		this.clear();
	}

	clear(){
		this.currentOperand = '';
		this.previousOperand = '';
		this.operation = undefined;

	}

	delete(){
		this.currentOperand = this.currentOperand.toString().slice(0,-1);


	}

	appendNumber(number){
		//only allow user to input '.' only once
		if(number ==='.'&&this.currentOperand.includes('.')) return
		//initially, this.currentOperand is an empty string
		//we want the number to append one by one, not plus, 
		//so they must be string
		this.currentOperand = this.currentOperand.toString()+number.toString();

	}

	chooseOperation(operation){
		//the user should type number before choosing operation
		if(this.currentOperand === '') return

		if(this.previousOperand !== ''){
			this.compute();

		}

		this.operation = operation;
		//pass the value from current Operand to previous Operand
		this.previousOperand = this.currentOperand;
		//clear the current operand
		this.currentOperand = '';



	}

	compute(){
		let result;
		const prev = parseFloat(this.previousOperand);
		const current = parseFloat(this.currentOperand);

		//check if the number input is valid
		if(isNaN(prev)||isNaN(current)) return
		switch(this.operation){
			case'+':
				result = prev+current
				break
			case'-':
				result = prev-current
				break
			case'x':
				result = prev*current
				break
			case'÷':
				result = prev/current
				break
			//if none of the operation match, then just pause the function
			default:
				return

		}

		this.currentOperand = result;
		this.previousOperand = '';
		this.operation = undefined;

	}

	getDisplayNumber(number){
		
		const stringNumber = number.toString();
		//split the input into 2 parts by '.'
		//the one before '.' is float type value
		const integarDigit = parseFloat(stringNumber.split('.')[0]);
		//the one after '.' remains as string
		const decimalDigit = stringNumber.split('.')[1];

		//set the format of float-type part of input
		let integarDisplay;
		if(isNaN(integarDigit)){
			integarDisplay = '';
		}else{
			//not allow the integarDisplay has decimal digit,so set to 0
			integarDisplay = integarDigit.toLocaleString('en',{maximumFractionDigits:0});

		}
		//Recombine 2 parts together to display
		if(decimalDigit != null){
			return `${integarDisplay}.${decimalDigit}`;
		}else{
			return integarDisplay;
		}
		
	}

	updateDisplay(){
		this.currentOperandElement.innerText = this.getDisplayNumber(this.currentOperand);
		
		if(this.operation != null){
			this.previousOperandElement.innerText = 
			`${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
		}else{
			//console.log(this.previousOperand);

			//when the equal or AC button is hitted, no display for prevOper
			//the delete button won't fall into this bucket
			this.previousOperandElement.innerText = '';
		}
		

	}
}//End of Class




//button
const numberBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const deleteBtn = document.querySelector('[data-delete]');
const equalBtn = document.querySelector('[data-equal]');
const allClearBtn = document.querySelector('[data-allClear]');
//output
const previousOperandElement = document.querySelector('[data-prev-operand]');
const currentOperandElement = document.querySelector('[data-curr-operand]');


//init a Calculator
const calculator = new Calculator(previousOperandElement,currentOperandElement);

numberBtn.forEach(button =>
	button.addEventListener('click',()=>{
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	})

	)

operationBtn.forEach(button =>
	button.addEventListener('click',()=>{
		//pass the innerText(string) of operation button to the function
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	})

	)

equalBtn.addEventListener('click', button => {
	calculator.compute();
	calculator.updateDisplay();
})


allClearBtn.addEventListener('click', ()=>{
	calculator.clear();
	calculator.updateDisplay();
	
})

deleteBtn.addEventListener('click', ()=>{
	calculator.delete();
	calculator.updateDisplay();
	
})
