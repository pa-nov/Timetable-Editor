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

function getLessons() {
  const lessonsCount = lessonsRows.length
  let lessons = []

  for (let i = 0; i < lessonsCount; i++) {
    let lesson = {}

    lesson["title"] = lessonsRows[i].children[1].children[0].value
    lesson["room"] = lessonsRows[i].children[2].children[0].value
    lesson["last_name"] = lessonsRows[i].children[3].children[0].value
    lesson["first_name"] = lessonsRows[i].children[4].children[0].value
    lesson["middle_name"] = lessonsRows[i].children[5].children[0].value
    lesson["other"] = []

    let others = lessonsRows[i].children[6].children[0].value.replace(/[^0-9]/gi, " ").replace(/  +/g, " ").split(" ")
    for (let ii = 0; ii < others.length; ii++) {
      const other = parseInt(others[ii])
      if (other > 0) {
        lesson["other"].push(other)
      }
    }

    lessons.push(lesson)
  }

  return lessons
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
