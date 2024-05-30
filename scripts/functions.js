function getShortName(firstName, middleName, lastName) {
  let shortName = lastName

  if (firstName.length > 0) {
    shortName += ` ${firstName[0]}.`

    if (middleName.length > 0) {
      shortName += ` ${middleName[0]}.`
    }
  }

  if (shortName.length > 0) {
    return shortName
  } else {
    return "-"
  }
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

function checkNumberInput(input, min, max) {
  const number = parseInt(input.value)

  if (isNaN(number)) {
    input.value = getTwoDigitNumber(min)
  } else {
    input.value = getTwoDigitNumber(limitNumberToRange(number, min, max))
  }
}

function resizeTextarea(textarea) {
  textarea.style.height = "auto"
  textarea.style.height = `${textarea.scrollHeight}px`
}
