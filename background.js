addEventListener("DOMContentLoaded", (event) => {

    getWebsiteURL();

    document.getElementById("instagram").onclick = () => chrome.tabs.create({ url: "https://www.instagram.com/kronsuki/" });

    document.getElementById("upload").onclick = () => document.getElementById("upload-file-selector").click();

    document.getElementById("upload-file-selector").onchange = async (event) => await checkFile(event);

});

function getWebsiteURL() {

    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {

        let url = tabs[0].url;
        const chatrouletteRegex = /^https:\/\/chatroulette\.com\/.*/;

        if (!url.match(chatrouletteRegex)) switchTabs('unsupported-tab');

    });

}

function switchTabs(tabPaneId) {

    const tabPanes = document.getElementById("tabs-container").querySelectorAll(".tab-pane");
  
    tabPanes.forEach( (tabPane) => {
      tabPane.classList.remove("active", "show");
    });
  
    const selectedTabPane = document.getElementById(tabPaneId);
    selectedTabPane.classList.add("active", "show");

}
