var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(400, 400, {backgroundColor: 0x181818});

gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

var alien;
var alien_two;
var alien_three;
var man;
var sound;

//Creating sprites
var start_screen_bg = new PIXI.Sprite(PIXI.Texture.fromImage("start_screen.png") );
var game_over = new PIXI.Sprite(PIXI.Texture.fromImage("game_over.png") );
var background = new PIXI.Sprite(PIXI.Texture.fromImage("background.png") );
var ship = new PIXI.Sprite(PIXI.Texture.fromImage("ship.png") );
var man = new PIXI.Sprite(PIXI.Texture.fromImage("man3.png") );
var area_51 = new PIXI.Sprite(PIXI.Texture.fromImage("51.png") );
var thank = new PIXI.Sprite(PIXI.Texture.fromImage("thank.png"));
var new_x = Math.floor(Math.random() * 100) + 50;
var new_y = Math.floor(Math.random() * 100) + 50;

//add start screen to scene graph
var start_screen = new PIXI.Container();
start_screen.position.x = 200;
start_screen.position.y = 200;
stage.addChild(start_screen);

start_screen.addChild(start_screen_bg);
start_screen_bg.position.x = -200;
start_screen_bg.position.y = -200;

//create game screen to be added shortly
var game_screen = new PIXI.Container();
game_screen.position.x = 200;
game_screen.position.y = 200;

game_screen.addChild(background);
background.position.x = -200;
background.position.y = -200;

//functon to switch screen when start screen is clicked on
function mouseStartHandler(e)
{
  stage.removeChild(start_screen);
  stage.addChild(game_screen);
}

//call mousehandler when screen click
start_screen_bg.interactive = true;
start_screen_bg.on('mousedown', mouseStartHandler);

PIXI.loader
  .add("assets.json")
  .load(ready);


function ready() {

  var frames = [];

  for (var i=1; i<=4; i++) {
    frames.push(PIXI.Texture.fromFrame('alien' + i + '.png'));
  }

  alien = new PIXI.extras.MovieClip(frames);
  alien.scale.x = 2;
  alien.scale.y = 2;
  alien.position.x = -150;
  alien.position.y = -150;
  alien.animationSpeed = 0.09;
  alien.play();
  game_screen.addChild(alien);

  ship.position.x = -200;
  ship.position.y = -210;
  game_screen.addChild(ship);

  area_51.position.x = 0;
  area_51.position.y = 160;
  game_screen.addChild(area_51);

  man.position.x = 0;
  man.position.y = 150;
  game_screen.addChild(man);
}

// code from DR PALMER
// for sound usage
PIXI.loader
  .add("fly.mp3")
  .load(sound_1);

function sound_1() {
  sound = PIXI.audioManager.getAudio("fly.mp3");
}


function keydownEventHandler(e) {
  if (e.keyCode == 87) { // W key
    man.position.y -= 10;
    sound.play();
    // sound implemented but I don't hear
  }

  if (e.keyCode == 83) { // S key
    man.position.y += 10;
    sound.play();
  }

  if (e.keyCode == 65) { // A key
    man.position.x -= 10;
    sound.play();
  }

  if (e.keyCode == 68) { // D key
    man.position.x += 10;
    sound.play();
  }

  if (man.position.x == alien.position.x && man.position.y == alien.position.y ){

      if (e.keyCode == 87) { // W key
        man.position.y -= 10;
        alien.position.y -= 10;
      }

      if (e.keyCode == 83) { // S key
        man.position.y += 10;
        alien.position.y += 10;
      }

      if (e.keyCode == 65) { // A key
        man.position.x -= 10;
        alien.position.x -= 10;
      }

      if (e.keyCode == 68) { // D key
        man.position.x += 10;
        alien.position.x += 10;
      }
  }
}

setInterval(end_game, 500);

function end_game()
{
    if(alien.position.x > -20 && alien.position.x < 20 &&
        alien.position.y > 150 && alien.position.y < 180){
            stage.removeChild(game_screen);
            stage.addChild(game_over);

            thank.position.x = 0;
            thank.position.y = 0;
            stage.addChild(thank);
            createjs.Tween.get(thank.position).to({x: new_x, y: new_y}, 1000, createjs.Ease.bounceOut);

        }
}

document.addEventListener('keydown', keydownEventHandler);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(stage);
}
animate();
