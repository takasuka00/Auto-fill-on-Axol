let IDKey:string
let PassKey:string
let idInput : HTMLInputElement
let passInput : HTMLInputElement

window.onload = function() {
    const companyName = window.location.href.split("/")[5]
    IDKey = companyName + "_ID"
    PassKey = companyName + "_Pass"
    const idDiv = document.querySelector<HTMLDivElement>('.origin__id');
    const passDiv = document.querySelector<HTMLDivElement>('.origin__pass');
    if (idDiv == null) return
    if(passDiv == null) return
    idInput = idDiv.firstElementChild as HTMLInputElement
    passInput = passDiv.firstElementChild as HTMLInputElement
    chrome.storage.sync.get([IDKey,PassKey],function (key) {
        idInput.value = key[IDKey]
        passInput.value = key[PassKey]
        console.log(key[IDKey])
        console.log(key[PassKey])

    })
}
window.onbeforeunload = function () {

    chrome.storage.sync.set({[IDKey]: idInput.value,[PassKey]: passInput.value}, function () {
    });
}