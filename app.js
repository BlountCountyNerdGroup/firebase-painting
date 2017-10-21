var canvas = document.getElementById("main");
var ctx = canvas.getContext("2d");

// Please enter your name here
var YOUR_NAME = "Garrett";

var painting = [];
var RADIUS = 10;
var mouseY;
var mouseX;
var mouseDown = false;
var COLOR = "black";

function savePainting() {
    firebase.database().ref('/' + YOUR_NAME).set({
        paintingData: painting
    });
}

function loadPainting() {
    var ref = firebase.database().ref('/' + YOUR_NAME);
    
    // whenever the data loads
    ref.on("value", function(snapshot) {

        // draw all the circles stored in the database
        snapshot.val().paintingData.forEach(function(circle) {
            ctx.beginPath();
            ctx.arc(circle[0], circle[1], RADIUS, 0, 2 * Math.PI);
            ctx.fillStyle = COLOR;
            ctx.fill();
            ctx.stroke();
        })
    }, function (error) {
       console.log("Error: " + error.code);
    });
}

canvas.addEventListener('mousemove', function(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;

    if (mouseDown) {
        painting.push([mouseX, mouseY]);
        
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, RADIUS, 0, 2 * Math.PI);
        ctx.fillStyle = COLOR;
        ctx.fill();
        ctx.stroke();
    }
})

canvas.addEventListener('mousedown', function() {
    mouseDown = true;
});

canvas.addEventListener('mouseup', function() {
    mouseDown = false;
})
