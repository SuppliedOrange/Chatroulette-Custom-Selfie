async function checkFile(event) {

    const files = event.target.files;

    if (!files.length) return;

    const dataURI = await toBase64(files[0]).catch(e => {});

    if (!dataURI) return failureToast("Uh oh, I couldn't process that file :(")

    const [header, data] = dataURI.split(',');

    const contentTypeMatch = header.match(/data:([^;]+)/);

    const contentType = contentTypeMatch ? contentTypeMatch[1] : null;

    if (!contentType || !contentType.startsWith('image/')) {
      return failureToast("That's not an image you dumdum.");
    }
    
    const imageData = data.slice(data.indexOf(',') + 1);

    const img = new Image();
    img.src = dataURI;
    const height = img.height;
    const width = img.width;

    const newData = {
      contentType: contentType,
      height: height,
      width: width,
      data: imageData
    };

    createDataStringAndUpload( newData );

}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

function createDataStringAndUpload( newData ) {

    chrome.tabs.query( {active: true, currentWindow: true}, function (tabs) {
        
        chrome.scripting.executeScript( { target: {tabId: tabs[0].id},  func: ( () => window.localStorage.getItem('selfie')) } )
        .then( async results => {

            if (!results.length) return failureToast("I couldn't find your selfie, weird. Refresh and retry.")

            var selfie = results[0].result;
            selfie = await JSON.parse(selfie);
            if (!selfie || !selfie.id) return failureToast("Data from LS was malformed. Report this to owner.");

            newData.id = selfie.id;
            newData = JSON.stringify(newData);

            chrome.scripting.executeScript( { target: {tabId: tabs[0].id}, func: ( (args) => window.localStorage.setItem( 'selfie', args )), args: [newData] } )
            .then( r => successToast() );

        })

    })

}