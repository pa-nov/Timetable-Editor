const popupLessons = document.getElementById("popup-lessons")
const gridLessons = popupLessons.children[0]

function openLessonsPopup(selectedElement) {
  popupLessons.removeAttribute("style")

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
    checkLessonItemSize(newItem)
  })

  gridLessons.children[0].children[0].children[0].innerHTML = ""
  gridLessons.children[0].children[1].children[0].innerHTML = ""
  gridLessons.children[0].children[1].children[1].innerHTML = ""
}

popupLessons.addEventListener("click", (event) => { if (event.target == popupLessons) popupLessons.style.display = "none" })
document.addEventListener("keydown", (event) => { if (event.key == "Escape") popupLessons.style.display = "none" })
