/*  Homepage for Luke Wilcox
    Built on 100% canvas with dynamic full-screen resizing
    by Dr Freudjr 2/3/2021
 */

// Global page object

pageInfo = {
    backgroundColor : '#111111',
    GOLDENRATIO :.382,    // The golden ratio is peaceful - magnifier increases trianglr size: 
    ratioMagnifier : 1.2, // 0 is no triangles /2.65 is erasure
    triangleWidth : 0,
    triangleHeight : 0,

}


// 'use strict';
const cl = console.log;

window.onload = function () {   // onload wrapper

var canvas;        // Global canvas object reference
var context;       // Global 2D context reference

// // // Begin dynamic fulls screen canvas code

sizeCanvas()   // create initial canvas
addEventListener("resize", sizeCanvas); // resize canvas and redraw on window size change

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

// // // // // // // // // // // Start page-specific code

function drawScreen() {    // wrapper that gets called on resize event

const backgroundColor = '#111111'

function drawForegroundImage () {
    const c = new Image()                   
    c.src = "bostonSat.webp"   
    context.drawImage(c, 0, 0)
}

function getTriangleWidthHeight() {

    cutoutRatio = pageInfo.GOLDENRATIO*pageInfo.ratioMagnifier

    triangleWidth = Math.round(innerWidth*cutoutRatio)     //  set horizontal distance from top left corner
    pageInfo.triangleWidth = triangleWidth                 //  write to global object
    triangleHeight = Math.round(innerHeight*cutoutRatio)   //  set verticle distance from top left corner
    pageInfo.triangleHeight = triangleHeight

}

function drawTriangles () {

    context.fillStyle = backgroundColor // draw top triangle
    context.beginPath()             
    context.moveTo(pageInfo.triangleWidth, 0)       // top right
    context.lineTo(0,0)             // top left corner
    context.lineTo(0, pageInfo.triangleHeight)      // bottom left
    context.fill()                  // draw (last path is implicit)

    context.beginPath()                     // draw bottom triangle
    context.moveTo(innerWidth - pageInfo.triangleWidth, innerHeight)  // bottom left
    context.lineTo(innerWidth,innerHeight)            // bottom right corner
    context.lineTo(innerWidth, innerHeight - pageInfo.triangleHeight) // top right
    context.fill()
}

function drawText () {

    function dynamicFontSize (originalFontSize = 55, originalCanvsSize = 1360) { // enter original design specs
        percentOfFullSize = innerWidth/originalCanvsSize                                
        adjustedLinearFontSize = originalFontSize*percentOfFullSize                     //linear transform
        adjustedNonlinearFontSize = originalFontSize /(1-Math.log(percentOfFullSize))   //nonlinear transform
        return(adjustedNonlinearFontSize)
    }

    function dynamicHeightFromTop (originalDistanceFromTop = 80, originalCanvsSize = 1360) { // scales vertically
        percentOfFullSize = innerWidth/originalCanvsSize
        adjustedDistanceFromTop = originalDistanceFromTop*percentOfFullSize
        return(adjustedDistanceFromTop)
    }

    currentFont = 'Courier'
    calculatedFont = dynamicFontSize(55, 1360)          // original design specs
    distanceFromTop = dynamicHeightFromTop(80, 1360)

    calculatedFontString = (`${adjustedNonlinearFontSize}px ${currentFont}`)        //string creation
    context.font = calculatedFontString                     // assign to the object

    context.fillStyle = "#7aa600"                           // green pulled from picture
    context.fillText('Luke Wilcox', 10, distanceFromTop)    // statix x, dynamic y
    
    // cl(calculatedFont)
    scaledDownRatio = .6            // set subheadings as ratio of main heading
    context.fillStyle = "#7aa600"   //same color
    calculatedFontString = (`${adjustedNonlinearFontSize*scaledDownRatio}px ${currentFont}`) //smaller font size for about me
    context.font = calculatedFontString

    context.fillText('About Me', 10, distanceFromTop + calculatedFont) // place it beneath 'luke wilcox'
}   // end drawText

drawForegroundImage()
getTriangleWidthHeight()
drawTriangles()    // argument = adjust golden ratio
drawText()

}   //end drawScreen wrapper


// requestAnimationFrame(draw);
// setInterval(requestAnimationFrame(draw), 1000/60);

}   // end onload wrapper