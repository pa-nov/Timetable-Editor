const windows = ["Times", "Lessons", "Timetable", "Json"]

buttonCreate.addEventListener("click", () => {
    document.getElementById("windowStart").style.display = "none"
    document.getElementById("windowMain").style.display = "block"
    openWindow(0)
})
buttonOpen.addEventListener("click", () => {
    document.getElementById("textJson").value = document.getElementById("inputJson").value
    readJson()
    document.getElementById("windowStart").style.display = "none"
    document.getElementById("windowMain").style.display = "block"
    openWindow(2)
})

buttonOpenTimes.addEventListener("click", () => { openWindow(0) })
buttonOpenLessons.addEventListener("click", () => { openWindow(1) })
buttonOpenTimetable.addEventListener("click", () => { openWindow(2) })
buttonOpenJson.addEventListener("click", () => { openWindow(3) })

inputTimes.addEventListener("change", () => { generateTimes() })
inputInitialIndex.addEventListener("change", () => { generateTimes() })

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
            document.getElementById("window" + windows[i]).style.display = "block"
            document.getElementById("buttonOpen" + windows[i]).style.backgroundColor = "var(--color-yellow)"
            
        } else {
            document.getElementById("window" + windows[i]).style.display = "none"
            document.getElementById("buttonOpen" + windows[i]).style.backgroundColor = "var(--color-light)"
        }
    }
}

function readJson() {
    const jsonStringArray = textJson.value.split('": 0')
    var jsonString = jsonStringArray[0]
    for (let i = 1; i < jsonStringArray.length; i++) {
        jsonString += '": '
        if (jsonStringArray[i].substring(0, 1) == ",") { jsonString += "0" }
        jsonString += jsonStringArray[i]
    }
    const jsonData = JSON.parse(jsonString)

    inputTimes.value = jsonData["times"].length
    generateTimes()
    for (let i = 0; i < inputTimes.value; i++) {
        document.getElementById("startHour" + i).value   = jsonData["times"][i]["startHour"]
        document.getElementById("startMinute" + i).value = jsonData["times"][i]["startMinute"]
        document.getElementById("endHour" + i).value     = jsonData["times"][i]["endHour"]
        document.getElementById("endMinute" + i).value   = jsonData["times"][i]["endMinute"]
    }
}

function generateJson() {
    const jsonTimes = generateTimes()
    var jsonLessons = "    []"
    var jsonEven = "    []"
    var jsonOdd = "    []"

    var jsonString = `{\n  "times": [${jsonTimes}\n  ],\n  "lessons": [\n${jsonLessons}\n  ],\n  "even": [\n${jsonEven}\n  ],\n  "odd": [\n${jsonOdd}\n  ]\n}`

    textJson.value = jsonString
}
function generateTimes() {
    inputTimes.value = limitNumberToRange(inputTimes.value, 1, 48)
    const times = inputTimes.value
    if (inputInitialIndex.value == "") { inputInitialIndex.value = 0 }
    const initialIndex = inputInitialIndex.value

    const frameTimesTable = frameTimes.children[0]
    if (times != frameTimesTable.childElementCount) {
        while (times < frameTimesTable.childElementCount) {
            frameTimesTable.lastChild.remove()
        }
        while (times > frameTimesTable.childElementCount) {
            const line     = document.createElement("tr")
            line.className = "frameTimes"

            const columnsTag = ["timesIndex", "startHour", "startMinute", "endHour", "endMinute"]
            const columns    = [
                document.createElement("td"),
                document.createElement("td"),
                document.createElement("td"),
                document.createElement("td"),
                document.createElement("td")
            ]

            const timesIndex     = document.createElement("div")
            timesIndex.id        = columnsTag[0] + frameTimesTable.childElementCount
            timesIndex.style     = "text-align: center"
            timesIndex.innerText = frameTimesTable.childElementCount + parseInt(initialIndex)
            columns[0].appendChild(timesIndex)
            for (let i = 1; i < columns.length; i++) {
                const input     = document.createElement("input")
                input.id        = columnsTag[i] + frameTimesTable.childElementCount
                input.className = "inputTimes"
                input.type      = "number"
                input.step      = "1"
                input.min       = "0"
                input.max       = (i % 2 == 0) ? "60" : "24"
                columns[i].appendChild(input)
            }
            for (let i = 0; i < columns.length; i++) {
                columns[i].style.width = "20%"
                columns[i].className   = "frameTimes"
                line.appendChild(columns[i])
            }
            frameTimesTable.appendChild(line)
        }
    }
    if (initialIndex != document.getElementById("timesIndex0").innerText) {
        for (let i = 0; i < times; i++) {
            document.getElementById("timesIndex" + i).innerText = i + parseInt(initialIndex)
        }
    }

    var jsonTimes = ""
    for (let i = 0; i < times; i++) {
        const startHour   = getTwoDigitNumber(limitNumberToRange(document.getElementById("startHour" + i).value, 0, 24))
        const startMinute = getTwoDigitNumber(limitNumberToRange(document.getElementById("startMinute" + i).value, 0, 60))
        const endHour     = getTwoDigitNumber(limitNumberToRange(document.getElementById("endHour" + i).value, 0, 24))
        const endMinute   = getTwoDigitNumber(limitNumberToRange(document.getElementById("endMinute" + i).value, 0, 60))
        jsonTimes += `\n    { "startHour": ${startHour}, "startMinute": ${startMinute}, "endHour": ${endHour}, "endMinute": ${endMinute} },`
    }
    return jsonTimes.slice(0, -1)
}

function limitNumberToRange(number, min, max) {
    return Math.min(max, Math.max(min, parseInt(0 + number)))
}
function getTwoDigitNumber(number) {
    if (number < 10) { return `0${number}` }
    return number.toString()
}