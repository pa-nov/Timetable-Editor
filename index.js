const windows = ["Times", "Lessons", "Timetable", "Json"]

buttonCreate.addEventListener("click", () => {
  resizeTimetable()
  openCreator(0)
})
buttonOpen.addEventListener("click", () => {
  readJson(inputJson.value)
  openCreator(2)
})

buttonOpenTimes.addEventListener("click", () => { openWindow(0) })
buttonOpenLessons.addEventListener("click", () => { openWindow(1) })
buttonOpenTimetable.addEventListener("click", () => { openWindow(2) })
buttonOpenJson.addEventListener("click", () => { openWindow(3) })

inputTimes.addEventListener("change", () => { resizeTimes(inputTimes.value) })
inputInitialIndex.addEventListener("change", () => { updateInitialIndex() })
buttonAddLesson.addEventListener("click", () => { addLesson() })

// Functions
function openCreator(window) {
  document.getElementById("windowStart").style.display = "none"
  document.getElementById("windowMain").style.display = "block"
  openWindow(window)
}
function openWindow(window) {
  if (window == 3) {
    textJson.value = generateJson()
    readJson(textJson.value)
    windowJson.style.display = "block"
    textJson.style.height = "0"
    textJson.style.height = `${textJson.scrollHeight}px`
    windowJson.style.display = "none"
  }
  for (let i = 0; i < windows.length; i++) {
    if (i == window) {
      document.getElementById(`window${windows[i]}`).style.display = "block"
      document.getElementById(`buttonOpen${windows[i]}`).style.backgroundColor = "var(--yellow)"

    } else {
      document.getElementById(`window${windows[i]}`).style.display = "none"
      document.getElementById(`buttonOpen${windows[i]}`).style.backgroundColor = "var(--light)"
    }
  }
}
function readJson(jsonString) {
  textJson.value = jsonString
  const jsonData = JSON.parse(normalizeJson(textJson.value))

  resizeTimes(jsonData["times"].length)
  for (let i = 0; i < inputTimes.value; i++) {
    document.getElementById(`startHour.${i}`).value = jsonData["times"][i]["startHour"]
    document.getElementById(`startMinute.${i}`).value = jsonData["times"][i]["startMinute"]
    document.getElementById(`endHour.${i}`).value = jsonData["times"][i]["endHour"]
    document.getElementById(`endMinute.${i}`).value = jsonData["times"][i]["endMinute"]
  }

  resizeLessons(jsonData["lessons"].length)
  for (let i = 0; i < frameLessons.childElementCount; i++) {
    document.getElementById(`lessonTitle.${i}`).value = jsonData["lessons"][i][0]
    document.getElementById(`lessonRoom.${i}`).value = jsonData["lessons"][i][1]
    document.getElementById(`lessonTeacherSurname.${i}`).value = jsonData["lessons"][i][2].split("|")[0]
    document.getElementById(`lessonTeacherName.${i}`).value = jsonData["lessons"][i][2].split("|")[1]
    document.getElementById(`lessonTeacherMiddleName.${i}`).value = jsonData["lessons"][i][2].split("|")[2]
    document.getElementById(`lessonCopies.${i}`).value = jsonData["lessons"][i][3]
  }

  for (week of ["Even", "Odd"]) {
    for (let day = 0; day < 7; day++) {
      for (let lesson = 0; lesson < frameTimetable.childElementCount - 2; lesson++) {
        const lessonID = jsonData[week.toLowerCase()][day][lesson]
        const lessonFrame = getLessonFrame(week, day, lesson)
        lessonFrame.dataset.id = lessonID
        if (lessonID > 0) {
          lessonFrame.innerText = document.getElementById(`lessonTitle.${lessonID}`).value
        } else {
          lessonFrame.innerText = ""
        }
      }
    }
  }
}

// Times
function resizeTimes(number) {
  inputTimes.value = limitNumberToRange(number, 1, 24)
  const times = inputTimes.value

  while (times < frameTimes.childElementCount) {
    frameTimes.lastChild.remove()
  }
  while (times > frameTimes.childElementCount) {
    const lineNumber = frameTimes.childElementCount

    const line = document.createElement("tr")
    frameTimes.appendChild(line)

    const columnsTag = ["timesIndex", "startHour", "startMinute", "endHour", "endMinute"]
    const columns = []
    for (let i = 0; i < columnsTag.length; i++) {
      columns.push(document.createElement("td"))
      line.appendChild(columns[i])
    }

    const timesIndex = document.createElement("div")
    columns[0].appendChild(timesIndex)
    timesIndex.id = `${columnsTag[0]}.${lineNumber}`
    timesIndex.className = "cell"
    timesIndex.innerText = parseInt(inputInitialIndex.value) + lineNumber

    for (let i = 1; i < columns.length; i++) {
      const input = document.createElement("input")
      columns[i].appendChild(input)
      input.id = `${columnsTag[i]}.${lineNumber}`
      input.className = "cell"
      input.type = "number"
      input.step = "1"
      input.min = "0"
      input.max = (i % 2 == 0) ? "60" : "24"
      input.value = "0"
    }
  }

  resizeTimetable()
}
function updateInitialIndex() {
  if (inputInitialIndex.value == "") {
    inputInitialIndex.value = 0
  }
  if (inputInitialIndex.value != document.getElementById("timesIndex.0").innerText) {
    for (let i = 0; i < inputTimes.value; i++) {
      document.getElementById(`timesIndex.${i}`).innerText = parseInt(inputInitialIndex.value) + i
    }
    for (let i = 2; i < frameTimetable.childElementCount; i++) {
      frameTimetable.children[i].innerText = parseInt(inputInitialIndex.value) + i - 2
    }
  }
}

// Lessons
function resizeLessons(number) {
  while (number < frameLessons.childElementCount) {
    removeLesson(frameLessons.childElementCount - 1)
  }
  while (number > frameLessons.childElementCount) {
    addLesson()
  }
}
function addLesson() {
  const lineNumber = frameLessons.childElementCount

  const line = document.createElement("tr")
  frameLessons.appendChild(line)

  const columnsTag = ["lessonID", "lessonTitle", "lessonRoom", "lessonTeacherSurname", "lessonTeacherName", "lessonTeacherMiddleName", "lessonCopies", "lessonRemove"]
  const columns = []
  for (let i = 0; i < columnsTag.length; i++) {
    columns.push(document.createElement("td"))
    line.appendChild(columns[i])
  }

  const lessonID = document.createElement("div")
  columns[0].appendChild(lessonID)
  lessonID.id = `${columnsTag[0]}.${lineNumber}`
  lessonID.className = "cell"
  lessonID.innerText = lineNumber

  for (let i = 1; i < columns.length - 1; i++) {
    const input = document.createElement("input")
    columns[i].appendChild(input)
    input.id = `${columnsTag[i]}.${lineNumber}`
    input.className = "cell"
  }

  const lessonRemove = document.createElement("button")
  columns[columns.length - 1].appendChild(lessonRemove)
  lessonRemove.id = `${columnsTag[columnsTag.length - 1]}.${lineNumber}`
  lessonRemove.className = "cell"
  lessonRemove.innerText = "X"
  lessonRemove.addEventListener("click", () => { removeLesson(lineNumber) })
}
function removeLesson(number) {
  const linesCount = frameLessons.childElementCount

  const columnsTag = ["lessonID", "lessonTitle", "lessonRoom", "lessonTeacherSurname", "lessonTeacherName", "lessonTeacherMiddleName", "lessonCopies", "lessonRemove"]

  frameLessons.children[number].remove()
  for (week of ["Even", "Odd"]) {
    for (let day = 0; day < 7; day++) {
      for (let lesson = 0; lesson < frameTimetable.childElementCount - 2; lesson++) {
        const lessonFrame = getLessonFrame(week, day, lesson)
        if (lessonFrame.dataset.id == number) {
          lessonFrame.dataset.id = "0"
          lessonFrame.innerText = ""
        }
      }
    }
  }

  for (let i = number + 1; i < linesCount; i++) {
    document.getElementById(`lessonID.${i}`).innerHTML = i - 1
    document.getElementById(`lessonRemove.${i}`).replaceWith(document.getElementById(`lessonRemove.${i}`).cloneNode(true))
    document.getElementById(`lessonRemove.${i}`).addEventListener("click", () => { removeLesson(i - 1) })
    for (week of ["Even", "Odd"]) {
      for (let day = 0; day < 7; day++) {
        for (let lesson = 0; lesson < frameTimetable.childElementCount - 2; lesson++) {
          const lessonFrame = getLessonFrame(week, day, lesson)
          if (lessonFrame.dataset.id == i) {
            lessonFrame.dataset.id = i - 1
            lessonFrame.innerText = document.getElementById(`lessonTitle.${i}`).value
          }
        }
      }
    }

    for (let e = 0; e < columnsTag.length; e++) {
      document.getElementById(`${columnsTag[e]}.${i}`).id = `${columnsTag[e]}.${i - 1}`
    }
  }
}

// Timetable
function resizeTimetable() {
  const times = inputTimes.value

  while (times < frameTimetable.childElementCount - 2) {
    frameTimetable.lastChild.remove()
    for (let i = 0; i < 7; i++) {
      frameEven.children[i].lastChild.remove()
      frameOdd.children[i].lastChild.remove()
    }
  }
  while (times > frameTimetable.childElementCount - 2) {
    const header = document.createElement("th")
    frameTimetable.appendChild(header)
    header.innerText = parseInt(inputInitialIndex.value) + frameTimetable.childElementCount - 3

    for (let i = 0; i < 7; i++) {
      for (week of ["Even", "Odd"]) {
        const cell = document.createElement("td")
        document.getElementById(`frame${week}`).children[i].appendChild(cell)
        cell.dataset.id = "0"
      }
    }
  }
  for (let i = 2; i < frameTimetable.childElementCount; i++) {
    frameTimetable.children[i].style.width = `${90 / times}%`
  }
}

// Json
function generateTimes() {
  let jsonTimes = ""
  for (let i = 0; i < frameTimes.childElementCount; i++) {
    const startHour = getTwoDigitNumber(limitNumberToRange(document.getElementById(`startHour.${i}`).value, 0, 24))
    const startMinute = getTwoDigitNumber(limitNumberToRange(document.getElementById(`startMinute.${i}`).value, 0, 60))
    const endHour = getTwoDigitNumber(limitNumberToRange(document.getElementById(`endHour.${i}`).value, 0, 24))
    const endMinute = getTwoDigitNumber(limitNumberToRange(document.getElementById(`endMinute.${i}`).value, 0, 60))
    jsonTimes += `\n    { "startHour": ${startHour}, "startMinute": ${startMinute}, "endHour": ${endHour}, "endMinute": ${endMinute} },`
  }
  return jsonTimes.slice(0, -1)
}
function generateLessons() {
  let jsonLessons = ""
  for (let i = 0; i < frameLessons.childElementCount; i++) {
    const teacherSurname = document.getElementById(`lessonTeacherSurname.${i}`).value
    const teacherName = document.getElementById(`lessonTeacherName.${i}`).value
    const teacherMiddleName = document.getElementById(`lessonTeacherMiddleName.${i}`).value

    const lessonTitle = document.getElementById(`lessonTitle.${i}`).value
    const lessonRoom = document.getElementById(`lessonRoom.${i}`).value
    const lessonTeacher = `${teacherSurname}|${teacherName}|${teacherMiddleName}`
    const lessonCopies = document.getElementById(`lessonCopies.${i}`).value
    jsonLessons += `\n    [ "${lessonTitle}", "${lessonRoom}", "${lessonTeacher}", "${lessonCopies}" ],`
  }
  return jsonLessons.slice(0, -1)
}
function generateTimetable(week) {
  const lessons = frameTimetable.childElementCount - 2
  let jsonTimetable = ""
  for (let day = 0; day < 7; day++) {
    jsonTimetable += "\n    ["
    for (let lesson = 0; lesson < lessons; lesson++) {
      jsonTimetable += ` ${getLessonFrame(week, day, lesson).dataset.id},`
    }
    if (lessons > 0) {
      jsonTimetable = jsonTimetable.slice(0, -1)
    }
    jsonTimetable += " ],"
  }
  return jsonTimetable.slice(0, -1)
}
function generateJson() {
  const jsonTimes = generateTimes()
  const jsonLessons = generateLessons()
  const jsonEven = generateTimetable("Even")
  const jsonOdd = generateTimetable("Odd")

  return `{\n  "times": [${jsonTimes}\n  ],\n  "lessons": [${jsonLessons}\n  ],\n  "even": [${jsonEven}\n  ],\n  "odd": [${jsonOdd}\n  ]\n}`
}

// Functions
function limitNumberToRange(number, min, max) {
  return Math.min(max, Math.max(min, parseInt(0 + number)))
}
function getTwoDigitNumber(number) {
  if (number < 10) { return `0${number}` }
  return number.toString()
}

// Functions
function normalizeJson(string) {
  const jsonStringArray = string.split('": 0')
  let jsonString = jsonStringArray[0]
  for (let i = 1; i < jsonStringArray.length; i++) {
    jsonString += '": '
    if (jsonStringArray[i].substring(0, 1) == ",") {
      jsonString += "0"
    }
    jsonString += jsonStringArray[i]
  }
  return jsonString
}
function getLessonFrame(week, day, lesson) {
  const dayFrame = document.getElementById(`frame${week}`).children[day]
  const lessonFrame = dayFrame.children[dayFrame.childElementCount - (frameTimetable.childElementCount - 2) + lesson]
  return lessonFrame
}