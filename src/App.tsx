import TrackMouse from './demoComponents/TrackMouse';
import MoveLineFromOrigin from './demoComponents/MoveLineFromOrigin';
import ShowBeyondRange from './demoComponents/ShowBeyondRange';
import SingleBallBounce from './demoComponents/SingleBallBounce';
import MoveMultiPath from './demoComponents/MoveMultiPath';
import AnimatedPathController from './demoComponents/AnimatedPath/AnimatedPathController';
import CollisionClusterController from './demoComponents/D3Force/CollisionCluster/CollisionClusterController';
import WaterColorBlur from './demoComponents/WaterColorBlur/WaterColorBlur';
import PointsOnARadius from './demoComponents/PointsOnARadius';
import AnySidedPolygonLines from './demoComponents/AnySidedPolygonLines';
import WaterColorBlurV2 from './demoComponents/WaterColorBlur/WaterColorBlurV2';

function App() {
  return (
    <div className="App">
      {/* <AnimatedPathController /> */}
      {/* <CollisionClusterController /> */}
      {/* <FollowClickPath /> */}
      {/* <MoveMultiPath /> */}
      {/* <SingleBallBounce /> */}
      {/* <TrackMouse /> */}
      {/* <MoveLineFromOrigin /> */}
      {/* <ShowBeyondRange /> */}
      <WaterColorBlurV2 />
      {/* <PointsOnARadius /> */}
      {/* <AnySidedPolygonLines /> */}
    </div>
  );
}

export default App;
