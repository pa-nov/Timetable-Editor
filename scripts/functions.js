function getTwoDigitNumber(number) {
  if (number < 10) return `0${number}`
  return number.toString()
}

function limitNumberToRange(number, min, max) {
  return Math.min(max, Math.max(min, number))
}

function checkNumberInput(input, min, max) {
  const number = parseInt(input.value)

  if (isNaN(number)) {
    input.value = getTwoDigitNumber(min)
  } else {
    input.value = getTwoDigitNumber(limitNumberToRange(number, min, max))
  }
}
