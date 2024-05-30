const tableLessons = document.getElementById("table-lessons-body")
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
  newRow.children[0].children[0].value = lessonIndex
  newRow.children[7].children[0].addEventListener("click", () => { removeLesson(lessonIndex) })

  tableLessons.appendChild(newRow)
  lessonsRows.push(newRow)
}

function removeLesson(lessonIndex) {
  lessonsRows.splice(lessonIndex, 1)[0].remove()
  for (let index = lessonIndex; index < lessonsRows.length; index++) {
    lessonsRows[index].children[0].children[0].value = index
    lessonsRows[index].children[7].children[0].replaceWith(lessonsRows[index].children[7].children[0].cloneNode(true))
    lessonsRows[index].children[7].children[0].addEventListener("click", () => { removeLesson(index) })
  }
}

function getLessons() {
  let lessons = []

  lessonsRows.forEach((row) => {
    let lesson = {}

    lesson["title"] = row.children[1].children[0].value
    lesson["room"] = row.children[2].children[0].value
    lesson["last_name"] = row.children[3].children[0].value
    lesson["first_name"] = row.children[4].children[0].value
    lesson["middle_name"] = row.children[5].children[0].value
    lesson["other"] = []

    row.children[6].children[0].value.replace(/[^0-9]/gi, " ").replace(/  +/g, " ").split(" ").forEach((other) => {
      other = parseInt(other)
      if (other > 0) {
        lesson["other"].push(other)
      }
    })

    lessons.push(lesson)
  })

  return lessons
}

{
  let newRow = rowLesson.cloneNode(true)

  newRow.removeAttribute("id")
  newRow.children[1].children[0].disabled = "disabled"
  newRow.children[2].children[0].disabled = "disabled"
  newRow.children[3].children[0].disabled = "disabled"
  newRow.children[4].children[0].disabled = "disabled"
  newRow.children[5].children[0].disabled = "disabled"
  newRow.children[6].children[0].disabled = "disabled"

  newRow.children[0].children[0].value = "0"
  newRow.children[1].children[0].value = "Null"
  newRow.children[2].children[0].value = "0"
  newRow.children[3].children[0].value = "Null"
  newRow.children[4].children[0].value = "Null"
  newRow.children[5].children[0].value = "Null"
  newRow.children[6].children[0].value = "0, 0"
  newRow.children[7].children[0].innerHTML = ""

  tableLessons.appendChild(newRow)
  lessonsRows.push(newRow)
}

document.getElementById("button-add-lesson").addEventListener("click", addLesson)
