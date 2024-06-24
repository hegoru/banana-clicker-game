import { assets } from "./core/assets.js";
import { colors } from "./core/colors.js";
import { Game } from "./core/game.js";

const game = new Game(
  {
    view: document.querySelector("canvas#game"),
    background: colors.get("bg"),
    resolution: window.devicePixelRatio || 1,
    antialias: true,
    autoDensity: true,
    resizeTo: window,
  },
  colors,
  assets
);
game.start();
