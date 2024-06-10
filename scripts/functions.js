function getShortName(firstName, middleName, lastName) {
  let shortName = lastName.trim()

  if (shortName.length > 0) {
    if (firstName.trim().length > 0) {
      shortName += ` ${firstName.trim()[0]}.`

      if (middleName.trim().length > 0) {
        shortName += ` ${middleName.trim()[0]}.`
      }
    }
  }

  return shortName.length > 0 ? shortName : "Null"
}

function getTwoDigitNumber(number) {
  if (number < 10) return `0${number}`
  return number.toString()
}

function limitNumberToRange(number, min, max) {
  return Math.min(max, Math.max(min, number))
}

function normalizeJson(jsonText) {
  const jsonArray = jsonText.split('": 0')
  let jsonString = jsonArray[0]

  for (let index = 1; index < jsonArray.length; index++) {
    jsonString += '": '
    if (jsonArray[index].substring(0, 1) == ",") jsonString += "0"
    jsonString += jsonArray[index]
  }

  return jsonString
}

function scaleFont(element, max, min) {
  for (let size = max; size > min - 1; size--) {
    element.style.fontSize = `${size / 10}em`
    if (element.scrollHeight - element.offsetHeight < 4 && element.scrollWidth - element.offsetWidth < 4) break
  }
}

function checkNumberInput(input, min, max) {
  const number = parseInt(input.value)

  if (isNaN(number)) {
    input.value = getTwoDigitNumber(min)
  } else {
    input.value = getTwoDigitNumber(limitNumberToRange(number, min, max))
  }
}

function checkLessonItemSize(element) {
  if (element.children[1].children[1].innerHTML.length > 6) element.children[1].children[1].style.fontSize = "0.6em"
  scaleFont(element.children[1].children[0], 7, 5)
  scaleFont(element.children[0].children[0], 10, 4)
}

function resizeTextarea(textarea) {
  textarea.style.height = "auto"
  textarea.style.height = `${textarea.scrollHeight}px`
}
