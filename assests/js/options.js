
var checkBox,chrome,status,code;


function save_options() {           // Saves options to chrome.storage

    checkBox = document.getElementById('like').checked;
    
    chrome.storage.sync.set({   booleans: checkBox }, 
    function() {        // Update status to let user know options were saved.
        conformationMessage();
    });

}

function conformationMessage(){

    status = document.getElementById('status');
    status.textContent = 'Options Saved.';
    setTimeout(function() {   status.textContent = ''; }, 750);
    reload();

}


function reload() {
    
    chrome.tabs.getSelected(null, function(tab) {
        code = 'window.location.reload();';
        chrome.tabs.executeScript(tab.id, { code: code });
    });
}
    // Restores select box and checkbox state using the preferences
    // stored in chrome.storage.

function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        booleans: true
    }, function(items) {
        document.getElementById('like').checked = items.booleans;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);