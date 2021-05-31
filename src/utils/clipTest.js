import imageUrl from '../icons/success.png';
import imageUrl02 from '../icons/error.png';
import logo from '../dark.png';
import React, { useState } from 'react';

const icoSuccess = require('../icons/success.png');
const icoError = require('../icons/error.png');
const icoReload = require('../icons/reload.png');
const icoSlider = require('../icons/slider.png');

const STATUS_LOADING = 0; // 还没有图片
const STATUS_READY = 1; // 图片渲染完成,可以开始滑动
const STATUS_MATCH = 2; // 图片位置匹配成功
const STATUS_ERROR = 3; // 图片位置匹配失败

const arrTips = [
  { ico: icoSuccess, text: '匹配成功' },
  { ico: icoError, text: '匹配失败' },
];

function ClipTest() {
  const [isMovable, setIsMovable] = useState(true);
  const [startX, setStartX] = useState(null);
  const [currX, setCurrX] = useState(0);
  const [currTop, setCurrTop] = useState(0);
  //裁剪的位置
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [oldX, setOldX] = useState(0);
  const [runStatus, setRunStatus] = useState(STATUS_LOADING);

  const [showTips, setShowTips] = useState(false);
  const [tipsIndex, setTipsIndex] = useState(0);
  const [clipY, setClipY] = useState(0);
  const [clipX, setClipX] = useState(0);

  let buttonDom = document.getElementById('slider-button');

  let disX;
  let disY;

  let img = new Image();
  let img02 = new Image();

  // 生成裁剪路径 剪一个平图
  function createClipPath(ctx, size = 100, styleIndex = 0) {
    const styles = [
      [0, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 1, 0],
      [0, 0, 1, 1],
      [0, 1, 0, 0],
      [0, 1, 0, 1],
      [0, 1, 1, 0],
      [0, 1, 1, 1],
      [1, 0, 0, 0],
      [1, 0, 0, 1],
      [1, 0, 1, 0],
      [1, 0, 1, 1],
      [1, 1, 0, 0],
      [1, 1, 0, 1],
      [1, 1, 1, 0],
      [1, 1, 1, 1],
    ];
    const style = styles[styleIndex];

    const r = 0.1 * size;
    ctx.save();
    ctx.beginPath();
    // left
    ctx.moveTo(r, r);
    ctx.lineTo(r, 0.5 * size - r);
    ctx.arc(r, 0.5 * size, r, 1.5 * Math.PI, 0.5 * Math.PI, style[0]);
    ctx.lineTo(r, size - r);
    // bottom
    ctx.lineTo(0.5 * size - r, size - r);
    ctx.arc(0.5 * size, size - r, r, Math.PI, 0, style[1]);
    ctx.lineTo(size - r, size - r);
    // right
    ctx.lineTo(size - r, 0.5 * size + r);
    ctx.arc(size - r, 0.5 * size, r, 0.5 * Math.PI, 1.5 * Math.PI, style[2]);
    ctx.lineTo(size - r, r);
    // top
    ctx.lineTo(0.5 * size + r, r);
    ctx.arc(0.5 * size, r, r, 0, Math.PI, style[3]);
    ctx.lineTo(r, r);

    ctx.clip();
    ctx.closePath();
  }

  window.onload = function (e) {
    // let canvas = document.getElementById('tutorial');

    const ctxShadow = document.getElementById('shadowCanvas').getContext('2d');
    const ctxFragment = document
      .getElementById('fragmentCanvas')
      .getContext('2d');

    // let ctx = canvas.getContext('2d');

    const styleIndex = Math.floor(Math.random() * 16);
    createClipPath(ctxShadow, 52, styleIndex);
    createClipPath(ctxFragment, 50, styleIndex);

    const clipX = 100 + 50 * Math.floor(Math.random() * 4);
    const clipY = 50 * Math.floor(Math.random() * 4);

    setClipY(clipY);
    setClipX(clipX);

    console.log(clipX);
    console.log(clipY);
    // 让小块绘制出被裁剪的部分
    // ctx.drawImage(img, clipX, clipY, 50, 50, 0, 0, 50, 50);
    ctxFragment.drawImage(img, clipX, clipY, 50, 50, 0, clipY, 50, 50);

    // 让阴影canvas带上阴影效果
    ctxShadow.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctxShadow.fill();

    // // 恢复画布状态
    ctxShadow.restore();
    ctxFragment.restore();

    setOffsetX(clipX);
    setOffsetY(clipY);

    // 修改状态
    setRunStatus(STATUS_READY);
  };
  img02.src = imageUrl;
  img.src = imageUrl;

  const onMoveStart = e => {
    // if (runStatus !== STATUS_READY) {
    //   return;
    // }

    disX = e.pageX - Math.floor(buttonDom.offsetLeft);
    disY = e.pageY - Math.floor(buttonDom.offsetTop);

    // 记录滑动开始时的绝对坐标x
    setIsMovable(true);
    console.log(e.clientX);
    setStartX(e.clientX);
  };

  // 就是提交 滑动的x的绝对坐标，小于0 等于0，大于框，等于最大值
  const onMoving = e => {
    // if (runStatus !== STATUS_READY || !isMovable) {
    //   return;
    // }
    let currX = e.clientX - startX;

    const minX = 0;
    const maxX = 250;
    currX = currX < minX ? 0 : currX > maxX ? maxX : currX;
    setCurrX(currX);
  };

  let onMouseMove = e => {
    setCurrX(e.pageX - disX);
    setCurrTop(e.pageY - disY);
    // div.style.top =  + 'px';
  };

  const onMoveEnd = () => {
    if (runStatus !== STATUS_READY || !isMovable) {
      return;
    }
    // 将旧的固定坐标x更新,固定坐标
    setIsMovable(false);
    setOldX(currX);

    // 利用移动后的x轴坐标与 切割图片时的x轴比较误差
    const isMatch = Math.abs(currX - offsetX) < 5;
    if (isMatch) {
      setRunStatus(STATUS_MATCH);
      setCurrX(offsetX);
      onShowTips();
      // this.props.onMatch();
    } else {
      setRunStatus(STATUS_ERROR);
      onReset();
      onShowTips();
    }
    // this.props.onError();
  };

  const onReset = () => {
    const timer = setTimeout(() => {
      setOldX(0);
      setCurrX(0);
      setRunStatus(STATUS_READY);
      clearTimeout(timer);
    }, 1000);
  };

  const onShowTips = () => {
    if (showTips) {
      return;
    }
    const tipsIndex = runStatus === STATUS_MATCH ? 0 : 1;
    setShowTips(true);
    setTipsIndex(tipsIndex);

    const timer = setTimeout(() => {
      setShowTips(false);
      clearTimeout(timer);
    }, 2000);
  };

  return (
    <div>
      <div
        className="image-container"
        style={{ height: 200, width: 300, backgroundImage: `url(${imageUrl})` }}
      >
        {/*<canvas*/}
        {/*  id="tutorial"*/}
        {/*  width="300"*/}
        {/*  height="200"*/}
        {/*  style={{ zIndex: '9' }}*/}
        {/*/>*/}
        <canvas
          id="shadowCanvas"
          // ref="shadowCanvas"
          className="canvas"
          width={50}
          height={50}
          style={{ top: clipY + 'px', left: clipX + 'px' }}
          // style={{ left: offsetX + 'px', top: offsetY + 'px' }}
        />
        <canvas
          id="fragmentCanvas"
          // ref="fragmentCanvas"
          className="canvas"
          width={50}
          height={50}
          // style={{ zIndex: '9' }}
          style={{ top: 0 + 'px', left: 0 + 'px' }}
        />
      </div>

      <div
        style={{
          width: '300px',
          height: '50px',
          backgroundColor: 'white',
          position: 'relative',
        }}
        className="slider-wrpper"
        onMouseMove={onMoving}
        // onMouseLeave={onMoveEnd}
      >
        <div className="slider-bar">按住滑块，拖动完成拼图</div>
        <div
          id="slider-button"
          onMouseDown={onMoveStart}
          onMouseMove={onMouseMove}
          // onMouseUp={onMoveEnd}
          style={{
            zIndex: '5',
            position: 'absolute',
            backgroundColor: 'buttonface',
            width: '50px',
            height: '50px',
            left: currX + 'px',
            top: currTop + 'px',
            // backgroundImage: `url("${icoSlider}")`,
          }}
        />
      </div>
    </div>
  );
}
export default ClipTest;
