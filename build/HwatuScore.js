function l(x) {
  console.log(x);
  return x;
}

var HwatuScore = HwatuScore || {};

HwatuScore.initialState = () => {
  return {
    numGwang: 0,
    numRibbon: 0,
    numAnimal: 0,
    numJunk: 0
    //numGwang: [1, 2, 3, 4, 5, 6, 7, 8].map(() => new Object())
  };
};

HwatuScore.setState = st => {
  return {
    numGwang: st.numGwang,
    numRibbon: st.numRibbon,
    numAnimal: st.numAnimal,
    numJunk: st.numJunk
    //numGwang: [1, 2, 3, 4, 5, 6, 7, 8].map(() => new Object())
  };
};

//
HwatuScore.state = HwatuScore.state || HwatuScore.initialState();

HwatuScore.finalScore = () => {
  let st = HwatuScore.state;
  score = st.numGwang + st.numAnimal + st.numRibbon + st.numJunk;

  return React.createElement(
    "div",
    null,
    "Score: ",
    score
  );
};

HwatuScore.sideOptions = num => Array.apply(null, Array(num + 1)).map((l, v) => React.createElement(
  "option",
  { value: v },
  v
));

HwatuScore.sideCountInput = (cardType, cardCount) => React.createElement(
  "div",
  null,
  React.createElement(
    "span",
    null,
    " Number of ",
    cardType,
    " "
  ),
  React.createElement(
    "select",
    { onChange: HwatuScore.eventHandler(HwatuScore.changeCardCount), name: cardType },
    HwatuScore.sideOptions(cardCount)
  )
);

HwatuScore.game = () => React.createElement(
  "div",
  null,
  HwatuScore.sideCountInput("gwang", 5),
  HwatuScore.sideCountInput("animal", 10),
  HwatuScore.sideCountInput("ribbon", 5),
  HwatuScore.sideCountInput("junk", 5),
  HwatuScore.finalScore()
);

HwatuScore.changeCardCount = (cardType, numCard) => {
  let st = HwatuScore.state;
  if (cardType == "gwang") {
    st.numGwang = parseInt(numCard);
  } else if (cardType == "ribbon") {
    st.numRibbon = parseInt(numCard);
  } else if (cardType == "animal") {
    st.numAnimal = parseInt(numCard);
  } else if (cardType == "junk") {
    st.numJunk = parseInt(numCard);
  }
  HwatuScore.state = st;
};

HwatuScore.eventHandler = f => e => {
  e.preventDefault();f(e.target.name, e.target.value);HwatuScore.render();
};

HwatuScore.render = () => ReactDOM.render(HwatuScore.game(), document.getElementById('app'));
// //
HwatuScore.render();