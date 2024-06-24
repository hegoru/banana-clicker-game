PIXI.Assets.addBundle("game-screen", {
  banana: "../../assets/banana.png",
});

export const assets = await PIXI.Assets.loadBundle("game-screen");
