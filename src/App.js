import React, { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './App.css';
import {Excalidraw} from '@excalidraw/excalidraw';
import AnimationSideBar from "./AnimationSideBar";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

function App() {
  const rectangleRef = useRef(null);
  const [showAnimations, setShowAnimations] = useState(false);
  const [elements, setElements] = useState([]);
  const excalidrawRef = useRef({ x: 100, y: 100, widthVar: 100, heightVar: 100 });
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 , botton:'up'});
  const rectObject = useRef({ x: 100, y: 100, widthVar: 100, heightVar: 100 });
  const [hoverElements, sethoverElements] = useState([]); 
  const [isAnimationSideBarOpen, setIsAnimationSideBarOpen] = useState(false);
  const [selectedElement2,setSelectedElement2] = useState(null);
  const [animationCountFlag,setAnimationCountFlag] = useState(1);
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
    // console.log(selectedAnimation);
    const element = document.querySelector('div.Stack.Stack_vertical.App-menu_top__left');
    // console.log(element);
    if (elements[elements.length - 1] !=undefined) {
      
      console.log(document.querySelector(`#${elements[elements.length-1].id}`));
    }
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
  let index=0
  // useEffect(()=>{
  //   // console.log(elements);
  //   // console.log(excalidrawRef);
  //   console.log(excalidrawAPI);
  //   console.log(elements[elements.length-1]);
  //   if (elements[elements.length-1] !=undefined && index==0) {
  //     index = index+1;
  //     console.log(index);
  //     setTimeout(()=>{gsap.to(elements[elements.length-1], { duration: 1, x: 0, y:0, backgroundColor: '#00ff00' });},[2000])
  //     // gsap.to(elements[elements.length-1], { duration: 1, x: 0, y:0, backgroundColor: '#00ff00' });
      
  //   }
    
  // },[elements])

  // const handlePointerDown = useCallback((event) => {
  //   if (excalidrawRef.current) {
  //     const api = excalidrawRef.current;
  //     const scenePointer = api.getScenePointerCoords(event);

  //     const elements = api.getSceneElements();
  //     for (const element of elements) {
  //       if (isPointInsideElement(scenePointer, element)) {
  //         console.log("Clicked element:", element);
  //         return element;
  //       }
  //     }
  //   }
  // }, []);

  // const isPointInsideElement = (point, element) => {
  //   const { x, y, width, height } = element;
  //   return (
  //     point.x >= x &&
  //     point.x <= x + width &&
  //     point.y >= y &&
  //     point.y <= y + height
  //   );
  // };

  // useEffect(() => {
  //   const excalidrawWrapper = excalidrawRef.current?.container;
  //   if (excalidrawWrapper) {
  //     excalidrawWrapper.addEventListener("pointerdown", handlePointerDown);
  //     return () => {
  //       excalidrawWrapper.removeEventListener("pointerdown", handlePointerDown);
  //     };
  //   }
  // }, [handlePointerDown]);

  let selectedElement = null;
  let rectObject1 = useRef({ x: 0, y: 0, width: 0, height: 0 });

  
  const draw = (selectedElement,x,y,width,height,backgroundColor) => {
    // selectedElement.x=selectedElement.x+50
    // selectedElement.y=selectedElement.y+50
    // selectedElement.width=selectedElement.width+50
    // selectedElement.height=selectedElement.height+50
    // selectedElement.backgroundColor='#00ff00'
    // let elements =  filterElement(selectedElement,selectedElement.x+50,selectedElement.y+50,selectedElement.width+50,selectedElement.height+50,'#00ff00')
    // let elements1 =  elements.map(element => ({
    //   ...element,
    //   x: element.x + 50,
    //   y: element.y + 50,
    //   width: element.width + 50,
    //   height: element.height + 50,
    //   backgroundColor: '#00ff00'
    // }));
    let elements1 =  elements.map(element => element.id==selectedElement.id?({
      ...element,
      x: x,
      y: y,
      width: width,
      height: height,
      backgroundColor: backgroundColor
    }):{...element});
    setElements(elements1)
    if (excalidrawAPI!=null) {
      excalidrawAPI.resetScene();
      excalidrawAPI.updateScene({
        // elements: [
        // {...selectedElement} 
        // ],
        elements: elements1
        ,
      });
    }
  };

  function getHoveredElement(x, y) {
    // Assuming you have a function or a way to get the elements in Excalidraw
    
    for (let element of elements) {
      if (isPointInsideElement(x, y, element)) {
        return element;
      }
    }
    return null;
  }
  // this function to check if a point is inside an element's bounds
  function isPointInsideElement(x, y, element) {
    return (
      x >= element.x &&
      x <= element.x + element.width &&
      y >= element.y &&
      y <= element.y + element.height
    );
  }

  const filterElement =(selectedElement,x,y,width,height,backgroundColor)=>{
    let changeElement = selectedElement;
    // console.log(x);
    changeElement.x = x;
    changeElement.y = y;
    changeElement.width = width;
    changeElement.height = height;
    changeElement.backgroundColor = backgroundColor;
    let filteredElement = elements.filter(item=> item.id !==(selectedElement.id));
    filteredElement = [...filteredElement,changeElement]
    return filteredElement;
  }

  const checkElement=(selectedElement)=>{
    if (hoverElements.length==0) {
      sethoverElements([...hoverElements, selectedElement.id])
      return true
    }
    let element = hoverElements.find((element) => {
      return element === selectedElement.id;
    })
    if (element) {
      return false
    }
    
    sethoverElements([...hoverElements, selectedElement.id])
    return true;
  }
  
  useEffect(() => {
    selectedElement= getHoveredElement(pointer.x,pointer.y)
    if (selectedElement && pointer.botton=='up') {
      if (checkElement(selectedElement)) {

        selectedElement.x= selectedElement.x + 50;
        selectedElement.y= selectedElement.y + 50;
        selectedElement.width= selectedElement.width + 50;
        selectedElement.height= selectedElement.height + 50;
        rectObject1.current.x= selectedElement.x;
        rectObject1.current.y= selectedElement.y;
        rectObject1.current.width= selectedElement.width;
        rectObject1.current.height= selectedElement.height;
        setSelectedElement2(selectedElement);
        
        gsap.to(rectObject1.current,{
          x: rectObject1.current.x,
          y: rectObject1.current.y,
          widthVar: rectObject1.current.width,
          heightVar: rectObject1.current.height,
          backgroundColor: '#00ff00', 
          duration: 3,
          // onUpdate: draw(filterElement(selectedElement,selectedElement.x+50,selectedElement.y+50,selectedElement.width+50,selectedElement.height+50,'#00ff00')),
          onUpdate: draw(selectedElement,selectedElement.x,selectedElement.y,selectedElement.width,selectedElement.height,'#00ff00'),
        });
        setIsAnimationSideBarOpen(true);
          
      }
      
    }
  }, [pointer]);


  //run animation
  const runAnimation = (timeline) => {
    if (timeline == 1) {
      gsap.to(rectObject1.current, {
        width: 400,
        height: 400,
        backgroundColor: '#qzff00', 
        duration: 2,
        // onUpdate: draw(filterElement(selectedElement2,selectedElement2.x,selectedElement2.y,400,400,'#00ff00')),
        onUpdate: draw(selectedElement2,selectedElement2.x,selectedElement2.y,400,400,'#qzff00'),
      });
    } else if (timeline == 2) {
      gsap.to(rectObject1.current, {
        x: 200,
        y: 100,
        backgroundColor: '#00ff00', 
        duration: 2,
        onUpdate: draw(selectedElement2,200,100,selectedElement2.width,selectedElement2.height,'#00ff00'),
      });
    } else {
      gsap.to(rectObject1.current, {
        x: 200,
        y: 200,
        width: 200,
        height: 200,
        backgroundColor: '#00ff00', 
        duration: 2,
        onUpdate: draw(selectedElement2,200,200,200,200,'#00ff00'),
      });
    }
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
        ref={excalidrawRef}
        excalidrawAPI={(api)=> setExcalidrawAPI(api)}
        onChange={(elements) => setElements(elements)}
        // onPointerUp={(e)=>{console.log(e);}}
        // onPointerUpdate={({ x, y }, button, pointersMap}) => {}}
        onPointerUpdate={(e) => {
          setPointer({ x: e.pointer.x, y: e.pointer.y , botton:e.button});
          console.log(e);
        }}
        
        >
          {isAnimationSideBarOpen && (
            <AnimationSideBar  runAnimation={runAnimation}/>
          )}
        </Excalidraw>
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
