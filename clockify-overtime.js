// ==UserScript==
// @name         clockify-overtime-calculator
// @namespace    clockify
// @version      0.1
// @description  Shows the amount of overtime a worker has acquired throughout the year.
//               This script does only work, when the pauses are not tracked, because otherwise we cannot assume that a working day is 8 hours long.
// @author       Valefant
// @require      https://code.jquery.com/jquery-1.12.4.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @match        https://clockify.me/reports*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function () {
    'use strict';

    // See: https://stackoverflow.com/questions/12897446/userscript-to-wait-for-page-to-load-before-executing-code-techniques/49537044#49537044
    const waitFor = (...selectors) => new Promise(resolve => {
        const delay = 500
        const f = () => {
            const elements = selectors.map(selector => document.querySelector(selector))
            if (elements.every(element => element != null)) {
                resolve(elements)
            } else {
                setTimeout(f, delay)
            }
        }
        f()
    })

    // because of ajax, we need to wait before we can access the dom element
    waitFor('.cl-reports-summary-table-col-2-1').then(([_]) => {
        const displayOvertimeBtn = htmlToElement(`<div class="cl-pl-0 cl-d-flex cl-align-items-center cl-mr-2"><button class="cl-btn-primary" style="padding: 0.25em">Überstunden Berechnen</button></div>`)
        displayOvertimeBtn.addEventListener("click", displayOvertime)
        document.querySelector("summary-group-header.cl-card-header > div > div").appendChild(displayOvertimeBtn)
    })
})();

/**
 * See: https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro/35385518#35385518
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
    const template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

function displayOvertime() {
    const overtimeInMinutes = [...document.querySelectorAll('.cl-reports-summary-table-col-2-1')].slice(1).map(e => {
        const [hour, minutes] = e.innerHTML.split(":")
        const timeToWork = 8 * 60
        const timeWorked = parseInt(hour) * 60 + parseInt(minutes)
        return timeWorked - timeToWork
    }).reduce((acc, v) => acc + v)

    const overtimeHours = Math.floor(overtimeInMinutes / 60)
    const overtimeMinutes = overtimeInMinutes - overtimeHours * 60

    const overtimeNode = `<div class="cl-pl-0 cl-d-flex cl-align-items-center"><span class="cl-small cl-text-gray-9 cl-mr-3">Überstunden: ${overtimeHours} Stunden ${overtimeMinutes} Minuten </span></div>`
    document.querySelector("summary-group-header.cl-card-header > div > div").appendChild(htmlToElement(overtimeNode))
}
