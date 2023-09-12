// Get the canvas element and context
const canvas = document.getElementById("signature-pad");
const ctx = canvas.getContext("2d");

// Variables to track the drawing state
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Start drawing when the user clicks or touches the canvas
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [
    e.clientX - canvas.getBoundingClientRect().left,
    e.clientY - canvas.getBoundingClientRect().top,
  ];
});

canvas.addEventListener("touchstart", (e) => {
  isDrawing = true;
  [lastX, lastY] = [
    e.touches[0].clientX - canvas.getBoundingClientRect().left,
    e.touches[0].clientY - canvas.getBoundingClientRect().top,
  ];
});

// Continue drawing as the user moves the mouse or finger
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("touchmove", draw);

// Stop drawing when the user releases the mouse button or finger
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("touchend", () => (isDrawing = false));

// Function to draw a line
function draw(e) {
  if (!isDrawing) return;

  const [x, y] = [
    e.clientX - canvas.getBoundingClientRect().left,
    e.clientY - canvas.getBoundingClientRect().top,
  ];

  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();

  [lastX, lastY] = [x, y];
}

// Clear the canvas when the clear button is clicked
const clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Function to download the signature as an image
function downloadSignature() {
  // Create a data URL from the canvas content
  const imageDataURL = canvas.toDataURL("image/png");

  // Create a link element for downloading
  const downloadLink = document.createElement("a");
  downloadLink.href = imageDataURL;
  downloadLink.download = "signature.png"; // Specify the file name

  // Simulate a click on the download link to trigger the download
  downloadLink.click();
}

// Attach a click event listener to the "Download" button
const downloadButton = document.getElementById("download-button");
downloadButton.addEventListener("click", downloadSignature);
