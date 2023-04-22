const video = document.getElementById("background-video");
const button = document.getElementById("play-button");

button.addEventListener("click", function() {
  if (video.paused) {
    video.play();
    button.innerHTML = "Pause Video";
  } else {
    video.pause();
    button.innerHTML = "Play Video";
  }
});

video.addEventListener("play", function() {
  document.body.style.background = "#000 url('path/to/video-thumbnail.jpg') no-repeat center center fixed";
  document.body.style.backgroundSize = "cover";
});

video.addEventListener("pause", function() {
  document.body.style.background = "#fff url('path/to/image.jpg') no-repeat center center fixed";
  document.body.style.backgroundSize = "cover";
});