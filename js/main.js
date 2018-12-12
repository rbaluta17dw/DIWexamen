// Constructor Libro
function Libro(titulo, autor, isbn, generos) {
  this.titulo = titulo;
  this.autor = autor;
  this.isbn = isbn;
  this.generos = generos;
}

var libros = [];


function ponerLibro(nuevoLibro){
    $('#lista-disponibles').append('<p class="creado">'+nuevoLibro.titulo+'</p>');
}


window.onload = function()
{

  var snd = document.getElementById("snd");
  snd.addEventListener("click", function() {

    var form = document.getElementById('crear');
    var titulo = form.elements[0].value;
    var autor = form.elements[1].value;
    var isbn = form.elements[2].value;
    var generos = [];

    $('#checkbox input').each(function(){
      if($(this).prop('checked')){
        generos.push($(this).val());
      }
    });
    var nuevoLibro = new Libro(titulo,autor,isbn,generos);

    ponerLibro(nuevoLibro);
  });

}
