var tickspeed = 2000 // 각 슬라이드 지연시간(3000=3초)
var displaymode = "auto" // 초기 디스플레이 모드 ("auto" 혹은 "manual")

if (document.getElementById) {
    document.write('<style type="text/css">n')
    document.write('.gallerycontent{display:none;}n')
    document.write('</style>n')
}

var selectedDiv = 0
var totalDivs = 0

function getElementbyClass(classname) {
    partscollect = new Array()
    var inc = 0
    var alltags = document.all ? document.all.tags("DIV") : document.getElementsByTagName("*")
    for (i = 0; i < alltags.length; i++) {
        if (alltags[i].className == classname)
            partscollect[inc++] = alltags[i]
    }
}

function contractall() {
    var inc = 0
    while (partscollect[inc]) {
        partscollect[inc].style.display = "none"
        inc++
    }
}

function expandone() {
    var selectedDivObj = partscollect[selectedDiv]
    contractall()
    selectedDivObj.style.display = "block"
    temp.options[selectedDiv].selected = true
    selectedDiv = (selectedDiv < totalDivs - 1) ? selectedDiv + 1 : 0
    if (displaymode == "auto")
        autocontrolvar = setTimeout("expandone()", tickspeed)
}

function populatemenu() {
    temp = document.gallerycontrol.menu
    for (m = temp.options.length - 1; m > 0; m--)
        temp.options[m] = null
    for (i = 0; i < totalDivs; i++) {
        var thesubject = partscollect[i].getAttribute("subject")
        thesubject = (thesubject == "" || thesubject == null) ? "HTML Content " + (i + 1) : thesubject
        temp.options[i] = new Option(thesubject, "")
    }
    temp.options[0].selected = true
}

function manualcontrol(menuobj) {
    if (displaymode == "manual") {
        selectedDiv = menuobj
        expandone()
    }
}

function preparemode(themode) {
    displaymode = themode
    if (typeof autocontrolvar != "undefined")
        clearTimeout(autocontrolvar)
    if (themode == "auto") {
        document.gallerycontrol.menu.disabled = true
        autocontrolvar = setTimeout("expandone()", tickspeed)
    } else
        document.gallerycontrol.menu.disabled = false
}


function startgallery() {
    document.getElementById("controldiv").style.display = "block"
    getElementbyClass("gallerycontent")
    totalDivs = partscollect.length
    populatemenu()
    for (i = 0; i < document.gallerycontrol.mode.length; i++) {
        if (document.gallerycontrol.mode[i].checked)
            displaymode = document.gallerycontrol.mode[i].value
    }
    if (displaymode == "auto")
        document.gallerycontrol.menu.disabled = true
    expandone()
}

if (window.addEventListener)
    window.addEventListener("load", startgallery, false)
else if (window.attachEvent)
    window.attachEvent("onload", startgallery)
else if (document.getElementById)
    window.onload = startgallery



window.addEventListener("scroll", function() {
  var target = document.getElementById('sticky-ad');
  if (window.pageYOffset > 300) {
    target.style.bottom = "0";
  }
}, false);

// nav
 let dropdowns = document.querySelectorAll('.navbar .dropdown-toggler')
let dropdownIsOpen = false

// Handle dropdown menues
if (dropdowns.length) {
  // Usually I don't recommend doing this (adding many event listeners to elements have the same handler)
  // Instead use event delegation: https://javascript.info/event-delegation
  // Why: https://gomakethings.com/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js
  // But since we only have two dropdowns, no problem with that. 
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener('click', (event) => {
      let target = document.querySelector(`#${event.target.dataset.dropdown}`)

      if (target) {
        if (target.classList.contains('show')) {
          target.classList.remove('show')
          dropdownIsOpen = false
        } else {
          target.classList.add('show')
          dropdownIsOpen = true
        }
      }
    })
  })
}

// Handle closing dropdowns if a user clicked the body
window.addEventListener('mouseup', (event) => {
  if (dropdownIsOpen) {
    dropdowns.forEach((dropdownButton) => {
      let dropdown = document.querySelector(`#${dropdownButton.dataset.dropdown}`)
      let targetIsDropdown = dropdown == event.target

      if (dropdownButton == event.target) {
        return
      }

      if ((!targetIsDropdown) && (!dropdown.contains(event.target))) {
        dropdown.classList.remove('show')
      }
    })
  }
})

// Open links in mobiles
function handleSmallScreens() {
  document.querySelector('.navbar-toggler')
    .addEventListener('click', () => {
    let navbarMenu = document.querySelector('.navbar-menu')

    if (navbarMenu.style.display === 'flex') {
      navbarMenu.style.display = 'none'
      return
    }

    navbarMenu.style.display = 'flex'
  })
}

handleSmallScreens()