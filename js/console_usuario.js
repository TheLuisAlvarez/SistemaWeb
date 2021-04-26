function VerificarUsuario() {
  var usu = document.getElementById("usuario").value;
  var con = document.getElementById("contrasena").value;
  if (usu.length == 0 || con.length == 0) {
    return Swal.fire(
      "Mensaje de advertencia",
      "Llene los campos vacios",
      "warning"
    );
  }

  $.ajax({
    url: "../controlador/usuario/controlador_verificar_usuario.php",
    type: "POST",
    data: {
      u: usu,
      c: con,
    },
  }).done(function (resp) {
    var data = JSON.parse(resp);
    if (resp == 0) {
      Swal.fire(
        "Mensaje de advertencia",
        "Usuario y/o contrase\u00f1a incorrecta",
        "warning"
      );
    } else {
      if (data[0][5] == "ACTIVO") {
        $.ajax({
          url: "../controlador/usuario/controlador_crear_sesion.php",
          type: "POST",
          data: {
            idusuario: data[0][0],
            usuario: data[0][1],
            rol: data[0][6],
          },
        }).done(function (resp) {
          let timerInterval;
          Swal.fire({
            title: "!Bienvenido al sistema¡",
            html: "Ser&aacute; redireccionado en <b></b> milisegundos.",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              timerInterval = setInterval(() => {
                const content = Swal.getContent();
                if (content) {
                  const b = content.querySelector("b");
                  if (b) {
                    b.textContent = Swal.getTimerLeft();
                  }
                }
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              location.reload();
            }
          });
        });
      } else {
        Swal.fire(
          "Mensaje de advertencia",
          "El usuario se encuentra inactivo, comuniquese con el administrador",
          "warning"
        );
      }
    }
  });
}

var t_usuario;

function listar_usuario() {
  t_usuario = $("#tabla_usuario").DataTable({
    ordering: false,
    paging: true,
    searching: { regex: true },
    lengthMenu: [
      [5, 10, 25, 50, 100, -1],
      [5, 10, 25, 50, 100, "All"],
    ],
    pageLength: 5,
    destroy: true,
    async: false,
    processing: true,
    ajax: {
      url: "../controlador/usuario/controlador_usuario_listar.php",
      type: "POST",
    },
    columns: [
      { defaultContent: ""},
      { data: "cod_usr" },
      { data: "usuario" },
      {
        defaultContent:
         "<button class='mostrar_datos btn btn-primary btn-sm'><i class='fas fa-eye'></i></button>",
     },
    ],
    fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
      $($(nRow).find("td")[3]).css("text-align", "center");
    },
    language: idioma_espanol,
    select: true,
  });



  //  document.getElementById("tabla_usuario_filter").style.display = "none";

  //   $("input.global_filter").on("keyup click", function () {
  //     filterGlobal();
  //   });

  //   $("input.column_filter").on("keyup click", function () {
  //     filterColumn($(this).parents("tr").attr("data-column"));
  //   });

  t_usuario.on("draw.dt", function () {
    var PageInfo = $("#tabla_usuario").DataTable().page.info();
    t_usuario
      .column(0, { page: "current" })
      .nodes()
      .each(function (cell, i) {
        cell.innerHTML = i + 1 + PageInfo.start;
      });
  });
}

// agrega un listener del evento on('click') para capturar cuando se presiona un botón
$("#tabla_usuario").on("click", ".mostrar_datos", function () {
  // cuando eso suceda, captura el valor de la primer columna, y asígnalo al input donde quieres mostrarlo
  var codUsuario = $(this).closest("tr").find("td:eq(1)").text();
  $('#usuario').val(codUsuario);

  listar_usuario_rol();
  listar_usuario_grupo();
  listar_usuario_ventana();
});



function listar_usuario_rol() {
  var cod_usr = $("#usuario").val();
  t_usuario = $("#tabla_usuario_rol").DataTable({
    ordering: false,
    searching: false,
    paging: false,
    info: false,
    pageLength: 10,
    destroy: true,
    async: false,
    processing: true,
    ajax: {
      url: "../controlador/usuario/controlador_usuario_rol_listar.php",
      type: "POST",
      data: {
        cod_usr: cod_usr,
      },
    },
    columns: [{ defaultContent: "" }, { data: "rol" }],
    language: idioma_espanol,
    select: true,
  });

  t_usuario.on("draw.dt", function () {
    var PageInfo = $("#tabla_usuario_rol").DataTable().page.info();
    t_usuario
      .column(0, { page: "current" })
      .nodes()
      .each(function (cell, i) {
        cell.innerHTML = i + 1 + PageInfo.start;
      });
  });
}

function listar_usuario_grupo() {
  var cod_usr = $("#usuario").val();
  t_usuario = $("#tabla_usuario_grupo").DataTable({
    ordering: false,
    searching: false,
    paging: false,
    info: false,
    pageLength: 10,
    destroy: true,
    async: false,
    processing: true,
    ajax: {
      url: "../controlador/usuario/controlador_usuario_grupo_listar.php",
      type: "POST",
      data: {
        cod_usr: cod_usr,
      },
    },
    columns: [{ defaultContent: "" }, { data: "descripcion" }],
    language: idioma_espanol,
    select: true,
  });

  t_usuario.on("draw.dt", function () {
    var PageInfo = $("#tabla_usuario_grupo").DataTable().page.info();
    t_usuario
      .column(0, { page: "current" })
      .nodes()
      .each(function (cell, i) {
        cell.innerHTML = i + 1 + PageInfo.start;
      });
  });
}

function listar_usuario_ventana() {
  var cod_usr = $("#usuario").val();
  t_usuario = $("#tabla_usuario_ventana").DataTable({
    ordering: false,
    searching: false,
    paging: false,
    info: false,
    pageLength: 10,
    destroy: true,
    async: false,
    processing: false,

    ajax: {
      url: "../controlador/usuario/controlador_usuario_ventana_listar.php",
      type: "POST",
      data: {
        cod_usr: cod_usr,
      },
    },
    columns: [{ defaultContent: "" }, { data: "title" }],
    language: idioma_espanol,
    select: true,
  });

  t_usuario.on("draw.dt", function () {
    var PageInfo = $("#tabla_usuario_ventana").DataTable().page.info();
    t_usuario
      .column(0, { page: "current" })
      .nodes()
      .each(function (cell, i) {
        cell.innerHTML = i + 1 + PageInfo.start;
      });
  });
}
