import React from 'react';

const Player = ({ name, handleChange, handleSubmit }) => (
    <form onSubmit={ handleSubmit }>
      <label>Name:</label>
      <input
        onChange={ handleChange }
        value={ name }
        required
      />
    </form>
);

export default Player;
