// Constructor Libro
function Libro(titulo, autor, isbn, generos) {
  this.titulo = titulo;
  this.autor = autor;
  this.isbn = isbn;
  this.generos = generos;
  this.prestadoa = "";
}
// Array de libros
var libros = [];

// Mete el libro que hemos cogido del formulario en disponibles
function ponerLibro(nuevoLibro){
  var existe = false;
  // Mira lista disponibles, coge todos los p de disponibles y los recorre
  $('#lista-disponibles p').each(function(){
    // Mira si existe un libro con ese titulo
    if($(this).html() == nuevoLibro.titulo){
      existe = true;
    }
    // Si tiene la clase creado se la quita
    if($(this).hasClass('creado')){
      $(this).removeClass('creado');
    }
  });
  // Si existe te lo dice
  if (existe) {
    //alert('El libro insertado ya existe');
  }else {
    // Inserta el titulo del libro en el div usando la etiqueta p
    $('#lista-disponibles').append('<p class="creado">'+nuevoLibro.titulo+'</p>');
    libros.push(nuevoLibro);
  }
}


// Coge del div disponibles y pasa el libro seleccionado al div prestamos
function prestarLibro(libro){
  var existe = false;
  // Mira si existe el libro seleccionado en el div prestamos
  $('.prestamos p').each(function(){
    if($(this).html() == libro.titulo){
      existe = true;
    }
    // Si tiene la clase prestado se la quita
    if($(this).hasClass('prestado')){
      $(this).removeClass('prestado');
    }
  });
  // Si seleccionamos un libro que ya esta prestado
  if (existe) {
    //alert('El libro seleccionado ya esta prestado');
  }else {
    // Ponemos el libro disponible en prestamos y lo quitamos de disponibles
    $('.prestamos').append('<p class="prestado">'+libro.titulo+'</p>');
    $("#lista-disponibles .seleccionado").remove();
    // Reiniciamos el formulario prestamos
    $("#consultar")[0].reset();
    // Quitamos todos los generos del div de generos
    var list = document.getElementById("lista-generos");
    while (list.hasChildNodes()) {
      list.removeChild(list.lastChild);
    }
  }
}
// Quita el libro seleccionado de prestado y lo mete en disponible
function devolverLibro(libro){
  var existe = false;
  // Mira si el libro esta en disponibles
  $('.disponibles p').each(function(){
    if($(this).html() == libro.titulo){
      existe = true;
    }
    // Si tiene la clase devuelto se la quita
    if($(this).hasClass('devuelto')){
      $(this).removeClass('devuelto');
    }
  });
  // Si el libro existe en disponibles te lo hace saber
  if (existe) {
    //alert('El libro que intentas devolver esta disponible');
  }else {
    // Si esta en prestados lo va a mover a disponibles
    $('.disponibles').append('<p class="devuelto">'+libro.titulo+'</p>');
    $("#lista-prestamos .seleccionado").remove();
    // Limpia el formulario
    $("#consultar")[0].reset();
    // Borra todos los generos de la lista de generos
    var list = document.getElementById("lista-generos");
    while (list.hasChildNodes()) {
      list.removeChild(list.lastChild);
    }
  }
}

// Cuando el documento este cargado
$(document).ready(function(){
  // Cuando hagas click en un p dentro de lista-disponibles
  $("#lista-disponibles").on('click', 'p', function(){
    $('.disponibles p').each(function(){
      $(this).removeClass('seleccionado');
    });
    $('.prestamos p').each(function(){
      $(this).removeClass('seleccionado');
    });
    // Recorre los libros
    for (var i = 0; i < libros.length; i++) {
      // Si encuentra un libro con el mismo titulo
      if ($(this).html() == libros[i].titulo) {
        // El libro con ese titulo es el seleccionado
        var seleccionado = libros[i];
        $(this).addClass('seleccionado');
        // Consulta es el form de prestar y devolver
        var consulta = document.getElementById('consultar');
        if (consulta.elements[0].value == seleccionado.titulo) {
          alert('Ese libro esta seleccionado');
        }else {
          // Llena el form con los valores del libro
          consulta.elements[0].value = seleccionado.titulo;
          consulta.elements[1].value = seleccionado.autor;
          consulta.elements[2].value = seleccionado.isbn;
          // Vacia la lista de generos
          $('#lista-generos').html('');
          // Recorre la lista de generos del libro
          for (var i = 0; i < seleccionado.generos.length; i++) {
            // Agrega los generos a la lista de generos
            $('#lista-generos').append('<li class="lista-generos">'+seleccionado.generos[i]+"</li>");
          }
        }
      }
    }
  });

  // Cuando hagas click en un p dentro de lista-prestamos
  $("#lista-prestamos").on('click', 'p', function(){
    $('.prestamos p').each(function(){
      $(this).removeClass('seleccionado');
    });
    $('.disponibles p').each(function(){
      $(this).removeClass('seleccionado');
    });
    // Recorre los libros
    for (var i = 0; i < libros.length; i++) {
      // Si encuentra un libro con el mismo titulo
      if ($(this).html() == libros[i].titulo) {
        // El libro con ese titulo es el seleccionado
        var seleccionado = libros[i];
        $(this).removeClass('prestado devuelto');
        $(this).addClass('seleccionado');
        // Consulta es el form de prestar y devolver
        var consulta = document.getElementById('consultar');
        if (consulta.elements[0].value == seleccionado.titulo) {
          alert('Ese libro esta seleccionado');
        }else {
          // Llena el form con los valores del libro
          consulta.elements[0].value = seleccionado.titulo;
          consulta.elements[1].value = seleccionado.autor;
          consulta.elements[2].value = seleccionado.isbn;
          consulta.elements[3].value = seleccionado.prestadoa;
          // Vacia la lista de generos
          $('#lista-generos').html('');
          // Recorre la lista de generos del libro
          for (var i = 0; i < seleccionado.generos.length; i++) {
            // Agrega los generos a la lista de generos
            $('#lista-generos').append('<li class="lista-generos">'+seleccionado.generos[i]+"</li>");
          }
        }
      }
    }
  });
  // Al hacer click al boton prestar
  $('#pst').click(function(){
    var prestamo = document.getElementById('consultar');
    var titulo = prestamo.elements[0].value;
    // Recorre todos los libros
    for (var i = 0; i < libros.length; i++) {
      // Si hay un libro con ese titulo lo presta
      if (titulo == libros[i].titulo) {
        libros[i].prestadoa = prestamo.elements[3].value;
        prestarLibro(libros[i]);
      }
    }
  });

  // Cuando haces click en el boton devolver
  $('#dvl').click(function(){
    var prestamo = document.getElementById('consultar');
    var titulo = prestamo.elements[0].value;
    // Recorre todos los libros
    for (var i = 0; i < libros.length; i++) {
      // Si hay un libro con ese titulo lo devuelve
      if (titulo == libros[i].titulo) {
        libros[i].prestadoa = prestamo.elements[3].value;
        devolverLibro(libros[i]);
      }
    }
  });

  // Cuando haces click al boton añadir
  $('#snd').click(function(){
    var crear = document.getElementById('crear');
    var titulo = crear.elements[0].value;
    var autor = crear.elements[1].value;
    var isbn = crear.elements[2].value;
    var generos = [];
    // Recorre los checkbox
    $('#checkbox input').each(function(){
      if($(this).prop('checked')){
        generos.push($(this).val());
      }
    });
    // Crea un libro con los atributos de los valores del formulario
    var nuevoLibro = new Libro(titulo,autor,isbn,generos);
    ponerLibro(nuevoLibro);
  });
});
