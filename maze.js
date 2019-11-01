document.body.oncontextmenu = function (e) {return false;}
var m = 75;
var n = 75;
var but = 0;
var stFin = 2;
var start = 0;
var finish = 0;
var wayCount = 1;
var ar = [];
var tempAr = [];

var appContainer = document.getElementsByClassName('app-container')[0]


createField();

var currentButton = getElementByXY(37,37);
currentButton.style.backgroundColor = "black";
currentButton.setAttribute("check", 1);
var stack = [];
stack.push(currentButton);
for (var i = 0 ; i < 3000; i++) move();

var timerId = setInterval(function() {
  if (stFin == 0){
	  findTheWay();
	  drawTheWay();
	  clearInterval(timerId);
  }
}, 1000);

function move(){
	var count = 0;
	var arr = [];
	var emptyNum = 0;
	if (stack.length == 0) return;
	if (currentButton.getAttribute("x") != n-2){
		var button = getElementByXY(+currentButton.getAttribute("x") + 2, currentButton.getAttribute("y"));
		if (button.getAttribute("check") == 0){
			emptyNum++;
			arr[count++] = button;
		}
	}
	if (currentButton.getAttribute("x") != 1){
		var button = getElementByXY(+currentButton.getAttribute("x") - 2, currentButton.getAttribute("y"));
		if (button.getAttribute("check") == 0){
			emptyNum++;
			arr[count++] = button;
		}
	}
	if (currentButton.getAttribute("y") != m-2){
		var button = getElementByXY(currentButton.getAttribute("x"), +currentButton.getAttribute("y") + 2);
		if (button.getAttribute("check") == 0){
			emptyNum++;
			arr[count++] = button;
		}
	}
	if (currentButton.getAttribute("y") != 1){
		var button = getElementByXY(currentButton.getAttribute("x"), +currentButton.getAttribute("y") - 2);
		if (button.getAttribute("check") == 0){
			emptyNum++;
			arr[count++] = button;
		}
	}
	if (emptyNum > 0) {
		count = getRandom(--count);
		var button = arr[count];
		button.style.backgroundColor = "black";
		button.setAttribute("check", 1);
		var betweenButton = getElementByXY(Math.floor((+currentButton.getAttribute("x") + +button.getAttribute("x"))/2),
			Math.floor((+currentButton.getAttribute("y") + +button.getAttribute("y"))/2));
		betweenButton.style.backgroundColor = "black";
		betweenButton.style.backgroundImage = "none";
		currentButton = button;
		stack.push(currentButton);
	}
	else{
		currentButton = stack.pop();
	}
}

function createField(){
    var gameContainer = document.getElementsByClassName('game-container')[0]
    for(var i = 0 ; i < m; i++){
        for(var j = 0; j < n; j++){
            var cell = document.createElement('button');
            cell.setAttribute('x', j);
            cell.setAttribute('y', i);
            if ((i+j)%2==0 && i%2==1) {
				cell.className = 'cell';
			}
			else{ 
				cell.className = 'cell1';
			}
			cell.setAttribute('check', 0);
			cell.setAttribute('way', 0);
			cell.onclick = function(){
				if (this.style.backgroundColor == "black" && stFin > 0) {
					if (stFin == 1) {
						start = this;
						this.setAttribute("way", wayCount);
					}
					if (stFin == 2) {
						finish = this;
						this.setAttribute("way", 0);
					}
					this.style.backgroundColor = "red";
					stFin--;
				}
			}
            gameContainer.appendChild(cell);
        }
    }
}

function findTheWay(){
	findLocalMove(start);
	wayCount++;
	while(finish.getAttribute("way") == 0){
		ar = tempAr;
		tempAr = [];
		for (var index = 0; index < ar.length; ++index) {
			findLocalMove(ar[index]);
		}
		wayCount++;
	}
	
}

function drawTheWay(){
	var step = finish;
	var timer = setInterval(function() {
		if (step.getAttribute("way") == 2) {
			clearInterval(timer);
			return;
		}
		var temp = getElementByXY(+step.getAttribute("x") + 1, step.getAttribute("y"));
		if (temp.getAttribute("way") == +step.getAttribute("way") - 1){
			temp.style.backgroundColor = "green";
			step = temp;
			return;
		}
		temp = getElementByXY(+step.getAttribute("x") - 1, step.getAttribute("y"));
		if (temp.getAttribute("way") == +step.getAttribute("way") - 1){
			temp.style.backgroundColor = "green";
			step = temp;
			return;
		}
		temp = getElementByXY(step.getAttribute("x"), +step.getAttribute("y") + 1);
		if (temp.getAttribute("way") == +step.getAttribute("way") - 1){
			temp.style.backgroundColor = "green";
			step = temp;
			return;
		}
		temp = getElementByXY(step.getAttribute("x"), +step.getAttribute("y") - 1);
		if (temp.getAttribute("way") == +step.getAttribute("way") - 1){
			temp.style.backgroundColor = "green";
			step = temp;
			return;
		}
	}, 10);
}

function findLocalMove(currentButton){
	var button = getElementByXY(+currentButton.getAttribute("x") + 1, currentButton.getAttribute("y"));
	if ((button.style.backgroundColor == "black" || button.style.backgroundColor == "red") && button.getAttribute("way") == 0){
		button.setAttribute("way", wayCount+1);
		tempAr.push(button);
	}
	var button = getElementByXY(+currentButton.getAttribute("x") - 1, currentButton.getAttribute("y"));
	if ((button.style.backgroundColor == "black" || button.style.backgroundColor == "red") && button.getAttribute("way") == 0){
		button.setAttribute("way", wayCount+1);
		tempAr.push(button);
	}
	var button = getElementByXY(currentButton.getAttribute("x"), +currentButton.getAttribute("y") + 1);
	if ((button.style.backgroundColor == "black" || button.style.backgroundColor == "red") && button.getAttribute("way") == 0){
		button.setAttribute("way", wayCount+1);
		tempAr.push(button);
	}
	var button = getElementByXY(currentButton.getAttribute("x"), +currentButton.getAttribute("y") - 1);
	if ((button.style.backgroundColor == "black" || button.style.backgroundColor == "red") && button.getAttribute("way") == 0){
		button.setAttribute("way", wayCount+1);
		tempAr.push(button);
	}
}

function getElementByXY(x,y) {
    return document.querySelector("[x='" + x + "'][y='"+y+"']")
}

function getRandom(max) {
  return Math.floor(Math.random() * (max+1));
}








