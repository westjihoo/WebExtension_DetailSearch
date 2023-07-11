const btn_search = document.getElementById("btn_search");

let send_info = {
    action: "sendData",
    search_word: ""
}

function send_word_to_content() {
    tmp_str = pars_words();
    send_info.search_word = tmp_str;
    // document.getElementById("keyword_base").placeholder = "clicked!";
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { send_info }, function (response) {
            console.log(response.res);
        });
    });
}

function pars_words() {
    
    tmp_str = document.getElementById("keyword_base").value;

    tmp_arr = document.getElementById("keyword_plus").value.split(",");
    if (tmp_arr.length > 0 & tmp_arr[0]!="") {
        for (const w of tmp_arr) {
            tmp_str += `+%2B` + w
        }
    }

    tmp_arr = document.getElementById("keyword_minus").value.split(",");
    if (tmp_arr.length > 0 & tmp_arr[0]!="") {
        for (const w of tmp_arr) {
            tmp_str += " -" + w
        }
    }

    tmp_arr = document.getElementById("keyword_exact").value.split(",");
    if (tmp_arr.length > 0 & tmp_arr[0]!="") {
        for (const w of tmp_arr) {
            tmp_str += " \"" + w + "\""
        }
    }

    tmp_arr = document.getElementById("keyword_or").value.split(",");
    if (tmp_arr.length > 0 & tmp_arr[0]!="") {
        for (const w of tmp_arr) {
            tmp_str += " | " + w
        }
    }

    return tmp_str;
}

document.addEventListener("keyup", function(event) {
    if (event.code === 'Enter') {
        send_word_to_content();
    }
});

btn_search.addEventListener("click", () => {
    send_word_to_content();
});