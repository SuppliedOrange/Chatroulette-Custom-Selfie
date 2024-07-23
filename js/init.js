addEventListener("DOMContentLoaded", (event) => {
   
    document.getElementById("init").onclick = () => init();

});

function init() {

    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if (message.selfie) {
            document.querySelector("#init").classList.add("animate__animated", "animate__fadeOutDown", "animate__faster");
            switchTabs('exec-tab')
        }
        else showInitError();
    });
    
    getSelfieValue();

}

function getSelfieValue() {

    chrome.tabs.query( {active: true, currentWindow: true}, function (tabs) {
        chrome.scripting.executeScript( { target: {tabId: tabs[0].id},  func: fetchSelfieValue } )
    })

}

const fetchSelfieValue = () => chrome.runtime.sendMessage({selfie: window.localStorage.getItem('selfie_v2')});
