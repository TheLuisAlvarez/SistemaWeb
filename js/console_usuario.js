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