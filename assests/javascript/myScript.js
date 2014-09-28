logoSwitch();


function logoSwitch() {
   
    chrome.storage.sync.get({
        likesColor: true
    }, function (items) {

        if (items.likesColor == true) {
            on();
        } else {
            off();
        }
    });
    document.addEventListener('DOMContentLoaded', restore_options);
}



function off() {
    
    var elem = document.getElementById("Birdy");
    elem.parentNode.removeChild(elem);
    (document.head || document.documentElement).removeChild(elem);
    reload();
    
}



function reload() {
    chrome.tabs.getSelected(null, function (tab) {
        var code = 'window.location.reload();';
        chrome.tabs.executeScript(tab.id, {
            code: code
        });
    });

}

function on() {
 var style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.setAttribute("id", "Birdy");
    style.href = chrome.extension.getURL('assests/css/myStyles.css');
    (document.head || document.documentElement).appendChild(style);

}