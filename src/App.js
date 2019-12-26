import React from "react";
import css from "./App.module.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      generatedNote: null,
      hasWon: false,
      hasFailed: false
    };

    this.notes = {
      treble: [
        {
          name: "C",
          representations: ["R", "Y"]
        },
        {
          name: "D",
          representations: ["S", "Z"]
        },
        {
          name: "E",
          representations: ["T", "["]
        },
        {
          name: "F",
          representations: ["U", "\\"]
        },
        {
          name: "G",
          representations: ["V", "]"]
        },
        {
          name: "A",
          representations: ["W", "^"]
        },
        {
          name: "H",
          representations: ["X", "‰"]
        }
      ],
      bass: []
    };

    this.displayText = React.createRef();
  }

  componentDidMount = () => {
    this.newNoteGuess();
  };

  getRandomArrayItem = arr => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  // From https://github.com/daneden/animate.css (modified)
  animateCSS = (element, animationName, speed, callback) => {
    const node = element;
    node.classList.add("animated", animationName, speed);

    function handleAnimationEnd() {
      node.classList.remove("animated", animationName, speed);
      node.removeEventListener("animationend", handleAnimationEnd);

      if (typeof callback === "function") callback();
    }

    node.addEventListener("animationend", handleAnimationEnd);
  };

  newNoteGuess = () => {
    this.setState({
      hasWon: false,
      hasFailed: false
    });

    const obj = this.getRandomArrayItem(this.notes.treble);
    const note = this.getRandomArrayItem(obj.representations);

    this.setState({
      generatedNote: {
        name: obj.name,
        value: note
      }
    });
  };

  keyClickHandler = e => {
    if(this.state.hasWon) return

    const keyName = e.currentTarget.children[0].innerHTML;
    const correct = keyName === this.state.generatedNote.name ? true : false;
    const displayTextEle = this.displayText.current;

    if (!correct) {
      this.setState({
        hasFailed: true
      });

      this.animateCSS(displayTextEle, "tada", "fast")
      return;
    }

    this.setState({
      hasWon: true
    });

    this.animateCSS(displayTextEle, "bounceIn", null)

    setTimeout(() => {
      this.newNoteGuess();
    }, 2000);
  };

  render() {
    const keys = ["C", "D", "E", "F", "G", "A", "H"];
    let text = this.state.hasWon ? "Correct" : "Which note is this?";
    let textStyle = {
      color: this.state.hasWon ? "green" : "black"
    };

    if (this.state.hasFailed && !this.state.hasWon) text = "Try again";

    return (
      <div className={css.App}>
        <div className={css.displayWrapper}>
          <h1 className={css.display}>
            {this.state.generatedNote
              ? `'&====${this.state.generatedNote.value}=====!`
              : ""}
          </h1>
          <h2 style={textStyle} ref={this.displayText}>
            {text}
          </h2>
        </div>

        <div className={css.keyboard}>
          {keys.map((val, i) => {
            return (
              <div onClick={this.keyClickHandler} key={i}>
                <p>{val}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
