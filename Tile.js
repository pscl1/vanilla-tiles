class Tile {
  constructor ({ length, positionX, positionY, color }) {
    this.id = 'tile_' + getRandomId()
    length = length || getRandomNumberForRange(60, 200)
    this.height = length
    this.width = length
    this.x = positionX || getRandomNumberForRange(30, window.innerWidth - this.width)
    this.y = positionY || getRandomNumberForRange(10, window.innerHeight - this.height)
    this.color = color || getRandomColor()
    this.fontColor = getContrastColorForBackgroundColor(this.color)
  }

  get edgeLength () {
    return this.height
  }

  set edgeLength (value) {
    this.height = value
    this.width = value
  }

  get positionX () {
    return this.x
  }

  get positionY () {
    return this.y
  }

  set positionX (value) {
    this.x = value
  }

  set positionY (value) {
    this.y = value
  }

  get tileColor () {
    return this.color
  }

  set tileColor (value) {
    this.color = value
  }

  computeSize () {
    return this.height * this.width
  }

  randomizePosition () {
    this.x = getRandomNumberForRange(30, window.innerWidth - this.width)
    this.y = getRandomNumberForRange(10, window.innerHeight - this.height)
  }

  contains (x, y) {
    return this.x <= x && x <= this.x + this.width &&
      this.y <= y && y <= this.y + this.height
  }

  removeTile () {
    const element = document.getElementById(this.id)
    if (element) element.remove()
  }

  getHTML () {
    return (
      `<div class="tile"
            id="${this.id}"
            ondblclick="splitTileIntoTwoFragments(this.id)"
            style="left: ${this.x}px; top: ${this.y}px; width: ${this.width}px; height: ${this.height}px; background-color: ${this.color}; color: ${this.fontColor}"
      >
        <div id="txt_${this.id}" class="tileText">${this.computeSize()}px²</div>
      </div>`
    )
  }

  render () {
    const elementToChange = document.getElementById(this.id)
    elementToChange.style.backgroundColor = this.color
    elementToChange.style.width = this.width + 'px'
    elementToChange.style.height = this.height + 'px'
    elementToChange.style.left = this.x + 'px'
    elementToChange.style.top = this.y + 'px'

    const textElement = document.getElementById(`txt_${this.id}`)
    textElement.innerText = this.computeSize() + 'px²'
  }
}
