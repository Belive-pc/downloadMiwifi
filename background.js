let downloadHref;
let isMenuExists = false;

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({ url: "https://d.miwifi.com/d2r/" });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "miwifiMenu") {
        downloadHref && openNewTab(downloadHref);
    }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "MIWIFI") {
        downloadHref = message.data;
        !isMenuExists && createMenu();
        sendResponse({ status: "ok" });
        return true; // 保持消息通道打开以发送响应
    }
});

function createMenu() {
    chrome.contextMenus.create({
        id: "miwifiMenu",
        title: "下载至小米路由器",
        contexts: ["all"],
    });
    isMenuExists = true;
    console.log("创建");
}

function openNewTab(downloadHref) {
    let miwifiDownloadUrl =
        "http://d.miwifi.com/d2r/?url=" +
        btoa(unescape(encodeURIComponent(downloadHref)));

    chrome.tabs.create({
        url: miwifiDownloadUrl,
        active: true,
    });
}
