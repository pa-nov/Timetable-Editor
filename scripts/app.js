const buttons = [
  document.getElementById("button-times"),
  document.getElementById("button-lessons"),
  document.getElementById("button-timetable"),
  document.getElementById("button-json")
]
const frames = [
  document.getElementById("frame-times"),
  document.getElementById("frame-lessons"),
  document.getElementById("frame-timetable"),
  document.getElementById("frame-json")
]
let selectedFrame = -1

function openEditor() {
  document.getElementById("window-start").style.display = "none"
  document.getElementById("window-main").style.display = "flex"
}

function openFrame(frameIndex) {
  if (frameIndex == 2 && selectedFrame != 2) {
    updateLessonsPopup()
    resizeTimetable()
    updateTimetableHead()
    updateTimetableBody()
  }
  if (frameIndex == 3 && selectedFrame != 3) {
    // Generate JSON
  }
  if (selectedFrame == 3 && frameIndex != 3) {
    // Read JSON
  }

  for (let i = 0; i < frames.length; i++) {
    if (i == frameIndex) {
      buttons[i].className = "selected"
      frames[i].style.display = "flex"
    } else {
      buttons[i].className = "not-selected"
      frames[i].style.display = "none"
    }
  }
  selectedFrame = frameIndex
}

document.getElementById("button-create").addEventListener("click", () => {
  openEditor()
  openFrame(0)
})
document.getElementById("button-open").addEventListener("click", () => {
  openEditor()
  openFrame(2)
})
buttons[0].addEventListener("click", () => { openFrame(0) })
buttons[1].addEventListener("click", () => { openFrame(1) })
buttons[2].addEventListener("click", () => { openFrame(2) })
buttons[3].addEventListener("click", () => { openFrame(3) })
