import { scoreTextStyle } from "./scoreTextStyle.js";

export class ScoreText extends PIXI.Text {
  constructor(text) {
    super(text, scoreTextStyle);

    this.anchor.set(0.5);
  }
}
