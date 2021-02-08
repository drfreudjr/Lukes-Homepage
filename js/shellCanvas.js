const cl = console.log;
/*  Homepage for Luke Wilcox - my super genius nephew :)
    Built on 190% canvas with dynamic full-screen resizing
    by Dr Freudjr https://drfreudjr.github.io/

    Doing mouse actions on canvas was super ridiculous; vtrying to find click box almost impossible
    Page now writing over the canvas with text css; btw which only works when absolute position
    otherwise behind canvas element. you need to always set this
 */

 pageInfo = {                           // Global object
    backgroundColor : '#111111',        // triangle color
    backgroundImage : "bostonSat.webp",
    textColor : '#7aa600',              // vestigal // green pulled from picture
    GOLDENRATIO :.382,                  // The golden ratio is peaceful 
    ratioModifier : 1.2,                // 0 is no triangles  2.551 is erasure
    triangleWidth : null,               // these are calculated in first drawTriangle function call
    triangleHeight : null,
    animation : 'open',                 // animation style
    speed : 1,                          // speed at which triangles change
    stopDrawingAt: null,
    whoAmI: "Luke Wilcox",
    navOneContent: "About Me",
    drawOpeningAnimation: true,
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

// // Text

    function dynamicFontSize (originalFontSize = 50, originalCanvsSize = 1360) {        // enter original design specs
        percentOfFullSize = innerWidth/originalCanvsSize                                
        adjustedLinearFontSize = originalFontSize*percentOfFullSize                     //linear transform
        adjustedNonlinearFontSize = originalFontSize /(1-Math.log(percentOfFullSize))   //nonlinear transform
        return(adjustedNonlinearFontSize)
    }

    // function dynamicHeightFromTop (originalDistanceFromTop = 80, originalCanvsSize = 1360) { // scales vertically
    //     percentOfFullSize = innerWidth/originalCanvsSize
    //     adjustedDistanceFromTop = originalDistanceFromTop*percentOfFullSize
    //     return(adjustedDistanceFromTop)
    // }  // archive this code


    function openingAnimation () {
        pageInfo.ratioModifier = 2.55        // fully black
        pageInfo.stopDrawingAt = 1.2
        animation = open
        drawTriangles()

    }

    function drawSolidBackground () {
        context.strokeStyle = pageInfo.backgroundColor
        context.fillRect(0,0,canvas.width,canvas.height)
    }

    drawSolidBackground()
    // drawForegroundImage()
    cl(pageInfo.drawOpeningAnimation)
    if (pageInfo.drawOpeningAnimation = true) {
        pageInfo.drawOpeningAnimation = false   // flag for only doing this once
        setTimeout (openingAnimation, 0)      // not working
    }

    // drawTriangles()
    // setTimeout (drawText, 3000)

function createName () {
        if (document.querySelector('#nameStyle')) {     // remove element if exists in case of redraw
            const elem = document.querySelector('#nameStyle');  // to do - move this from the delay
            elem.parentNode.removeChild(elem);
        }

        let name = document.createElement('div');
        name.id = 'nameStyle';
        name.innerHTML = pageInfo.whoAmI;
        name.style.fontSize = dynamicFontSize() + 'px'
        document.body.appendChild(name)
}

function createNav1 () {
        if (document.querySelector('#navOneStyle')) {     // remove element if exists in case of redraw
            const elem = document.querySelector('#navOneStyle');
            elem.parentNode.removeChild(elem);
        }

        let navOne = document.createElement('div');
        navOne.id = 'navOneStyle';
        navOne.innerHTML = pageInfo.navOneContent;
        navOne.style.fontSize = dynamicFontSize()*0.6 + 'px' // 0.6 hack
        document.body.appendChild(navOne)
}


setTimeout(createName, 3500)
setTimeout(createNav1, 5100)


}   // end drawScreen wrapper
}   // end onload wrapper