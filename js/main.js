
window.onload = function()
{
  // Constructor Libro
  function Libro(titulo, autor, isbn, generos) {
    this.titulo = titulo;
    this.autor = autor;
    this.isbn = isbn;
    this.generos = generos;
  }

  var snd = document.getElementById("snd");
  snd.addEventListener("click", function() {
    var datos = document.getElementById('insertar').elements;
    var insertar = new Libro('ppp','eee',4444,'historia');

  });




}
