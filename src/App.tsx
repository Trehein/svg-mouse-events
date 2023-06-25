import TrackMouse from './demoComponents/TrackMouse';
import MoveLineFromOrigin from './demoComponents/MoveLineFromOrigin';
import ShowBeyondRange from './demoComponents/ShowBeyondRange';
import SingleBallBounce from './demoComponents/SingleBallBounce';
import MoveMultiPath from './demoComponents/MoveMultiPath';
import FollowClickPath from './demoComponents/FollowClickPath';

function App() {
  return (
    <div className="App">
      <FollowClickPath />
      {/* <MoveMultiPath /> */}
      {/* <SingleBallBounce /> */}
      {/* <TrackMouse />
      <MoveLineFromOrigin />
      <ShowBeyondRange /> */}
    </div>
  );
}

export default App;
