// app.ts

import * as PIXI from "pixi.js";
import { paintApp } from "./paintApp";

interface EngineParams {
  containerId: string;
  canvasW: number;
  canvasH: number;
  fpsMax: number;
}

class Engine {
  public container: HTMLElement;
  public loader: PIXI.Loader;
  public renderer: PIXI.Renderer;
  public stage: PIXI.Container;
  public graphics: PIXI.Graphics;

  constructor(params: EngineParams) {
    this.loader = PIXI.Loader.shared;
    this.renderer = PIXI.autoDetectRenderer({
      width: params.canvasW,
      height: params.canvasH,
      antialias: true,
    });
    this.stage = new PIXI.Container();
    this.graphics = new PIXI.Graphics();

    this.container = params.containerId
      ? document.getElementById(params.containerId) || document.body
      : document.body;
    this.container.appendChild(this.renderer.view);
  } // constructor
} // Engine

const engine = new Engine({
  containerId: "game",
  canvasW: 720,
  canvasH: 1280,
  fpsMax: 60,
});

const table: paintApp = new paintApp();
const mainButton = PIXI.Sprite.from("images/btn_main.png");
// const sprite = PIXI.Sprite.from("images/logo.png");

// ==============
// === STATES ===
// ==============

window.onload = load;

function load() {
  showIntroScreen();
  render();
} // load

function showIntroScreen() {
  mainButton.on("pointerdown", () => {
    startGame();
  });
  mainButton.interactive = true;

  // Shows hand cursor
  mainButton.cursor = "pointer";
  mainButton.anchor.set(0.5);
  mainButton.x = engine.renderer.width / 2;
  mainButton.y = engine.renderer.height / 2;
  engine.stage.addChild(mainButton);
}

function startGame() {
  table.create();
  create();
}

function create() {
  /* ***************************** */
  /* Create your Game Objects here */
  /* ***************************** */

  engine.stage.removeChild(mainButton);
  mainButton.destroy();
  engine.stage.addChild(table);
} // create

function render() {
  requestAnimationFrame(render);
  /* ***************************** */
  /* Render your Game Objects here */
  /* ***************************** */
  /* Sprite */
  // sprite.rotation += 0.01;
  engine.renderer.render(engine.stage);
} // render
