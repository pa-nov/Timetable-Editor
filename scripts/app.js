const frames = ["times", "lessons", "timetable", "json"]

function openEditor() {
  document.getElementById("window-start").style.display = "none"
  document.getElementById("window-main").style.display = "flex"
}
function openFrame(frameIndex) {
  for (let i = 0; i < frames.length; i++) {
    if (i == frameIndex) {
      document.getElementById("button-" + frames[i]).className = ""
      document.getElementById("frame-" + frames[i]).style.display = "flex"
    } else {
      document.getElementById("button-" + frames[i]).className = "not-selected"
      document.getElementById("frame-" + frames[i]).style.display = "none"
    }
  }
}

document.getElementById("button-create").addEventListener("click", () => {
  openEditor()
  openFrame(0)
})
document.getElementById("button-open").addEventListener("click", () => {
  openEditor()
  openFrame(2)
})
document.getElementById("button-times").addEventListener("click", () => { openFrame(0) })
document.getElementById("button-lessons").addEventListener("click", () => { openFrame(1) })
document.getElementById("button-timetable").addEventListener("click", () => { openFrame(2) })
document.getElementById("button-json").addEventListener("click", () => { openFrame(3) })
