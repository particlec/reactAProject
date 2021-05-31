import React, { useState, useRef } from 'react';

function Simplest() {
  let buttonDom = document.getElementById('button');
  console.log(buttonDom);

  let disX, disY;

  const [startX, setStartX] = useState(null);

  const [currX, setCurrX] = useState(0);
  const [currTop, setCurrTop] = useState(0);

  let onMoveStart = e => {
    disX = e.pageX - Math.floor(buttonDom.offsetLeft);
    disY = e.pageY - Math.floor(buttonDom.offsetTop);
    setStartX(e.clientX);
  };

  let onMouseMove = e => {
    setCurrX(e.pageX - disX);
    setCurrTop(e.pageY - disY);
    // div.style.top =  + 'px';
  };

  let onMoving = e => {
    let currX = e.clientX - startX;
    // let currX =  distance;

    const minX = 0;
    const maxX = 450;
    currX = currX < minX ? 0 : currX > maxX ? maxX : currX;
    setCurrX(currX);
  };

  let onMoveEnd = () => {
    // 将旧的固定坐标x更新,固定坐标
    // setIsMovable(false);
    // setOldX(currX);
    // 利用移动后的x轴坐标与 切割图片时的x轴比较误差
    // const isMatch = Math.abs(currX - offsetX) < 5;
    // if (isMatch) {
    //     setRunStatus(STATUS_MATCH);
    //     setCurrX(offsetX);
    //     onShowTips();
    //     // this.props.onMatch();
    // } else {
    //     setRunStatus(STATUS_ERROR);
    //     onReset();
    //     onShowTips();
    // }
    // this.props.onError();
  };

  return (
    <div
      onMouseMove={onMoving}
      onMouseLeave={onMoveEnd}
      style={{
        width: '500px',
        height: '50px',
        backgroundColor: 'green',
        position: 'relative',
      }}
    >
      <div
        id="button"
        onMouseDown={onMoveStart}
        onMouseMove={onMouseMove}
        style={{
          zIndex: '5',
          position: 'absolute',
          backgroundColor: 'red',
          width: '50px',
          height: '50px',
          left: currX + 'px',
          top: currTop + 'px',
        }}
      />
    </div>
  );
}
export default Simplest;
