/**
 * Playing Asteroids while learning JavaScript object model.
 */

/**
 * Shim layer, polyfill, for requestAnimationFrame with setTimeout fallback.
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 */
window.requestAnimFrame = (function(){
  return window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();



/**
 * Shim layer, polyfill, for cancelAnimationFrame with setTimeout fallback.
 */
window.cancelRequestAnimFrame = (function(){
  return window.cancelRequestAnimationFrame ||
          window.webkitCancelRequestAnimationFrame ||
          window.mozCancelRequestAnimationFrame    ||
          window.oCancelRequestAnimationFrame      ||
          window.msCancelRequestAnimationFrame     ||
          window.clearTimeout;
})();



/**
 * Trace the keys pressed
 * http://nokarma.org/2011/02/27/javascript-game-development-keyboard-input/index.html
 */
window.Key = {
  pressed: {},

  LEFT:   37,
  UP:     38,
  RIGHT:  39,
  DOWN:   40,
  SPACE:  32,
  A:      65,
  S:      83,
  D:      68,
  w:      87,
  FIRE:   32,

  isDown: function(keyCode, keyCode1) {
    return this.pressed[keyCode] || this.pressed[keyCode1];
  },

  onKeydown: function(event) {
    this.pressed[event.keyCode] = true;
  },

  onKeyup: function(event) {
    delete this.pressed[event.keyCode];
  }
};
window.addEventListener('keyup',   function(event) { window.Key.onKeyup(event); },   false);
window.addEventListener('keydown', function(event) { window.Key.onKeydown(event); }, false);



/**
 * All objects are Vectors
 */
function Vector(x, y) {
    // console.log('New vector: ', x, ' ', y);
    this.x = x || 0;
    this.y = y || 0;
}

Vector.prototype = {
  muls:  function (scalar) { return new Vector( this.x * scalar, this.y * scalar); }, // Multiply with scalar
  imuls: function (scalar) { this.x *= scalar; this.y *= scalar; return this; },      // Multiply itself with scalar
  adds:  function (scalar) { return new Vector( this.x + scalar, this.y + scalar); }, // Multiply with scalar
  iadd:  function (vector) { this.x += vector.x; this.y += vector.y; return this; }   // Add itself with Vector
};

/**
 * Game score
 */
function Score(position) {
    this.score      = 0;
    this.position   = position  || new Vector();
}

Score.prototype = {
    add: function (score) { this.score += score;},
    loose: function (score) { this.score -= score;},
    draw: function (ct) {
        ct.save();
        ct.translate(this.position.x, this.position.y);
        ct.font = "40px impact";
        // ct.fillStyle = 'yellow';
        ct.fillStyle = '#FFFF9C';
        ct.fillText(this.score, 0, 0, 100);
        ct.restore();
    }
};


/**
* Space as an object.
*/
function Space(canvasWidth, canvasHeight) {
    this.canvasWidth     = canvasWidth;
    this.canvasHeight     = canvasHeight;
    this.mars = new Image();
    this.mars.src = "smashing-freebie-space-icons/png/256/mars.png";
    this.earth = new Image();
    this.earth.src = "smashing-freebie-space-icons/png/64/earth.png";
    this.drawReady = false;
    this.earth.onload = function () {this.drawReady = true;};
    // TODO: Fix wait for loading of images.
    // TODO: Move creation of image object to one place for all images?
}

Space.prototype = {

    draw: function(ct) {
        if (!this.hit) {
            ct.save();
            // ct.translate(this.position.x, this.position.y);
            // TODO: Make mars and earth move independently of each other.
            ct.drawImage(this.earth, 0.1*this.canvasWidth, 0.6*this.canvasHeight);
            ct.drawImage(this.mars, 0.70*this.canvasWidth, -0.2*this.canvasHeight);
            ct.stroke();
            // ct.restore();
        }
    },
};

/**
 * All invaders as an object.
 */
function Invaders(width, canvasWidth, gun) {
    this.gun = gun;
    this.invader = [];
    // Create and init all Invaders
    var direction = 'left';
    var invadersPerRow = canvasWidth/(2*width)-2;
    // var invadersPerRow = 1;
    for (var r = 0, rows = 3, m = 0; r < rows; r++) {
        for (var i = 0; i < invadersPerRow; i++) {
            this.invader[m++] = new Invader(20, new Vector(2*width*i+width, 2*width*(r+1)), direction, gun);
        }
        if (direction == 'left'){ direction = 'right';} else { direction = 'left';}
    }
}

Invaders.prototype = {

    draw: function(ct) {
        for (var i = 0; i < this.invader.length; i++) {
            this.invader[i].draw(ct);
        }
    },

    update: function(td, width, height) {
        var allInvadersHit = true;
        for (var i = 0; i < this.invader.length; i++) {
            this.invader[i].update(td, width, height);
            if (!this.invader[i].hit) {
                allInvadersHit = false;
            }
        }
        if (allInvadersHit) {
            console.log('All invaders are hit.');
            window.Spaceinvaders.gameOver('You win');
        }
    },

    meHit: function(grenadePos) {
        for (var i = 0; i < this.invader.length; i++) {
            this.invader[i].meHit(grenadePos);
        }
    },

    lost: function () {
        // TODO: function not needed. check in update function instead.
        for (var i = 0; i < this.invader.length; i++) {
            if (!this.invader[i].hit) {
                return false;
            }
        }
        // Invaders have lost, you won, when all invaders are hit.
        console.log('All invaders are hit.');
        // Game over
        window.Spaceinvaders.gameOver('You win');
        return true;
    }
};


/**
 * A Invader as an object.
 */
function Invader(width, position, direction, gun) {
  this.width        = width     || 32;
  this.position     = position  || new Vector();
  this.direction    = direction || 'left';
  this.gun          = gun;
  this.hit          = false;
  this.changeImage  = 0;
  this.imageAngry = new Image();
  this.image = new Image();
  this.imageAngry.src = "smashing-freebie-space-icons/png/32/alien_angry.png";
  this.image.src = "smashing-freebie-space-icons/png/32/alien.png";
  this.drawReady = false;
  this.image.onload = function () {this.drawReady = true;};
  // TODO: Fix wait for loading of images.
  // TODO: Move creation of image object to one place for all images?
}

Invader.prototype = {

    draw: function(ct) {
        if (!this.hit) {
            ct.save();
            ct.translate(this.position.x, this.position.y);
            ct.beginPath();
            if (this.angry) {
                ct.drawImage(this.imageAngry, -16, -16);
            } else {
                ct.drawImage(this.image, -16, -16);
            }
            if (!this.changeImage) {
                this.changeImage = Fnlive.random(0, 50);
                this.angry = this.angry ? false : true;
            } else {
                this.changeImage--;
            }
            ct.stroke();
            ct.restore();
        }
    },

    moveLeft: function() { this.position.x -= 2;},
    moveRight: function() { this.position.x += 2;},

    update: function(td, width, height) {
        if (this.direction == 'left') {
            this.position.x -= 2;
        } else {
            this.position.x += 2;
        }
        if (this.position.x > width-10) {
            this.direction = 'left';
            this.position.y += 2*this.width;
        }
        if (this.position.x < -this.width+10) {
            this.direction = 'right';
            this.position.y += 2*this.width;
        }
        if (!this.hit) {
            this.gun.meHit(this.position);
        }
    },

    meHit: function(grenadePos) {
        var areaminx = this.position.x-this.width,
            areamaxx = this.position.x+this.width,
            areaminy = this.position.y-this.width,
            areamaxy = this.position.y+this.width;

        if (grenadePos.x < areamaxx) {
            if (grenadePos.x > areaminx) {
                if (grenadePos.y < areamaxy) {
                    if (grenadePos.y > areaminy) {
                        if (!this.hit) {
                            this.hit = true;
                            score.add(10);
                        }
                    }
                }
            }
        }
    },

};


function Grenades() {
    this.grenade = [];
}
Grenades.prototype = {

    fire: function(height, position) {
        this.grenade.push(new Grenade(height, position));
    },

    draw: function(ct) {
        for (var i = 0; i < this.grenade.length; i++) {
            this.grenade[i].draw(ct);
        }
    },

    update: function(td, width, height) {
        var loop = true, i = 0;
        while (i < this.grenade.length) {
            if (!this.grenade[i].update(td, width, height)) {
                // Remove empty grenades that exited canvas.
                this.grenade.shift();
            }
            i++;
        }
    }
};

/**
 * A Grenade as an object.
 */
function Grenade(height, position) {
    this.height     = height    || 10;
    this.position   = position  || new Vector();
    this.image = new Image();
    this.image.src = "smashing-freebie-space-icons/png/32/rocket.png";
    this.drawReady = false;
    this.image.onload = function () {this.drawReady = true;};
}

Grenade.prototype = {

    draw: function(ct) {
        ct.save();
        ct.translate(this.position.x, this.position.y);
        ct.drawImage(this.image, -16, -16);

        ct.stroke();
        ct.restore();
    },

  update: function(td, width, height) {
      this.position.y -= 2;
      // check if grenade hit invader
      invaders.meHit(this.position);
      // return false if grenade exited game canvas
      return this.inArea();
  },

  inArea: function() {
    if (this.position.y > 0) {
        return true;
    }
    // return false if grenade exited game canvas
    return false;
  }
};


/**
 * A Gunner as an object.
 */
function Gunner(width, height, position) {
    this.height     = height    || 32;
    this.width      = width     || 32;
    this.position   = position  || new Vector();
    this.grenades = new Grenades();
    this.updatesSinceFire = 0;
    this.gunImage = new Image();
    this.gunImage.src = "smashing-freebie-space-icons/png/64/observatory.png";
    this.drawReady = false;
    this.gunImage.onload = function () {
        this.drawReady = true;
        console.log('Gun image ready!');
    };
}

Gunner.prototype = {

    draw: function(ct) {
        // if (this.drawReady) {
        if (true) {
            var x = this.width/2, y = this.height/2;

            ct.save();
            ct.translate(this.position.x, this.position.y);
            ct.beginPath();
            ct.drawImage(this.gunImage, -32, -32);
            ct.restore();
            this.grenades.draw(ct);
        }
  },

  moveLeft: function() { this.position.x -= 2;},
  moveRight: function() { this.position.x += 2;},

  update: function(td, width, height) {
    if (window.Key.isDown(window.Key.LEFT, window.Key.A))   this.moveLeft();
    if (window.Key.isDown(window.Key.RIGHT, window.Key.D))  this.moveRight();
    if (window.Key.isDown(window.Key.FIRE))           this.fire();
    this.stayInArea(width, height);
    this.grenades.update(td, width, height);
  },

  fire: function() {
      if (this.updatesSinceFire) {
          this.updatesSinceFire -= 1;
      } else {
          this.grenades.fire(5, new Vector(this.position.x, this.position.y));
          this.updatesSinceFire = 40;
      }
  },

  meHit: function(invaderPos) {
      var areaminx = this.position.x-this.width,
          areamaxx = this.position.x+this.width,
          areaminy = this.position.y-this.height,
          areamaxy = this.position.y+this.height;

      if (invaderPos.x < areamaxx) {
          if (invaderPos.x > areaminx) {
              if (invaderPos.y < areamaxy) {
                  if (invaderPos.y > areaminy) {
                      // Game over
                      console.log('Gunner hit.');
                      window.Spaceinvaders.gameOver('You lose');
                  }
              }
          }
      }
  },

  stayInArea: function(width, height) {
    if (this.position.x > width-10)         this.position.x = width-10;
    if (this.position.x < -this.width+50)   this.position.x = -this.width+50;
  }
};


/**
 * Spaceinvaders, the Game
 */
window.Spaceinvaders = (function(){
  var canvas, ct, grenades, gun, lastGameTick, game_over;

  var init = function(canvas) {
    canvas = document.getElementById(canvas);
    ct = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;
    ct.lineWidth = 1;
    ct.strokeStyle = 'hsla(0,0%,100%,1)';
    game_over = undefined;  // Set text to indicate when game is over.
    space = new Space(width, height);
    gun = new Gunner(40, 20, new Vector(width/2, height*0.9));
    invaders = new Invaders(20, width, gun);
    score = new Score(new Vector(10, 40));
    // TODO: Remove some of the variables from global scope.
    console.log('Init the game');
  };

  var update = function(td) {
      gun.update(td, width, height);
      invaders.update(td, width, height);
  };

  var render = function() {
    ct.clearRect(0, 0, width, height);
    space.draw(ct);
    gun.draw(ct);
    invaders.draw(ct);
    score.draw(ct);
  };

  var gameOver = function(text) {
      game_over = text;
    //   game_over = true;
  };

  var drawGameover = function(text) {
      // TODO: move to score?
      var x = width/2-100, y = height/2;
      ct.save();
      ct.translate(x, y);
      ct.font = "60px impact";
      //   ct.fillStyle = 'yellow';
      ct.fillStyle = '#FFFF9C';
      ct.fillText('Game Over!', 0, 0, 400);
      ct.fillText(text, 0, 100, 400);
      ct.restore();
  };

  var gameLoop = function() {
    var now = Date.now();
    td = (now - (lastGameTick || now)) / 1000; // Timediff since last frame / gametick
    lastGameTick = now;
    window.requestAnimFrame(gameLoop);
    if (game_over) {
        drawGameover(game_over);
    } else {
        update(td);
        render();
    }
  };

  return {
    'init': init,
    'gameLoop': gameLoop,
    'gameOver': gameOver,
  };
})();



// On ready
// $(function(){
$(document).ready(function () {
  'use strict';

  window.Spaceinvaders.init('canvas1');
  window.Spaceinvaders.gameLoop();

  console.log('Ready to play.');
});
