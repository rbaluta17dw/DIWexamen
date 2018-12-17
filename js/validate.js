$(document).ready(function () {
  $('#crear').validate({
    errorPlacement: function(label, element) {
        element.addClass('rojo');
        label.insertBefore(element);
    },
      rules: {
      titulo:{
        required: true
      },
      autor: {
        required: true
      },
      generos:{
        required: true
      },
      email: {
        required: true,
        email: true
      }
    }
  });
  $('#consultar').validate({
    errorPlacement: function(label, element) {
        element.addClass('rojo');
        label.insertBefore(element);
    },
    rules: {
      email: {
        required: true,
        email: true
      }
    }
  });
});
