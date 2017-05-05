import React from 'react';

const ScoreRow = ({ name, score, updateScore, canScore}) => (
  <li className="collection-item">
    <div>
      {name}
      { score !== null ?
          <span className="secondary-content">{score}</span>
          :
          <i style={styles.icon}
            onClick={ canScore ? () => updateScore(name) : f => f }
            className="secondary-content material-icons">
              play_circle_filled
          </i>
      }
    </div>
  </li>
)

const styles = {
  icon: {
    cursor: 'pointer'
  }
}

export default ScoreRow;
