import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino } from '../tetrisminos';
import { STAGE_WIDTH, checkCollision } from '../gameHelpers';

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const rotate = ( matrix, dir ) => {
    const rotatedMatrix = matrix.map((_, index) => matrix.map(col => col[index]),);

    if ( dir > 0 ) return rotatedMatrix.map( row => row.reverse() );
    return rotatedMatrix.reverse();
  }

  const playerRotate = ( stage, dir ) => {
    const playerCopy = JSON.parse(JSON.stringify(player));
    playerCopy.tetromino = rotate( playerCopy.tetromino, dir);

    const pos = playerCopy.pos.x;
    let offset = 1;

    while( checkCollision( playerCopy, stage, {x: 0, y: 0}) ){
        playerCopy.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1 ));
        if( offset > playerCopy.tetromino[0].length){
            rotate(playerCopy.tetromino, -dir);
            playerCopy.pos.x = pos;
            return;
        }
    } 

    setPlayer( playerCopy);
  }

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y)},
      collided,
    }))
  }

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    })
  }, [])

  return [player, updatePlayerPos, resetPlayer, playerRotate];
}