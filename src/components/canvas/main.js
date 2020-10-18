import SceneManager from './SceneManager';

export default (containerElement) => {

  const sceneManager = new SceneManager();

  bindEventListeners();
  render();

  function bindEventListeners() {
    window.onresize = resizeCanvas;
    resizeCanvas();
  }

  function resizeCanvas() {
    sceneManager.onWindowResize();
  }

  function render(time) {
    requestAnimationFrame(render);
    // sceneManager.stats.begin()
    sceneManager.update();
  }
}
