var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(400, 400, {backgroundColor: 0x181818});

gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

var alien;
var alien_two;
var alien_three;
var man;

//Creating sprites
var start_screen_bg = new PIXI.Sprite(PIXI.Texture.fromImage("start_screen.png") );
var background = new PIXI.Sprite(PIXI.Texture.fromImage("background.png") );
var ship = new PIXI.Sprite(PIXI.Texture.fromImage("ship.png") );
var man = new PIXI.Sprite(PIXI.Texture.fromImage("man3.png") );
var area_51 = new PIXI.Sprite(PIXI.Texture.fromImage("51.png") );

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

//call mousehandler when screen clicked on
start_screen_bg.interactive = true;
start_screen_bg.on('mousedown', mouseStartHandler);

PIXI.loader
  .add("assets.json")
  .load(ready);

function ready() {

  var frames = [];
  var frames2 = [];

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

  man.position.x = 0;
  man.position.y = 150;
  game_screen.addChild(man);
}

function keydownEventHandler(e) {

  if (e.keyCode == 87) { // W key
    man.position.y -= 10;
    // alien_two.position.y += 10;
  }

  if (e.keyCode == 83) { // S key
    man.position.y += 10;
    // alien_two.position.y -= 10;
  }

  if (e.keyCode == 65) { // A key
    man.position.x -= 10;
    // alien_two.position.x += 10;
  }

  if (e.keyCode == 68) { // D key
    man.position.x += 10;
    // alien_two.position.x -= 10;
  }
}

document.addEventListener('keydown', keydownEventHandler);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(stage);
}
animate();
