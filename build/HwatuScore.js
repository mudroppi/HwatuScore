var Reloader = Reloader || {};

Reloader.reloadFile = path => {
  var x = document.createElement("script");
  x.setAttribute("src", path + "?rel=" + new Date().getTime());
  document.body.appendChild(x);
  setTimeout(function () {
    document.body.removeChild(x);
  }, 500);
};

Reloader.startReloading = files => {
  setTimeout(function () {
    console.log("--- reloading ---");
    files.map(Reloader.reloadFile);
  }, 1000);
};

Reloader.startReloading(["build/HwatuScore.js"]);

function l(x) {
  console.log(x);return x;
}

var Yome = Yome || {};

Yome.initialState = () => {
  return { sides: [1, 2, 3, 4, 5, 6, 7, 8].map(() => new Object()) };
};

Yome.state = Yome.state || Yome.initialState();
//l(Yome.state)

Yome.sideCount = st => st.sides.length;
//l(Yome.sideCount(Yome.state))

Yome.sliceTheta = st => 2 * Math.PI / Yome.sideCount(st);
//l(Yome.sliceTheta(Yome.state))


Yome.rotate = (theta, point) => {
  const sint = Math.sin(theta),
        cost = Math.cos(theta);
  return { x: point.x * cost - point.y * sint,
    y: point.x * sint + point.y * cost };
};
//l(Yome.rotate(Math.PI, {x: 0, y: 1}));

Yome.radialPoint = (radius, theta) => Yome.rotate(theta, { x: 0, y: radius });
//l(Yome.radialPoint(100, Math.PI));

Yome.sidePoints = st => st.sides.map((_, i) => Yome.radialPoint(180, i * Yome.sliceTheta(st)));
//l(Yome.sidePoints(Yome.initialState()))

Yome.pointsToPointsString = points => points.map(p => p.x + "," + p.y).join(" ");
//l(Yome.pointsToPointsString(Yome.sidePoints(Yome.initialState())))

Yome.drawWalls = state => React.createElement("polygon", { points: Yome.pointsToPointsString(Yome.sidePoints(state)) });

Yome.svgWorld = children => React.createElement("svg", { height: "500", width: "500", viewBox: "-250 -250 500 500",
  preserveAspectRatio: "xMidYMid meet" }, children);

Yome.playArea = children => ReactDOM.render(Yome.svgWorld(children), document.getElementById("playarea"));

Yome.clearPlayArea = () => ReactDOM.unmountComponentAtNode(document.getElementById("playarea"));

// Yome.playArea(Yome.drawWalls({sides: [1,2,3,4,5,6,7,8,9,10]}))
// Yome.playArea(Yome.drawWalls({sides: [1,2,3,4,5,6,7]}))
// Yome.playArea(Yome.drawWalls({sides: [1,2,3,4,5,6,7,8]}))

//Yome.clearPlayArea()

Yome.windowPoints = st => {
  const theta = Yome.sliceTheta(st),
        indent = theta / 6;
  return [Yome.radialPoint(160, indent), Yome.radialPoint(160, theta - indent), Yome.radialPoint(100, theta / 2)];
};
// //l(Yome.windowPoints(Yome.initialState()))
//
Yome.drawWindow = st => React.createElement("polygon", { points: Yome.pointsToPointsString(Yome.windowPoints(st)) });
//
// Yome.playArea(<g>{Yome.drawWindow(Yome.initialState())}
// {Yome.drawWalls(Yome.initialState())}</g>)

Yome.doorPoints = st => {
  const indent = Yome.sliceTheta(st) / 8;
  return [Yome.radialPoint(165, indent), Yome.radialPoint(165, -indent), Yome.radialPoint(90, -indent), Yome.radialPoint(90, indent)];
};

Yome.drawDoor = st => React.createElement("polygon", { points: Yome.pointsToPointsString(Yome.doorPoints(st)) });

//Yome.playArea(<g>{Yome.drawDoor(Yome.state)}
//                 {Yome.drawWindow(Yome.state)}
//                 {Yome.drawWalls(Yome.state)}</g>)

Yome.drawLine = line => React.createElement("line", { x1: line.start.x, y1: line.start.y,
  x2: line.end.x, y2: line.end.y });

Yome.drawZipDoor = st => {
  const theta = Yome.sliceTheta(st),
        indent = 0.15 * (theta / 6),
        lines = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(x => {
    const dist = 170 - 10 * x;
    return { start: Yome.radialPoint(dist, -indent),
      end: Yome.radialPoint(dist, indent) };
  });
  lines.push({ start: Yome.radialPoint(180, 0),
    end: Yome.radialPoint(90, 0) });
  return React.createElement("g", null, lines.map(Yome.drawLine));
};

//Yome.playArea(<g>{Yome.drawZipDoor(Yome.state)}
//                 {Yome.drawWalls(Yome.state)}</g>)

Yome.drawStoveVent = st => {
  const theta = Yome.sliceTheta(st),
        point = Yome.radialPoint(155, 0);
  return React.createElement("ellipse", { cx: point.x, cy: point.y, rx: "14", ry: "8",
    key: "stove-vent" });
};

//Yome.playArea(<g>{Yome.drawStoveVent(Yome.state)}
//                 {Yome.drawWalls(Yome.state)}</g>)

Yome.itemRenderDispatch = {
  "window": Yome.drawWindow,
  "door-frame": Yome.drawDoor,
  "zip-door": Yome.drawZipDoor,
  "stove-vent": Yome.drawStoveVent
};

Yome.itemRender = (type, st) => (Yome.itemRenderDispatch[type] || (x => null))(st);

Yome.exampleData = (state => {
  state.sides[0].face = "window";
  state.sides[0].corner = "zip-door";
  state.sides[3].face = "window";
  state.sides[5].corner = "door-frame";
  state.sides[5].face = "window";
  state.sides[7].corner = "stove-vent";
  return state;
})(Yome.initialState());

// l(JSON.stringify(Yome.exampleData))

Yome.sliceDeg = st => 360 / Yome.sideCount(st);

Yome.sideSlice = (st, i) => {
  const side = st.sides[i];
  if (side.corner || side.face) return React.createElement("g", { transform: "rotate(" + Yome.sliceDeg(st) * i + ",0,0)" }, Yome.itemRender(side.corner, st), Yome.itemRender(side.face, st));
};

// Yome.playArea(Yome.sideSlice(Yome.exampleData, 5))
// Yome.playArea(Yome.sideSlice(Yome.exampleData, 0))

Yome.drawYome = st => React.createElement("g", { transform: "rotate(" + Yome.sliceDeg(st) / 2 + ",0,0)" }, Yome.drawWalls(st), st.sides.map((side, i) => Yome.sideSlice(st, i)));
//
//
// Yome.playArea(Yome.drawYome(Yome.exampleData))
// Yome.clearPlayArea()
//
// //side effecting
Yome.eventHandler = f => e => {
  e.preventDefault();f(e.target.value);Yome.render();
};
//
// //side effecting
Yome.changeSideCount = new_count => {
  let nArray = Array.apply(null, Array(parseInt(new_count)));
  Yome.state.sides = nArray.map((_, i) => Yome.state.sides[i] || {});
};
// Yome.changeSideCount(6)
// Yome.playArea(Yome.drawYome(Yome.state))
// Yome.changeSideCount(7)
// Yome.playArea(Yome.drawYome(Yome.exampleData))
// Yome.changeSideCount(7)
//
Yome.sideOptions = () => ["HexaYome", "SeptaYome", "OctaYome"].map((l, v) => React.createElement("option", { value: v + 6 }, l));
//
Yome.sideCountInput = st => React.createElement("div", { className: "top-control" }, React.createElement("span", null, " Size of Yome "), React.createElement("select", { onChange: Yome.eventHandler(Yome.changeSideCount),
  value: Yome.sideCount(st) }, Yome.sideOptions()));
// ReactDOM.render(Yome.sideCountInput(Yome.state),
// document.getElementById("playarea"))
// Yome.clearPlayArea()
//
Yome.worldPosition = point => ({ x: point.x + 250, y: point.y + 250 });
//
Yome.addRemoveWindow = i => _ => {
  const side = Yome.state.sides[i];
  side.face = !side.face ? "window" : null;
};

Yome.windowControl = (st, side, i) => {
  let theta = Yome.sliceTheta(st) * (i + 1),
      pos = Yome.worldPosition(Yome.radialPoint(200, theta)),
      add = !side.face;
  return React.createElement("div", { className: "control-holder", style: { top: pos.y,
      left: pos.x } }, React.createElement("a", { className: "window-control-offset " + (add ? "add" : "remove"),
    onClick: Yome.eventHandler(Yome.addRemoveWindow(i)),
    href: "#" }, add ? "+ window" : "- window"));
};

Yome.windowControls = st => st.sides.map((side, i) => Yome.windowControl(st, side, i));
//
// // --- Corner Controls
//
// // SIDE EFFECT
Yome.addRemoveCornerItem = (type, side) => _ => side.corner = side.corner ? null : type;

Yome.cornerControlStateClass = (type, corner_type) => !corner_type && "add" || corner_type == type && "remove" || "hidden";

Yome.cornerControlLink = (type, side) => React.createElement("a", { className: Yome.cornerControlStateClass(type, side.corner),
  key: type, href: "#",
  onClick: Yome.eventHandler(Yome.addRemoveCornerItem(type, side)) }, (side.corner ? "- " : "+ ") + type);

Yome.cornerControlLinks = (side, i) => ["stove-vent", "zip-door", "door-frame"].map(t => Yome.cornerControlLink(t, side));

Yome.cornerControl = (st, side, i) => {
  let theta = Yome.sliceTheta(st) * (i + 0.5),
      pos = Yome.worldPosition(Yome.radialPoint(221, theta));
  return React.createElement("div", { className: "control-holder", style: { top: pos.y, left: pos.x } }, React.createElement("div", { className: "corner-control-offset" }, Yome.cornerControlLinks(side, i)));
};

Yome.cornerControls = st => st.sides.map((side, i) => Yome.cornerControl(st, side, i));

// // --- Add new code above this line ---
//
Yome.widget = st => React.createElement("div", { className: "yome-widget" }, Yome.sideCountInput(st), React.createElement("div", { className: "yome-widget-body" }, Yome.windowControls(st), Yome.cornerControls(st), Yome.svgWorld(Yome.drawYome(st))));
//
Yome.render = () => ReactDOM.render(Yome.widget(Yome.state), document.getElementById('app'));
//
Yome.render();