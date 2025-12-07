let gameSeq = []; 
let userSeq = []; 
let started = false;  // To start game only once
let level = 0;  
let btns = ["pink", "yellow", "green", "blue"]; // All Available button colors 
let h2 = document.querySelector("h2");
let highScore = 0;

document.addEventListener("keypress", function(){  //When user presses any key → game starts.
  if(started == false){
    console.log("Game started");
    started = true;-
    levelUp(); 
  }
});

function gameFlash(btn){  
  btn.classList.add("gameFlash");
  setTimeout(function(){
    btn.classList.remove("gameFlash");
  }, 300);
}

function userFlash(btn){  
  btn.classList.add("userFlash");
  setTimeout(function(){
    btn.classList.remove("userFlash");
  }, 300);  
}

function levelUp(){  
  userSeq = [];   
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx =  Math.floor(Math.random()*4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);  // Add color to game pattern
  console.log(gameSeq);
  gameFlash(randBtn);  
}

function checkAns(idx){   // Check user's answer on every click
  if (userSeq[idx] === gameSeq[idx]){  // If user is correct so far
   if(userSeq.length == gameSeq.length){  // If user completed entire sequence correctly
    setTimeout(levelUp, 1000);
   }
  }
  else{
    if(level > highScore){ 
        highScore = level;
    }
    h2.innerHTML= `Game Over! Press any key to start. <br>Score:<u>${level}</u> <br>Highest Score:<u>${highScore}</u>`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function(){
      document.querySelector("body").style.backgroundColor = "black";
    },200)

    reset();
  }
}

function btnPress(){  // When user clicks any color button
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id"); // Get id as color name
  userSeq.push(userColor);
  checkAns(userSeq.length-1); // Check user's latest click
}

let allBtns = document.querySelectorAll(".btn"); // Attach click event to all buttons
for(btn of allBtns){
  btn.addEventListener("click",btnPress);
}

function reset(){   // Resets everything for new game
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}




