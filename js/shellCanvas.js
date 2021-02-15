const cl = console.log;
/*  Homepage for Luke Wilcox - my super genius nephew :)
    Built with dynamic full-screen resizing on canvas 
    by Dr Freudjr https://drfreudjr.github.io
 */

 pageInfo = {                           // Global object
    backgroundColor : '#000800',        // triangle color
    backgroundImage : "bostonSat.webp",
    textColor : '#7aa600',              // vestigal // green pulled from picture
    GOLDENRATIO :.382,                  // The golden ratio is peaceful 
    ratioModifier : 1.2,                // how wide window opens 0 is no triangles  2.551 is erasure
    triangleWidth : null,               // calculated in drawTriangle function call based on above
    triangleHeight : null,
    animation : 'open',                 // animation style
    speed : .2,                          // speed at which triangles change decimal is faster
    stopDrawingAt: null,
    levelOneHeader: "Luke Wilcox",
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
    }
}

// // Text

    function dynamicFontSize (originalFontSize = 50, originalCanvasSize = 1360) {        // converts original design specs
        percentOfFullSize = innerWidth/originalCanvasSize                                
        adjustedLinearFontSize = originalFontSize*percentOfFullSize                     //linear transform
        adjustedNonlinearFontSize = originalFontSize /(1-Math.log(percentOfFullSize))   //nonlinear transform
        return(adjustedNonlinearFontSize)
    }

    function drawForegroundImage () {           //Canvas way of drawing image
        const backgroundImage = new Image()                   
        backgroundImage.src = pageInfo.backgroundImage
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
            nameEl.innerHTML = pageInfo.levelOneHeader;
            nameEl.style.fontSize = dynamicFontSize() + 'px'
            document.body.appendChild(nameEl)
        }
        drawName()
    }

    function createNavOne () {
        if (document.querySelector('#navOneStyle')) // avoid double writing
            (function removeElement () {
                const navOneEl = document.querySelector('#navOneStyle');
                navOneEl.parentNode.removeChild(navOneEl);
            }())

        function drawNavOne () {
            let navOneEl = document.createElement('div');
            navOneEl.id = 'navOneStyle';
            navOneEl.innerHTML = pageInfo.navOneContent;
            navOneEl.style.fontSize = dynamicFontSize()*0.6 + 'px' // 0.6 hack
            document.body.appendChild(navOneEl)
        }
        drawNavOne()
    }

    function openingAnimation () {

        (function drawSolidBackground () {
            context.strokeStyle = pageInfo.backgroundColor
            context.fillRect(0,0,canvas.width,canvas.height)
        }())

        function drawLine (i=256) {
            context.strokeStyle = `rgb(${i},${i},${i})`
            context.lineWidth = 1
            context.lineCap = 'square'
            context.beginPath()
            context.moveTo(0,innerHeight)
            context.lineTo(innerWidth,0)
            context.stroke()
            context.closePath()
        }
        drawLine(256)

        function openWindow () {
            pageInfo.ratioModifier = 2.55        // fully black
            pageInfo.stopDrawingAt = 1.2
            animation = open
            setTimeout(drawTriangles,1000)
        }
        openWindow()
    }

openingAnimation()
cl(pageInfo.drawOpeningAnimation)
if (pageInfo.drawOpeningAnimation) {
    setTimeout(createName, 2300)    //delay display 1st time only
    setTimeout(createNavOne, 4000)
}
else {
    setTimeout(createName, 0)
    setTimeout(createNavOne, 0)    
}

pageInfo.drawOpeningAnimation = false

}   // end drawScreen wrapper
}   // end onload wrapper