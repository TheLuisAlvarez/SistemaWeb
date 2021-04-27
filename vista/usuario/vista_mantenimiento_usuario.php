<script type="text/javascript" src="../js/console_usuario.js?rev=<?php echo time();?>"></script>
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <!-- left column -->
          <div class="col-md-6">
          <input id="usuario" type="text" hidden>
          <input id="grupo" type="text" hidden>
            <!-- general form elements -->
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">Lista de Usuarios</h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <table id="tabla_usuario" class="table table-sm display responsive nowrap" style="width:100%">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>COD_USU</th>
                      <th>NOMBRE</th>
                      <th>ACCI&Oacute;N</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!--/.col (left) -->
          <!-- right column -->
          <div class="col-md-6">
            <!-- Form Element sizes -->
            <div class="card card-success">
              <div class="card-header">
                <h3 class="card-title">Rol</h3>
              </div>
              <div class="card-body">
                <table id="tabla_usuario_rol" class="table table-sm display responsive nowrap" style="width:100%">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>DESCRIPCIÓN</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
            <!-- <div class="row"> -->
              <!-- <div class="col-md-6"> -->
                <div class="card card-danger">
                  <div class="card-header">
                    <h3 class="card-title">Grupo de acceso</h3>
                  </div>
                  <div class="card-body">
                    <table id="tabla_usuario_grupo" class="table table-sm display responsive nowrap" style="width:100%">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>DESCRIPCIÓN</th>
                          <th>ACCI&Oacute;N</th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                  <!-- /.card-body -->
                </div>
              <!-- </div> -->
              <!-- <div class="col-md-6"> -->
                <div class="card card-danger">
                  <div class="card-header">
                    <h3 class="card-title">Ventana</h3>
                  </div>
                  <div class="card-body">
                    <table id="tabla_usuario_ventana" class="table table-sm display responsive nowrap" style="width:100%">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>DESCRIPCIÓN</th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                  <!-- /.card-body -->
                </div>
              <!-- </div> -->
            </div>
            <!-- /.card -->
          </div>
          <!--/.col (right) -->
        <!-- </div> -->
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </section>
    
    <script >
        $(document).ready(function(){
            listar_usuario();
        })
    </script>