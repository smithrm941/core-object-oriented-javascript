Object.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
  ctx.font = '25px Helvetica'
  ctx.fillStyle = 'Blue'
  ctx.fillText(`SCORE: ${player.score}`,0, 570)
  ctx.font = '25px Helvetica'
  ctx.fillStyle = 'Purple'
  ctx.fillText(`LIVES: ${player.lives}`,385,570)
  if(player.lives === 0){
    ctx.font = '40px Bookman'
    ctx.fillStyle = 'Red'
    ctx.fillText(`YOU'RE TURTLE SOUP!`, 20, 35)
    loseSound.play()
    setTimeout(function(){window.location.reload()}, 3000)
  }
}

// Audio files for theme that plays throughout game and sounds that play when the game is lost, when the player runs into an enemy and when the player scores
let theme = new Audio('sounds/TeenageMutantNinjaTurtles.mp3')
  theme.play()
  theme.loop = true;
let loseSound = new Audio('sounds/Evil_Laugh.mp3')
let collisionSound = new Audio('sounds/smash.mp3')
let scoreSound = new Audio('sounds/cowabunga.mp3')
let lifeSound = new Audio('sounds/magic-chime.mp3')


// Enemies our player must avoid
class Enemy {
  constructor(y, speed) {
      this.x = -100;
      this.y = y;
      this.speed = speed;
      this.sprite = 'images/enemy-foot-soldier.png';
  }

  update(dt) {
    // This makes the enemies move as long as they have not moved off the right edge of the screen.
    if(this.x <= 500){
      this.x += this.speed * dt;
    } else{
      this.reset();
    }
  }
  // The enemies move back to starting position after moving off the right edge
  reset() {
    this.x = -100;
    this.y = this.y;
  }
}

//Star that player wants to get extra lives
class Star {
  constructor() {
      this.x = -100;
      //this.y = Math.floor(Math.random()*(300-20) +20);
      this.y = 350;
      this.speed = Math.floor(Math.random()*(600-200) +200);
      this.sprite = 'images/Star.png';
  }
  update(dt) {
    // This makes the star move as long as it has not moved off the right edge of the screen.
    if(this.x <= 500){
      this.x += this.speed * dt;
    } else {
      this.reset()
      //this.speed = this.speed + 5
    }
  }
  // The star moves back to a random point vertically to the left of the screen after moving off the right edge and speeds up
  reset() {
    this.x = -100
    this.y = Math.floor(Math.random()*(300-20) +20);
    this.speed = this.speed + 5
  }
}

// The Player class is for the character the person playing the game will control
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.score = 0;
    this.lives = 3;
    this.sprite = 'images/ninja-turtle-michaelangelo.png';
    this.reset()
  }

update () {
  //this decrements the number of lives and resets the player to the starting point if it collides with an enemy
  for(let i = 0; i < allEnemies.length; i++){
    if (Math.abs(this.x - allEnemies[i].x) <= 50){
      if(Math.abs(this.y - allEnemies[i].y) <=80){
        collisionSound.play();
        this.lives --
        this.reset();
      }
    }
  }

  //this increments the number of lives (by 4 for some reason. seems to change with the values I put in the Math.abs) if the player collides with a star
  if(Math.abs(this.x - extraLife[0].x) <= 15){
    if(Math.abs(this.y - extraLife[0].y) <=40){
        lifeSound.play();
        this.lives ++
      }
    }

  //this increments the score, plays "cowabunga" and resets the player to the starting point if it reaches the water/wins.
  if ((this.y - 0) <= 7) {
    this.score ++
    scoreSound.play()
    this.reset();
  }
}
  //this is the starting point of the player
  reset() {
    this.x = 200
    this.y = 400
  }

  handleInput(e) {
    if(e === 'left' && this.x > 0) {
      this.x -= 30
    }
    if(e === 'up' && this.y > 0) {
      this.y -= 30
    }
    if(e === 'right' && this.x < 400){
      this.x += 30
    }
    if(e === 'down' && this.y < 400){
      this.y += 30
    }
  }
};

// All enemies are being instantiated in an array and all are starting to the left of the screen but at different vertical positions and move at different speeds
const allEnemies = [new Enemy(200, 300), new Enemy(75, 200), new Enemy(150, 200)];

// Instantiated one star
const extraLife = [new Star()]

// Instantiated one player
const player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', e => {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
