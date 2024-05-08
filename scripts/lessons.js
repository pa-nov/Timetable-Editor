const rowLesson = document.getElementById("row-lesson")
let lessonsRows = []

function resizeLessons(lessonsCount) {
  while (lessonsCount < lessonsRows.length) {
    removeLesson(lessonsRows.length - 1)
  }
  while (lessonsCount > lessonsRows.length) {
    addLesson()
  }
}

function addLesson() {
  const lessonIndex = lessonsRows.length
  let newRow = rowLesson.cloneNode(true)

  newRow.removeAttribute("id")
  newRow.removeAttribute("style")
  newRow.children[0].children[0].value = lessonIndex
  newRow.children[7].children[0].addEventListener("click", () => { removeLesson(lessonIndex) })

  rowLesson.parentNode.appendChild(newRow)
  lessonsRows.push(newRow)
}

function removeLesson(lessonIndex) {
  lessonsRows.splice(lessonIndex, 1)[0].remove()
  for (let i = lessonIndex; i < lessonsRows.length; i++) {
    lessonsRows[i].children[0].children[0].value = i
    lessonsRows[i].children[7].children[0].replaceWith(lessonsRows[i].children[7].children[0].cloneNode(true))
    lessonsRows[i].children[7].children[0].addEventListener("click", () => { removeLesson(i) })
  }
}

{
  let newRow = rowLesson.cloneNode(true)

  newRow.removeAttribute("id")
  newRow.removeAttribute("style")
  newRow.children[0].children[0].value = "0"
  newRow.children[1].children[0].value = "Null"
  newRow.children[2].children[0].value = "0"
  newRow.children[3].children[0].value = "Null"
  newRow.children[4].children[0].value = "Null"
  newRow.children[5].children[0].value = "Null"
  newRow.children[6].children[0].value = "0, 0"
  newRow.children[7].children[0].innerHTML = ""

  rowLesson.parentNode.appendChild(newRow)
  lessonsRows.push(newRow)
}

document.getElementById("button-add-lesson").addEventListener("click", addLesson)
