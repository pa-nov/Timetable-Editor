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
    jsonString += `    [ "${lesson.title}", "${lesson.room}", "${lesson.last_name}|${lesson.first_name}|${lesson.middle_name}", "${lesson.other.join("|")}" ],\n`
  })

  return jsonString.slice(0, -2) + "\n"
}

function generateTimetable(startIndex, endIndex) {
  let jsonString = ""

  const timesCount = headTimetable.children.length - 2
  for (let day = startIndex; day < endIndex + 1; day++) {
    jsonString += "    ["

    for (let lesson = 0; lesson < timesCount; lesson++) {
      const column = lesson + tableTimetable.children[day].children.length - timesCount
      jsonString += ` ${tableTimetable.children[day].children[column].dataset.id},`
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
    generateTimetable(0, 6) +
    `  ],\n` +
    `  "odd": [\n` +
    generateTimetable(7, 13) +
    `  ]\n` +
    `}`
  textJson.value = jsonString
  resizeTextarea(textJson)
}

document.getElementById("button-copy").addEventListener("click", () => {
  navigator.clipboard.writeText(textJson.value)
})
