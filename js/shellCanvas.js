/*  Homepage for Luke Wilcox
    Built 100% on canvas with dynamic resizing for window size
    by Dr Freudjr
 */

// 'use strict';
const cl = console.log;

window.onload = function () {   // onload wrapper

var canvas;        // Global canvas object reference
var context;       // Global 2D context reference

// // // // // // // // // // // // // // Begin Full-page canvas code

function createCanvas () {                
    const canvas = document.createElement("canvas"); 
    canvas.style.position = "absolute"; 
    canvas.style.left     = "0px";      
    canvas.style.top      = "0px";

    document.body.appendChild(canvas);  // Add to document
    return canvas;
}

function sizeCanvas () {                // Create or resize 
    if (canvas === undefined) {         
        canvas = createCanvas();        
        context = canvas.getContext("2d");  
    }
    canvas.width  = innerWidth; 
    canvas.height = innerHeight; 
    drawScreen()     
}

addEventListener("resize", sizeCanvas); // Event listener

sizeCanvas();   // Begin the resize loop by creating canvas

// // // // // // // // // // // Evrything above here is responsive full-screen canvas - below is page-specific

function drawScreen() {

    const backgroundColor = '#000000'
    context.fillStyle = backgroundColor                     // set background color in case u want to use mask
    context.fillRect(0, 0, innerWidth, innerHeight)         // try a mask varient and compare performance

    // draw foreground image

    const c = new Image()                   
    c.src = "bostonSat.webp"   
    context.drawImage(c, 0, 0)

// draw triangle cutouts

    ratioMagnifier = 1  // THe golden ratio is peaceful - this sharpens it 2.65 is erasure; 0 is no triangles
    let goldenRatio = .382 * ratioMagnifier

    xWidth = Math.round(innerWidth*goldenRatio)     //  set horizontal distance from top left corner
    yHeight = Math.round(innerHeight*goldenRatio)   //  set verticle distance from top left corner

    context.fillStyle = backgroundColor // draw top triangle
    context.beginPath()             
    context.moveTo(xWidth, 0)       // top right
    context.lineTo(0,0)             // top left corner
    context.lineTo(0, yHeight)      // bottom left
    context.fill()                  // draw (last path is implicit)

    context.beginPath()                     // draw bottom triangle
    context.moveTo(innerWidth - xWidth, innerHeight)  // bottom left
    context.lineTo(innerWidth,innerHeight)            // bottom right corner
    context.lineTo(innerWidth, innerHeight - yHeight) // top right
    context.fill()


//draw text

    function dynamicFontSize (originalFontSize = 55, originalCanvsSize = 1360) { // in design params/out adjusted font size
        percentOfFullSize = innerWidth/originalCanvsSize                                
        adjustedLinearFontSize = originalFontSize*percentOfFullSize                     //linear trnsform
        adjustedNonlinearFontSize = originalFontSize /(1-Math.log(percentOfFullSize))   //nonlinear transform

        // cl(adjustedLinearFontSize, adjustedNonlinearFontSize)
        return(adjustedNonlinearFontSize)
    }

    function dynamicHeightFromTop (originalDistanceFromTop = 80, originalCanvsSize = 1360) {
        percentOfFullSize = innerWidth/originalCanvsSize
        // cl(percentOfFullSize)
        adjustedDistanceFromTop = originalDistanceFromTop*percentOfFullSize
        // cl(adjustedDistanceFromTop)
        return(adjustedDistanceFromTop)
    }

x = dynamicHeightFromTop()
cl(x)

    currentFont = 'Courier'
    calculatedFont = dynamicFontSize(55, 1360)
    distanceFromTop = dynamicHeightFromTop()

    calculatedFontString = (`${adjustedNonlinearFontSize}px ${currentFont}`)        //string creation

    context.font = calculatedFontString                     // assign to the object
    cl(calculatedFontString)
    context.fillStyle = "#7aa600"                           // green pulled from picture
    context.fillText('Luke Wilcox', 10, distanceFromTop)
    
    cl(calculatedFont)
    context.fillStyle = "#7aa600"   //same color
    calculatedFontString = (`${adjustedNonlinearFontSize*.7}px ${currentFont}`) //smaller font size for about me
    context.font = calculatedFontString

    context.fillText('About Me', 10, distanceFromTop + calculatedFont) // place it beneath 'luke wilcox'



}   //end drawScreen function

// requestAnimationFrame(draw);
// setInterval(requestAnimationFrame(draw), 1000/60);

}   // end onload wrapper