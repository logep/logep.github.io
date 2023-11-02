
---
layout: default
title: V2EX Auto Sign In.md
---

// ==UserScript==
// @name         V2EX Auto Sign In
// @namespace    https://www.v2ex.com/
// @version      1.0
// @description  Automatically sign in on V2EX.
// @author       Your Name
// @match        https://www.v2ex.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Check if the "Sign In" button exists on the page
    const signInButton = document.querySelector('a:contains("Sign In")');

    if (signInButton) {
        // Click the "Sign In" button
        signInButton.click();
    }
})();

