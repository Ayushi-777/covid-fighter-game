function load_images(){
  
	enemy_image = new Image;
	enemy_image.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Coronavirus_cartoon.svg/987px-Coronavirus_cartoon.svg.png";
	
	player_img = new Image;
	player_img.src="https://icon-library.com/images/fox-icon-png/fox-icon-png-12.jpg";
	
	gen_img = new Image;
	gen_img.src = "http://simpleicon.com/wp-content/uploads/diamond.svg";
	
}
function init(){
    canvas = document.getElementById("mycanvas");
    console.log(canvas);
    w = 1060;
    h = 475;
    
    canvas.width=w;
    canvas.height=h;
    
    pen = canvas.getContext('2d');
    console.log(pen);
    game_over=false;
    e1 = {
        x:150,
        y:50,
        w:60,
        h:60,
		speed:20,
    };
	e2 = {
        x:300,
        y:150,
        w:60,
        h:60,
		speed:30,
    };
	e3 = {
        x:450,
        y:200,
        w:60,
        h:60,
		speed:15,
    };
	e4 = {
        x:550,
        y:250,
        w:60,
        h:60,
		speed:25,
    };
	e5 = {
        x:750,
        y:20,
        w:60,
        h:60,
		speed:35,
    };
	
	enamy = [e1,e2,e3,e4,e5];
	
	player = {
		x:20,
		y:h/2,
		w :120,
		h : 120,
		speed : 20,
		moving: false,
		health:100,
	};
	gen = {
		x:w-100,
		y : h/2,
		w : 120,
		h : 100,
	};
	
	canvas.addEventListener('mousedown',function(){
		console.log("mouse press");
		player.moving=true;
	});
	
	canvas.addEventListener('mouseup',function(){
		console.log("mouse press");
		player.moving=false;
	});
	
}
function isOverlap(rect1,rect2){
	if(rect1.x<rect2.x + rect2.w &&
	  rect1.x + rect1.w > rect2.x &&
	   rect1.y < rect2.y + rect2.h &&
	   rect1.y + rect1.h>rect2.y
	  ){
		return true
	}
	return false
}
function draw()
{
	pen.clearRect(0,0,w,h);
  //  pen.fillStyle="red";
//    pen.drawImage(enemy_image,box.x,box.y,box.w,box.h);
	
	// drwa player
	
	//draw gen
	pen.drawImage(player_img,player.x,player.y,player.w,player.h);
	pen.drawImage(gen_img,gen.x,gen.y,gen.h,gen.w);
	
	
	for(let i=0;i<enamy.length;i++)
		{
     pen.drawImage(enemy_image,enamy[i].x,enamy[i].y,enamy[i].w,enamy[i].h);
		}
	pen.fillStyle = "yellow";

	pen.fillText("score"+player.health,10,10);
    
}
function update()
{
	if(player.moving==true){
		player.x += player.speed;
		player.health +=20;
	}
 
	for(let i=0;i<enamy.length;i++){
		if(isOverlap(enamy[i],player)){
			player.health -=50;
			if(player.health<0){
				console.log(player.health);
				game_over=true;
				alert("game over" + player.health);
			}
		}
	}
	

	if(isOverlap(player,gen)){
		
		console.log("won the game");
		alert("you won!");
		game_over=true;
		return;
	}
	
	
   //move the box  downwards
   for(let i=0;i<enamy.length;i++){
	   
	   enamy[i].y +=enamy[i].speed;
	   if(enamy[i].y>h-enamy[i].h || enamy[i].y < 0){
		   enamy[i].speed *= -1;
	   }
   }
	
}
function gameloop()
{
	if(game_over==true){
		clearInterval(f);
	}
    draw();
    update();
    console.log("i am gameloop");
}
load_images();
init();
var f=setInterval(gameloop,100);