const ids = []
function getRandomId () {
  const id = getRandomNumberForRange(1, 100000)
  if (ids.includes(id)) {
    return getRandomId()
  } else {
    ids.push(id)
  }
  return id
}

function getRandomNumberForRange (min, max) {
  return Math.floor(Math.random() * (max - min) + min )
}

function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function mergeColorsWithWeight ({ firstColor, secondColor, weight }) {
  const [rA, gA, bA] = firstColor.match(/\w\w/g).map((c) => parseInt(c, 16));
  const [rB, gB, bB] = secondColor.match(/\w\w/g).map((c) => parseInt(c, 16));
  const r = Math.round(rA + (rB - rA) * weight).toString(16).padStart(2, '0');
  const g = Math.round(gA + (gB - gA) * weight).toString(16).padStart(2, '0');
  const b = Math.round(bA + (bB - bA) * weight).toString(16).padStart(2, '0');
  return '#' + r + g + b;
}

function getContrastColorForBackgroundColor (backgroundColor) {
  const [r, g, b] = backgroundColor.match(/\w\w/g).map((c) => parseInt(c, 16));
  const contrastRatio = (r*0.299 + g*0.587 + b*0.114)

  return contrastRatio >= 150 ? '#000000':  '#ffffff'
}