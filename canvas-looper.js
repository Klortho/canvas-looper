const canvasOptions = {
  width: 200,
  height: 200,
};
var canvas = new fabric.StaticCanvas('c', canvasOptions);
canvas.getContext()
  .translate(canvasOptions.width/2, canvasOptions.height/2);

const loopIt = (loops, shaper) => {
  console.log('Looping ' + shaper);

  const initReducer = (initSoFar, sv) => {
    console.log('initReducer: initSoFar: ', initSoFar);
    console.log('  sv: ', sv);
    const value = sv[1] != null ? sv[1] : sv[2](initSoFar);
    initSoFar[sv[0]] = value;
    return initSoFar;
  };
  const initial = R.reduce(initReducer, {}, shaper.stateVars);
  console.log('initial: ', initial);

  const getNext = last => {
    const next = {};
    shaper.stateVars.forEach(sv => {
      next[sv[0]] = sv[2](last);
    });
    return next;
  };

  // Draw!
  var i = 0;
  const drawReducer = last => {
    console.log('looping #' + i++);
    console.log('  last: ', last);
    const next = getNext(last);
    console.log('  next: ', next);
    shaper.loop(last, next);
    return next;
  };
  R.reduce(drawReducer, initial, R.range(0, loops));
}
