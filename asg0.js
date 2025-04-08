
function main() {
    // Retrieve <canvas> element
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    // Get the rendering context for 2DCG
    var ctx = canvas.getContext('2d');

    // Draw a blue rectangle 
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a blue color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color

    let v1 = new Vector3();
    v1.elements[0] = 2.25;
    v1.elements[1] = 2.25;
    v1.elements[2] = 0;

    function drawVector(v, color) {
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo(canvas.width / 2 + v.elements[0] * 20, canvas.height / 2 - v.elements[1] * 20);
        ctx.strokeStyle = color;
        ctx.stroke();
    }

    function handleDrawEvent() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let v1_x = parseFloat(document.getElementById("v1_x").value);
        let v1_y = parseFloat(document.getElementById("v1_y").value);

        let v2_x = parseFloat(document.getElementById("v2_x").value);
        let v2_y = parseFloat(document.getElementById("v2_y").value);

        let vec1 = new Vector3([v1_x, v1_y, 0]);
        let vec2 = new Vector3([v2_x, v2_y, 0]);

        drawVector(vec1, "red");
        drawVector(vec2, "blue");
    }

    function handleDrawOperationEvent() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let v1_x = parseFloat(document.getElementById("v1_x").value);
        let v1_y = parseFloat(document.getElementById("v1_y").value);

        let v2_x = parseFloat(document.getElementById("v2_x").value);
        let v2_y = parseFloat(document.getElementById("v2_y").value);

        let vec1 = new Vector3([v1_x, v1_y, 0]);
        let vec2 = new Vector3([v2_x, v2_y, 0]);

        drawVector(vec1, "red");
        drawVector(vec2, "blue");

        let operation = document.getElementById("operation-select").value;
        let sc = parseFloat(document.getElementById("scalar").value);

        if (operation === "add") {
            let v3 = new Vector3();
            v3 = vec1.add(vec2);
            drawVector(v3, "green");
        } else if (operation === "sub") {
            let v3 = new Vector3();
            v3 = vec1.sub(vec2);
            drawVector(v3, "green");
        } else if (operation === "div") {
            let v3 = new Vector3();
            let v4 = new Vector3();

            v3 = vec1.div(sc);
            v4 = vec2.div(sc);

            drawVector(v3, "green");
            drawVector(v4, "green");
        } else if (operation === "mul") {
            let v3 = new Vector3();
            let v4 = new Vector3();

            v3 = vec1.mul(sc);
            v4 = vec2.mul(sc);

            drawVector(v3, "green");
            drawVector(v4, "green");
        } else if (operation === "mag") {
            let m1 = vec1.magnitude();
            let m2 = vec2.magnitude();

            console.log("Magnitude v1:", m1);
            console.log("Magnitude v2:", m2);
        } else if (operation === "norm") {
            let v3 = new Vector3();
            let v4 = new Vector3();

            v3 = vec1.normalize();
            v4 = vec2.normalize();

            drawVector(v3, "green");
            drawVector(v4, "green");
        } else if (operation === "angle") {
            angleBetween(vec1, vec2);
        } else if (operation === "area") {
            areaTriangle(vec1, vec2);
        }
    }

    function angleBetween(v1, v2) {
        let angle = Math.acos(Vector3.dot(v1, v2) / (v1.magnitude() * v2.magnitude()));
        let inDegrees = angle * (180/Math.PI);

        console.log("Angle:", inDegrees);
    }

    function areaTriangle(v1, v2) {
        let v3 = new Vector3();
        v3 = Vector3.cross(v1, v2);
        let area = v3.magnitude() / 2;
        console.log("Area of the triangle:", area);
    }

    drawVector(v1, "red");

    window.handleDrawEvent = handleDrawEvent;
    window.handleDrawOperationEvent = handleDrawOperationEvent;
    window.angleBetween = angleBetween;
    window.areaTriangle = areaTriangle;
}


