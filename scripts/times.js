const timesRow = document.getElementById("row-times")
let timesRows = []

function resizeTimes() {
  timesCount = parseInt(document.getElementById("input-times-count").value)

  while (timesCount < timesRows.length) {
    timesRows.pop().remove()
  }
  while (timesCount > timesRows.length) {
    let newRow = timesRow.cloneNode(true)
    newRow.removeAttribute("id")
    newRow.removeAttribute("style")
    timesRow.parentNode.appendChild(newRow)
    timesRows.push(newRow)
  }

  updateInitialIndex()
}

function updateInitialIndex() {
  const initialIndex = parseInt(document.getElementById("input-initial-index").value)
  for (let i = 0; i < timesRows.length; i++) {
    timesRows[i].children[0].children[0].value = initialIndex + i
  }
}

resizeTimes()
document.getElementById("input-times-count").addEventListener("input", resizeTimes)
document.getElementById("input-initial-index").addEventListener("input", updateInitialIndex)
