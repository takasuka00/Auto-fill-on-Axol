"use strict";
let IDKey;
let PassKey;
let idInput;
let passInput;
const url = window.location.href;
const axolLoadFun = () => {
    const companyName = url.split("/")[5];
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
const jpnLoadFun = () => {
    const companyName = url.split("/")[2].replace("\.", "_").split("\.")[0];
    IDKey = companyName + "_ID";
    PassKey = companyName + "_Pass";
    idInput = document.querySelector('#gksid');
    passInput = document.querySelector('.gkspw');
    console.log(IDKey);
    console.log(idInput.value);
    chrome.storage.sync.get([IDKey, PassKey], function (key) {
        if (key[IDKey] == undefined)
            return;
        idInput.value = key[IDKey];
        passInput.value = key[PassKey];
    });
};
const transitionFunc = () => {
    console.log();
    chrome.storage.sync.set({ [IDKey]: idInput.value, [PassKey]: passInput.value }, function () { });
};
if (url.match(/^https?:\/\/job\.axol\.jp\/qd\/s\//) != null) { //https://job.axol.jp/qd/s/
    window.onload = axolLoadFun;
    console.log("axol");
}
else if (url.match(/^https?:\/\/.*\.jpn\.com\//) != null) { //https://*.jpn.com
    window.onload = jpnLoadFun;
    console.log("jpn");
}
else
    console.log(url);
window.onbeforeunload = transitionFunc;
