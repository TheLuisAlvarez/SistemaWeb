<script type="text/javascript" src="../js/console_rol.js?rev=<?php echo time();?>"></script>
<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">Mantenimiento Rol</h2>
            </div>
            <!-- /.card-header -->
            <div class="card-body">
                <div id="example2_wrapper" class="dataTables_wrapper dt-bootstrap4">
                    <div class="row">
                        <div class="col-sm-12 col-md-6"></div>
                        <div class="col-sm-12 col-md-4"></div>
                        <div class="col-lg-2">
                            <button class="btn btn-primary" style="width:100%" onclick="AbrirModalRegistro()"><i
                                    class="glyphicon glyphicon-plus"></i> Nuevo Registro</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <table id="tabla_rol" class="table table-bordered table-hover dataTable dtr-inline"
                                role="grid" aria-describedby="example2_info">
                                <thead>
                                    <tr role="row">
                                        <th class="sorting sorting_asc" tabindex="0" aria-controls="example2"
                                            rowspan="1" colspan="1">#</th>
                                        <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1"
                                            colspan="1">Rol</th>
                                        <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1"
                                            colspan="1">Fecha registro</th>
                                        <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1"
                                            colspan="1">Estado</th>
                                        <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1"
                                            colspan="1">Acci&oacute;n</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th rowspan="1" colspan="1">#</th>
                                        <th rowspan="1" colspan="1">Rol</th>
                                        <th rowspan="1" colspan="1">Fecha registro</th>
                                        <th rowspan="1" colspan="1">Estado</th>
                                        <th rowspan="1" colspan="1">Acci&oacute;n</th>
                                    </tr>
                                </tfoot>
                            </table>

                        </div>
                        <!-- /.card-body -->
                    </div>
                    <!-- /.card -->

                </div>
                <!-- /.col -->
            </div>
        </div>
    </div>
</div>

<form autocomplete="false" onsubmit=" return false">
    <div class="modal fade" id="modal_registro" role="dialog">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header d-flex justify-content-between">
                    <h4 class="modal-title"><b>Registro de Rol</b></h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="col-lg-12">
                        <label for="">Rol</label>
                        <input type="text" class="form-control" id="txt_rol" placeholder="Ingrese Rol" maxlength="50"><br>
                    </div>
                    <div class="col-lg-12">
                        <label for="">Estado</label>
                        <select class="js-example-basic-single" name="cbm_estado" id="cbm_estado" style="width:100%;">
                            <option value="1">ACTIVO</option>
                            <option value="2">INACTIVO</option>
                        </select><br><br>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="registrarRol()"><i
                            class="fa fa-check"><b>&nbsp;Registrar</b></i></button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal"><i
                            class="fa fa-close"><b>&nbsp;Cerrar</b></i></button>
                </div>
            </div>
        </div>
    </div>
</form>


<script>
$(document).ready(function() {
    listarRol();
    $('.js-example-basic-single').select2();
    $("#modal_registro").on('shown.bs.modal', function() {
        $("#txt_rol").focus();

    })
});
</script>