// Enemies our player must avoid
class Enemy {
  constructor(x, y, speed) {
      // Variables applied to each of our instances go here,
      // we've provided one for you to get started

      // The image/sprite for our enemies, this uses
      // a helper we've provided to easily load images
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.sprite = 'images/enemy-foot-soldier.png';
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
      // You should multiply any movement by the dt parameter
      // which will ensure the game runs at the same speed for
      // all computers.
      if(this.x <= 500){
        this.x += this.speed * dt;
      } else{
        this.reset();
      }
  }

  reset() {
    this.x = -100;
    this.y = this.y;
  }

  // Draw the enemy on the screen, required method for game
  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/ninja-turtle-michaelangelo.png';
  }

update () {
  //this resets the player to the starting point if it collides with an enemy
  for(let i = 0; i < allEnemies.length; i++){
    if (Math.abs(this.x - allEnemies[i].x) <= 50){
      if(Math.abs(this.y - allEnemies[i].y) <=50){
        this.reset();
      }
    }
  }
  //this resets the player to the starting point if it reaches the water/wins.
  if ((this.y - 0) <= 7) {
    this.reset();
  }
}
  //this is the starting point of the player, instantiated on line 99
  reset() {
    this.x = 200
    this.y = 400
  }

  render () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [];
const enemy1 = new Enemy(120, 200, 300);
const enemy2 = new Enemy(10, 75, 200);
const enemy3 = new Enemy(60, 150, 200);
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
// Place the player object in a variable called player
const player = new Player(200, 400);

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
