const headTimetable = document.getElementById("table-timetable-head")
const tableTimetable = document.getElementById("table-timetable-body")
const popupLessons = document.getElementById("popup-lessons")
const gridLessons = popupLessons.children[0]
const itemLesson = document.getElementById("item-lesson")
let selectedElement

function resizeTimetable() {
  const timesCount = timesRows.length

  while (timesCount < headTimetable.children.length - 2) {
    headTimetable.lastChild.remove()

    for (let index = 0; index < tableTimetable.children.length; index++) {
      tableTimetable.children[index].lastChild.remove()
    }
  }

  while (timesCount > headTimetable.children.length - 2) {
    headTimetable.appendChild(document.createElement("th"))

    for (let index = 0; index < tableTimetable.children.length; index++) {
      const newBody = document.createElement("td")
      newBody.dataset.id = "0"
      newBody.addEventListener("click", () => {
        selectedElement = newBody
        popupLessons.removeAttribute("style")
      })

      const newItem = itemLesson.cloneNode(true)
      newItem.removeAttribute("id")
      newItem.children[0].children[1].style.display = "none"
      newBody.appendChild(newItem)

      tableTimetable.children[index].appendChild(newBody)
    }
  }
}

function updateTimetableHead() {
  const initialIndex = parseInt(inputInitialIndex.value)

  for (let index = 2; index < headTimetable.children.length; index++) {
    headTimetable.children[index].innerHTML = initialIndex + index - 2
  }
}

function updateTimetableBody() {
  const timesCount = headTimetable.children.length - 2
  const lessons = getLessons()

  for (let row = 0; row < tableTimetable.children.length; row++) {
    for (let column = 0; column < timesCount; column++) {
      const trueColumn = column + tableTimetable.children[row].children.length - timesCount
      const lessonElement = tableTimetable.children[row].children[trueColumn]
      const lessonId = lessonElement.dataset.id
      setLesson(lessonElement, lessonId, lessons[lessonId])
    }
  }
}

function updateLessonsPopup() {
  while (gridLessons.children.length > 0) {
    gridLessons.lastChild.remove()
  }

  getLessons().forEach((lesson, index) => {
    const newItem = itemLesson.cloneNode(true)

    newItem.removeAttribute("id")
    newItem.children[0].children[0].innerHTML = lesson.title
    newItem.children[0].children[1].innerHTML = index
    newItem.children[1].children[0].innerHTML = getShortName(lesson.first_name, lesson.middle_name, lesson.last_name)
    newItem.children[1].children[1].innerHTML = `(${lesson.room})`
    newItem.addEventListener("click", () => {
      setLesson(selectedElement, index, lesson)
      popupLessons.style.display = "none"
    })

    gridLessons.appendChild(newItem)
  })

  gridLessons.children[0].children[0].children[0].innerHTML = ""
  gridLessons.children[0].children[1].children[0].innerHTML = ""
  gridLessons.children[0].children[1].children[1].innerHTML = ""
}

function setLesson(lessonElement, lessonId, lessonData) {
  lessonElement.dataset.id = lessonId

  if (lessonId > 0) {
    lessonElement.children[0].children[0].children[0].innerHTML = lessonData.title
    lessonElement.children[0].children[1].children[0].innerHTML = getShortName(lessonData.first_name, lessonData.middle_name, lessonData.last_name)
    lessonElement.children[0].children[1].children[1].innerHTML = `(${lessonData.room})`
  } else {
    lessonElement.children[0].children[0].children[0].innerHTML = ""
    lessonElement.children[0].children[1].children[0].innerHTML = ""
    lessonElement.children[0].children[1].children[1].innerHTML = ""
  }
}

function setTimetable(even, odd) {
  resizeTimetable()
  const timesCount = headTimetable.children.length - 2

  for (let day = 0; day < 7; day++) {
    for (let lesson = 0; lesson < timesCount; lesson++) {
      const column = lesson + tableTimetable.children[day].children.length - timesCount
      const lessonElement = tableTimetable.children[day].children[column]
      lessonElement.dataset.id = even[day][lesson]
    }
  }

  for (let day = 7; day < 14; day++) {
    for (let lesson = 0; lesson < timesCount; lesson++) {
      const column = lesson + tableTimetable.children[day].children.length - timesCount
      const lessonElement = tableTimetable.children[day].children[column]
      lessonElement.dataset.id = odd[day - 7][lesson]
    }
  }
}
