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

// HwatuScore.setState = (st) => {
//   return {
//     gwang_jan: st.gwang_jan,
//     gwang_mar: st.gwang_mar,
//     gwang_aug: gwang_aug,
//     gwang_nov: gwang_nov,
//     gwang_dec: gwang_dec,
//     ribbon_jan: ribbon_jan,
//     ribbon_feb: ribbon_feb,
//     ribbon_mar: ribbon_mar,
//     ribbon_apr: ribbon_apr,
//     ribbon_may: ribbon_may,
//     ribbon_jun: ribbon_jun,
//     ribbon_jul: ribbon_jul,
//     ribbon_sep: ribbon_sep,
//     ribbon_oct: ribbon_oct,
//     ribbon_dec: ribbon_oct,
//     pi_jan_1: pi_jan_1,
//     pi_jan_2: pi_jan_2,
//     pi_feb_1: pi_feb_1,
//     pi_feb_2: pi_feb_2,
//     pi_mar_1: pi_mar_1,
//     pi_mar_2: pi_mar_2,
//     pi_apr_1: pi_apr_1,
//     pi_apr_2: pi_apr_2,
//     pi_may_1: pi_may_1,
//     pi_may_2: pi_may_2,
//     pi_jun_1: pi_jun_1,
//     pi_jun_2: 0,
//     pi_jul_1: 0,
//     pi_jul_2: 0,
//     pi_aug_1: 0,
//     pi_aug_2: 0,
//     pi_sep_1: 0,
//     pi_sep_2: 0,
//     pi_oct_1: 0,
//     pi_oct_2: 0,
//     pi_nov_1: 0,
//     pi_nov_2: 0,
//     pi_nov_3: 0,
//     pi_dec_1: 0,
//     animal_feb: 0,
//     animal_apr: 0,
//     animal_may: 0,
//     animal_jun: 0,
//     animal_aug: 0,
//     animal_sep: 0,
//     animal_oct: 0,
//     animal_dec: 0,
//     numGwang: st.numGwang,
//     numRibbon: st.numRibbon,
//     numAnimal: st.numAnimal,
//     numJunk: st.numJunk
//     //numGwang: [1, 2, 3, 4, 5, 6, 7, 8].map(() => new Object())
//   };
// };

//
HwatuScore.state = HwatuScore.state || HwatuScore.initialState();

HwatuScore.finalScore = () => {
  let st = HwatuScore.state;
  score = st.gwang_jan + st.gwang_mar + st.gwang_aug + st.gwang_nov + st.gwang_dec;

  return React.createElement(
    "section",
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
    "section",
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
      React.createElement("img", { width: "50", height: "75", src: "card.jpg", onClick: HwatuScore.eventHandler(HwatuScore.selectCard), name: "gwang_jan" }),
      React.createElement("img", { width: "50", height: "75", src: "card.jpg", onClick: HwatuScore.eventHandler(HwatuScore.selectCard), name: "gwang_mar" }),
      React.createElement("img", { width: "50", height: "75", src: "card.jpg", onClick: HwatuScore.eventHandler(HwatuScore.selectCard), name: "gwang_aug" }),
      React.createElement("img", { width: "50", height: "75", src: "card.jpg", onClick: HwatuScore.eventHandler(HwatuScore.selectCard), name: "gwang_nov" }),
      React.createElement("img", { width: "50", height: "75", src: "card.jpg", onClick: HwatuScore.eventHandler(HwatuScore.selectCard), name: "gwang_dec" })
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
  if (cardName == "gwang_jan") {
    HwatuScore.setState(st, { gwang_jan: 1 });
  } else if (cardName == "gwang_mar") {
    HwatuScore.setState(st, { gwang_mar: 1 });
  } else if (cardName == "gwang_aug") {
    HwatuScore.setState(st, { gwang_aug: 1 });
  } else if (cardName == "gwang_nov") {
    HwatuScore.setState(st, { gwang_nov: 1 });
  } else if (cardName == "gwang_dec") {
    HwatuScore.setState(st, { gwang_dec: 1 });
  }
};

HwatuScore.setState = (state, updates) => {
  Object.keys(updates).forEach(key => state[key] = updates[key]);return state;
};

HwatuScore.game = () => React.createElement(
  "div",
  null,
  HwatuScore.drawGwangCards(),
  HwatuScore.finalScore()
);

//  (e => {e.preventDefault(); f(e.target.name,e.target.value); HwatuScore.render()})

HwatuScore.render = () => ReactDOM.render(HwatuScore.game(), document.getElementById('app'));
// //
HwatuScore.render();