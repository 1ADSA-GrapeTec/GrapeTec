var icon_box = document.querySelector(".icon_box")
var navBar = document.querySelector(".navBar")

icon_box.onclick =  function() {
    icon_box.classList.toggle("active")
    navBar.classList.toggle("active")
}

document.onclick = function(e) {
    if(!icon_box.contains(e.target) && !navBar.contains(e.target)) {
        icon_box.classList.remove("active")
        navBar.classList.remove("active")
    }
}
