function readData(file) {
    const reader = new FileReader();

    reader.onload = function(event) {
        const arrayBuffer = event.target.result;
        const decoded = new TextDecoder().decode(arrayBuffer)
        const lastStuff = decoded.slice(-13);
        const name = lastStuff.slice(0,3);
        const safe = lastStuff.slice(-9);
        document.getElementById('output').textContent = "NAME: "+name+" SAFE: "+safe;
    };

    reader.readAsArrayBuffer(file);
}

async function createKey(){
    const startFile = await loadImageFile("keyimg.jpg")

    const bytes = await startFile.bytes();
    const converted = new TextEncoder().encode("USERNAME AND THEN SAFE")
    const merge = new Uint8Array(bytes.length+converted.length);
    merge.set(bytes);
    merge.set(converted,bytes.length)

    const newFile = new Blob([merge.buffer],{type:"image/jpeg"})
    downloadFile(newFile);
}

function downloadFile(imageFile){
    const url = URL.createObjectURL(imageFile)

    const link = document.createElement('a')
    link.href = url
    link.download = "ModifiedKey.jpg"
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}

async function loadImageFile(imageFile){
    const type = 'image/jpeg'
    const response = await fetch(imageFile);
    return await response.blob();
}

function subscribe(){
    document.getElementById('fileinput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        readData(file);
    }
    });
}