import React from 'react';
import { StyledCell } from './styles/StyledCells';
import { TETROMINOS } from '../tetrisminos';

const Cell = ({ type }) => (
  <StyledCell type={type} color={TETROMINOS[type].color} />
)

export default React.memo(Cell);