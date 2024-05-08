const rowTime = document.getElementById("row-time")
let timesRows = []

function resizeTimes() {
  const timesCount = parseInt(document.getElementById("input-times-count").value)

  while (timesCount < timesRows.length) {
    timesRows.pop().remove()
  }
  while (timesCount > timesRows.length) {
    let newRow = rowTime.cloneNode(true)
    newRow.removeAttribute("id")
    newRow.removeAttribute("style")
    rowTime.parentNode.appendChild(newRow)
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

function getTimes() {
  const timesCount = parseInt(document.getElementById("input-times-count").value)
  let times = []

  for (let i = 0; i < timesCount; i++) {
    let time = {}

    time["start"] = {}
    time["start"]["hour"] = parseInt(timesRows[i].children[1].children[0].value)
    time["start"]["minute"] = parseInt(timesRows[i].children[2].children[0].value)

    time["end"] = {}
    time["end"]["hour"] = parseInt(timesRows[i].children[3].children[0].value)
    time["end"]["minute"] = parseInt(timesRows[i].children[4].children[0].value)

    times.push(time)
  }

  return times
}

resizeTimes()
document.getElementById("input-times-count").addEventListener("input", resizeTimes)
document.getElementById("input-initial-index").addEventListener("input", updateInitialIndex)
