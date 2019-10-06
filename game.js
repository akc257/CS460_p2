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

  runner = new PIXI.extras.MovieClip(frames);
  runner.scale.x = 4;
  runner.scale.y = 4;
  runner.position.x = 200;
  runner.position.y = 200;
  runner.animationSpeed = 0.1;
  runner.play();
  stage.addChild(runner);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(stage);
}
animate();
