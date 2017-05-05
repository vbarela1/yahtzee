
import React from 'react';
import ScoreSection from './ScoreSection';
import { singles, addAllDice, staticScore } from './scoringEngine';

class ScoreCard extends React.Component {
    state = {
      scores: [
        { section: 'upper', name: 'Ones', score: null, value: 1 },
        { section: 'upper', name: 'Twos', score: null, value: 2 },
        { section: 'upper', name: 'Threes', score: null, value: 3 },
        { section: 'upper', name: 'Fours', score: null, value: 4 },
        { section: 'upper', name: 'Fives', score: null, value: 5 },
        { section: 'upper', name: 'Sixes', score: null, value: 6 },
        { section: 'lower', name: 'Three Of A Kind', score: null, addAll: true },
        { section: 'lower', name: 'Four Of A Kind', score: null, addAll: true },
        { section: 'lower', name: 'Full House', score: null },
        { section: 'lower', name: 'Low Straight', score: null },
        { section: 'lower', name: 'High Straight', score: null },
        { section: 'lower', name: 'Yahtzee', score: null },
        { section: 'lower', name: 'Chance', score: null, addAll: true }
      ]
    }

  componentDidUpdate() {
    this.checkEndGame();
  }

  checkEndGame =( ) => {
    let { score } =this.state;
    if(!score.filter( s => s.score === null).length)
      this.props.endGame();
  }

  newGame = () => {
    this.setState({ score: this.state.scores.map( s => {
      return { ...s, score: null}
      })
    })
    this.props.newGame();
  }

  updateScore = (key) => {
    this.props.resetRoll();
    let { dice } = this.props;
    let { scores } = this.state;
    let entry = scores.find( d => d.name === key );
    if (entry.value) {
      entry.score = singles(entry.value, dice);
    } else if (entry.addAll) {
      entry.score = addAllDice(entry.name, dice);
    } else {
      entry.score = staticScore(entry.name, dice);
  }

    this.setState({
      scores: this.state.scores.map( (score) => {
        if (score.name === key)
          return entry;
        return score;
      })
    });
   }

  calculateTotal = () => {
    let { scores } = this.state;
    return scores.reduce( (total, entry) => {
      let score = entry.score || 0;
      return total + score;
    }, 0);
  }

  sectionScores = (section) => {
    return this.state.scores.filter( s => s.section === section )
  }

  canScore= () => {
    return this.props.roll !== 0;
  }

  render() {
    let { scores } = this.state;
     return (
       <div>
         { this.props.startNew && <button className="btn" onClick={this.newGame}>New Game ?</button> }
         <ScoreSection
           canScore={this.canScore()}
           updateScore={this.updateScore}
           scores={this.sectionScores('upper')}
           label='Upper' />
         <ScoreSection
           canScore={this.canScore()}
           updateScore={this.updateScore}
           scores={this.sectionScores('lower')}
           label='Lower'/>
         <h5>Grand Total: {this.calculateTotal()}</h5>
       </div>
     )
  }
}

export default ScoreCard;
