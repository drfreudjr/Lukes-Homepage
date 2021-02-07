const cl = console.log;
/*  Homepage for Luke Wilcox - my super genius nephew :)
    Built on 100% canvas with dynamic full-screen resizing
    by Dr Freudjr https://drfreudjr.github.io/
 */

 'use strict'

 pageInfo = {                           // Global object
    backgroundColor : '#111111',
    backgroundImage : "bostonSat.webp",
    textColor : '#7aa600',              // green pulled from picture
    GOLDENRATIO :.382,                  // The golden ratio is peaceful - magnifier increases blockout
    ratioModifier : 1.2,                // 0 is no triangles  2.551 is erasure
    triangleWidth : null,               // these are calculated in first drawTriangle function call
    triangleHeight : null,
    animation : 'open',
    speed : 1,                        // speed at which triangles change
    stopDrawingAt: null,
    clickableBox: {x: null, y: null, dx: null, dy: null}   // xy coords then delta xy

}

window.onload = function () {           // onload wrapper
                                        // Global 2D context reference
var canvas;                             // Global canvas object reference
var context; 

// // Begin dynamic fulls screen canvas code

sizeCanvas()                            // create initial canvas
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

// // Page-specific code

function drawScreen() {  // wrapper that gets called on resize event

function drawForegroundImage () {
    const backgroundImage = new Image()                   
    backgroundImage.src = pageInfo.backgroundImage   
    context.drawImage(c, 0, 0)
}

function drawTriangles () { 

    context.drawImage(c, 0, 0)  // redraw image this needed when subtracting rectangles
    pageInfo.finalRatio = pageInfo.GOLDENRATIO*pageInfo.ratioModifier
    pageInfo.triangleWidth = Math.round(innerWidth*pageInfo.finalRatio)         // set horizontal distance from top left
    pageInfo.triangleHeight = Math.round(innerHeight*pageInfo.finalRatio)       // set vertical distance from top left

    context.fillStyle = pageInfo.backgroundColor    // draw top triangle
    context.beginPath()             
    context.moveTo(pageInfo.triangleWidth, 0)       // top right
    context.lineTo(0,0)                             // top left corner
    context.lineTo(0, pageInfo.triangleHeight)      // bottom left
    context.fill()                                  // draw (last path is implicit)

    cl(pageInfo.triangleWidth)

    context.beginPath()                             // draw bottom triangle
    context.moveTo(innerWidth - pageInfo.triangleWidth, innerHeight)  // bottom left
    context.lineTo(innerWidth,innerHeight)          // bottom right corner
    context.lineTo(innerWidth, innerHeight - pageInfo.triangleHeight) // top right
    context.fill()


    if (pageInfo.animation == 'close' && pageInfo.ratioModifier < 2.551) {  // dynamically clears screen
        pageInfo.ratioModifier += .01/pageInfo.speed
        requestAnimationFrame(drawTriangles)
        pageInfo.speed -= .0155     // changes global object so this builds
    }

    if (pageInfo.animation == 'open' && pageInfo.ratioModifier > pageInfo.stopDrawingAt) {  // dynamically clears screen
        pageInfo.ratioModifier -= .01/pageInfo.speed
        requestAnimationFrame(drawTriangles)
        pageInfo.speed -= .001
        // cl(pageInfo.animation, pageInfo.ratioModifier)

    }
}

function drawText () {

    function dynamicFontSize (originalFontSize = 55, originalCanvsSize = 1360) {        // enter original design specs
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

    calculatedFont = dynamicFontSize(55, 1360)                              // original design specs
    distanceFromTop = dynamicHeightFromTop(80, 1360)

    context.font = (`${adjustedNonlinearFontSize}px ${currentFont}`)        //string creation

    context.fillStyle = pageInfo.textColor                                  
    context.fillText('Luke Wilcox', 10, distanceFromTop)                    // statix x, dynamic y
    
    scaledDownRatio = .6                                                    // set subheadings as ratio of main heading // this is a hack Jason
    context.font = (`${adjustedNonlinearFontSize*scaledDownRatio}px ${currentFont}`) //smaller font size for about me

    context.fillText('About Me', 10, distanceFromTop + calculatedFont)      // place it beneath 'luke wilcox'

                    // calculate clickable box coordinates

    pageInfo.clickableBox.x = 10                                    // this one's easy!
    pageInfo.clickableBox.y = distanceFromTop + calculatedFont      // I think this is right
    pageInfo.clickableBox.dx = pageInfo.clickableBox.x + (8*1)      // length of text times some fraction of calculated font size (cfs)
    pageInfo.clickableBox.dy = pageInfo.clickableBox.y + 0          // multiply by some fraction of cfs

}   // end drawText

    function openingAnimation () {
        pageInfo.ratioModifier = 2.55        // fully black
        pageInfo.stopDrawingAt = 1.2
        animation = open
        drawTriangles()

    }

    drawForegroundImage()
    openingAnimation()
    // drawTriangles()
    drawText()

}   // end drawScreen wrapper
}   // end onload wrapper