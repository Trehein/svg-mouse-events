import { useEffect, useRef} from 'react';
import Matter, { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint, Composite } from 'matter-js'

const MatterExampleController = () => {

  const sceneRef = useRef<HTMLDivElement>(null); //Your div element
  const height = 600
  const width = 800
  const showVelocity = true

  useEffect(() => {
    const engine = Engine.create()
    const world = engine.world

    const render = Matter.Render.create({
      engine,
      element: sceneRef.current as HTMLDivElement,
      options: {
        width: width,
        height: height,
        showVelocity: showVelocity,
        wireframes: true,
        background: 'orange'
      }
    })

    Render.run(render)

    const runner = Runner.create()
    Runner.run(runner, engine)

    Composite.add(world, [
        // falling blocks
        Bodies.rectangle(200, 100, 60, 60, { frictionAir: 0.001 }),
        Bodies.rectangle(400, 100, 60, 60, { frictionAir: 0.05 }),
        Bodies.rectangle(600, 100, 60, 60, { frictionAir: 0.1 }),

        // walls
        Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
        Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
        Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
        Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    ])

     // add mouse control
    const mouse = Mouse.create(render.canvas)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.5,
        render: { visible: true }
      }
    })

    Composite.add(world, mouseConstraint);

    (render as Matter.Render).mouse = mouse

    // fits render viewport to the screen
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: width, y: height }
    })

    return () => {
      Render.stop(render)
      Runner.stop(runner)
      Composite.clear(world, false)
      Engine.clear(engine)

      if (mouseConstraint.mouse.element) {
        Mouse.clearSourceEvents(mouseConstraint.mouse)
      }
      render.canvas.remove()
      render.textures = {}
    }
  }, [width, height, showVelocity])




  return (
    <div ref={sceneRef} />
  )
};

export default MatterExampleController