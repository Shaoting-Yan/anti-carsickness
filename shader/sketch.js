let blurRenderer

function setup() {
  createCanvas(400, 400, WEBGL)
  blurRenderer = createGaussianBlurRenderer()
  blurRenderer.setIntensity(0.15)
  blurRenderer.setSamples(20)
  blurRenderer.setDof(50)
}

function draw() {
  blurRenderer.draw(() => {
    clear()
    push()
    background(255)
    noStroke()
    lights()

    push()
    fill('blue')
    translate(-80, -80, -300)
    blurRenderer.focusHere()
    sphere(50)
    pop()

    push()
    fill('red')
    sphere(50)
    pop()
    pop()
  })
}
