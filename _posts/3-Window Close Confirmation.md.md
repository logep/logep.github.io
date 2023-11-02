
---
layout: default
title: Window Close Confirmation.md
---

// ==UserScript==
// @name         Window Close Confirmation
// @namespace    http://your-namespace.example.com/
// @version      1.0
// @description  Prompt user confirmation before closing the window on specific domains
// @match        *://localhost/*
// @match        *://10.10.142.136/*
// @match        *://e.test.ztosys.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

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
        if (window.location.hostname === 'localhost' || window.location.hostname === '10.10.142.136' || window.location.hostname === 'e.test.ztosys.com') {
            return askConfirmation(event);
        }
    });
})();

