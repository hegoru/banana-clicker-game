import { BrowserCookiesManager } from "../helpers/browserCookiesHelper.js";
import { ScoreText } from "../gameObjects/scoreText.js";

export class Game {
  constructor(gameOpts = { resizeTo: window }, colorScheme, assets) {
    this.app = new PIXI.Application(gameOpts);
    this.colorScheme = colorScheme;
    this.assets = assets;

    this.init();
  }

  init() {
    this.browserCookiesManager = new BrowserCookiesManager();

    this.score = 0;

    if (!this.browserCookiesManager.cookieExists("banana-clicks")) {
      this.browserCookiesManager.setCookie("banana-clicks", this.score);
    } else {
      this.score = this.browserCookiesManager.getCookie("banana-clicks");
    }

    this.containers = new Map();
    ["gameLayout", "controlsLayout"].forEach((containerName) => {
      this.containers.set(containerName, new PIXI.Container());
    });
    this.containers.forEach((container) => this.app.stage.addChild(container));

    this.bananaTexture = PIXI.Texture.from("../../assets/banana.png");
    this.banana = new PIXI.Sprite(this.bananaTexture);
    this.banana.anchor.set(0.5);
    this.banana.scale.set(0.5);
    this.banana.position.set(
      this.app.screen.width * 0.5,
      this.app.screen.height * 0.5
    );

    this.scoreText = new ScoreText(this.score);
    this.scoreText.anchor.set(0.5);
    this.scoreText.position.set(
      this.app.screen.width * 0.5,
      this.app.screen.height * 0.5 - this.banana.height * 0.75
    );

    this.app.stage.eventMode = "static";
    this.app.stage.hitArea = this.app.screen;
    this.app.stage.on("pointertap", () => {
      this.score++;
      this.browserCookiesManager.setCookie("banana-clicks", this.score);
      this.scoreText.text = this.score;
    });
  }

  start() {
    this.containers.get("gameLayout").addChild(this.banana);
    this.containers.get("controlsLayout").addChild(this.scoreText);

    // this.animate();
  }

  // animate() {
  //   this.app.ticker.add((delta) => {});
  // }
}
