const dropdown = document.getElementsByClassName('dropdown')
const dropdowncontent = document.getElementsByClassName('dropdown-content')
for(let x = 0 ; x < dropdown.length ; x++){
    dropdown[x].onclick = function(){
        dropdowncontent[x].style.display = dropdowncontent[x].style.display === "none" || dropdowncontent[x].style.display === "" ? "block" : "none"
    }
}
const aside = document.querySelector("aside");
const header = document.querySelector("header");
const accountinfo = document.getElementById("accountinfo");
const mainBody = document.getElementById("mainBody");
const navtext = document.getElementsByClassName("navtext");
const nameinfo = document.getElementById("nameinfo");
const imageinfo = document.getElementById("imageinfo");

const toggle = document.getElementById('toggle-button')
toggle.onclick = function(){
    if(aside.style.width == "300px" || aside.style.width == ""){
            shrink()
    }else{
            unshrink()
    }
}

function shrink(){
    aside.style.width = "57px";
    aside.style.transition = "width 0.5s"
    header.style.marginLeft = "60px";
    nameinfo.style.display = "none";
    mainBody.style.padding = "90px 10px 10px 65px"
    imageinfo.style.width = "30px"
    imageinfo.style.height = "30px"
    imageinfo.style.marginLeft = "0"
    accountinfo.style.height = "60px"
    accountinfo.style.position = "relative"
    imageinfo.style.position = "absolute"
    imageinfo.style.left = "90%"
    imageinfo.style.top = "10px"
    imageinfo.style.transform = "translate(-50%,-50%)"
    
        for(let x=0;x<navtext.length;x++){
        navtext[x].style.display = "none";
        }

        for(let x=0;x<dropdowncontent.length;x++){
        dropdowncontent[x].style.position = "fixed";
        dropdowncontent[x].style.left = "57px";
        dropdowncontent[x].style.top = "142px";
        dropdowncontent[x].style.width = "220px";
        }
}


function unshrink(){
    aside.style.width = "300px";
    aside.style.transition = "width 0.5s"
    header.style.marginLeft = "302px";
    nameinfo.style.display = "block";
    mainBody.style.padding = "90px 10px 10px 310px"
    imageinfo.style.width = "80px"
    imageinfo.style.height = "60px"
    imageinfo.style.marginLeft = "0"
    accountinfo.style.height = "100px"
    accountinfo.style.position = "relative"
    imageinfo.style.position = "relative"
    imageinfo.style.left = "64%"
    imageinfo.style.top = "30px"
    imageinfo.style.transform = "translate(-50%,-50%)"
    
    for(let x=0;x<dropdowncontent.length;x++){
        dropdowncontent[x].style.position = "relative";
        dropdowncontent[x].style.left = "0";
        dropdowncontent[x].style.top = "0";
        dropdowncontent[x].style.width = "100%";
        }
        
        for(let x=0;x<navtext.length;x++){
        navtext[x].style.display = "inline-block";
        }
}


