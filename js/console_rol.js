var t_rol;
function listarRol() {
  t_rol = $("#tabla_rol").DataTable({
    ordering: false,
    pageLength: 10,
    destroy: true,
    async: false,
    resposive: true,
    ajax: {
      method: "POST",
      url: "../controlador/rol/controlador_rol_listar.php",
    },
    columns: [
      // {"defaultContent":""},
      { data: "rol_id" },
      { data: "rol_nombre" },
      { data: "rol_feregistro" },
      {
        data: "rol_estado",
        render: function (data, type, row) {
          if (data == "ACTIVO") {
            return "<span class='label label-success'>" + data + "</span>";
          } else {
            return "<span class='label label-danger'>" + data + "</span>";
          }
        },
      },
      {
        defaultContent:
          "<button class='btn btn-danger'><i class='fas fa-ban'></i></button>",
      },
    ],
    fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
      $($(nRow).find("td")[4]).css("text-align", "center");
    },
    langueage: idioma_espanol,
    select: true,
  });
  t_rol.on("draw.dt", function () {
    var PageInfo = $("#tabla_rol").DateTable().page.info();
    t_rol
      .columns(0, { page: "current" })
      .nodes()
      .each(function (cell, i) {
        cell.innerHTML = i + 1 + PageInfo.start;
      });
  });
}

function registrarRol() {
  var rol = $("#txt_rol").val();
  var estado = $("#cbm_estado").val();

  console.log(estado);

  if (rol == 0 || estado == 0) {
    return Swal.fire("Mensaje de advertencia", "Complete los campos vacios");
  }

  $.ajax({
    url: "../controlador/rol/controlador_rol_registro.php",
    type: "POST",
    data: {
      rol: rol,
      estado: estado
    },
  }).done(function (resp) {
    if (resp > 0) {
      if (resp == 1) {
        $("#modal_registro").modal("hide");
        Swal.fire(
          "Mensaje De Confirmacion",
          "Datos correctamente, nuevo rol registrado",
          "success"
        ).then((value) => {
          //   LimpiarRegistro();
          t_rol.ajax.reload();
        });
      } else {
        return Swal.fire(
          "Mensaje De Advertencia",
          "Lo sentimos, el nombre del rol ya se encuentra en nuestra base de datos",
          "warning"
        );
      }
    } else {
      return Swal.fire(
        "Mensaje de error",
        "Lo sentimos no se puedo completar el registro",
        "warning"
      );
    }
  });
}

function AbrirModalRegistro() {
  $("#modal_registro").modal({ backdrop: "static", keyboard: false });
  $("#modal_registro").modal("show");
}
