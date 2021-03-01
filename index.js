let tiles = {}

function initiateDomHandlers () {
  let currentDomTile
  let offset

  document.addEventListener('mousedown', function (e) {
    cacheTileAndOffset(e)
  }, true)

  document.addEventListener('mouseup', function (event) {
    handleMergeTiles(event)
  }, true)

  document.addEventListener('mousemove', function (event) {
    handleMoveTile(event)
  }, true)

  const cacheTileAndOffset = (event) => {
    const { target } = event
    const { id } = target
    if (!id.startsWith('tile')) return

    currentDomTile = target

    offset = [
      target.offsetLeft - event.clientX,
      target.offsetTop - event.clientY
    ]
    currentDomTile.classList.add('active-tile')
  }

  const handleMergeTiles = (event) => {
    if (currentDomTile) {
      currentDomTile.classList.remove('active-tile')
      const id = currentDomTile.id
      currentDomTile = null

      const sourceTile = tiles[id]
      const mergeableTile = Object.values(tiles)
        .find(tile => tile.id !== sourceTile.id && tile.contains(event.clientX, event.clientY))

      if (sourceTile && mergeableTile) {
        const isSourceTileBigger = sourceTile.width > mergeableTile.width
        const mergedLength = sourceTile.edgeLength + mergeableTile.edgeLength
        const weight = !isSourceTileBigger ? sourceTile.edgeLength / (mergedLength) : mergeableTile.edgeLength / (mergedLength)

        mergeableTile.edgeLength = mergedLength
        mergeableTile.tileColor = mergeColorsWithWeight({
          firstColor: isSourceTileBigger ? sourceTile.color : mergeableTile.color,
          secondColor: isSourceTileBigger ? mergeableTile.color : sourceTile.color,
          weight
        })
        mergeableTile.render()
        removeTileFromList(sourceTile.id)
      }
    }
  }

  const handleMoveTile = (event) => {
    if (currentDomTile) {
      const currentTile = tiles[currentDomTile.id]
      let mousePosition = {
        x: event.clientX,
        y: event.clientY
      }
      currentTile.positionX = (mousePosition.x + offset[0])
      currentTile.positionY = (mousePosition.y + offset[1])
      currentTile.render()
    }
  }
}

function createTile ({ length, positionX, positionY, color }) {
  const tile = new Tile({ length, positionX, positionY, color })
  tiles[tile.id] = tile
  document.getElementById('main').innerHTML += tile.getHTML()
}

function splitTileIntoTwoFragments (id) {
  const currentTile = tiles[id]

  const totalLength = currentTile.edgeLength
  const newFirstLength = getRandomNumberForRange(60, totalLength - 60)
  const newSecondLength = totalLength - newFirstLength

  createTile({
    length: newSecondLength,
    positionX: Math.max(currentTile.positionX - newSecondLength - 20, 10),
    positionY: Math.max(currentTile.positionY - newSecondLength - 20, 10)
  })

  setTimeout(() => {
    currentTile.edgeLength = newFirstLength
    currentTile.render()
  }, 50)
}

function populateTiles () {
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      createTile({})
    }, getRandomNumberForRange(50, 2000))
  }
}

function onDropNodes () {
  for(const key in tiles) {
    tiles[key].positionY = window.innerHeight - tiles[key].edgeLength - 5
    tiles[key].render()
  }
}

function onShakeTiles () {
  for(const key in tiles) {
    tiles[key].randomizePosition()
    tiles[key].render()
  }
}

function removeTileFromList (id) {
  tiles[id].removeTile()
  delete tiles[id]
}

initiateDomHandlers()
