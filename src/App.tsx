import React from 'react';
import TrackMouse from './TrackMouse';
import MoveLineFromOrigin from './MoveLineFromOrigin';
import ShowBeyondRange from './ShowBeyondRange';

function App() {
  return (
    <div className="App">
      <TrackMouse />
      <MoveLineFromOrigin />
      <ShowBeyondRange />
    </div>
  );
}

export default App;
