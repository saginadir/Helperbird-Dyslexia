var chrome,elem,code,style;




checkStatus(); // Check if the check box is set.


function checkStatus() {
   
    chrome.storage.sync.get({ booleans: true}
        , 
    function (items) {
        if (items.booleans === true) {
            turnOnHelperBird() 
            document.getElementById('like').checked = '1';
        } else {
            turnOffHelperBird();
            document.getElementById('like').checked = '0';

        }
    });
    
    document.addEventListener('DOMContentLoaded', restore_options);
}



function turnOffHelperBird() {

    elem = document.getElementById("Birdy");
    elem.parentNode.removeChild(elem);
    (document.head || document.documentElement).removeChild(elem);
    reloadPage();
}


function turnOnHelperBird() {

    style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.setAttribute("id", "Birdy");
    style.href = chrome.extension.getURL('assests/css/myStyles.css');
    (document.head || document.documentElement).appendChild(style);

}




function reloadPage() {

    chrome.tabs.getSelected(null, function (tab) {
        code = 'window.location.reload();';
        chrome.tabs.executeScript(tab.id, {
            code : code
        });
    });
}

