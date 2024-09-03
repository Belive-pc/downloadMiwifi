document.addEventListener("contextmenu", function (event) {
    let target = event.target;
    let downloadHref;

    if (target.tagName.toLowerCase() === "a") {
        downloadHref = target.href;
    } else {
        // 检查父元素是否是<a>标签
        let parent = target.parentElement;
        if (parent && parent.tagName.toLowerCase() === "a") {
            downloadHref = parent.href;
        }
    }

    if (downloadHref && downloadHref.length > 30) {
        chrome.runtime.sendMessage({
            action: "MIWIFI",
            data: downloadHref,
        });
    }
});
