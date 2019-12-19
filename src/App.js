import React from "react";
import css from "./App.module.css";

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      generatedNote: null,
      hasWon: false
    }

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
  }

  componentDidMount = ()=>{
    this.newNoteGuess()
  }

  getRandomArrayItem = (arr) =>{
    return arr[Math.floor(Math.random() * arr.length)];
  }

  newNoteGuess= () => {
    this.setState({
      hasWon: false
    })

    const obj = this.getRandomArrayItem(this.notes.treble);
    const note = this.getRandomArrayItem(obj.representations);

    this.setState({
      generatedNote: {
        name: obj.name,
        value: note
      }
    })
  }

  keyClickHandler= (e)=>{
    const keyName = e.currentTarget.children[0].innerHTML;
    const correct = keyName === this.state.generatedNote.name ? true : false;

    if(correct){
      this.setState({
        hasWon: true
      })

      setTimeout(()=>{
        this.newNoteGuess()
      }, 2000)
    }
  }

  render() {
    const keys = ["C","D","E","F","G","A","H"];
    const text = this.state.hasWon? "Correct ✔" : "Which note is this?"
    const winStyle= {
      color: "green"
    }

    return (
      <div className={css.App}>
        <div className={css.displayWrapper}>
          <h1 className={css.display}>
            {this.state.generatedNote? `'&====${this.state.generatedNote.value}======` : ""}
          </h1>
        <h2 style={this.state.hasWon ? winStyle:null}>{text}</h2>
        </div>

        <div className={css.keyboard}>
          {
            keys.map((val, i)=>{
            return <div onClick={this.keyClickHandler} key={i}><p>{val}</p></div>
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
