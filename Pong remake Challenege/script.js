// Game objects
var player1;
var player2;
var ball;
var point1 = 0;
var point2 = 0;


	// Adding objects
function startGame() {
	GameBoard.start();
	player1 = new component(8, 100, "red", 20, 125);
	player2 = new component(8, 100, "blue", 670, 125);
	ball = new component(7, 7, 'black', 350, 170);
	player1Score = new component("20px", "Consolas", "red", 200, 25, "text");
	player2Score = new component("20px", "Consolas", "blue", 410, 25, "text");
}

var GameBoard = {
	canvas: document.getElementById("canvas"),
	start: function() {
		this.canvas.width = 700;
		this.canvas.height = 390;
		this.context = this.canvas.getContext("2d");
		this.interval = setInterval(updateGameBoard, 30);
		window.addEventListener('keydown', function(e) {
			GameBoard.keys = (GameBoard.keys || []);
			GameBoard.keys[e.keyCode] = true;
		})
		window.addEventListener('keyup', function(e) {
			GameBoard.keys[e.keyCode] = false;
		})
	},

	clear: function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	stop: function() {
		clearInterval(this.interval);
	}
}

function component(width, height, color, x, y, type) {

	this.type = type;
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.speedX = 0;
	this.speedY = 0;
	this.update = function() {
		ctx = GameBoard.context;
		if (this.type == "text") {
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle = color;
			ctx.fillText(this.text, this.x, this.y);
		} else {
			ctx.fillStyle = color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}

	this.newPos = function() {
		this.x += this.speedX;
		this.y += this.speedY;
	}


	// For collision
	this.crashWith = function(otherobj) {
		var myleft = this.x;
		var myright = this.x + (this.width);
		var mytop = this.y;
		var mybottom = this.y + (this.height);
		var otherleft = otherobj.x;
		var otherright = otherobj.x + (otherobj.width);
		var othertop = otherobj.y;
		var otherbottom = otherobj.y + (otherobj.height);
		var crash = true;
		if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
			crash = false;
		}
		return crash;
	}
}

function updateGameBoard() {

		//player Control

	if (player1.y <= 0) {
		player1.y = 0;
	}
	if (player1.y >= 350) {
		player1.y = 350;
	}
	if (player2.y <= 0) {
		player2.y = 0;
	}
	if (player2.y >= 350) {
		player2.y = 350;
	}

		//Keyboard control (keys: up, down, left, right)

	if (GameBoard.keys && GameBoard.keys[38]) {
		player1.y -= 10;
		if (ball.crashWith(player1)) {
			ball.speedY = -4;
			ball.speedX = 14;
		}
	}
	if (GameBoard.keys && GameBoard.keys[40]) {
		player1.y += 10;
		if (ball.crashWith(player1)) {
			ball.speedY = 4;
			ball.speedX = 14;
		}
	}
	if (GameBoard.keys && GameBoard.keys[37]) {
		player2.y -= 10;
		if (ball.crashWith(player2)) {
			ball.speedY = -4;
			ball.speedX = -8;
		}
	}
	if (GameBoard.keys && GameBoard.keys[39]) {
		player2.y += 10;
		if (ball.crashWith(player2)) {
			ball.speedY = 4;
			ball.speedX = -8;
		}
	}


		//BALL MOVEMENTS 

	ball.newPos();

	if (ball.crashWith(player1)) {
		ball.speedY = 0;
		ball.speedX = 13;
	} else if (ball.crashWith(player2)) {
		ball.speedY = 0;
		ball.speedX = -8;
	} else {
		ball.x += -4;
	}


	if (ball.y <= 0) {
		ball.speedY = 4;
	}
	if (ball.y >= 390) {
		ball.speedY = -4;
	}
	if (ball.x <= 2) {
		ball.x = 690;
		point2 += 1;
	}
	if (ball.x >= 700) {
		ball.x = 0;
		point1 += 1;
	}
			
	
	GameBoard.clear();
	player1.update();
	player2.update();
	ball.update();
	player1Score.text = "SCORE: " + point1;
	player1Score.update();
	player2Score.text = "SCORE: " + point2;
	player2Score.update();

}