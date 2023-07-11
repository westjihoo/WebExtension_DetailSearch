let base_link = "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query="

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.send_info.action == "sendData")
            console.log(request.send_info.search_word);
            location.href = base_link + request.send_info.search_word;
            sendResponse({ res: "end" });
    });