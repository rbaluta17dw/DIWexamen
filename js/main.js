// Constructor Libro
function Libro(titulo, autor, isbn, generos) {
  this.titulo = titulo;
  this.autor = autor;
  this.isbn = isbn;
  this.generos = generos;
}

var libros = [];


function ponerLibro(nuevoLibro){
  var existe = false;
  $('#lista-disponibles p').each(function(){
    if($(this).html() == nuevoLibro.titulo){
      existe = true;
    }
    if($(this).hasClass('creado')){
      $(this).removeClass('creado');
    }
  });
  if (existe) {
    alert('eskere!!');
  }else {
    $('#lista-disponibles').append('<p class="creado">'+nuevoLibro.titulo+'</p>');
    libros.push(nuevoLibro);
    console.log(libros);
  }
}

$(document).ready(function(){

  $("#lista-disponibles").on('click', 'p', function(){
    for (var i = 0; i < libros.length; i++) {
      if ($(this).html() == libros[i].titulo) {
        var seleccionado = libros[i];
        var consulta = document.getElementById('consultar');
        if (consulta.elements[0].value == seleccionado.titulo) {
          alert('ya lo seleccionaste m3n');
        }else {
          consulta.elements[0].value = seleccionado.titulo;
          consulta.elements[1].value = seleccionado.autor;
          consulta.elements[2].value = seleccionado.isbn;
          //consulta.elements[3].value = seleccionado.generos; <!-- solo textarea -->
          $('#lista-generos').html('');
          for (var i = 0; i < seleccionado.generos.length; i++) {
            $('#lista-generos').append('<p class="eskere">'+seleccionado.generos[i]+"</p>");
          }
          alert(seleccionado.titulo);
          console.log(seleccionado);
        }
      }

    }
  });

  // var snd = document.getElementById("snd");
  // snd.addEventListener("click", function() {
  $('#pst').click(function(){
    var prestamo = document.getElementById('consultar');
    var titulo = prestamo.elements[0].value;
    for (var i = 0; i < libros.length; i++) {
      if (titulo == libros[i].titulo) {
        console.log('entraaaaa');
        prestarLibro(libros[i]);
      }
    }
  });

  $('#snd').click(function(){
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

});
