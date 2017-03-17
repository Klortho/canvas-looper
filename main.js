// The vertices of a square centered at the origin.
// Our looper will draw one side of the square every
// iteration: i.e. a path from the last point to the
// next point.
const points = [
  [-10, -10],
  [-10, 10],
  [10, 10],
  [10, -10],
];
const plen = points.length;

// This gets passed to canvas-looper. It defines a set of
// state variables and a loop function.
const squareSpiral = {
  // The state variables are defined as an array of arrays.
  // These have to be in an order that guarantees that
  // all interdependencies will be resolved. Each variable
  // is defined with an array comprising:
  // - name
  // - initial value, or null. null indicates that the initial
  //   value depends on other state variable's initial values.
  //   So, then the initial value is computed as it is in a
  //   normal iteration: by calling getNext()
  // - getNext() function - computes the next value based on
  //   the the last state.
  stateVars: [
    ['i', 0, s => s.i + 1],
    ['scale', 1, s => s.scale * 1.04],
    ['point', null, s => points[s.i % plen].map(c => c * s.scale)],
    ['color', null, s => `hsl(${(s.i*10) % 360}, 100%, 50%)`],
    ['strokeWidth', null, s => 0.5 * s.scale,],
  ],

  // The loop function takes the last state and the next
  // state as arguments
  loop: (last, next) => {
    const lp = last.point;
    const np = next.point;
    const pathString =
      `M ${lp[0]} ${lp[1]} L ${np[0]} ${np[1]}`;
    console.log('path string: ' + pathString);
    const path = new fabric.Path(pathString, {
        stroke: last.color,
        strokeWidth: last.strokeWidth,
        fill: false,
        strokeLineCap: 'round',
      });
    canvas.add(path);
  },
};

loopIt(50, squareSpiral);
