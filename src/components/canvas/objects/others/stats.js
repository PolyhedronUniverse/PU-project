import Stats from 'three/examples/jsm/libs/stats.module';

export default function MyStats() {
    const stats = new Stats();
    document.body.appendChild(stats.dom);
    stats.dom.hidden = true;
    function onKeyDown(event) {
        if (event.keyCode == 82) {
            stats.dom.hidden = !stats.dom.hidden;
        } 
    }

    document.addEventListener('keydown', onKeyDown, false);

    let update = function () {
        stats.update();
    }
    return{update}
}