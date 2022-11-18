// DOM
// Pages
const menupage = document.querySelector("#menu-page")
const creditpage = document.querySelector("#credit-page")
const gamepage = document.querySelector("#game-page")
// Menu Buttons
const menubtns = document.querySelectorAll(".menu-btns")
const startbtn = menubtns[0]
const creditbtn = menubtns[1]

const scoreboard = document.querySelector("#scoreboard")
const handstream = document.querySelector("#hand-stream")
const lastgame = document.querySelector("#last-game")

creditbtn.addEventListener("click", ()=>{
    menupage.style.display = "none";
    creditpage.style.display = "block";
    closeCredit = ()=>{
        console.log("test")
        menupage.style.display = "block";
        creditpage.style.display = "none";
        window.removeEventListener("click", closeCredit);
    }
    window.addEventListener("mouseup", closeCredit);
})

// Game

function generateMove(){
    return ["rock","paper","scissor"][Math.floor(Math.random()*3)] // returns "rock" or "paper" or "scissor"
}
function getWinner(a,b){ // Parameter is "rock" / "paper" / "scissor"
    const res = [[0, -1, 1], [1, 0, -1], [-1, 1, 0]]
    const convertRPS = (x)=>{return {"rock":0, "paper":1, "scissor":2}[x]} // "rock", "paper", "scissor" to 0, 1, 2
    let x = convertRPS(a)
    let y = convertRPS(b)
    return res[x][y] // 1 a wins, 0 tie, -1 b wins
}

function updateStream(){
    for(let i=0;i<4;i++){
        handstream.children[i].style.backgroundImage = `url('./img/${moveStream[i]}.png')`
    }
    scoreboard.textContent = `Wins: ${wins}, Loses: ${loses}`
    
}

function gameOver(){
    gamepage.style.display = "none";
    menupage.style.display = "block";
    lastgame.style.display = "block";
    lastgame.innerHTML = `Score: ${wins} <br/>Time: comming soon`
    window.removeEventListener("keypress", keyPressed);
}
function nextStream(playerMove){
    botMove = moveStream[0];
    result = getWinner(playerMove, botMove)
    if(result == 1){
        //win
        wins++;
    }else if(result == -1){
        //lose
        loses++;
    }

    if(loses == 5){
        gameOver();
        return;
    }


    for (let i=0;i<3;i++){
        moveStream[i] = moveStream[i+1]
    }
    moveStream[3] = generateMove()
    updateStream()
}
function startgame(){
    menupage.style.display = "none";
    gamepage.style.display = "block";

    wins = 0
    loses = 0
    moveStream = []
    for(let i=0; i<4; i++){
        moveStream.push(generateMove())
    }
    updateStream()

    keyPressed = (e)=>{
        move = ""
        if(e.key=="1"){
            move = "rock"
        }else if(e.key=="2"){
            move = "paper"
        }else if(e.key=="3"){
            move = "scissor"
        }
        if(move){nextStream(move)}
    }
    window.addEventListener("keypress", keyPressed)
}
startbtn.addEventListener("click", startgame)


