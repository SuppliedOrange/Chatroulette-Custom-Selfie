function createDataStringAndUpload( newData, rawDataURI ) {

    chrome.tabs.query( {active: true, currentWindow: true}, function (tabs) {
        
        chrome.scripting.executeScript( { target: {tabId: tabs[0].id},  func: ( () => window.localStorage.getItem('selfie')) } )
        .then( async results => {

            if (!results.length) return failureToast("I couldn't find your selfie, weird. Refresh and retry.")

            var selfie = results[0].result;
            selfie = await JSON.parse(selfie);
            if (!selfie || !selfie.id) return failureToast("Data from LS was malformed. Report this to owner.");

            newData.id = selfie.id;

            chrome.scripting.executeScript( { target: {tabId: tabs[0].id}, func: ( (newData, rawDataURI) => {

                window.localStorage.setItem( 'selfie', JSON.stringify(newData) );
                
                let image = document.getElementsByTagName('img')[0]
                image.src = rawDataURI;

                let lesser = ( newData.height > newData.width ) ? newData.width : newData.height;
                image.setAttribute('style', `transform: scaleX(1); width: ${lesser}px; height: ${lesser}px`); // The reason we're doing this is because chatroulette mirrors the image for the user to see. It's pointless. Also crops image

            }), args: [newData, rawDataURI] } )

            .then( r => successToast() );

        })

    })

}
