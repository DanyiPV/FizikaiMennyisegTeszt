function SideBarOpen(){
    document.getElementById("SideBarNav").classList.add("SideBarNavOpen");
    document.getElementById("BlackBG").classList.add("BlackBGOn");
    document.getElementById("BlackBG").setAttribute("onclick","SideBarClose()");
}

function SideBarClose(){
    document.getElementById("SideBarNav").classList.remove("SideBarNavOpen");
    document.getElementById("BlackBG").classList.remove("BlackBGOn");
    document.getElementById("BlackBG").removeAttribute("onclick");
}

function SignInOpen(){
    document.getElementById("SignInNav").classList.add("SignInOpen");
    document.getElementById("SignIn").classList.add("SignInDivOpen");
    document.getElementById("BlackBG").classList.add("BlackBGOn");
    document.getElementById("BlackBG").setAttribute("onclick","SignInClose()");
}

function SignInClose(){
    document.getElementById("SignInNav").classList.remove("SignInOpen");
    document.getElementById("SignIn").classList.remove("SignInDivOpen");
    document.getElementById("BlackBG").classList.remove("BlackBGOn");
    document.getElementById("BlackBG").removeAttribute("onclick");
}

function RemoveAnim(){
    document.getElementById("SignIn").classList.remove("SignInAnim");
}
setTimeout(RemoveAnim,800);