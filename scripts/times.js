const inputTimesCount = document.getElementById("input-times-count")
const inputInitialIndex = document.getElementById("input-initial-index")
const tableTimes = document.getElementById("table-times-body")
const rowTime = document.getElementById("row-time")
let timesRows = []

function resizeTimes(timesCount) {
  while (timesCount < timesRows.length) {
    timesRows.pop().remove()
  }

  while (timesCount > timesRows.length) {
    let newRow = rowTime.cloneNode(true)
    newRow.removeAttribute("id")
    timesRows.push(tableTimes.appendChild(newRow))
  }

  updateInitialIndex(parseInt(inputInitialIndex.value))
}

function updateInitialIndex(initialIndex) {
  timesRows.forEach((row, index) => {
    row.children[0].children[0].value = initialIndex + index
  })
}

function setTimes(times) {
  inputTimesCount.value = times.length
  inputTimesCount.dispatchEvent(new Event("change"))

  timesRows.forEach((row, index) => {
    row.children[1].children[0].value = parseInt(times[index][0])
    row.children[2].children[0].value = parseInt(times[index][1])
    row.children[3].children[0].value = parseInt(times[index][2])
    row.children[4].children[0].value = parseInt(times[index][3])

    row.children[1].children[0].dispatchEvent(new Event("change"))
    row.children[2].children[0].dispatchEvent(new Event("change"))
    row.children[3].children[0].dispatchEvent(new Event("change"))
    row.children[4].children[0].dispatchEvent(new Event("change"))
  })
}

function getTimes() {
  let times = []

  timesRows.forEach((row) => {
    let time = {}

    time["start"] = {}
    time["start"]["hour"] = parseInt(row.children[1].children[0].value)
    time["start"]["minute"] = parseInt(row.children[2].children[0].value)

    time["end"] = {}
    time["end"]["hour"] = parseInt(row.children[3].children[0].value)
    time["end"]["minute"] = parseInt(row.children[4].children[0].value)

    times.push(time)
  })

  return times
}

resizeTimes(parseInt(inputTimesCount.value))
inputTimesCount.addEventListener("change", () => { resizeTimes(parseInt(inputTimesCount.value)) })
inputInitialIndex.addEventListener("change", () => { updateInitialIndex(parseInt(inputInitialIndex.value)) })
