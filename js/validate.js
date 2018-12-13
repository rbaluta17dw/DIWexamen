$(document).ready(function () {
  $('#crear').validate({
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
    rules: {
      email: {
        required: true,
        email: true
      }
    }
  });
});
