export default () => {
  const NUMBER_OF_CIRCLES = 100
  const SCALE = 1.05
  const DELAY = 1.3

  let universe = document.getElementById('universe')

  let targetX = window.innerWidth / 2
  let targetY = window.innerHeight / 2

  let circles = []

  const Circle = function(element) {
    this.element = element
    this.hue = null
    this.x = null
    this.y = null
    this.scaleLevel = 1
  }

  Circle.prototype.transform = function() {
    let translate = 'translate(' + this.x + ', ' + this.y + ')'
    let scale = 'scale(' + this.scaleLevel + ', ' + this.scaleLevel + ')'

    let t = translate + ' ' + scale
    this.element.setAttribute('transform', t)
  }

  Circle.prototype.scale = function(scale) {
    this.scaleLevel = scale
    this.transform()
  }

  Circle.prototype.translate = function(x, y) {
    this.x = x
    this.y = y
    this.transform()
  }

  Circle.prototype.setHue = function(hue) {
    this.hue = hue
    this.element.style.fill = 'hsl(' + hue + ', 80%, 40%)'
  }

  // Keep track of the pointer
  // window.onmousemove = function(event) {

  //   targetX = event.clientX
  //   targetY = event.clientY
  // }

  function buildTunnel(count) {
    let original = document.getElementsByClassName('circle')[0]
    let svg = document.querySelector('.svg-wrapper > svg')

    for (let i = 0; i < count; i++) {
      let element = original.cloneNode(true)
      svg.appendChild(element)

      let circle = new Circle(element)
      circle.scale(Math.pow(SCALE, i + 1))
      circle.setHue((i * 5) % 360)

      let box = circle.element.getBBox()
      let x = targetX - (box.width * circle.scaleLevel) / 2
      let y = targetY - (box.height * circle.scaleLevel) / 2

      circle.translate(x, y)

      circles.push(circle)
    }

    svg.removeChild(original)
  }

  function warp() {
    // Twinkling stars
    universe.style.opacity = Math.random() * (1 - 0.75) + 0.75

    // Move the stars when flying
    universe.style.backgroundPosition = -targetX + 'px ' + -targetY + 'px'

    // Store the new target
    // oldTargetX = targetX
    // oldTargetY = targetY

    for (let i = 0; i < circles.length; i++) {
      let circle = circles[i]

      let box = circle.element.getBBox()

      // Work out the transforms
      let x2 = targetX - (box.width * circle.scaleLevel) / 2
      let y2 = targetY - (box.height * circle.scaleLevel) / 2

      // Smoothe it out a little
      let speed = (i + 1) * DELAY
      x2 = circle.x + (x2 - circle.x) / speed
      y2 = circle.y + (y2 - circle.y) / speed

      circle.translate(x2, y2)

      circle.setHue((circle.hue - 5) % 360)
    }
  }

  buildTunnel(NUMBER_OF_CIRCLES)

  setInterval(function() {
    warp()
    // counter++
  }, 50)
}
