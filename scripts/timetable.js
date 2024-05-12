const timetableHead = document.getElementById("timetable-head")
const timetableBody = document.getElementById("timetable-body")
const lessonsPopup = document.getElementById("popup-lessons")
const lessonsGrid = lessonsPopup.children[0]
const lessonItem = document.getElementById("item-lesson")
let selectedLesson

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
      newBody.addEventListener("click", () => {
        selectedLesson = newBody
        lessonsPopup.removeAttribute("style")
      })

      const newItem = lessonItem.cloneNode(true)
      newItem.removeAttribute("id")
      newBody.appendChild(newItem)

      timetableBody.children[i].appendChild(newBody)
    }
  }
  for (let i = 2; i < timetableHead.children.length; i++) {
    timetableHead.children[i].style.width = `${92 / timesCount}%`
  }
}

function updateTimetableHead() {
  const initialIndex = parseInt(document.getElementById("input-initial-index").value)

  for (let i = 2; i < timetableHead.children.length; i++) {
    timetableHead.children[i].innerHTML = initialIndex + i - 2
  }
}

function updateTimetableBody() {
  const timesCount = timetableHead.children.length - 2
  const lessons = getLessons()

  for (let row = 0; row < timetableBody.children.length; row++) {
    for (let column = 0; column < timesCount; column++) {
      const trueColumn = column + timetableBody.children[row].children.length - timesCount
      const lessonElement = timetableBody.children[row].children[trueColumn]
      setLesson(lessonElement, lessonElement.dataset.id, lessons[lessonElement.dataset.id])
    }
  }
}

function updateLessonsPopup() {
  while (lessonsGrid.children.length > 0) {
    lessonsGrid.lastChild.remove()
  }

  const lessons = getLessons()
  for (let i = 0; i < lessons.length; i++) {
    const lessonIndex = i
    const lesson = lessons[lessonIndex]

    const newItem = lessonItem.cloneNode(true)
    newItem.removeAttribute("id")
    newItem.children[0].children[0].innerHTML = lesson.title
    newItem.children[0].children[1].innerHTML = lessonIndex
    newItem.children[1].children[0].innerHTML = getShortName(lesson.first_name, lesson.middle_name, lesson.last_name)
    newItem.children[1].children[1].innerHTML = `(${lesson.room})`
    newItem.addEventListener("click", () => {
      setLesson(selectedLesson, lessonIndex, lesson)
    })
    lessonsGrid.appendChild(newItem)
  }

  lessonsGrid.children[0].children[0].children[0].innerHTML = ""
  lessonsGrid.children[0].children[1].children[0].innerHTML = ""
  lessonsGrid.children[0].children[1].children[1].innerHTML = ""
}

function setLesson(lessonElement, lessonId, lessonData) {
  lessonElement.dataset.id = lessonId
  lessonElement.children[0].children[0].children[1].innerHTML = ""

  if (lessonId > 0) {
    lessonElement.children[0].children[0].children[0].innerHTML = lessonData.title
    lessonElement.children[0].children[1].children[0].innerHTML = getShortName(lessonData.first_name, lessonData.middle_name, lessonData.last_name)
    lessonElement.children[0].children[1].children[1].innerHTML = `(${lessonData.room})`
  } else {
    lessonElement.children[0].children[0].children[0].innerHTML = ""
    lessonElement.children[0].children[1].children[0].innerHTML = ""
    lessonElement.children[0].children[1].children[1].innerHTML = ""
  }

  lessonsPopup.style.display = "none"
}
