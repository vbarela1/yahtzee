import React from 'react';
import d1 from './images/d1.png';
import d2 from './images/d2.png';
import d3 from './images/d3.png';
import d4 from './images/d4.png';
import d5 from './images/d5.png';
import d6 from './images/d6.png';

const images = { d1, d2, d3, d4, d5, d6 }

const styles = {
  dice: {
    width: '100% ',
    cursor: 'pointer',
  },

  selected: {
    borderBottom: 'solid 2px blue',
  },
}

const Dice = ({ value, index, kept, toggleKept }) => (
  <div className='col s12 m2'>
    <img
      style={kept ? {...styles.dice, ...styles.selected} : styles.dice }
      src={images[`d${value}`]}
      onClick={ () => toggleKept(index) }
     />
 </div>
);

export default Dice;
