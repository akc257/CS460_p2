var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(400, 400, {backgroundColor: 0x181818});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

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
  alien.position.x = 360;
  alien.position.y = 360;
  alien.animationSpeed = 0.1;
  alien.play();
  stage.addChild(alien);

  alien_two = new PIXI.extras.MovieClip(frames);
  alien_two.scale.x = 2;
  alien_two.scale.y = 2;
  alien_two.position.x = 340;
  alien_two.position.y = 340;
  alien_two.animationSpeed = 0.09;
  alien_two.play();
  stage.addChild(alien_two);

  alien_three = new PIXI.extras.MovieClip(frames);
  alien_three.scale.x = 1.5;
  alien_three.scale.y = 1.5;
  alien_three.position.x = 380;
  alien_three.position.y = 340;
  alien_three.animationSpeed = 0.9;
  alien_three.play();
  stage.addChild(alien_three);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(stage);
}
animate();
