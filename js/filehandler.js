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

    img.onload = function() {

        const newData = {
          sample: {
              contentType: contentType,
              data: imageData
          },
          classification: "Manual"
          
        }
        
        createDataStringAndUpload( newData, dataURI );

    }

}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});
