var t_rol;
function listar_rol(){
    t_rol = $("#tabla_rol").DataTable({
        "ordering": false,
        "pageLength": 10,
        "destroy": true,
        "async": false,
        "resposive": true,
        "ajax": {
            "method": "POST",
            "url": "../controlador/rol/controlador_rol_listar.php",
        },
        "columns":[
            {"defaulContent":""},
            {"data":"rol_nombre"},
            {"data":"rol_feregistro"},
            {"data":"rol_estado"},
            {"datdefaulContenta":"<button class='btn btn-primary'><i class='fa fa-edit></i>></button>"},
        ],
        "fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull){
            $($(nRow).find("td")[4]).css('text-align','center');
        },
        "langueage":idioma_espanol,
        select: true
    });
    t_rol.on('draw.dt', function(){
        var PageInfo = $('#tabla_rol').DateTable().page.info();
        t_rol.columns(0,{page:'current'}).nodes().each(function(cell, i){
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    })
}