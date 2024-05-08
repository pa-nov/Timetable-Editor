const timetableHead = document.getElementById("timetable-head")
const timetableBody = document.getElementById("timetable-body")

function resizeTimetable() {
  const timesCount = timesRows.length
  const initialIndex = parseInt(document.getElementById("input-initial-index").value)

  while (timesCount < timetableHead.children.length - 2) {
    timetableHead.lastChild.remove()
    for (let i = 0; i < timetableBody.children.length; i++) {
      timetableBody.children[i].lastChild.remove()
    }
  }
  while (timesCount > timetableHead.children.length - 2) {
    const newHead = document.createElement("th")
    newHead.innerHTML = initialIndex + timetableHead.children.length - 2
    timetableHead.appendChild(newHead)

    for (let i = 0; i < timetableBody.children.length; i++) {
      const newBody = document.createElement("td")
      newBody.dataset.id = "0"
      timetableBody.children[i].appendChild(newBody)
    }
  }
}

function updateTimetableHead() {
  const initialIndex = parseInt(document.getElementById("input-initial-index").value)

  for (let i = 2; i < timetableHead.children.length; i++) {
    timetableHead.children[i].innerHTML = initialIndex + i - 2
  }
}
