export type Config = {
    animating: boolean;
    animate: boolean;
    skip: boolean;
    fps: number;
    speed: number;
    startTimeStamp: number;
    previousTimeStamp: number;
    offsetAngle: number;
    currentXs: number[];
    currentYs: number[];
    newXs: number[];
    newYs: number[];
    size: number;
    points: number;
    amplitude: number;
    stopped: boolean;
}

export const config = {
    animating: false,
    animate: false,
    skip: false,
    fps: 30,
    speed: 1000,
    startTimeStamp: 0,
    previousTimeStamp: 0,
    offsetAngle: 0,
    currentXs: [],
    currentYs: [],
    newXs: [],
    newYs: [],
    size: 100,
    points: 9,
    amplitude: .1,
    stopped: true,
};

export function animatePath(pathEl: SVGPathElement, conf: Config) {
    if (conf.animating) return;
    conf.animating = true;
    [conf.currentXs, conf.currentYs] = make({ ...conf, stopped: true });
    
    [conf.newXs, conf.newYs] = make(conf);

    function animate(timeStamp: number) {
        if (conf.startTimeStamp === 0) conf.startTimeStamp = timeStamp;

        const elapsed = timeStamp - conf.startTimeStamp;
        const pos = elapsed / conf.speed;

        if (conf.skip) {
            conf.skip = false;
            [conf.newXs, conf.newYs] = make(conf);
            [conf.currentXs, conf.currentYs] = [conf.newXs, conf.newYs];
        }

        if (pos >= 1) {
            [conf.currentXs, conf.currentYs] = [conf.newXs, conf.newYs];
            [conf.newXs, conf.newYs] = make(conf);

            conf.startTimeStamp = timeStamp;
            setTimeout(() => requestAnimationFrame(animate), 1000 / conf.fps);
            return;
        }

        const renderXs = conf.currentXs.map((x, idx) => x + pos * (conf.newXs[idx] - x));
        const renderYs = conf.currentYs.map((y, idx) => y + pos * (conf.newYs[idx] - y));

        render(pathEl, renderXs, renderYs);

        setTimeout(() => requestAnimationFrame(animate), 1000 / conf.fps);
    }
    requestAnimationFrame(animate);
}

function render(el: SVGPathElement, dxs: number[], dys: number[]) {
    
    let ds = `${dxs[0]},${dys[0]}`;
    for (let d = 1; d < dxs.length; d++) {
        ds += `L${dxs[d]},${dys[d]}`;
    }
    let d = `M${ds}Z`;
    el.setAttribute('d', d);
}

function make(conf: Config): number[][] {
    let { size, points, amplitude, stopped, offsetAngle } = conf;
    let waveRadius = size / 4;
    const cx = size / 2;
    const cy = cx;

    if (stopped) {
        waveRadius = waveRadius - waveRadius * amplitude * 2;
        amplitude = 0;
    }
    const dxs = [];
    const dys = [];
    const sectorAngle = (2 * Math.PI / points);
    for (let p = 0; p < points; p++) {
        const angle = p * sectorAngle + offsetAngle;
        const randRadius = waveRadius + (waveRadius * amplitude * 2 * (Math.random() - .5));
        const x = randRadius * Math.sin(angle) + cx;
        const y = randRadius * Math.cos(angle) + cy;
        dxs.push(x);
        dys.push(y);
    }
    return [dxs, dys];
}
