function l(x) {
  console.log(x);
  return x;
}

var HwatuScore = HwatuScore || {};

HwatuScore.initialState = () => {
  return {
    gwang_jan: 0,
    gwang_mar: 0,
    gwang_aug: 0,
    gwang_nov: 0,
    gwang_dec: 0,
    ribbon_jan: 0,
    ribbon_feb: 0,
    ribbon_mar: 0,
    ribbon_apr: 0,
    ribbon_may: 0,
    ribbon_jun: 0,
    ribbon_jul: 0,
    ribbon_sep: 0,
    ribbon_oct: 0,
    ribbon_dec: 0,
    pi_jan_1: 0,
    pi_jan_2: 0,
    pi_feb_1: 0,
    pi_feb_2: 0,
    pi_mar_1: 0,
    pi_mar_2: 0,
    pi_apr_1: 0,
    pi_apr_2: 0,
    pi_may_1: 0,
    pi_may_2: 0,
    pi_jun_1: 0,
    pi_jun_2: 0,
    pi_jul_1: 0,
    pi_jul_2: 0,
    pi_aug_1: 0,
    pi_aug_2: 0,
    pi_sep_1: 0,
    pi_sep_2: 0,
    pi_oct_1: 0,
    pi_oct_2: 0,
    pi_nov_1: 0,
    pi_nov_2: 0,
    pi_nov_3: 0,
    pi_dec_1: 0,
    animal_feb: 0,
    animal_apr: 0,
    animal_may: 0,
    animal_jun: 0,
    animal_jul: 0,
    animal_aug: 0,
    animal_sep: 0,
    animal_oct: 0,
    animal_dec: 0,
    numGwang: 0,
    numRibbon: 0,
    numAnimal: 0,
    numJunk: 0
    //numGwang: [1, 2, 3, 4, 5, 6, 7, 8].map(() => new Object())
  };
};

function Card(props) {
  const isSelected = HwatuScore.state[props.name];

  if (isSelected) {
    l("is Selected");
    return React.createElement("img", { width: 50 * 2, height: 75 * 2, src: "images/" + props.name + ".png", id: "selected", onMouseDown: HwatuScore.eventHandler(HwatuScore.selectCard), name: props.name });
  } else {
    l("not Selected");
    return React.createElement("img", { width: 50 * 2, height: 75 * 2, src: "images/" + props.name + ".png", id: "unselected", onMouseDown: HwatuScore.eventHandler(HwatuScore.selectCard), name: props.name });
  }
}

HwatuScore.state = HwatuScore.state || HwatuScore.initialState();

HwatuScore.finalScore = () => {
  let st = HwatuScore.state;

  var gwang_score = 0;
  var animal_score = 0;
  var animal_multiplier = 1;
  gwang_score = st.gwang_jan + st.gwang_mar + st.gwang_aug + st.gwang_nov + st.gwang_dec;

  if (gwang_score <= 2) {
    gwang_score = 0;
  } else if (gwang_score == 3 && st.gwang_dec) {
    gwang_score = 2;
  } else if (gwang_score == 5) {
    gwang_score = 15;
  }

  animal_score = st.animal_feb + st.animal_apr + st.animal_may + st.animal_jun + st.animal_jul + st.animal_aug + st.animal_sep + st.animal_oct + st.animal_dec;

  if (animal_score >= 7) {
    animal_multiplier = 2;
  }
  if (animal_score < 5) {
    animal_score = 0;
  } else {
    animal_score = animal_score - 4;
  }

  if (st.animal_feb && st.animal_apr && st.animal_aug) {
    animal_score = animal_score + 5;
  }

  ribbon_score = st.ribbon_jan + st.ribbon_feb + st.ribbon_mar + st.ribbon_apr + st.ribbon_may + st.ribbon_jun + st.ribbon_jul + st.ribbon_sep + st.ribbon_oct + st.ribbon_dec;

  if (ribbon_score < 5) {
    ribbon_score = 0;
  } else {
    ribbon_score = ribbon_score - 4;
  }

  if (st.ribbon_jan && st.ribbon_feb && st.ribbon_mar) {
    ribbon_score = ribbon_score + 3;
  }
  if (st.ribbon_apr && st.ribbon_may && st.ribbon_jul) {
    ribbon_score = ribbon_score + 3;
  }
  if (st.ribbon_jun && st.ribbon_sep && st.ribbon_oct) {
    ribbon_score = ribbon_score + 3;
  }

  pi_score = st.pi_jan_1 + st.pi_jan_2 + st.pi_feb_1 + st.pi_feb_2 + st.pi_mar_1 + st.pi_mar_2 + st.pi_apr_1 + st.pi_apr_2 + st.pi_may_1 + st.pi_may_2 + st.pi_jun_1 + st.pi_jun_2 + st.pi_jul_1 + st.pi_jul_2 + st.pi_aug_1 + st.pi_aug_2 + st.pi_sep_1 + st.pi_sep_2 + st.pi_oct_1 + st.pi_oct_2 + st.pi_nov_1 + st.pi_nov_2 + st.pi_nov_3 * 2 + st.pi_dec_1 * 2;

  if (pi_score < 10) {
    pi_score = 0;
  } else {
    pi_score = pi_score - 9;
  }

  const score = (animal_score + gwang_score + ribbon_score + pi_score) * animal_multiplier;

  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      null,
      "Score: ",
      score
    )
  );
};

HwatuScore.drawGwangCards = () => {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      { id: "one" },
      React.createElement(
        "span",
        null,
        " ",
        "Gwang".toUpperCase(),
        " "
      )
    ),
    React.createElement(
      "div",
      { id: "two" },
      React.createElement(Card, { name: "gwang_jan" }),
      React.createElement(Card, { name: "gwang_mar" }),
      React.createElement(Card, { name: "gwang_aug" }),
      React.createElement(Card, { name: "gwang_nov" }),
      React.createElement(Card, { name: "gwang_dec" })
    ),
    React.createElement(
      "div",
      { id: "clear" },
      " "
    )
  );
};
HwatuScore.drawAnimalCards = () => {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      { id: "one" },
      React.createElement(
        "span",
        null,
        " ",
        "Animal".toUpperCase(),
        " "
      )
    ),
    React.createElement(
      "div",
      { id: "two" },
      React.createElement(Card, { name: "animal_feb" }),
      React.createElement(Card, { name: "animal_apr" }),
      React.createElement(Card, { name: "animal_may" }),
      React.createElement(Card, { name: "animal_jun" }),
      React.createElement(Card, { name: "animal_jul" }),
      React.createElement(Card, { name: "animal_aug" }),
      React.createElement(Card, { name: "animal_sep" }),
      React.createElement(Card, { name: "animal_oct" }),
      React.createElement(Card, { name: "animal_dec" })
    ),
    React.createElement(
      "div",
      { id: "clear" },
      " "
    )
  );
};
HwatuScore.drawRibbonCards = () => {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      { id: "one" },
      React.createElement(
        "span",
        null,
        " ",
        "Ribbon".toUpperCase(),
        " "
      )
    ),
    React.createElement(
      "div",
      { id: "two" },
      React.createElement(Card, { name: "ribbon_jan" }),
      React.createElement(Card, { name: "ribbon_feb" }),
      React.createElement(Card, { name: "ribbon_mar" }),
      React.createElement(Card, { name: "ribbon_apr" }),
      React.createElement(Card, { name: "ribbon_may" }),
      React.createElement(Card, { name: "ribbon_jun" }),
      React.createElement(Card, { name: "ribbon_jul" }),
      React.createElement(Card, { name: "ribbon_sep" }),
      React.createElement(Card, { name: "ribbon_oct" }),
      React.createElement(Card, { name: "ribbon_dec" })
    ),
    React.createElement(
      "div",
      { id: "clear" },
      " "
    )
  );
};
HwatuScore.drawPiCards = () => {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      { id: "one" },
      React.createElement(
        "span",
        null,
        " ",
        "PI".toUpperCase(),
        " "
      )
    ),
    React.createElement(
      "div",
      { id: "two" },
      React.createElement(Card, { name: "pi_jan_1" }),
      React.createElement(Card, { name: "pi_jan_2" }),
      React.createElement(Card, { name: "pi_feb_1" }),
      React.createElement(Card, { name: "pi_feb_2" }),
      React.createElement(Card, { name: "pi_mar_1" }),
      React.createElement(Card, { name: "pi_mar_2" }),
      React.createElement(Card, { name: "pi_apr_1" }),
      React.createElement(Card, { name: "pi_apr_2" }),
      React.createElement(Card, { name: "pi_may_1" }),
      React.createElement(Card, { name: "pi_may_2" }),
      React.createElement(Card, { name: "pi_jun_1" }),
      React.createElement(Card, { name: "pi_jun_2" }),
      React.createElement(Card, { name: "pi_jul_1" }),
      React.createElement(Card, { name: "pi_jul_2" }),
      React.createElement(Card, { name: "pi_aug_1" }),
      React.createElement(Card, { name: "pi_aug_2" }),
      React.createElement(Card, { name: "pi_sep_1" }),
      React.createElement(Card, { name: "pi_sep_2" }),
      React.createElement(Card, { name: "pi_oct_1" }),
      React.createElement(Card, { name: "pi_oct_2" }),
      React.createElement(Card, { name: "pi_nov_1" }),
      React.createElement(Card, { name: "pi_nov_2" }),
      React.createElement(Card, { name: "pi_nov_3" }),
      React.createElement(Card, { name: "pi_dec_1" })
    ),
    React.createElement(
      "div",
      { id: "clear" },
      " "
    )
  );
};
HwatuScore.eventHandler = f => e => {
  e.preventDefault();f(e.target.name);HwatuScore.render();
};

HwatuScore.selectCard = cardName => {
  let st = HwatuScore.state;
  var obj = {};
  obj[cardName] = 1;
  HwatuScore.setState(st, obj);
};

HwatuScore.setState = (state, updates) => {
  Object.keys(updates).forEach(key => state[key] = !state[key]);return state;
};

HwatuScore.game = () => React.createElement(
  "div",
  { id: "main" },
  HwatuScore.drawGwangCards(),
  HwatuScore.drawRibbonCards(),
  HwatuScore.drawAnimalCards(),
  HwatuScore.drawPiCards(),
  HwatuScore.finalScore()
);

//  (e => {e.preventDefault(); f(e.target.name,e.target.value); HwatuScore.render()})

HwatuScore.render = () => ReactDOM.render(HwatuScore.game(), document.getElementById('app'));
// //
HwatuScore.render();