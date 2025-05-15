const score = JSON.parse(localStorage.getItem('score')) || {wins:0,losses:0,tie:0};
updateScore();
let isAutoPlaying = false;
let intervalId;
let keyInfoShow = false;

document.body.addEventListener('keydown',(event) => {
    if(event.key === 'r'){
        playGame('Rock');
    }else if(event.key === 'p'){
        playGame('Paper');
    }else if(event.key === 's'){
        playGame('Scissors');
    }else if(event.key === 'a'){
        autoplay();
    }else if (event.key === 'Backspace'){
        resetScore();
    }
})

document.querySelector('.js-rock-button')
.addEventListener('click', function(){ 
    playGame('Rock');
});

document.querySelector('.js-paper-button')
.addEventListener('click', function(){ 
    playGame('Paper');
});

document.querySelector('.js-scissors-button')
.addEventListener('click', function(){ 
    playGame('Scissors');
});

document.querySelector('.reset-score-button')
.addEventListener('click', function(){ 
    resetScore();
});

document.querySelector('.autoplay-button')
.addEventListener('click', function(){ 
    autoplay();
});

document.querySelector('.key-info-button')
.addEventListener('click', function(){ 
    if(keyInfoShow){
        document.querySelector('.key-info').innerHTML = '';
        keyInfoShow = false;
    }else{
        let html = `
            <p>Play with keys : </p>
            <p>Press KEY p for Paper</p>
            <p>Press KEY r for Rock</p>
            <p>Press KEY s for Scissors</p>
            <p>Press KEY a for Auto Play/Stop play</p>
            <p>Press BackSpace for Reset Score</p>
        `;
        document.querySelector('.key-info').innerHTML = html;
        keyInfoShow = true;
    }
});

function resetScore(){
    score.wins = score.losses = score.tie = 0;
    localStorage.removeItem('score');
    updateScore();
}

function autoplay(){
    if(!isAutoPlaying){
        isAutoPlaying = true;
        intervalId = setInterval(function(){
            const playerMove = getMove();
            playGame(playerMove);
        },1000)
        document.querySelector('.autoplay-button').innerHTML = 'Stop Playing';
    }else{
        isAutoPlaying = false;
        clearInterval(intervalId);
        document.querySelector('.autoplay-button').innerHTML = 'Auto Play';
    }
}

function getMove(){
    randomMove = Math.random();
    compMove = '';
    if(randomMove >= 0 && randomMove < 1/3){
        compMove = 'Rock';
    }else if(randomMove >= 1/3 && randomMove < 2/3){
        compMove = 'Paper';
    }else{
        compMove = 'Scissors';
    }

    return compMove;
}

function playGame(move){
    compMove = getMove();

    let result = '';
    if(move === 'Rock')
        result = compare(compMove, 'Rock','Paper');
    else if(move === 'Paper')
        result = compare(compMove, 'Paper','Scissors');
    else
        result = compare(compMove, 'Scissors','Rock');

    localStorage.setItem('score',JSON.stringify(score));
    updateScore();
    document.querySelector('.js-result')
        .innerHTML = result;
    document.querySelector('.move')
        .innerHTML = `You :  <img src="rock-paper-img/${move}-emoji.png" class="move-icon">  <img src="rock-paper-img/${compMove}-emoji.png" class="move-icon"> : Computer .`;
}        


function compare(compMove, tie,lose){
    let result = '';
    if(compMove === tie){
        result = 'Tie :|';
        score.tie++;
    }else if(compMove === lose){
        result = 'You Lose:(';
        score.losses++;
    }else{
        result = 'You Winnnnn!!! :)';
        score.wins++;
    }
    return result;
}


function updateScore(){
    document.querySelector('.scoree')
        .innerHTML = `Winss : ${score.wins}  Losses : ${score.losses}  Tie : ${score.tie}`;
}