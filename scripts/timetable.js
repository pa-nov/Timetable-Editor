const headTimetable = document.getElementById("table-timetable-head")
const tableTimetable = document.getElementById("table-timetable-body")
const itemLesson = document.getElementById("item-lesson")

function resizeTimetable() {
  const timesCount = timesRows.length

  while (timesCount < headTimetable.children.length - 2) {
    headTimetable.lastChild.remove()

    for (let row = 0; row < tableTimetable.children.length; row++) {
      tableTimetable.children[row].lastChild.remove()
    }
  }

  while (timesCount > headTimetable.children.length - 2) {
    headTimetable.appendChild(document.createElement("th"))

    for (let row = 0; row < tableTimetable.children.length; row++) {
      const newBody = document.createElement("td")
      newBody.dataset.id = 0
      newBody.addEventListener("click", () => { openLessonsPopup(newBody) })

      const newItem = itemLesson.cloneNode(true)
      newItem.removeAttribute("id")
      newItem.children[0].children[0].style.textAlign = "center"
      newItem.children[0].children[1].style.display = "none"
      newBody.appendChild(newItem)

      tableTimetable.children[row].appendChild(newBody)
    }
  }
}

function updateTimetableHead() {
  const initialIndex = parseInt(inputInitialIndex.value)
  const times = getTimes()

  for (let index = 2; index < headTimetable.children.length; index++) {
    const time = times[index - 2]
    headTimetable.children[index].innerHTML =
      initialIndex + index - 2 + "<br />" +
      getTwoDigitNumber(time.start.hour) + ":" + getTwoDigitNumber(time.start.minute) + " - " +
      getTwoDigitNumber(time.end.hour) + ":" + getTwoDigitNumber(time.end.minute)
  }
}

function updateTimetableBody() {
  const timesCount = headTimetable.children.length - 2
  const lessons = getLessons()

  for (let row = 0; row < tableTimetable.children.length; row++) {
    for (let column = 0; column < timesCount; column++) {
      const trueColumn = column + tableTimetable.children[row].children.length - timesCount
      const lessonElement = tableTimetable.children[row].children[trueColumn]
      const lessonId = lessonElement.dataset.id < lessons.length ? lessonElement.dataset.id : 0
      setLesson(lessonElement, lessonId, lessons[lessonId])
    }
  }
}

function setLesson(lessonElement, lessonId, lessonData) {
  lessonElement.dataset.id = lessonId

  if (lessonId > 0) {
    lessonElement.children[0].children[0].children[0].innerHTML = lessonData.title
    lessonElement.children[0].children[1].children[0].innerHTML = getShortName(lessonData.first_name, lessonData.middle_name, lessonData.last_name)
    lessonElement.children[0].children[1].children[1].innerHTML = `(${lessonData.room})`
    checkLessonItemSize(lessonElement.children[0])
  } else {
    lessonElement.children[0].children[0].children[0].innerHTML = ""
    lessonElement.children[0].children[1].children[0].innerHTML = ""
    lessonElement.children[0].children[1].children[1].innerHTML = ""
  }
}

function setTimetable(even, odd) {
  resizeTimetable()
  const timesCount = headTimetable.children.length - 2

  for (let row = 0; row < 7; row++) {
    for (let column = 0; column < timesCount; column++) {
      const trueColumn = column + tableTimetable.children[row].children.length - timesCount
      const lessonElement = tableTimetable.children[row].children[trueColumn]
      lessonElement.dataset.id = even[row][column] || 0
    }
  }

  for (let row = 7; row < 14; row++) {
    for (let column = 0; column < timesCount; column++) {
      const trueColumn = column + tableTimetable.children[row].children.length - timesCount
      const lessonElement = tableTimetable.children[row].children[trueColumn]
      lessonElement.dataset.id = odd[row - 7][column] || 0
    }
  }
}
