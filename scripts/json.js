const textJson = document.getElementById("text-json")

function generateTimes() {
  let jsonString = ""

  getTimes().forEach((time) => {
    const startHour = getTwoDigitNumber(time.start.hour)
    const startMinute = getTwoDigitNumber(time.start.minute)
    const endHour = getTwoDigitNumber(time.end.hour)
    const endMinute = getTwoDigitNumber(time.end.minute)
    jsonString += `    { "startHour": ${startHour}, "startMinute": ${startMinute}, "endHour": ${endHour}, "endMinute": ${endMinute} },\n`
  })

  return jsonString.slice(0, -2) + "\n"
}

function generateLessons() {
  let jsonString = ""

  getLessons().forEach((lesson) => {
    const title = lesson.title.trim()
    const room = lesson.room.trim()
    const teacher = `${lesson.last_name.trim()}|${lesson.first_name.trim()}|${lesson.middle_name.trim()}`
    const other = lesson.other.join("|")
    jsonString += `    [ ${JSON.stringify(title)}, ${JSON.stringify(room)}, ${JSON.stringify(teacher)}, "${other}" ],\n`
  })

  return jsonString.slice(0, -2) + "\n"
}

function generateTimetable(startIndex, length) {
  let jsonString = ""

  const timesCount = headTimetable.children.length - 2
  for (let row = startIndex; row < startIndex + length; row++) {
    jsonString += "    ["

    for (let column = 0; column < timesCount; column++) {
      const trueColumn = column + tableTimetable.children[row].children.length - timesCount
      jsonString += ` ${tableTimetable.children[row].children[trueColumn].dataset.id},`
    }

    jsonString = jsonString.slice(0, -1) + " ],\n"
  }

  return jsonString.slice(0, -2) + "\n"
}

function generateJson() {
  let jsonString =
    `{\n` +
    `  "times": [\n` +
    generateTimes() +
    `  ],\n` +
    `  "lessons": [\n` +
    generateLessons() +
    `  ],\n` +
    `  "even": [\n` +
    generateTimetable(0, 7) +
    `  ],\n` +
    `  "odd": [\n` +
    generateTimetable(7, 7) +
    `  ]\n` +
    `}`
  textJson.value = jsonString
  resizeTextarea(textJson)
}

document.getElementById("button-copy").addEventListener("click", () => { navigator.clipboard.writeText(textJson.value) })
