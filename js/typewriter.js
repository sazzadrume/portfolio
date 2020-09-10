// Tune as necessary
const typingDelay = 60;
const erasingDelay = 10;
const newTextDelay = 500;

var WIDTH_CONST = 120 // Increase for more space, Decrease for less

// Put your texts in the array. As many as you want.
var TEXT_TO_SHOW = [ "Hey there!", 
            "This is typewriter for you!", 
            "Yeah, it is responsive.",
            "Thanks for dropping by!"];

const cursorBlink = document.querySelector(".cursor");
var arrayIndex = 0;
var charIndex = 0;
var max = 0;
var i = 0;

var ellipsStart = 4;
var eraseData = 0;

function typing() {
    var spanWidth = document.getElementById('respTypeWriter').offsetWidth;
    var windowWidth = window.innerWidth;

    if (charIndex < TEXT_TO_SHOW[arrayIndex].length) {
        
        var currentText = TEXT_TO_SHOW[arrayIndex].substring(0, charIndex + 1);
        
        if (windowWidth <= (spanWidth + WIDTH_CONST)) {
            currentText = "..." + currentText.substring(ellipsStart++);
        } 

        document.getElementById("respTypeWriter").innerHTML = currentText;

        if (!cursorBlink.classList.contains("typing"))
            cursorBlink.classList.add("typing");

        charIndex++;

        setTimeout(typing, typingDelay);
    } else {
        ellipsStart = 4;
        max = document.getElementById("respTypeWriter").innerHTML.length;
        cursorBlink.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }           
}

function erase () {
    var spanWidth = document.getElementById('respTypeWriter').offsetWidth;
    var windowWidth = window.innerWidth;

    if (charIndex > 0) {
        if (!cursorBlink.classList.contains("typing"))
            cursorBlink.classList.add("typing");

        
        var currentText = TEXT_TO_SHOW[arrayIndex].substring(0, charIndex - 1);

        var currentLength = currentText.length;

        if (currentLength > max) {
            currentText = "..." + currentText.substring(currentLength - max + 3);
        } 


        document.getElementById("respTypeWriter").innerHTML = currentText;


        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorBlink.classList.remove("typing");
        max = 0;
        arrayIndex++;
        if (arrayIndex >= TEXT_TO_SHOW.length)  arrayIndex = 0;
        setTimeout(typing, typingDelay + 1000)
    }
}

window.addEventListener("load", function() {
    if (TEXT_TO_SHOW.length) setTimeout(typing, newTextDelay + 250)
});