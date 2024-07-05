let IDKey: string
let PassKey: string
let idInput: HTMLInputElement
let passInput: HTMLInputElement

//アクセス時実行
window.onload = function () {
    //企業名の取得
    const companyName = window.location.href.split("/")[5]
    IDKey = companyName + "_ID"
    PassKey = companyName + "_Pass"
    const idDiv = document.querySelector<HTMLDivElement>('.origin__id');
    const passDiv = document.querySelector<HTMLDivElement>('.origin__pass');
    if (idDiv == null) return
    if (passDiv == null) return
    idInput = idDiv.firstElementChild as HTMLInputElement
    passInput = passDiv.firstElementChild as HTMLInputElement
    //保存してあるIDとパスワードを取得し貼り付け
    chrome.storage.sync.get([IDKey, PassKey], function (key) {
        if (key[IDKey] == undefined) return
        idInput.value = key[IDKey]
        passInput.value = key[PassKey]
    })
}
//ページを離れる際に実行
window.onbeforeunload = function () {
    //IDとパスワードを保存
    chrome.storage.sync.set({[IDKey]: idInput.value, [PassKey]: passInput.value}, function () {
    })
}