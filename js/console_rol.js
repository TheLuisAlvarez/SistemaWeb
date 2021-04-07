var t_rol;
function listarRol() {
  t_rol = $("#tabla_rol").DataTable({
    ordering: true,
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
            return "<span class='badge badge-success'>" + data + "</span>";
          } else {
            return "<span class='badge badge-danger'>" + data + "</span>";
          }
        },
      },
      {
        defaultContent:
          "<button class='desactivar btn btn-danger'><i class='fas fa-ban'></i></button>&nbsp;<button style='font-size:13px;' type='button' class='activar btn btn-success'><i class='fa fa-check'></i></button>",
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
      estado: estado,
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
  document.getElementById("tabla_usuario_filter").style.display = "none";

  $("input.global_filter").on("keyup click", function () {
    filterGlobal();
  });
  $("input.column_filter").on("keyup click", function () {
    filterColumn($(this).parents("tr").attr("data-column"));
  });
}

$("#tabla_rol").on("click", ".desactivar", function () {
  var data = t_rol.row($(this).parents("tr")).data();
  if (t_rol.row(this).child.isShown()) {
    var data = t_rol.row(this).data();
  }
  Swal.fire({
    title: "¿Esta seguro de desactivar el rol?",
    text: "Una vez hecho esto el rol no estará disponible en el sistema",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si",
  }).then((result) => {
    if (result.value) {
      Modificar_Estado(data.rol_id, "2");
    }
  });
});

$("#tabla_rol").on("click", ".activar", function () {
  var data = t_rol.row($(this).parents("tr")).data();
  if (t_rol.row(this).child.isShown()) {
    var data = t_rol.row(this).data();
  }
  Swal.fire({
    title: "¿Esta seguro de activar el rol?",
    text: "Una vez hecho esto el rol estará disponible en el sistema",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si",
  }).then((result) => {
    if (result.isConfirmed) {
      Modificar_Estado(data.rol_id, "1");
    }
  });
});


function Modificar_Estado(idrol, estado) {
    var mensaje = "";
    if (estado == "INACTIVO") {
      mensaje = "desactivo";
    } else {
      mensaje = "activo";
    }
    $.ajax({
      url: "../controlador/rol/controlador_modificar_estado_rol.php",
      type: "POST",
      data: {
        idrol: idrol,
        estado: estado,
      },
    }).done(function (resp) {
      if (resp > 0) {
        Swal.fire(
          "Mensaje de Confirmacion",
          "El rol se " + mensaje + " con éxito",
          "success"
        ).then((value) => {
          t_rol.ajax.reload();
        });
      }
    });
  }
  

function filterGlobal() {
  $("#tabla_rol").DataTable().search($("#global_filter").val()).draw();
}

function AbrirModalRegistro() {
  $("#modal_registro").modal({ backdrop: "static", keyboard: false });
  $("#modal_registro").modal("show");
}
