// import TrackMouse from './demoComponents/TrackMouse';
// import MoveLineFromOrigin from './demoComponents/MoveLineFromOrigin';
// import ShowBeyondRange from './demoComponents/ShowBeyondRange';
// import SingleBallBounce from './demoComponents/SingleBallBounce';
// import MoveMultiPath from './demoComponents/MoveMultiPath';
// import AnimatedPathController from './demoComponents/AnimatedPath/AnimatedPathController';
// import { BallMoveAlongPathController } from './demoComponents/BallMoveAlongPath/BallMoveAlongPathController';
// import CollisionClusterController from './demoComponents/D3Force/CollisionCluster/CollisionClusterController';
// import WaterColorBlur from './demoComponents/WaterColorBlur/WaterColorBlur';
// import PointsOnARadius from './demoComponents/PointsOnARadius';
// import AnySidedPolygonLines from './demoComponents/AnySidedPolygonLines';
// import WaterColorBlurV2 from './demoComponents/WaterColorBlur/WaterColorBlurV2';
// import WaterColorBlurV3 from './demoComponents/WaterColorBlur/WaterColorBlurV3';
// import WaterColorBlurV4 from './demoComponents/WaterColorBlur/WaterColorBlurV4';
// import FollowClickPath from "./demoComponents/FollowClickPath";
// import DragToSlotController from "./demoComponents/DragToSlot/DragToSlotController";
// import FiscalDatePickerController from "./demoComponents/FiscalDatePicker/FiscalDatePickerController";
// import OverlappingRadarChartController from "./demoComponents/OverlappingRadarChart/OverlappingRadarChartController";
// import VisxRadarChart from "./demoComponents/VisxRadarChart/VisxRadarChart";
// import Controller from "./demoComponents/LinkedStackedHistogram/Controller";
// import SliderSelector from "./demoComponents/SliderSelector/SliderSelector";
// import AnimatedDisplayCase from "./demoComponents/AnimatedDisplayCase/AnimatedDisplayCase";
// import Controller from "./demoComponents/IconRotator/Controller";
// import Controller from "./demoComponents/IconPopEffect/Controller";
// import Controller from './demoComponents/IconColorMorph/Controller'
// import WordRoller from "./demoComponents/WordRoller/WordRoller";

import Heatmap from "./demoComponents/Heatmap/Heatmap";
const demoData = Array.from({ length: 42 }, (_, i) => ({
  date: `2024-08-${String(i + 1).padStart(2, '0')}`,
  count: Math.floor(Math.random() * 2000) - 1000,
  hours: Math.floor(Math.random() * 200) - 100,
}))

function App() {
  return (
    <div className="App">
      {/* <AnimatedDisplayCase /> */}
      {/* <BallMoveAlongPathController /> */}
      {/* <AnimatedPathController /> */}
      {/* <SliderSelector /> */}
      {/* <CollisionClusterController /> */}
      {/* <FollowClickPath /> */}
      {/* <MoveMultiPath /> */}
      {/* <SingleBallBounce /> */}
      {/* <TrackMouse /> */}
      {/* <MoveLineFromOrigin /> */}
      {/* <ShowBeyondRange /> */}
      {/* <WaterColorBlurV2 /> */}
      {/* <WaterColorBlurV3 /> */}
      {/* <WaterColorBlurV4 /> */}
      {/* <PointsOnARadius /> */}
      {/* <AnySidedPolygonLines /> */}
      {/* <DragToSlotController /> */}
      {/* <FiscalDatePickerController /> */}
      {/* <OverlappingRadarChartController /> */}
      {/* <VisxRadarChart width={600} height={600} /> */}
      {/* <Controller /> */}
      {/* <WordRoller /> */}
      <div style={{height: 600, width: 600}}>
        <Heatmap titleText={"August Heatmap"} data={demoData} valueAccessKey={'count'} />
      </div>
    </div>
  );
}

export default App;
