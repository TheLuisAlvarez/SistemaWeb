function VerificarUsuario(){
    var usu = document.getElementById('usuario').value;
    var con = document.getElementById('contrasena').value;
    if(usu.length == 0 || con.length == 0) {
        return Swal.fire("Mensaje de advertencia", "Llene los campos vacios", "warning");
    }

    $.ajax({
        url: '../controlador/usuario/controlador_verificar_usuario.php',
        type: 'POST',
        data: {
            u:usu,
            c:con
        }
    }).done(function(resp){
        alert(resp);
    })
}