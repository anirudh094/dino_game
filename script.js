score =0;
cross=true;
arrow=true;
//audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
audiojump = new Audio('jump.mp3');

/*
audio.play()
setTimeout(() => {
    audio.play()
}, 1000);
*/
document.onkeydown=function(e){
    //console.log("Key Code is : ",e.keyCode)
    if(e.keyCode==38 && arrow){
        document.getElementById("arrow-key").src="arrow-keys-up.png";
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700);
    }
    if(e.keyCode==39 && arrow){
        document.getElementById("arrow-key").src="arrow-keys-right.png";
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left = dinoX + 112+ "px";
        dino.style.transform = "scaleX(1)";
    }
    if(e.keyCode==37 && arrow){
        document.getElementById("arrow-key").src="arrow-keys-left.png";
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112)+ "px";
        dino.style.transform = "scaleX(-1)";
    }
}

setInterval(() => {
    dino=document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
    dy= parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));
    ox = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
    oy= parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));

    offsetX = dx-ox;
    offsetY = Math.abs(dy-oy);

    console.log(offsetX,offsetY);

    if(offsetX>-150 && offsetX<90 && offsetY<100){
        gameOver.innerHTML='Game Over';
        obstacle.classList.remove('obstacleAni');
        obstacle.style.left = dino.style.left ;
        arrow=false;
        //gameContainer = document.querySelector('.gameContainer');
        //gameContainer.style.background="black";
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            //audio.pause();
        }, 900);
    }
    else if(offsetX >100 && cross){
        score+=100;
        updateScore(score);
        audiojump.play();
        cross=false;
        setTimeout(() => {
            cross = true;
        },1000);
        
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
        }, 500);
    }
}, 100);

function updateScore(score){
    scoreCont.innerHTML = "Your Score : " + score;
}