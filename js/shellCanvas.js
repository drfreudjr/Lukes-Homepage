const cl = console.log;
/*  Homeglobal for Luke Wilcox - my super genius nephew :)
    Built with dynamic full-screen resizing on canvas 
    by drfreudjr https://drfreudjr.github.io
 */

 global = {  
    backgroundImage : "bostonSat.webp",                         
    triangleColor : '#000800',        // triangle color
    textColor : '#7aa600',              // vestigal // green pulled from picture
    GOLDENRATIO :.382,                  // The golden ratio is peaceful 
    ratioModifier : 1.2,                // how wide window opens 0 is no triangles  2.551 is erasure
    animation : 'open',                 // animation style
    speed : .2,                          // speed at which triangles change decimal is faster
    levelOneHeader: "Luke Wilcox",
    navOneContent: "About Me",
    drawOpeningAnimation: true,
    triangleWidth : null,               // calculated in drawTriangle function call based on above
    triangleHeight : null,
    stopDrawingAt: null,
}

window.onload = function () {           // onload wrapper

var canvas;                             

// // Begin dynamic fulls screen canvas code

fullScreenCanvas()

function fullScreenCanvas() {
    addEventListener("resize", sizeCanvas); // resize canvas and redraw on window size change

    sizeCanvas()                            

    function sizeCanvas () {               
        if (canvas === undefined) {         
            canvas = createCanvas();        
           context = canvas.getContext("2d");  
        }
        canvas.width  = innerWidth; 
        canvas.height = innerHeight; 
        drawScreen()     
    }

    function createCanvas () {   
       const canvas = document.createElement("canvas"); 
       canvas.style.position = "absolute"; 
       canvas.style.left     = "0px";      
       canvas.style.top      = "0px";
       document.body.appendChild(canvas);  // Add to document
    return canvas;
    }

}

// // page-specific code

function drawScreen() {  // wrapper that gets called on resize event

function drawTriangles () { 

    context.drawImage(c, 0, 0)  // redraw bg image when subtracting rectangles
    global.finalRatio = global.GOLDENRATIO*global.ratioModifier
    global.triangleWidth = Math.round(innerWidth*global.finalRatio)         // set horizontal distance from top left
    global.triangleHeight = Math.round(innerHeight*global.finalRatio)       // set vertical distance from top left

    context.fillStyle = global.triangleColor    // draw top triangle
    context.beginPath()             
    context.moveTo(global.triangleWidth, 0)       // top right
    context.lineTo(0,0)                             // top left corner
    context.lineTo(0, global.triangleHeight)      // bottom left
    context.fill()                                  // draw (last path is implicit)

    context.beginPath()                             // draw bottom triangle
    context.moveTo(innerWidth - global.triangleWidth, innerHeight)  // bottom left
    context.lineTo(innerWidth,innerHeight)          // bottom right corner
    context.lineTo(innerWidth, innerHeight - global.triangleHeight) // top right
    context.fill()


    if (global.animation == 'close' && global.ratioModifier < 2.551) {  // dynamically clears screen
        global.ratioModifier += .01/global.speed
        requestAnimationFrame(drawTriangles)
        global.speed -= .0155     // changes global object so this builds
    }

    if (global.animation == 'open' && global.ratioModifier > global.stopDrawingAt) {  // dynamically clears screen
        global.ratioModifier -= .01/global.speed
        requestAnimationFrame(drawTriangles)
        global.speed -= .001
    }
}

// Text

    function dynamicFontSize (originalFontSize = 50, originalCanvasSize = 1360) {        // converts original design specs
        percentOfFullSize = innerWidth/originalCanvasSize                                
        adjustedLinearFontSize = originalFontSize*percentOfFullSize                     //linear transform
        adjustedNonlinearFontSize = originalFontSize /(1-Math.log(percentOfFullSize))   //nonlinear transform
        return(adjustedNonlinearFontSize)
    }

    function drawForegroundImage () {           //Canvas way of drawing image
        const backgroundImage = new Image()                   
        backgroundImage.src = global.backgroundImage
        context.drawImage(c, 0, 0)
    }

    function createName () {
        if (document.querySelector('#nameStyle')) // avoid double writing
            (function removeElement () {
                const elem = document.querySelector('#nameStyle');
                elem.parentNode.removeChild(elem);
            }())

        function drawName () {
            let nameEl = document.createElement('div');
            nameEl.id = 'nameStyle';
            nameEl.innerHTML = global.levelOneHeader;
            nameEl.style.fontSize = dynamicFontSize() + 'px'
            document.body.appendChild(nameEl)
        }
        drawName()
    }

    function createNavOne () {
        if (document.querySelector('#navOneStyle')) // remove old writing
            (function removeElement () {
                const navOneEl = document.querySelector('#navOneStyle');
                navOneEl.parentNode.removeChild(navOneEl);
            }())

        function drawNavOne () {
            let navOneEl = document.createElement('div');
            navOneEl.id = 'navOneStyle';
            navOneEl.innerHTML = global.navOneContent;
            navOneEl.style.fontSize = dynamicFontSize()*0.6 + 'px' // 0.6 hack
            document.body.appendChild(navOneEl)
        }
        drawNavOne()
    }

    function openingAnimation () {

        (function drawSolidBackground () {
            context.strokeStyle = global.triangleColor
            context.fillRect(0,0,canvas.width,canvas.height)
        }())

        function drawLine (r= 256, g= 256, b=256) {
            context.strokeStyle = `rgb(${r},${g},${b})`
            context.lineWidth = 1
            context.lineCap = 'square'
            context.beginPath()
            context.moveTo(0,innerHeight)
            context.lineTo(innerWidth,0)
            context.stroke()
            context.closePath()
        }
        drawLine()

        function openWindow () {
            global.ratioModifier = 2.55        // fully black
            global.stopDrawingAt = 1.2
            animation = open
            setTimeout(drawTriangles,1000)
        }
        openWindow()
    }

openingAnimation()

cl(global.drawOpeningAnimation)
if (global.drawOpeningAnimation) {
    setTimeout(createName, 2300)    //delay display 1st time only
    setTimeout(createNavOne, 4000)
}
else {
    setTimeout(createName, 0)
    setTimeout(createNavOne, 0)    
}

global.drawOpeningAnimation = false   

}   // end drawScreen wrapper
}   // end onload wrapper