let navDash = document.getElementById('navDash')
let navCart = document.getElementById('navCart')
let navKitchen = document.getElementById('navKitchen')
let navMenus = document.getElementById('navMenus')

navDash.addEventListener('click', ()=>{
    document.location.href='./index.html'
})
navCart.addEventListener('click', ()=>{
    document.location.href='./cart.html'
})
navKitchen.addEventListener('click', ()=>{
    document.location.href='./kitchen.html'
})
navMenus.addEventListener('click', ()=>{
    document.location.href='./menus.html'
})




//DEPRECATED CODE -> WAITING FOR BARECODE FEATURE

/*let videoStream = document.getElementById('cam')

if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
    console.log("Navigateur compatible à la vidéo")
    const constraints = {
        audio: false,
        video: {
            facingMode: 'user'
        }
    };
    navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
        videoStream.srcObject = stream;
    });
    if (!("BarcodeDetector" in window)) {
        console.log("Barcode Detector is not supported by this browser.");
    } else {
        console.log("Barcode Detector supported!");
        const barcodeDetector = new BarcodeDetector({
            formats: ["code_39", "codabar", "ean_13"],
        });
    }
} else {
    alert('Désolé, mais ce navigateur ne supporte pas la vidéo, ou une erreur s\'est produite. Privilégiez un navigateur comme Chrome.')
}*/