
var canvas = document.getElementById("main");
var ctx = canvas.getContext("2d");

// Please enter your name here
var YOUR_NAME = "Garrett";

var painting = [];

function savePainting() {
    firebase.database().ref('/' + YOUR_NAME).set({
        paintingData: painting
    });
}

canvas.addEventListener('mousemove', function(event) {
    var mouseX = event.clientX;
    var mouseY = event.clientY;

    painting.push([mouseX, mouseY]);
    
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, RADIUS, 0, 2 * Math.PI);
    ctx.stroke();
});

function loadPainting() {
    var ref = firebase.database().ref('/' + YOUR_NAME);
    
    // whenever the data loads
    ref.on("value", function(snapshot) {

        // draw all the circles stored in the database
        snapshot.val().paintingData.forEach(function(circle) {
            ctx.beginPath();
            ctx.arc(circle[0], circle[1], RADIUS, 0, 2 * Math.PI);
            ctx.stroke();
        })
    });
}
