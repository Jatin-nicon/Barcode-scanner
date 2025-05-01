startCameraBtn = document.getElementById('start');


function startScan() {
    let cameraDiv = document.querySelector("#scanner");
    let codeValue = document.getElementById("codeValue");

    startCameraBtn.classList.add('hide');
    codeValue.classList.add('hide');
    cameraDiv.classList.remove('hide');
    

    // initiating quagga
    Quagga.init({
        inputStream: {
            name:"Live",
            type:"LiveStream",
            target: cameraDiv,
            constraints: {
                facingMode: "environment"
            }
        },
    
        decoder: {
            readers: [
                "ean_reader", 
                "ean_8_reader",
                "upc_reader",
                "upc_e_reader",
                "code_128_reader",
                "code_39_reader"
            ]
        },
        locate: true,
        debug: true
    }, (err) => {
        if (err) {
            console.error("Quagga init error: ", err);
            return;
        }
        Quagga.start();
    })
    
    Quagga.onDetected((result) => {
        Quagga.stop();
        // hiding the camera div after scanning 
        cameraDiv.classList.add('hide');

        // removing hide from start button and barcode result to show the result
        codeValue.classList.remove('hide');
        startCameraBtn.classList.remove('hide');

        codeValue.innerHTML = `<b>BarCode: </b>${result.codeResult.code}`;
        alert(`${code}`);
    })
}


startCameraBtn.addEventListener('click', () => {
    startScan();
})
