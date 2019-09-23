function findNote(file) {
  fetch(file)
  .then(response => response.text())
  .then((data) => {
    console.log(data)
  })
}
