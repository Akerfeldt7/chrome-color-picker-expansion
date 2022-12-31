const colorPickerBtn=document.querySelector("#color-picker");
const colorList=document.querySelector(".all-colors");
const clearAll=document.querySelector(".clear-all");

const KEY_PICKED_COLORS = "picked-colors";
const pickedColors = JSON.parse(localStorage.getItem(KEY_PICKED_COLORS) || "[]");

const copyColor = elem =>{
    navigator.clipboard.writeText(elem.dataset.color);
    elem.innerText="Copied";
    setTimeout(() => elem.innerText=elem.dataset.color,1000);
}

const showColors = () =>{
    if(!pickedColors.length) return; //return if no picked colors

    colorList.innerHTML = pickedColors.map(color => `
        <li class="color">
            <span class="rect" style="background:${color}; border: 1px solid ${color=="#333333" || true?"#ffff33":color}"></span>
            <span class="value" data-color="${color}">${color}</span>
        </li>
        `).join("");

        document.querySelector(".picked-colors").classList.remove("hide");

        document.querySelectorAll(".color").forEach(li => {
            li.addEventListener("click",e => copyColor(e.currentTarget.lastElementChild));
        });
}
showColors();

const activateEyeDropper = () =>{
    document.body.style.display="none";

    setTimeout(async ()=> {
        try{
            //Opening the eye dropper and getting the selected color
            const eyeDropper = new EyeDropper();
            const { sRGBHex } = await eyeDropper.open();
    
            navigator.clipboard.writeText(sRGBHex)
            
            if(!pickedColors.includes(sRGBHex)){
                pickedColors.push(sRGBHex);
                localStorage.setItem(KEY_PICKED_COLORS,JSON.stringify(pickedColors));            
            }
            
            showColors();       
        }   
        catch(error){
            console.log("Failed to copy the color code");
        }
        document.body.style.display="block";
    },10);

    
}

const clearAllColors = () =>{
    document.querySelector(".picked-colors").classList.add("hide");
    pickedColors.length = 0; //empty the array
    localStorage.setItem(KEY_PICKED_COLORS,JSON.stringify(pickedColors));    
    showColors();
}

const generateRandomBackgroundImage = () =>{
    let minNumber=9;
    let maxNumber=20;  
    min = Math.ceil(minNumber);
    max = Math.floor(maxNumber);
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    //console.log(randomNumber);
    
    let imageBackgroundUrl=`url(/images/${randomNumber}.jpg)`;
    document.body.style.backgroundImage=imageBackgroundUrl;
}

clearAll.addEventListener("click",clearAllColors);
colorPickerBtn.addEventListener("click",activateEyeDropper);

setInterval(generateRandomBackgroundImage,5000);