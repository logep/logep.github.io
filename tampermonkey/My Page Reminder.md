// ==UserScript==
// @name         My Page Reminder
// @namespace    http://*.com
// @version      0.1
// @description  Display a reminder on specific pages.
// @match        *://z.com/*
// @match        *://*.zss.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    // 在页面上创建一个提示元素
    const reminderDiv = document.createElement('div');
    reminderDiv.innerHTML = '这是生产环境。';
    reminderDiv.style.position = 'fixed';
    reminderDiv.style.top = '50px';
    reminderDiv.style.width = '200px';
    reminderDiv.style.zIndex = '99999';
    reminderDiv.style.right = '10px';
    reminderDiv.style.backgroundColor = '#056b00';
    reminderDiv.style.padding = '10px';
  //  reminderDiv.style.transformOrigin = 'top left';
    reminderDiv.style.fontWeight = 'bold';  // 加粗
    reminderDiv.style.color = '#fff';  // 加粗
    reminderDiv.style.borderRadius = '4px'; // 添加圆角边框
    reminderDiv.style.boxShadow = '5px 5px 10px #ff0000'; // 添加红色阴影
reminderDiv.style.cursor = 'move'; // 鼠标样式为移动
      // 创建关闭按钮
    const closeButton = document.createElement('button');
    closeButton.textContent = '关闭';
    closeButton.addEventListener('click', function() {
        reminderDiv.style.display = 'none'; // 点击按钮时隐藏提示
    });
    reminderDiv.appendChild(closeButton);
    document.body.appendChild(reminderDiv);
    let isDragging = false;
let offsetX, offsetY;
// 尝试从本地存储中获取保存的位置


// 获取数据
const savedPosition = GM_getValue('reminderPosition');
    console.log('savedPosition',savedPosition)
if (savedPosition) {
  const [left, top] = savedPosition.split(',');
 reminderDiv.style.left = left+'px';
 reminderDiv.style.top = top+'px';
       //    reminderDiv.style.transform = `translate(${left}px, ${top}px)`;
}


// 启用拖动功能 这个是第一个方案，没有把mousemove 放在mousedown事件里
// reminderDiv.addEventListener('mousedown', function (e) {
//   isDragging = true;
//   offsetX = e.clientX - reminderDiv.getBoundingClientRect().left;
//   offsetY = e.clientY - reminderDiv.getBoundingClientRect().top;
// });
//
// reminderDiv.addEventListener('mousemove', function (e) {
//   if (isDragging) {
//     const left = e.clientX - offsetX;
//     const top = e.clientY - offsetY;
//     // 边界检查
//     const maxX = window.innerWidth - reminderDiv.offsetWidth;
//     const maxY = window.innerHeight - reminderDiv.offsetHeight;
//
//     if (left >= 0 && left <= maxX && top >= 0 && top <= maxY) {
//       reminderDiv.style.left = left + 'px';
//       reminderDiv.style.top = top + 'px';
//       // 保存当前位置到本地存储
//
//       // 存储数据
//       GM_setValue('reminderPosition', `${left},${top}`);
//       console.log('left,top',`${left},${top}`)
//     }
//   }
// });
//
// reminderDiv.addEventListener('mouseup', function () {
//   isDragging = false;
// });



    reminderDiv.addEventListener('mousedown', function (e) {
  isDragging = true;
  offsetX = e.clientX - reminderDiv.getBoundingClientRect().left;
  offsetY = e.clientY - reminderDiv.getBoundingClientRect().top;

  // 添加mousemove事件监听器
  reminderDiv.addEventListener('mousemove', onMouseMove);
});

reminderDiv.addEventListener('mouseup', function () {
  isDragging = false;

  // 移除mousemove事件监听器
  reminderDiv.removeEventListener('mousemove', onMouseMove);
});

function onMouseMove(e) {
  if (isDragging) {
        requestAnimationFrame(() => {
    const left = e.clientX - offsetX;
    const top = e.clientY - offsetY;
console.log(left,top,e.clientX,e.clientY,offsetX,offsetY)
      console.log('left,top')
    const maxX = window.innerWidth - reminderDiv.offsetWidth;
    const maxY = window.innerHeight - reminderDiv.offsetHeight;

    if (left >= 0 && left <= maxX && top >= 0 && top <= maxY) {
      reminderDiv.style.left = left + 'px';
      reminderDiv.style.top = top + 'px';
         // 计算相对于浏览器窗口的位置
       // const windowLeft = left + window.scrollX;
        //const windowTop = top + window.scrollY;
          //reminderDiv.style.transform = `translate(${windowLeft}px, ${windowTop}px)`;
      //  reminderDiv.style.transform = `translate(${left}px, ${top}px)`;
            // 存储数据
GM_setValue('reminderPosition', `${left},${top}`);
console.log('left,top',`${left},${top}`)
    }
        })
  }
}

// 鼠标离开reminderDiv时停止拖动
reminderDiv.addEventListener('mouseleave', function () {
 // isDragging = false;

  // 移除mousemove事件监听器
  // reminderDiv.removeEventListener('mousemove', onMouseMove);
});




// 防止选中文本
reminderDiv.addEventListener('selectstart', function (e) {
  e.preventDefault();
});


    console.log('page reminder')
})();
