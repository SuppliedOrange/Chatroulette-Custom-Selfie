addEventListener("load", async (event) => {

    const thumbnail = document.getElementsByTagName('img')[0]
    if (!thumbnail) return;

    let selfie = localStorage.getItem("selfie_v2");
    if (!selfie) return;

    selfie = await JSON.parse( selfie );

    let lesser = ( selfie.height > selfie.width ) ? selfie.width : selfie.height;

    thumbnail.setAttribute('style', `transform: scaleX(1); width: ${lesser}px; height: ${lesser}px`);

});
