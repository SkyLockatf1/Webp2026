var container = document.getElementById("container");
window.onload = (e)=>{
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const length = Math.floor(Math.random()*2);
    // Loop to generate characters for the specified length
    for (let i = 0; i < length; i++) {
        const randomInd = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomInd);
    }
    container.textContent+=result;
}
window.addEventListener("keyup",(e)=>{
    console.log(e.key);
    if(e.key == container.textContent.substring(0,1)){
    container.textContent=container.textContent.substring(1);
    }
    add_new_char();
});

function add_new_char(){
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const length = Math.floor(Math.random()*(3-1)+1);
    // Loop to generate characters for the specified length
    for (let i = 0; i < length; i++) {
        const randomInd = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomInd);
    }
    container.textContent+=result;
}