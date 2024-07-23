function createDataStringAndUpload( newData, rawDataURI ) {

    chrome.tabs.query( {active: true, currentWindow: true}, function (tabs) {
        
        chrome.scripting.executeScript( { target: {tabId: tabs[0].id},  func: ( () => window.localStorage.getItem('selfie_v2')) } )
        .then( async results => {

            if (!results.length) return failureToast("I couldn't find your selfie, weird. Refresh and retry.");

            var selfie = results[0].result;
            selfie = await JSON.parse(selfie);
            if (!selfie || !selfie.sample || !selfie.sample.id) return failureToast("Data from LS was malformed. Report this to developer.");

            newData.sample.id = selfie.sample.id;

            chrome.scripting.executeScript( { target: {tabId: tabs[0].id}, func: ( (newData, rawDataURI) => {

                window.localStorage.setItem( 'selfie_v2', JSON.stringify(newData) );
                
                let image = document.getElementsByTagName('img')[0]
                image.src = rawDataURI; // Doesn't work anymore :( I'll still keep it around just in case.

                let lesser = ( newData.height > newData.width ) ? newData.width : newData.height;
                image.setAttribute('style', `transform: scaleX(1); width: ${lesser}px; height: ${lesser}px`); // The reason we're doing this is because chatroulette mirrors the image for the user to see. It's pointless. Also crops image

            }), args: [newData, rawDataURI] } )

            .then( r => successToast() );

        })

    })

}
