// import logo from './logo.svg';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './App.css';
import {Excalidraw} from '@excalidraw/excalidraw';

function App() {
  const rectangleRef = useRef(null);
  // const excalidrawRef = useRef(null);
  const [elements, setElements] = useState([]);

  // const handlePointerOver = useCallback(
  //   (event) => {
  //     const rectElement = elements.find(el => el.type === 'rectangle');
  //     if (rectElement) {
  //       gsap.to(`#${rectElement.id}`, { duration: 1, x: 100, fill: '#ff0000' });
  //       setElements(elements.map(el => el.id === rectElement.id ? { ...rectElement, x: rectElement.x + 100 } : el));
  //     }
  //   },
  //   [elements]
  // );
  // useEffect(()=>{
  //   // const onPointerOver = (event) => {
  //   //   const { pointerType, target } = event;
  //   //   if (pointerType === 'mouse' && target.tagName === 'svg' && elements.length > 0) {
  //   //     const rectElement = elements.find(el => el.type === 'rectangle');
  //   //     if (rectElement) {
  //   //       gsap.to(rectElement, { duration: 1, fill: '#ff0000', x: rectElement.x + 100 });
  //   //       setElements(elements.map(el => el.id === rectElement.id ? { ...rectElement, x: rectElement.x + 100, fill: '#ff0000' } : el));
  //   //     }
  //   //   }
  //   // };
  //   // if (excalidrawRef.current != null) {
  //     const svgContainer = excalidrawRef.current?.shadowRoot.querySelector('svg');
  //     if (svgContainer) {
  //       svgContainer.addEventListener('pointerover', handlePointerOver);
  //     }
  
  //     return () => {
  //       if (svgContainer) {
  //         svgContainer.removeEventListener('pointerover', handlePointerOver);
  //       }
  //     };
  //   // }
  // },[])
  // useEffect(()=>{
  //   const rectElement = elements.find(el => el.type === 'rectangle');
  //   if (rectElement) {
  //     gsap.to(rectElement.id, { duration: 1, x: 100, fill: '#ff0000' });
  //   }
    
  //   console.log(rectElement);
  // },[elements])
  // useEffect(() => {
  //   const handlePointerOver = (event) => {
  //     const target = event.target.closest('g[data-id]');
  //     if (target) {
  //       gsap.to(target, { duration: 1, x: 100, fill: '#ff0000' });
  //     }
  //   };
  //   const excalidrawDiv = excalidrawRef.current;
  //   alert(excalidrawDiv)
  //   if (excalidrawDiv) {
  //     const svg = excalidrawDiv.querySelector('svg');
  //     if (svg) {
  //       svg.addEventListener('pointerover', handlePointerOver);
  //     }
  //   }

  //   return () => {
  //     if (excalidrawDiv) {
  //       const svg = excalidrawDiv.querySelector('svg');
  //       if (svg) {
  //         svg.removeEventListener('pointerover', handlePointerOver);
  //       }
  //     }
  //   };
  // }, []);
  
  const handlePointerOver = (event) => {
    const targetId = event.target.getAttribute('data-id');
    const targetElement = elements.find(el => el.id === targetId);
    if (targetElement && targetElement.type === 'rectangle') {
      gsap.to(`#${targetId}`, { duration: 1, x: targetElement.x + 100, fill: '#ff0000' });
      setElements(elements.map(el => el.id === targetId ? { ...el, x: el.x + 100 } : el));
    }
  };
  useEffect(()=>{
    setTimeout(()=>{
      // const element = document.querySelector('div.layer-ui__wrapper__top-right.zen-mode-transition');
      const element = document.querySelector('div.sidebar-trigger.default-sidebar-trigger');
      element.addEventListener('mouseover', ()=>{
        gsap.to(element, { duration: 1, x: -100 , y:20, backgroundColor: '#ff0000' })
      })
      element.addEventListener('mouseout', ()=>{
        gsap.to(element, { duration: 1, x: 0 , y:0, backgroundColor: 'hsl(240 25% 94%)' })
      })

    },[300])
  },[])
  const handleMouseOver = () => {
    gsap.to(rectangleRef.current, { duration: 1, x: 100 , y:-20, backgroundColor: '#ff0000' });
  };

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

      <div className="excalidraw-wrapper">
        <Excalidraw 
        />
      </div>
      {/* <header className="App-header">
        <p>
          Excalidraw
        </p>
      </header> */}
    </div>
  );
}

export default App;
