// ==UserScript==
// @name         Window Close Confirmation
// @namespace    http://your-namespace.example.com/
// @version      1.0
// @description  Prompt user confirmation before closing the window on specific domains
// @match        *://localhost/*
// @match        *://10.10.142.136/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
   var customTitle = 'c';

    // 设置初始标题
    document.title = customTitle;

    // 创建 MutationObserver 实例
    var observer = new MutationObserver(function(mutations) {
        console.log('ob......')
        mutations.forEach(function(mutation) {
            // 检查是否有变化发生在 document.title 上
              console.log('ob1......')
            console.log(mutation)
         //    if (mutation.target === document.querySelector('head title')) {
                // 重新设置标题为自定义标题
          //        console.log('ob2......')
          //      document.title = customTitle;
          //  }
             console.log('ob2......')
               // 检查是否有变化发生在 document.head
            if (mutation.target === document.head && mutation.type === 'childList') {
                 console.log('ob3......')
                // 检查 head 内是否有 title 元素
                var titleElement = document.querySelector('head title');
                if (titleElement) {
                    // 重新设置标题为自定义标题
                    document.title = customTitle;
                }
            }
        });
    });

    // 监视 document.title 的变化
   // observer.observe(document.querySelector('head title'), { subtree: true, characterData: true, childList: false });
  observer.observe(document.head, { childList: true });
    // Function to prompt the user for confirmation
    function askConfirmation(event) {
        event.preventDefault();
        event.returnValue = ''; // For modern browsers
        return 'Are you sure you want to leave this page?';
    }
console.log('Add a beforeunload event listener')
    // Add a "beforeunload" event listener
    window.addEventListener('beforeunload', function(event) {
        // Check the conditions to execute the code and ask for confirmation
        if (window.location.hostname === 'localhost' || window.location.hostname === '10.10.142.136' ) {
            return askConfirmation(event);
        }
    });
})();
