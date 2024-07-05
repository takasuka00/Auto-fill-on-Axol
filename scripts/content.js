"use strict";
let IDKey;
let PassKey;
let idInput;
let passInput;
window.onload = function () {
    const companyName = window.location.href.split("/")[5];
    IDKey = companyName + "_ID";
    PassKey = companyName + "_Pass";
    const idDiv = document.querySelector('.origin__id');
    const passDiv = document.querySelector('.origin__pass');
    if (idDiv == null)
        return;
    if (passDiv == null)
        return;
    idInput = idDiv.firstElementChild;
    passInput = passDiv.firstElementChild;
    chrome.storage.sync.get([IDKey, PassKey], function (key) {
        if (key[IDKey] == undefined)
            return;
        idInput.value = key[IDKey];
        passInput.value = key[PassKey];
    });
};
window.onbeforeunload = function () {
    chrome.storage.sync.set({ [IDKey]: idInput.value, [PassKey]: passInput.value }, function () {
    });
};
