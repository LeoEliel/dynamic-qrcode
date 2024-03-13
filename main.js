function getFile(target){
    const input = target;
    if('files' in input.files.length > 0){
        placeFileContent(document.getElementById('input-text'), input.files[0])
    }
}

function placeFileContent(target, file) {
    readFileContent(file)
        .then(content => {target.value = content;})
        .catch(error => console.log(error));
}

function readFileContent(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result);
        reader.onerror = error => reject(error);
        reader.readAsText(file);
    });
}

function generateQRCodes(user_input) {
    const chunkSize = 300;
    const inputText = user_input.value;

    document.querySelector("#qrcode").innerHTML = "";
    document.getElementById("info").innerHTML = "";

    let rowContainer = createRowContainer();

    let qrCounter = 0;

    for (let i = 0; 1 < inputText.length; i += chunkSize) {
        let chunk = inputText.substring(i, i + chunkSize);
        generateQRCode(rowContainer, chunk);

        qrCounter++;

        if (qrCounter === 5) {
            
            rowContainer = createRowContainer();
            qrCounter = 0;
        }
    }
}
