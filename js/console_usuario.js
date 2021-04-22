function VerificarUsuario() {
    var usu = document.getElementById('usuario').value;
    var con = document.getElementById('contrasena').value;
    if (usu.length == 0 || con.length == 0) {
        return Swal.fire("Mensaje de advertencia", "Llene los campos vacios", "warning");
    }

    $.ajax({
        url: '../controlador/usuario/controlador_verificar_usuario.php',
        type: 'POST',
        data: {
            u: usu,
            c: con
        }
    }).done(function (resp) {
        var data = JSON.parse(resp);
        if (resp == 0) {
            Swal.fire("Mensaje de advertencia", "Usuario y/o contrase\u00f1a incorrecta", "warning");
        } else {
            if (data[0][5] == "ACTIVO") {
                $.ajax({
                    url: '../controlador/usuario/controlador_crear_sesion.php',
                    type: 'POST',
                    data: {
                        idusuario: data[0][0],
                        usuario: data[0][1],
                        rol: data[0][6]
                    }
                }).done(function (resp) {
                    let timerInterval
                    Swal.fire({
                        title: '!Bienvenido al sistema¡',
                        html: 'Ser&aacute; redireccionado en <b></b> milisegundos.',
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                            timerInterval = setInterval(() => {
                                const content = Swal.getContent()
                                if (content) {
                                    const b = content.querySelector('b')
                                    if (b) {
                                        b.textContent = Swal.getTimerLeft()
                                    }
                                }
                            }, 100)
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                    }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            location.reload();
                        }
                    })
                })
            } else {
                Swal.fire("Mensaje de advertencia", "El usuario se encuentra inactivo, comuniquese con el administrador", "warning");
            }
        }
    })
}

var table;

function listar_usuario() {
  table = $("#tabla_usuario").DataTable({
    ordering: false,
    paging: true,
    searching: { regex: true },
    lengthMenu: [
      [10, 25, 50, 100, -1],
      [10, 25, 50, 100, "All"],
    ],
    pageLength: 10,
    destroy: true,
    async: false,
    processing: true,
    ajax: {
      url: "../controlador/usuario/controlador_usuario_listar.php",
      type: "POST",
    },
    columns: [
    { data: "cod_usr" },
      { data: "cod_usr" },
      { data: "usuario" }
    ],
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

  table.on( 'draw.dt', function(){
    var PageInfo = $('#tabla_usuario').DataTable().page.info();
    table.column(0, { page: 'current' }).nodes().each( function (cell, i){
      cell.innerHTML = i + 1 + PageInfo.start;
    });
});

}
