const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/face-emoji/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/face-emoji/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/face-emoji/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/face-emoji/models')
]).then(startVideo)

function startVideo() {
  navigator.MediaDevices.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.getElementById("wraper").append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    console.log(detections[0].expressions) 
    if(detections[0] && detections[0].expressions){
      var detectionsAry = Object.entries(detections[0].expressions);
      detectionsAry.sort(function(a, b){return b[1]-a[1]})
      console.log(faceapi)
      document.getElementById("mood").className = detectionsAry[0][0];
      document.getElementById("mood-label").innerText = detectionsAry[0][0]
    }else{
      document.getElementById("mood").className = "";
    }
  }, 1000)
})