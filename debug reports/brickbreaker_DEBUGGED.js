    //Brickbreaker JavaScript

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var x = canvas.width/2;
    var y = canvas.height-25;
    var dx = 3;
    var dy = -3;
    var ballRadius = 10;
    var ballOnPaddle = true;
    var paddleHeight = 10;
    var paddleWidth = 75;
    var paddleX = (canvas.width-paddleWidth)/2;
    var rightPressed = false;
    var leftPressed = false;
    var brickRowCount = 5; 
    var brickColumnCount = 9;
    var brickWidth = 50;
    var brickHeight = 16;
    var brickPadding = 10;
    var brickOffsetTop = 30;
    var brickOffsetLeft = 30;
    var showStart = true;
    var score = 0;
    var lives = 3;
    var speed = 10;

    document.addEventListener("keydown",keyDownHandler,false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove",mouseMoveHandler, false);

    var bricks = [];
    for(c = 0; c < brickColumnCount; c++) {    // DEBUG: c+ modified to c++
        bricks[c] = [];
        for (r = 0; r < brickRowCount; r++){
            bricks[c][r] = {x: 0 , y: 0, status: 1};
        }
    }
    

   function keyDownHandler(e){
    if(e.keyCode === 39){
        rightPressed = true;
    }
    else if(e.keyCode === 37){
        leftPressed = true;
    }
   }

   function keyUpHandler(e){
    if(e.keyCode === 39){
        rightPressed = false;
    }
    else if(e.keyCode === 37){
        leftPressed = false;
    }
   }

   function mouseMoveHandler(e){
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width){
        paddleX = relativeX - paddleWidth/2;
    }
      
   }

   function drawBall(){
    //draw code
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,Math.PI*2);
    ctx.fillStyle = "#4DC6D1";
    ctx.fill();
    ctx.closePath(); //DEBUG: closePath modified to closePath();
    
   }

   function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#4DC6D1";
    ctx.fill();
    ctx.closePath();
   }

   function drawBricks(){
    for(c = 0; c < brickColumnCount; c++){
        for(r = 0; r < brickRowCount; r++){
            if(bricks[c][r].status==1){
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            if(r < 1){
                    ctx.fillStyle = "#40798C";
                  }else if(r < 2){
                    ctx.fillStyle = "#4DC6D1";
                  }else if(r < 3){
                    ctx.fillStyle = "#4DEAD3";
                  }else if(r < 4){
                    ctx.fillStyle = "#9799CA";
                  }else{
                    ctx.fillStyle = "#935FA7";
                  }
            ctx.fill();
            ctx.closePath();
          }
        }
      }
   }

   function collisionDetection(){
    for(c=0; c < brickColumnCount;c++){
        for(r=0; r < brickRowCount; r++){
            var b = bricks[c][r];
            if(b.status == 1){
            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
                dy = -dy;
                b.status=0;
                score += 10;
                if(score == (brickRowCount * brickColumnCount)*10){
                    alert("YOU WIN, CONGRATULATIONS!");
                    document.location.reload();
                }
              }
            }
         }
      }
   }


   function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "B3E9C7";
    ctx.fillText("Score: " + score, 8, 20);
   }

   function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "B3E9C7";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
    }

   function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle(); //DEBUG: drawPaddle() modified to drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    drawBricks();

    if (x + dx < ballRadius || x + dx > canvas.width-ballRadius){
        dx = -dx;
    } 
    if(y + dy < ballRadius){
        dy = -dy;
    }
    else if (y +dy > canvas.height-ballRadius){
        if(x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
        }
        else{
        lives--;
        if(!lives){
            alert("GAME OVER");
            document.location.reload();
        }
        else{
            x = canvas.width/2;
            y = canvas.height-30;
            dx = 3;
            dy = -3;
            paddleX = (canvas.width-paddleWidth)/2;
        }
        }
        
    }

    if(rightPressed && paddleX < canvas.width-paddleWidth){
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0){
        paddleX -= 7;
    }
        x += dx;
        y += dy;
    // requestAnimationFrame(draw);
   }
 
  // draw();

   function handleMouseClick(){
  showStart = false;
  setInterval(draw, speed);
}
function drawStart() {
    if(showStart == true){
      ctx.font = "15px Arial";
      ctx.fillStyle = "#fff";
      ctx.fillText("Click to start",canvas.width/2-40, canvas.height/2);
    }

}
drawStart();
canvas.addEventListener('mousedown', handleMouseClick);

//NAV BAR 

$("nav ul li").click(function(){
  var xcoord = $(this).data("xcoord");
  
  $("nav div").stop().animate({marginLeft:xcoord}, 500, "easeInOutExpo");
  $(this).addClass("active");
  $("nav ul li").not(this).removeClass("active");
  
});