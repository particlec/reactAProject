import imageUrl from '../icons/success.png';
import imageUrl02 from '../icons/error.png';
import logo from '../dark.png';
import React, { useState } from 'react';
import './clipTest.css';

function ClipTest02() {
  const [currX, setCurrX] = useState(0);
  let div = document.getElementById('slider-button');

  let disX, disY;
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
    let canvas = document.getElementById('tutorial');

    const ctxShadow = document.getElementById('shadowCanvas').getContext('2d');
    const ctxFragment = document
      .getElementById('fragmentCanvas')
      .getContext('2d');

    let ctx = canvas.getContext('2d');

    const styleIndex = Math.floor(Math.random() * 16);
    createClipPath(ctxShadow, 50, styleIndex);
    createClipPath(ctxFragment, 50, styleIndex);

    const clipX = 100 + 50 * Math.floor(Math.random() * 4);
    const clipY = 50 * Math.floor(Math.random() * 4);

    // positiveFeedback;
    // 让小块绘制出被裁剪的部分
    // ctx.drawImage(img, clipX, clipY, 50, 50, 0, 0, 50, 50);
    ctxFragment.drawImage(img, clipX, clipY, 50, 50, 0, 0, 50, 50);
    //

    // 让阴影canvas带上阴影效果
    ctxShadow.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctxShadow.fill();

    // 恢复画布状态
    ctxShadow.restore();
    ctxFragment.restore();

    // 随机生成裁剪图片的开始坐标

    ctx.save();
  };

  let onmouseup = e => {
    onMouseMove = null;
  };

  let onMoveStart = e => {
    disX = e.pageX - Math.floor(div.offsetLeft);
    disY = e.pageY - Math.floor(div.offsetTop);
  };

  let onMouseMove = e => {
    console.log(div);
    setCurrX(e.pageX - disX);
    // div.style.top = e.pageY - disY + 'px';
  };

  img02.src = imageUrl;
  img.src = imageUrl;
  return (
    <div
      className="image-container"
      style={{ height: 200, width: 300, backgroundImage: `url(${imageUrl})` }}
    >
      <canvas id="tutorial" width="300" height="200" style={{ zIndex: '9' }} />
      <canvas
        id="shadowCanvas"
        // ref="shadowCanvas"
        className="canvas"
        width={50}
        height={50}
        style={{ left: '0px', top: '0px' }}
      />
      <canvas
        id="fragmentCanvas"
        // ref="fragmentCanvas"
        className="canvas"
        width={50}
        height={50}
        style={{ left: '0px', top: '0px' }}
      />
      <div
        className="slider-wrpper"
        style={{ width: '500px', height: '100px', position: 'relative' }}
      >
        <div
          style={{ position: 'absolute', left: currX + 'px', top: 0 }}
          className="slider-button"
          onMouseDown={onMoveStart}
          onMouseMove={onMouseMove}
        />
      </div>
    </div>
  );
}
export default ClipTest02;
