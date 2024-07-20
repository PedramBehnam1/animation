import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './App.css';
import {Excalidraw} from '@excalidraw/excalidraw';

function App() {
  const rectangleRef = useRef(null);
  const [showAnimations, setShowAnimations] = useState(false);

  //create some animations for showing a list of them when clicking "Show Animations" button and apply each animation to a object.
  const animations = [
    { id: 'moveRight', name: 'Move Right', animation: el => gsap.to(el, { x: '+=100', duration: 1 }) },
    { id: 'scaleUp', name: 'Scale Up', animation: el => gsap.to(el, { scale: 1.5, duration: 1 }) },
    { id: 'scaleDown', name: 'Scale Down', animation: el => gsap.to(el, { scale: 0.5, duration: 1 }) },
    { id: 'rotateRightToLeft', name: 'Rotate Right To Left', animation: el => gsap.to(el, { rotation: 360, duration: 1 }) },
    { id: 'rotateLeftToRight', name: 'Rotate Left To Right', animation: el => gsap.to(el, { rotation: -360, duration: 1 }) },
    { id: 'moveLeft', name: 'Move Left', animation: el => gsap.to(el, { x: '-=100', duration: 1 }) },
  ];

  //apply each animations to a object if user selected that animation.
  const applyAnimation = (selectedAnimation) => {
    if (!selectedAnimation) return;
    console.log(selectedAnimation);
    const element = document.querySelector('div.Stack.Stack_vertical.App-menu_top__left');
    console.log(element);
    if (element) {
      selectedAnimation.animation(element);
    }
  };

  //mouseover and mouseout events for library object of excalidraw
  useEffect(()=>{
    setTimeout(()=>{
      const element = document.querySelector('div.sidebar-trigger.default-sidebar-trigger');
      element.addEventListener('mouseover', ()=>{
        gsap.to(element, { duration: 1, x: -100 , y:20, backgroundColor: '#ff0000' })
      })
      element.addEventListener('mouseout', ()=>{
        gsap.to(element, { duration: 1, x: 0 , y:0, backgroundColor: 'hsl(240 25% 94%)' })
      })

    },[300])
  },[])

  //for mouse Hover over the button "Hover over me!" applying this event
  const handleMouseOver = () => {
    gsap.to(rectangleRef.current, { duration: 1, x: 100 , y:-20, backgroundColor: '#ff0000' });
  };
  //for mouse out of the button "Hover over me!" applying this event
  const handleMouseOut = () => {
    gsap.to(rectangleRef.current, { duration: 1, x: 0, y:0, backgroundColor: '#00ff00' });
  };
  return (
    <div className="App">
      <h1>React Excalidraw GSAP Project</h1>
      <div
        ref={rectangleRef}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className="rectangle"
      >
        Hover over me!
      </div>

      <div className="toolbar">
        <button onClick={() => setShowAnimations(!showAnimations)}>
          Show Animations
        </button>
      </div>
      <div className="excalidraw-wrapper">
        <Excalidraw 
        />
      </div>
      {showAnimations && (
        <div className="sidebar">
          <h2>Animations</h2>
          <ul>
            {animations.map(animation => (
              <li key={animation.id} onClick={() => {
                applyAnimation(animation);
              }}>
                {animation.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
