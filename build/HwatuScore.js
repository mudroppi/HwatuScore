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

var HwatuScore = HwatuScore || {};

HwatuScore.initialState = () => {
  return { sides: [1, 2, 3, 4, 5, 6, 7, 8].map(() => new Object()) };
};

HwatuScore.state = HwatuScore.state || HwatuScore.initialState();
//l(HwatuScore.state)

HwatuScore.sideCount = st => st.sides.length;
//l(HwatuScore.sideCount(HwatuScore.state))

HwatuScore.tally = st => {
  var numSuit = st.sides.length + 1;
  var score = 0;
  if (numSuit == 2) {
    score = 2;
  } else if (numSuit == 3) {
    score = 3;
  } else if (numSuit == 4) {
    score = 4;
  } else if (numSuit == 5) {
    score = 5;
  }
  return score;
};

HwatuScore.sliceTheta = st => 2 * Math.PI / HwatuScore.sideCount(st);
//l(HwatuScore.sliceTheta(HwatuScore.state))


HwatuScore.rotate = (theta, point) => {
  const sint = Math.sin(theta),
        cost = Math.cos(theta);
  return { x: point.x * cost - point.y * sint,
    y: point.x * sint + point.y * cost };
};
//l(HwatuScore.rotate(Math.PI, {x: 0, y: 1}));

HwatuScore.radialPoint = (radius, theta) => HwatuScore.rotate(theta, { x: 0, y: radius });
//l(HwatuScore.radialPoint(100, Math.PI));

HwatuScore.sidePoints = st => st.sides.map((_, i) => HwatuScore.radialPoint(180, i * HwatuScore.sliceTheta(st)));
//l(HwatuScore.sidePoints(HwatuScore.initialState()))

HwatuScore.pointsToPointsString = points => points.map(p => p.x + "," + p.y).join(" ");
//l(HwatuScore.pointsToPointsString(HwatuScore.sidePoints(HwatuScore.initialState())))

HwatuScore.drawWalls = state => React.createElement("polygon", { points: HwatuScore.pointsToPointsString(HwatuScore.sidePoints(state)) });

HwatuScore.svgWorld = children => React.createElement("svg", { height: "500", width: "500", viewBox: "-250 -250 500 500",
  preserveAspectRatio: "xMidYMid meet" }, children);

HwatuScore.playArea = children => ReactDOM.render(HwatuScore.svgWorld(children), document.getElementById("playarea"));

HwatuScore.clearPlayArea = () => ReactDOM.unmountComponentAtNode(document.getElementById("playarea"));

// HwatuScore.playArea(HwatuScore.drawWalls({sides: [1,2,3,4,5,6,7,8,9,10]}))
// HwatuScore.playArea(HwatuScore.drawWalls({sides: [1,2,3,4,5,6,7]}))
// HwatuScore.playArea(HwatuScore.drawWalls({sides: [1,2,3,4,5,6,7,8]}))

//HwatuScore.clearPlayArea()

HwatuScore.windowPoints = st => {
  const theta = HwatuScore.sliceTheta(st),
        indent = theta / 6;
  return [HwatuScore.radialPoint(160, indent), HwatuScore.radialPoint(160, theta - indent), HwatuScore.radialPoint(100, theta / 2)];
};
// //l(HwatuScore.windowPoints(HwatuScore.initialState()))
//
HwatuScore.drawWindow = st => React.createElement("polygon", { points: HwatuScore.pointsToPointsString(HwatuScore.windowPoints(st)) });
//
// HwatuScore.playArea(<g>{HwatuScore.drawWindow(HwatuScore.initialState())}
// {HwatuScore.drawWalls(HwatuScore.initialState())}</g>)

HwatuScore.doorPoints = st => {
  const indent = HwatuScore.sliceTheta(st) / 8;
  return [HwatuScore.radialPoint(165, indent), HwatuScore.radialPoint(165, -indent), HwatuScore.radialPoint(90, -indent), HwatuScore.radialPoint(90, indent)];
};

HwatuScore.drawDoor = st => React.createElement("polygon", { points: HwatuScore.pointsToPointsString(HwatuScore.doorPoints(st)) });

//HwatuScore.playArea(<g>{HwatuScore.drawDoor(HwatuScore.state)}
//                 {HwatuScore.drawWindow(HwatuScore.state)}
//                 {HwatuScore.drawWalls(HwatuScore.state)}</g>)

HwatuScore.drawLine = line => React.createElement("line", { x1: line.start.x, y1: line.start.y,
  x2: line.end.x, y2: line.end.y });

HwatuScore.drawZipDoor = st => {
  const theta = HwatuScore.sliceTheta(st),
        indent = 0.15 * (theta / 6),
        lines = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(x => {
    const dist = 170 - 10 * x;
    return { start: HwatuScore.radialPoint(dist, -indent),
      end: HwatuScore.radialPoint(dist, indent) };
  });
  lines.push({ start: HwatuScore.radialPoint(180, 0),
    end: HwatuScore.radialPoint(90, 0) });
  return React.createElement("g", null, lines.map(HwatuScore.drawLine));
};

//HwatuScore.playArea(<g>{HwatuScore.drawZipDoor(HwatuScore.state)}
//                 {HwatuScore.drawWalls(HwatuScore.state)}</g>)

HwatuScore.drawStoveVent = st => {
  const theta = HwatuScore.sliceTheta(st),
        point = HwatuScore.radialPoint(155, 0);
  return React.createElement("ellipse", { cx: point.x, cy: point.y, rx: "14", ry: "8",
    key: "stove-vent" });
};

//HwatuScore.playArea(<g>{HwatuScore.drawStoveVent(HwatuScore.state)}
//                 {HwatuScore.drawWalls(HwatuScore.state)}</g>)

HwatuScore.itemRenderDispatch = {
  "window": HwatuScore.drawWindow,
  "door-frame": HwatuScore.drawDoor,
  "zip-door": HwatuScore.drawZipDoor,
  "stove-vent": HwatuScore.drawStoveVent
};

HwatuScore.itemRender = (type, st) => (HwatuScore.itemRenderDispatch[type] || (x => null))(st);

HwatuScore.exampleData = (state => {
  state.sides[0].face = "window";
  state.sides[0].corner = "zip-door";
  state.sides[3].face = "window";
  state.sides[5].corner = "door-frame";
  state.sides[5].face = "window";
  state.sides[7].corner = "stove-vent";
  return state;
})(HwatuScore.initialState());

// l(JSON.stringify(HwatuScore.exampleData))

HwatuScore.sliceDeg = st => 360 / HwatuScore.sideCount(st);

HwatuScore.sideSlice = (st, i) => {
  const side = st.sides[i];
  if (side.corner || side.face) return React.createElement("g", { transform: "rotate(" + HwatuScore.sliceDeg(st) * i + ",0,0)" }, HwatuScore.itemRender(side.corner, st), HwatuScore.itemRender(side.face, st));
};

// HwatuScore.playArea(HwatuScore.sideSlice(HwatuScore.exampleData, 5))
// HwatuScore.playArea(HwatuScore.sideSlice(HwatuScore.exampleData, 0))

HwatuScore.drawHwatuScore = st => React.createElement("g", { transform: "rotate(" + HwatuScore.sliceDeg(st) / 2 + ",0,0)" }, HwatuScore.drawWalls(st), st.sides.map((side, i) => HwatuScore.sideSlice(st, i))
//st.sideCount
);
//
//
// HwatuScore.playArea(HwatuScore.drawHwatuScore(HwatuScore.exampleData))
// HwatuScore.clearPlayArea()
//
// //side effecting
HwatuScore.eventHandler = f => e => {
  e.preventDefault();f(e.target.value).render();
};
//
// //side effecting
HwatuScore.changeSideCount = new_count => {
  let nArray = Array.apply(null, Array(parseInt(new_count)));
  HwatuScore.state.sides = nArray.map((_, i) => HwatuScore.state.sides[i] || {});
};
// HwatuScore.changeSideCount(6)
// HwatuScore.playArea(HwatuScore.drawHwatuScore(HwatuScore.state))
// HwatuScore.changeSideCount(7)
// HwatuScore.playArea(HwatuScore.drawHwatuScore(HwatuScore.exampleData))
// HwatuScore.changeSideCount(7)
//
HwatuScore.sideOptions = () => ["1", "2", "3", "4", "5"].map((l, v) => React.createElement("option", { value: v }, l));
//
HwatuScore.sideCountInput = st => React.createElement("div", { className: "top-control" }, React.createElement("span", null, " Gwang "), React.createElement("select", { onChange: HwatuScore.eventHandler(HwatuScore.changeSideCount),
  value: HwatuScore.sideCount(st) }, HwatuScore.sideOptions()));
// ReactDOM.render(HwatuScore.sideCountInput(HwatuScore.state),
// document.getElementById("playarea"))
// HwatuScore.clearPlayArea()
//
HwatuScore.worldPosition = point => ({ x: point.x + 250, y: point.y + 250 });
//
HwatuScore.addRemoveWindow = i => _ => {
  const side = HwatuScore.state.sides[i];
  side.face = !side.face ? "window" : null;
};

HwatuScore.windowControl = (st, side, i) => {
  let theta = HwatuScore.sliceTheta(st) * (i + 1),
      pos = HwatuScore.worldPosition(HwatuScore.radialPoint(200, theta)),
      add = !side.face;
  return React.createElement("div", { className: "control-holder", style: { top: pos.y,
      left: pos.x } }, React.createElement("a", { className: "window-control-offset " + (add ? "add" : "remove"),
    onClick: HwatuScore.eventHandler(HwatuScore.addRemoveWindow(i)),
    href: "#" }, add ? "+ window" : "- window"));
};

HwatuScore.windowControls = st => st.sides.map((side, i) => HwatuScore.windowControl(st, side, i));
//
// // --- Corner Controls
//
// // SIDE EFFECT
HwatuScore.addRemoveCornerItem = (type, side) => _ => side.corner = side.corner ? null : type;

HwatuScore.cornerControlStateClass = (type, corner_type) => !corner_type && "add" || corner_type == type && "remove" || "hidden";

HwatuScore.cornerControlLink = (type, side) => React.createElement("a", { className: HwatuScore.cornerControlStateClass(type, side.corner),
  key: type, href: "#",
  onClick: HwatuScore.eventHandler(HwatuScore.addRemoveCornerItem(type, side)) }, (side.corner ? "- " : "+ ") + type);

HwatuScore.cornerControlLinks = (side, i) => ["stove-vent", "zip-door", "door-frame"].map(t => HwatuScore.cornerControlLink(t, side));

HwatuScore.cornerControl = (st, side, i) => {
  let theta = HwatuScore.sliceTheta(st) * (i + 0.5),
      pos = HwatuScore.worldPosition(HwatuScore.radialPoint(221, theta));
  return React.createElement("div", { className: "control-holder", style: { top: pos.y, left: pos.x } }, React.createElement("div", { className: "corner-control-offset" }, HwatuScore.cornerControlLinks(side, i)));
};

HwatuScore.cornerControls = st => st.sides.map((side, i) => HwatuScore.cornerControl(st, side, i));

// // --- Add new code above this line ---
//
HwatuScore.widget = st => React.createElement("div", { className: "HwatuScore-widget" }, HwatuScore.sideCountInput(st), React.createElement("div", { className: "HwatuScore-widget-body" },
//HwatuScore.windowControls(st),
//HwatuScore.cornerControls(st),
//HwatuScore.svgWorld(HwatuScore.drawHwatuScore(st))
//HwatuScore.sideCount(st)
HwatuScore.tally(st)));
//
HwatuScore.render = () => ReactDOM.render(HwatuScore.widget(HwatuScore.state), document.getElementById('app'));
//
HwatuScore.render();