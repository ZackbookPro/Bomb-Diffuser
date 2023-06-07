let wireColorArray = [
  'green',
  'blue',
  'red',
  'purple',
  'gold',
  'palevioletred',
  'yellowgreen'
  /*'cyan',
  'deeppink'*/
]




//let allWires = document.querySelectorAll('.wire')
let allDivs = document.querySelectorAll('div')
let timeScreen = document.getElementsByClassName("timer")
const startButton = document.querySelector(".start-button");
const welcome = document.querySelector(".welcome")

startButton.addEventListener("click", () => {
	welcome.remove()
	bombGame()
	

})

let createGameBoard = () => {
  const container = document.getElementById("container")

  //creates the left bomb div
  const bombLeft = document.createElement("div")
  bombLeft.classList.add("bomb")
  bombLeft.setAttribute('id', 'left')
  container.appendChild(bombLeft)

  //creates right bomb div
  const bombRight = document.createElement("div")
  bombRight.classList.add("bomb")
  bombRight.setAttribute('id', 'right')
  container.appendChild(bombRight)

  //creates wires
  const left = document.getElementById('left')
  for(i = 0; i < wireColorArray.length; i++){
    const wire = document.createElement('div')
    wire.classList.add('wire')
    left.appendChild(wire)
  }

  //add id attributes to wire divs and an inner div with the class cutout
  const allWires = document.getElementsByClassName('wire')
  for(i = 0; i < allWires.length; i++){
    cutOut = document.createElement('div')
    cutOut.classList.add('cutout')
    allWires[i].setAttribute('id', 'W' + i)
    allWires[i].appendChild(cutOut)
  }

  for(i = 0; i < wireColorArray.length; i++){
    allWires[i].style.backgroundColor = wireColorArray[i]
  }

  //add cutout id's to cutout divs
  const allCutOuts = document.getElementsByClassName('cutout')
  for(i = 0; i < allCutOuts.length; i++){
    allCutOuts[i].setAttribute('id', 'C' + i)
  }

  //create timer and display box
  const timer = document.createElement('div')
  timer.classList.add('timer')
  timer.setAttribute('id', 'display')
  container.appendChild(timer)
}

let shuffleWires = () => {
  shuffledWireColorArray = []
  for (let i = wireColorArray.length - 1; i > 0; i--){
    let shuffled = Math.floor(Math.random() * (i + 1));
    [wireColorArray[i], wireColorArray[shuffled]] = [wireColorArray[shuffled], wireColorArray[i]]
  }  
  shuffledWireColorArray = wireColorArray
}

let createCutSequence = () => {
  cutSequence = []
  for (let i = wireColorArray.length - 1; i > 0; i--){
    let shuffled = Math.floor(Math.random() * (i + 1));
    [wireColorArray[i], wireColorArray[shuffled]] = [wireColorArray[shuffled], wireColorArray[i]]
  }  
  cutSequence = wireColorArray
}


let applyWireColors = () => {
  wireOne.style.backgroundColor = wireColorArray[0]
  wireTwo.style.backgroundColor = wireColorArray[1]
  wireThree.style.backgroundColor = wireColorArray[2]
  wireFour.style.backgroundColor = wireColorArray[3]
  wireFive.style.backgroundColor = wireColorArray[4]
  wireSix.style.backgroundColor = wireColorArray[5]
  wireSeven.style.backgroundColor = wireColorArray[6]
  wireEight.style.backgroundColor = wireColorArray[7]
  wireNine.style.backgroundColor = wireColorArray[8]
}

let colorFlash = () => {
  let colorDisplay = document.getElementById("display")
  for(i = 0; i < cutSequence.length; i++){
    (function (i)  {
      setTimeout(function() {
        colorDisplay.style.backgroundColor = cutSequence[i];
        console.log(cutSequence[i]);
      }, 1000 * i);
    }) (i);
  }; 
  
}

let startTime = () => {
  var timeLeft = 15;
  var elem = document.getElementById('display');

  var timerId = setInterval(countdown, 1000);

  function countdown() {
    let colorDisplay = document.getElementById("display")
    colorDisplay.style.backgroundColor = 'black';
    if (timeLeft == 0) {
      clearTimeout(timerId);
      gameOver();
    } else if (timeLeft < 10){
        elem.innerHTML = '00:0'+ timeLeft;
        timeLeft--;
    }
      else {
        elem.innerHTML = '00:'+ timeLeft;
        timeLeft--;
    }
      
  }
  countdown()
} 

let gameOverText = () => {
  const gameOverLetters = document.createElement('p');
  gameOverLetters.setAttribute('id', 'gameover')
  gameOverLetters.textContent = "Game Over";
  
  document.body.appendChild(gameOverLetters);
}

let youWonText = () => {
  const youWonLetters = document.createElement('p');
  youWonLetters.setAttribute('id', 'youwin')
  youWonLetters.textContent = "You Won";
  
  document.body.appendChild(youWonLetters);
}

let playAgain = () => {
  const playAgainButton = document.createElement('button')
  playAgainButton.setAttribute('id', 'restart')
  playAgainButton.innerText = "Try Again?"

  document.body.appendChild(playAgainButton)
  
  playAgainButton.addEventListener("click", () => {
    
    location.reload()
    
  
  })


}




let gameOver = () => {
container.remove()
document.body.style.backgroundImage = "url(images/bomb.gif)"
document.body.style.backgroundSize = "cover"

setTimeout(gameOverText, 2000);
setTimeout(playAgain, 5000);

}

let gameWon = () => {
  container.remove()
  document.body.style.backgroundImage = "url(images/happy-family.jpg)"
  document.body.style.backgroundSize = "cover"

  setTimeout(youWonText, 500);

}


let clickEvents = () => {
let wireOne = document.getElementById('W0')
let wireTwo = document.getElementById('W1')
let wireThree = document.getElementById('W2')
let wireFour = document.getElementById('W3')
let wireFive = document.getElementById('W4')
let wireSix = document.getElementById('W5')
let wireSeven = document.getElementById('W6')

let cutOutOne = document.getElementById("C0")
let cutOutTwo = document.getElementById("C1")
let cutOutThree = document.getElementById("C2")
let cutOutFour = document.getElementById("C3")
let cutOutFive = document.getElementById("C4")
let cutOutSix = document.getElementById("C5")
let cutOutSeven = document.getElementById("C6")


  wireOne.addEventListener('click', () => {
    console.log(wireOne.style.backgroundColor)

    if(cutSequence.length === 1){
      gameWon()
    }
    if(wireOne.style.backgroundColor === cutSequence[0]){
      wireOne.style.visibility = "hidden"
      cutSequence.shift(cutSequence[0])
    }
    else {
      gameOver()
    }
  })
  
  wireTwo.addEventListener('click', () => {
    console.log(wireTwo.style.backgroundColor)
    if(cutSequence.length === 1){
      gameWon()
    }
    if(wireTwo.style.backgroundColor === cutSequence[0]){
      wireTwo.style.visibility = "hidden"
      cutSequence.shift(cutSequence[0])
    } 
    else {
      gameOver()
    }  
  })
  
  wireThree.addEventListener('click', () => {
    console.log(wireThree.style.backgroundColor)

    if(cutSequence.length === 1){
      gameWon()
    }
    if(wireThree.style.backgroundColor === cutSequence[0]){
      wireThree.style.visibility = "hidden"
      cutSequence.shift(cutSequence[0])
    } 
    else {
      gameOver()
    }  
  })
  
  wireFour.addEventListener('click', () => {
    console.log(wireFour.style.backgroundColor)
    if(cutSequence.length === 1){
      gameWon()
    }
    if(wireFour.style.backgroundColor === cutSequence[0]){
      wireFour.style.visibility = "hidden"
      cutSequence.shift(cutSequence[0])
    } 
    else {
      gameOver()
    }  
  })

  wireFive.addEventListener('click', () => {
    console.log(wireFive.style.backgroundColor)
    if(cutSequence.length === 1){
      gameWon()
    }
    if(wireFive.style.backgroundColor === cutSequence[0]){
      wireFive.style.visibility = "hidden"
      cutSequence.shift(cutSequence[0])
    } 
    else {
      gameOver()
    }  
  })
  
  wireSix.addEventListener('click', () => {
    console.log(wireSix.style.backgroundColor)
    if(cutSequence.length === 1){
      gameWon()
    }
    if(wireSix.style.backgroundColor === cutSequence[0]){
      wireSix.style.visibility = "hidden"
      cutSequence.shift(cutSequence[0])
    } 
    else {
      gameOver()
    }  
  })

  wireSeven.addEventListener('click', () => {
    console.log(wireSeven.style.backgroundColor)
    if(cutSequence.length === 1){
      gameWon()
    }
    if(wireSeven.style.backgroundColor === cutSequence[0]){
      wireSeven.style.visibility = "hidden"
      cutSequence.shift(cutSequence[0])
    } 
    else {
      gameOver()
    } 
  })
  
}


let bombGame = () => {
  shuffleWires()
  createGameBoard()
  createCutSequence()
  setTimeout(colorFlash, 2000)
  setTimeout(startTime, 10000)
  setTimeout(clickEvents, 10000)
  
}
  /*applyWireColors()*/


//create a function that flashes the colors in the timer window quickly before the game starts

//make it so you cant cut the wires until the colors are done flashing create a pause before the time starts

//maybe make it so the wires dont appear until a function that reates them is called. the function should append the divs called wires based on how many items are in the array

//figure out a function that checks if the user is clicking the wires in the correct order

//create a timer function 

