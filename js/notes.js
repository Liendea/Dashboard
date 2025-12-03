"strict mode";

window.addEventListener("load", function () {
  const notePad = document.getElementById("notes");

  // get saved notes
  const savedNotes = localStorage.getItem("notes");
  if (savedNotes) {
    notePad.value = savedNotes;
  }

  // save notes to localstorage
  notePad.addEventListener("input", () => {
    let notes = notePad.value;
    localStorage.setItem("notes", notes);
  });
});
