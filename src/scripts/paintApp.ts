import * as PIXI from "pixi.js";

export class paintApp extends PIXI.Container {
  private _fillableItems: PIXI.Sprite[] = [];
  private _fillColors: number[] = [0xab8800, 0x00ff00, 0xffac8d];
  private _selectedColor: string = "";
  private _recordList: any = {
    0: ["0xffffff"],
    1: ["0xffffff"],
    2: ["0xffffff"],
    3: ["0xffffff"],
    4: ["0xffffff"],
  };
  private _filledColorOrder: number[] = [];

  constructor() {
    super();
  }

  create() {
    // Create 5 duplicate objects
    for (let i = 0; i < 5; i++) {
      let image = new PIXI.Sprite();
      let template = new PIXI.Graphics();
      // Add a circle for border outline
      template.beginFill(0xff0000);
      template.drawCircle(0, 0, 252);
      template.endFill();

      let templateFill = new PIXI.Graphics();
      templateFill.beginFill(0xffffff);
      // Add a circle
      templateFill.drawCircle(0, 0, 250);
      templateFill.endFill();
      image.addChild(template);

      let filler: PIXI.Sprite = new PIXI.Sprite();
      filler.addChild(templateFill);
      filler.name = "filler" + i;
      image.addChild(filler);
      this._fillableItems.push(filler);
      image.anchor.set(0.5);
      image.scale.set(1 - 0.1 * i);

      image.x = 300;
      image.y = 300;
      this.addChild(image);

      filler.on("pointerdown", () => this.onClick(filler));
      filler.cursor = "pointer";
      filler.interactive = true;
    }

    // Adding Color palette
    for (let i = 0; i < this._fillColors.length; i++) {
      let template = new PIXI.Graphics();
      template.beginFill(parseInt(this._fillColors[i].toString()));
      template.drawRect(0, 0, 50, 50);
      template.endFill();
      let selector = new PIXI.Sprite();
      selector.addChild(template);
      this.addChild(selector);
      selector.x = 150 + i * 80;
      selector.y = 580;
      selector.name = "" + i;

      selector.on("pointerdown", () => this.onSelect(selector));
      selector.cursor = "pointer";
      selector.interactive = true;
    }

    // Adding UNDO button ( White Colored )
    let template = new PIXI.Graphics();
    template.beginFill(0xffffff);
    template.drawRect(0, 0, 50, 50);
    template.endFill();
    let selector = new PIXI.Sprite();
    selector.addChild(template);
    this.addChild(selector);
    selector.x = 580;
    selector.y = 580;

    selector.on("pointerdown", () => this.onRevert());
    selector.cursor = "pointer";
    selector.interactive = true;
  }

  private onRevert() {
    let targetObject = this._filledColorOrder.pop();
    if (targetObject == undefined) {
      return;
    }

    this._recordList[targetObject].pop();

    let color =
      this._recordList[targetObject][this._recordList[targetObject].length - 1];
    color =
      parseInt(color) < this._fillColors.length
        ? this._fillColors[parseInt(color)]
        : 0xffffff;

    let target = this._fillableItems[targetObject];
    let shape = target.getChildAt(0) as PIXI.Graphics;
    shape.clear();
    target.removeChild(shape);
    shape = new PIXI.Graphics();
    shape.beginFill(color);
    target.addChild(shape);

    shape.drawCircle(0, 0, 250);
    shape.endFill();
  }

  private onClick(object: PIXI.Sprite) {
    if (!this._selectedColor) {
      return;
    }

    this._filledColorOrder.push(parseInt(object.name.split("filler")[1]));
    this._recordList[object.name.split("filler")[1]].push(this._selectedColor);

    let shape = object.getChildAt(0) as PIXI.Graphics;
    shape.clear();
    object.removeChild(shape);
    shape = new PIXI.Graphics();
    shape.beginFill(this._fillColors[parseInt(this._selectedColor)]);
    object.addChild(shape);

    shape.drawCircle(0, 0, 250);
    shape.endFill();
  }

  private onSelect(object: PIXI.Sprite) {
    this._selectedColor = object.name;
  }

  reset() {}
}
