const windows = ["Times", "Lessons", "Timetable", "Json"]

buttonCreate.addEventListener("click", () => {
  openCreator(0)
})
buttonOpen.addEventListener("click", () => {
  document.getElementById("textJson").value = document.getElementById("inputJson").value
  readJson()
  openCreator(2)
})

buttonOpenTimes.addEventListener("click", () => { openWindow(0) })
buttonOpenLessons.addEventListener("click", () => { openWindow(1) })
buttonOpenTimetable.addEventListener("click", () => { openWindow(2) })
buttonOpenJson.addEventListener("click", () => { openWindow(3) })

inputTimes.addEventListener("change", () => { generateTimes() })
inputInitialIndex.addEventListener("change", () => { generateTimes() })

buttonAddLesson.addEventListener("click", () => { addLesson() })

// Functions
function openCreator(window) {
  document.getElementById("windowStart").style.display = "none"
  document.getElementById("windowMain").style.display = "block"
  openWindow(window)
}
function openWindow(window) {
  generateJson()
  switch (window) {
    case 0: {
      readJson()
      break
    }
    case 1: {
      readJson()
      break
    }
    case 2: {
      readJson()
      break
    }
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
function readJson() {
  const jsonData = JSON.parse(normalizeJson(textJson.value))

  inputTimes.value = jsonData["times"].length
  generateTimes()
  for (let i = 0; i < inputTimes.value; i++) {
    document.getElementById(`startHour.${i}`).value = jsonData["times"][i]["startHour"]
    document.getElementById(`startMinute.${i}`).value = jsonData["times"][i]["startMinute"]
    document.getElementById(`endHour.${i}`).value = jsonData["times"][i]["endHour"]
    document.getElementById(`endMinute.${i}`).value = jsonData["times"][i]["endMinute"]
  }

  //generateLessons()

  //generateTimetable()
}

function addLesson() {
  const lineNumber = frameLessons.childElementCount

  const line = document.createElement("tr")
  frameLessons.appendChild(line)

  const columnsTag = ["lessonID", "lessonTitle", "lessonRoom", "lessonTeacher", "lessonCopies", "lessonRemove"]
  const columns = []
  for (let i = 0; i < columnsTag.length; i++) {
    columns.push(document.createElement("td"))
    line.appendChild(columns[i])
  }

  const center = document.createElement("center")
  columns[0].appendChild(center)
  center.id = `${columnsTag[0]}.${lineNumber}`
  center.className = "cell"
  center.innerText = lineNumber

  for (let i = 1; i < columns.length - 1; i++) {
    const input = document.createElement("input")
    columns[i].appendChild(input)
    input.id = `${columnsTag[i]}.${lineNumber}`
    input.className = "cell"
  }

  const button = document.createElement("button")
  columns[columns.length - 1].appendChild(button)
  button.id = `${columnsTag[columnsTag.length - 1]}.${lineNumber}`
  button.className = "cell"
  button.innerText = "X"
  button.addEventListener("click", () => { removeLesson(lineNumber) })
}
function removeLesson(number) {
  const linesCount = frameLessons.childElementCount
  const columnsTag = ["lessonID", "lessonTitle", "lessonRoom", "lessonTeacher", "lessonCopies", "lessonRemove"]

  frameLessons.children[number].remove()
  for (let i = number + 1; i < linesCount; i++) {
    document.getElementById(`lessonID.${i}`).innerHTML = i - 1
    document.getElementById(`lessonRemove.${i}`).replaceWith(document.getElementById(`lessonRemove.${i}`).cloneNode(true))
    document.getElementById(`lessonRemove.${i}`).addEventListener("click", () => { removeLesson(i - 1) })
    
    for (let e = 0; e < columnsTag.length; e++) {
      document.getElementById(`${columnsTag[e]}.${i}`).id = `${columnsTag[e]}.${i - 1}`
    }
  }
}

function generateTimes() {
  inputTimes.value = limitNumberToRange(inputTimes.value, 1, 48)
  if (inputInitialIndex.value == "") { inputInitialIndex.value = 0 }
  const times = inputTimes.value
  const initialIndex = inputInitialIndex.value

  if (times != frameTimes.childElementCount) {
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
      timesIndex.innerText = parseInt(initialIndex) + lineNumber

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
  }
  if (initialIndex != document.getElementById("timesIndex.0").innerText) {
    for (let i = 0; i < times; i++) {
      document.getElementById(`timesIndex.${i}`).innerText = parseInt(initialIndex) + i
    }
  }

  let jsonTimes = ""
  for (let i = 0; i < times; i++) {
    const startHour = getTwoDigitNumber(limitNumberToRange(document.getElementById(`startHour.${i}`).value, 0, 24))
    const startMinute = getTwoDigitNumber(limitNumberToRange(document.getElementById(`startMinute.${i}`).value, 0, 60))
    const endHour = getTwoDigitNumber(limitNumberToRange(document.getElementById(`endHour.${i}`).value, 0, 24))
    const endMinute = getTwoDigitNumber(limitNumberToRange(document.getElementById(`endMinute.${i}`).value, 0, 60))
    jsonTimes += `\n    { "startHour": ${startHour}, "startMinute": ${startMinute}, "endHour": ${endHour}, "endMinute": ${endMinute} },`
  }
  return jsonTimes.slice(0, -1)
}
function generateLessons() {

}
function generateJson() {
  const jsonTimes = generateTimes()
  const jsonLessons = "\n    []"
  const jsonEven = "\n    []"
  const jsonOdd = "\n    []"

  const jsonString = `{\n  "times": [${jsonTimes}\n  ],\n  "lessons": [${jsonLessons}\n  ],\n  "even": [${jsonEven}\n  ],\n  "odd": [${jsonOdd}\n  ]\n}`
  textJson.value = jsonString
}

// Functions
function limitNumberToRange(number, min, max) {
  return Math.min(max, Math.max(min, parseInt(0 + number)))
}
function getTwoDigitNumber(number) {
  if (number < 10) { return `0${number}` }
  return number.toString()
}
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