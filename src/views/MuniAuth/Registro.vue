<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
          <!-- CARD  -->
          <div class="card bg-secondary shadow border-0">
              <!-- CARD  TITLE -->
              <div class="card-header bg-transparent pb-2">
                  <div class="text-muted text-center mt-2 mb-3">
                      <h2 class="tituloFormulario">REGISTRO DE DATOS</h2>
                  </div>
              </div>
              <!-- CARD  BODY -->
              <div class="card-body px-lg-5 py-lg-5">
                <div class="text-center text-muted mb-4">
                    <label for="example-datepicker">Ingrese la fecha del nacimiento del estudiante a matricular:</label>
                    <b-form-input
                      type = "date"
                      min="1970-01-01" 
                      max="2010-12-31"
                      v-model="edad"
                      :disabled="FormFechaNacDisable"
                      :state="validationFechaNac"
                      >
                      </b-form-input>
                      <div>
                        <b-form-invalid-feedback :state="validationFechaNac">
                          <span>Ingrese una fecha de nacimiento válida</span>
                        </b-form-invalid-feedback>
                      </div>
                </div>
              </div>
          </div>
          <!-- END CARD -->
          <!-- FORM CARD 1--> <!-- FORMULARIO UNO -->
          <b-card v-show="mostrarFormularioUno" no-body class="bg-secondary mt-4 border-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <!-- FORMULARIO UNO -->
              <b-form >
                <h2 class ="text-center mb-4 tituloFormulario" >DATOS DEL APODERADO</h2>
                <!-- Grupo 1( NUMERO DNI APODERADO) -->
                <b-form-group
                  label="1. Número de DNI del apoderado:"
                  >
                  <b-form-input
                    type = "text"
                    placeholder = "Ingrese su numero de dni"
                    @change = "bucarApoderado"
                    @keyup = "verificarDatosApoderado"
                    @keypress="isNumber($event)"
                    @blur = "$v.apoderado.dni.$touch"
                    v-model = "$v.apoderado.dni.$model"
                    :state = "$v.apoderado.dni.$dirty ? !$v.apoderado.dni.$invalid : null"
                    maxlength = "8"
                    :disabled = "inputApoderadoDisable"
                    >
                    </b-form-input>
                    <b-form-invalid-feedback>
                      <span v-show = "!$v.apoderado.dni.required"> * el campo dni es requerido</span>
                      <span v-show = "!$v.apoderado.dni.numeric"> * el campo requiere un valor numérico</span>
                      <span v-show = "!$v.apoderado.dni.maxLength"> * el campo dni requeriere máximo 8 dígitos</span>
                      <span v-show = "!$v.apoderado.dni.minLength"> * el campo dni es requerido</span>
                    </b-form-invalid-feedback>
                    <span 
                      class="input--error" 
                      v-for="(dniApoError, index) in mostrarErroresInput('dni')" 
                      :key="`dniApoError-${index}`">*  {{ dniApoError }}</span>
                </b-form-group>
                <!-- Grupo 2 ( AP PATERNO APODERADO) -->
                <b-form-group
                  label="2. Apellido paterno del apoderado:"
                >
                  <div class = "pb-1  loader-content" v-show="getApoderadoLoading" >
                    <pulse-loader class="mt-2 ml-3"  :loading="getApoderadoLoading" :size = "15" :color="'#4FA898'"/>
                  </div>

                  <b-form-input
                    v-show="!getApoderadoLoading"
                    type = "text"
                    @keyup = "verificarDatosApoderado"
                    @keypress="isLetter($event)"
                    @blur = "$v.apoderado.dni.$touch"
                    placeholder = "Ingrese el apellido paterno:"
                    v-model = "$v.apoderado.apPater.$model"
                    :state = "$v.apoderado.apPater.$dirty ? !$v.apoderado.apPater.$invalid : null"
                    :disabled = "inputApoderadoDisable"
                    >
                  </b-form-input>

                  <b-form-invalid-feedback>
                      <span v-show = "!$v.apoderado.apPater.required"> * el campo es requerido</span>
                      <span v-show = "!$v.apoderado.apPater.letrasValidas"> * el campo requiere solo letras validas</span>
                  </b-form-invalid-feedback>
                  <span 
                    class="input--error"
                    v-for="(apellApoError, index) in mostrarErroresInput('apellidos')"
                    :key="`apPaterApoError-${index}`">{{ apellApoError }}</span>
                </b-form-group>
                <!-- Grupo 3 ( AP MATERNO APODERADO ) -->
                <b-form-group 
                  label="3. Apellido materno del apoderado:"
                  >
                  <div class = "pb-1  loader-content" v-show="getApoderadoLoading">
                    <pulse-loader class="mt-2 ml-3" :loading="getApoderadoLoading" :size = "15" :color="'#4FA898'"/>
                  </div>
                  <b-form-input
                    v-show="!getApoderadoLoading"
                    type = "text"
                    @keyup = "verificarDatosApoderado"
                    @keypress="isLetter($event)"
                    @blur = "$v.apoderado.apPater.$touch"
                    placeholder = "Ingrese el apellido materno:"
                    v-model = "$v.apoderado.apMater.$model"
                    :state = "$v.apoderado.apMater.$dirty ? !$v.apoderado.apMater.$invalid : null"
                    :disabled = "inputApoderadoDisable"
                    >
                    </b-form-input>
                    <b-form-invalid-feedback>
                      <span v-show = "!$v.apoderado.apMater.required"> * el campo es requerido</span>
                      <span v-show = "!$v.apoderado.apMater.letrasValidas"> * el campo requiere solo letras validas</span>
                    </b-form-invalid-feedback>
                    <span 
                      class="input--error" 
                      v-for="(apellApoError, index) in mostrarErroresInput('apellidos')" 
                      :key="`apMaterApoError-${index}`">{{ apellApoError }}</span>
                </b-form-group>
                <!-- Grupo 4 ( NOMBRES APODERADO) -->
                <b-form-group 
                  label="4. Nombres del apoderado"
                  >
                  <div class = "pb-1  loader-content" v-show="getApoderadoLoading">
                    <pulse-loader class="mt-2 ml-3" :loading="getApoderadoLoading" :size = "15" :color="'#4FA898'"/>
                  </div>
                  <b-form-input
                    v-show="!getApoderadoLoading"
                    type = "text"
                    @keyup = "verificarDatosApoderado"
                    @keypress="isLetter($event)"
                    @blur = "$v.apoderado.apMater.$touch"
                    placeholder = "Ingrese los nombres del apoderado"
                    v-model = "$v.apoderado.nombres.$model"
                    :state = "$v.apoderado.nombres.$dirty ? !$v.apoderado.nombres.$invalid : null"
                    :disabled = "inputApoderadoDisable"
                    >
                    </b-form-input>
                    <b-form-invalid-feedback>
                      <span v-show = "!$v.apoderado.nombres.required"> * el campo es requerido</span>
                      <span v-show = "!$v.apoderado.nombres.letrasValidas"> * el campo requiere solo letras validas</span>
                    </b-form-invalid-feedback>

                    <span 
                      class="input--error" 
                      v-for="(nombApoError, index) in mostrarErroresInput('nombre')" 
                      :key="`nombApoError-${index}`">{{ nombApoError }}</span>

                </b-form-group>
                <!-- Grupo 5( CELULAR) -->
                <b-form-group 
                  label="5. Número de celular del apoderado"
                  >
                   <div class = "pb-1  loader-content" v-show="getEstudianteLoading" >
                    <pulse-loader class="mt-2 ml-3"  :loading="getEstudianteLoading" :size = "15" :color="'#4FA898'"/>
                  </div>

                  <b-form-input
                    v-show="!getApoderadoLoading"
                    type = "text"
                    placeholder = "Ingrese su número"
                    v-model = "$v.apoderado.celular.$model"
                    @keyup = "verificarDatosApoderado"
                    @keypress="isNumber($event)"
                    @blur = "$v.apoderado.nombres.$touch"
                    :state = "$v.apoderado.celular.$dirty ? !$v.apoderado.celular.$invalid : null"
                    :disabled = "inputApoderadoDisable"
                    maxlength = "9"
                    >
                    </b-form-input>
                    
                    <b-form-invalid-feedback>
                      <span v-show = "!$v.estudiante.celular.required"> * el campo celular es requerido</span>
                      <span v-show = "!$v.estudiante.celular.numeric"> * el campo requiere un valor numérico</span>
                      <span v-show = "!$v.estudiante.celular.maxLength"> * el campo celular requeriere máximo 9 dígitos</span>
                      <span v-show = "!$v.estudiante.celular.minLength"> * el campo celular es requerido</span>
                    </b-form-invalid-feedback>

                    <span 
                      class="input--error" 
                      v-for="(celEstuError, index) in mostrarErroresInput('celular')" 
                      :key="`celEstuError-${index}`">{{ celEstuError }}</span>

                </b-form-group>
                <b-form-group
                  label-align	="center"
                  style="text-align:center;"
                >
                  <b-button variant="success"
                    :disabled="btnCrearApoderadoDisable" 
                    v-show="mostrarBtnRegistrarApoderado" 
                    @click="crearApoderado" >REGISTRAR APODERADO</b-button>
                    <p class="text-success" v-show="btnCrearApoderadoDisable" >Rellenar todos los campos para enviar.</p>
                  <b-button variant="danger" v-show="btnCambiarApoderado" @click="cambiarApoderado" >CAMBIAR APODERADO</b-button>
                  <b-button variant="success" v-show="btnCambiarApoderado" @click="cambiarFormulario" >SIGUIENTE</b-button>
                </b-form-group>
              </b-form>
              
            </b-card-body>
          </b-card>

          <!-- FORM CARD 2--> <!-- FORMULARIO DOS -->
          <b-card v-show="mostrarFormularioDos" no-body class="bg-secondary mt-4 border-0">
            <b-card-body class="px-lg-5 py-lg-5">

              <!-- FORMULARIO DOS -->
              <b-form >
                <h2 class ="text-center mb-4 tituloFormulario" >DATOS DEL ESTUDIANTE</h2>

                <!-- Grupo 1( NUMERO DNI ESTUDIANTE) -->
                <b-form-group
                  label="1. Número de DNI del estudiante:"
                >
                  <b-form-input
                    type = "text"
                    placeholder = "Ingrese su numero de dni"
                    @change = "buscarEstudiante"
                    @keyup = "verificarDatosEstudiante"
                    @keypress="isNumber($event)"
                    @blur = "$v.estudiante.dni.$touch"
                    v-model = "$v.estudiante.dni.$model"
                    :state = "$v.estudiante.dni.$dirty ? !$v.estudiante.dni.$invalid : null"
                    maxlength = "8"
                    :disabled = "inputEstudianteDisable"
                  ></b-form-input>

                  <b-form-invalid-feedback>
                    <span v-show = "!$v.estudiante.dni.required"> * el campo dni es requerido</span>
                    <span v-show = "!$v.estudiante.dni.numeric"> * el campo requiere un valor numérico</span>
                    <span v-show = "!$v.estudiante.dni.maxLength"> * el campo dni requeriere máximo 8 dígitos</span>
                    <span v-show = "!$v.estudiante.dni.minLength"> * el campo dni es requerido</span>
                  </b-form-invalid-feedback>

                  <span 
                    class="input--error" 
                    v-for="(dniEstError, index) in mostrarErroresInput('dni')" 
                    :key="`dniEstError-${index}`">{{ dniEstError }}</span>

                </b-form-group>

                <!-- Grupo 2 ( AP PATERNO ESTUDIANTE) -->
                <b-form-group 
                  label="2. Apellido paterno del estudiante:"
                >
                   <div class = "pb-1  loader-content" v-show="getEstudianteLoading" >
                    <pulse-loader class="mt-2 ml-3"  :loading="getEstudianteLoading" :size = "15" :color="'#4FA898'"/>
                  </div>

                  <b-form-input
                    v-show="!getEstudianteLoading"
                    type = "text"
                    @keyup = "verificarDatosEstudiante"
                    @keypress="isLetter($event)"
                    @blur = "$v.estudiante.dni.$touch"
                    placeholder = "Ingrese el apellido paterno:"
                    v-model = "$v.estudiante.apPater.$model"
                    :state = "$v.estudiante.apPater.$dirty ? !$v.estudiante.apPater.$invalid : null"
                    :disabled = "inputEstudianteDisable"
                    >
                  </b-form-input>

                  <b-form-invalid-feedback>
                      <span v-show = "!$v.estudiante.apPater.required"> * el campo es requerido</span>
                      <span v-show = "!$v.estudiante.apPater.letrasValidas"> * el campo requiere solo letras validas</span>
                  </b-form-invalid-feedback>

                  <span 
                    class="input--error" 
                    v-for="(apellEstuError, index) in mostrarErroresInput('apellidos')" 
                    :key="`apPaterEstuError-${index}`">{{ apellEstuError }}</span>

                </b-form-group>

                <!-- Grupo 3 ( AP MATERNO ESTUDIANTE ) -->
                <b-form-group 
                  label="3. Apellido materno del estudiante:"
                  >
                   <div class = "pb-1  loader-content" v-show="getEstudianteLoading" >
                    <pulse-loader class="mt-2 ml-3"  :loading="getEstudianteLoading" :size = "15" :color="'#4FA898'"/>
                  </div>

                  <b-form-input
                    v-show="!getEstudianteLoading"
                    type = "text"
                    @keyup = "verificarDatosEstudiante"
                    @keypress="isLetter($event)"
                    @blur = "$v.estudiante.apPater.$touch"
                    placeholder = "Ingrese el apellido materno:"
                    v-model = "$v.estudiante.apMater.$model"
                    :state = "$v.estudiante.apMater.$dirty ? !$v.estudiante.apMater.$invalid : null"
                    :disabled = "inputEstudianteDisable"
                    >
                    </b-form-input>

                    <b-form-invalid-feedback>
                      <span v-show = "!$v.estudiante.apMater.required"> * el campo es requerido</span>
                      <span v-show = "!$v.estudiante.apMater.letrasValidas"> * el campo requiere solo letras validas</span>
                    </b-form-invalid-feedback>

                    <span 
                    class="input--error" 
                    v-for="(apellEstuError, index) in mostrarErroresInput('apellidos')" 
                    :key="`apMaterEstuError-${index}`">{{ apellEstuError }}</span>

                </b-form-group>
              
                <!-- Grupo 4 ( NOMBRES ESTUDIANTE) -->
                <b-form-group 
                  label="4. Nombres del estudiante"
                  >
                   <div class = "pb-1  loader-content" v-show="getEstudianteLoading" >
                    <pulse-loader class="mt-2 ml-3"  :loading="getEstudianteLoading" :size = "15" :color="'#4FA898'"/>
                  </div>

                  <b-form-input
                    v-show="!getEstudianteLoading"
                    type = "text"
                    @keyup = "verificarDatosEstudiante"
                    @keypress="isLetter($event)"
                    @blur = "$v.estudiante.apMater.$touch"
                    placeholder = "Ingrese los nombres del estudiante"
                    v-model = "$v.estudiante.nombres.$model"
                    :state = "$v.estudiante.nombres.$dirty ? !$v.estudiante.nombres.$invalid : null"
                    :disabled = "inputEstudianteDisable"
                    >
                    </b-form-input>

                    <b-form-invalid-feedback>
                      <span v-show = "!$v.estudiante.nombres.required"> * el campo es requerido</span>
                      <span v-show = "!$v.estudiante.nombres.letrasValidas"> * el campo requiere solo letras validas</span>
                    </b-form-invalid-feedback>

                    <span 
                      class="input--error" 
                      v-for="(nombEstuError, index) in mostrarErroresInput('nombre')" 
                      :key="`nombEstuError-${index}`">{{ nombEstuError }}</span>

                </b-form-group>

                <!-- Grupo 5( CELULAR) -->
                <b-form-group 
                  label="5. Ingrese el número de celular del estudiante"
                  >
                   <div class = "pb-1  loader-content" v-show="getEstudianteLoading" >
                    <pulse-loader class="mt-2 ml-3"  :loading="getEstudianteLoading" :size = "15" :color="'#4FA898'"/>
                  </div>

                  <b-form-input
                    v-show="!getEstudianteLoading"
                    type = "text"
                    placeholder = "Ingrese su número"
                    v-model = "$v.estudiante.celular.$model"
                    @keyup = "verificarDatosEstudiante"
                    @keypress="isNumber($event)"
                    @blur = "$v.estudiante.nombres.$touch"
                    :state = "$v.estudiante.celular.$dirty ? !$v.estudiante.celular.$invalid : null"
                    :disabled = "inputEstudianteDisable"
                    maxlength = "9"
                    >
                    </b-form-input>
                    
                    <b-form-invalid-feedback>
                      <span v-show = "!$v.estudiante.celular.required"> * el campo celular es requerido</span>
                      <span v-show = "!$v.estudiante.celular.numeric"> * el campo requiere un valor numérico</span>
                      <span v-show = "!$v.estudiante.celular.maxLength"> * el campo celular requeriere máximo 9 dígitos</span>
                      <span v-show = "!$v.estudiante.celular.minLength"> * el campo celular es requerido</span>
                    </b-form-invalid-feedback>

                    <span 
                      class="input--error" 
                      v-for="(celEstuError, index) in mostrarErroresInput('celular')" 
                      :key="`celEstuError-${index}`">{{ celEstuError }}</span>

                </b-form-group>
              
                <!-- Grupo 6 ( FECHA DE NACIMIENTO) -->
                <b-form-group 
                  label="6. Fecha de nacimiento del estudiante:"
                  >
                   <div class = "pb-1  loader-content" v-show="getEstudianteLoading" >
                    <pulse-loader class="mt-2 ml-3"  :loading="getEstudianteLoading" :size = "15" :color="'#4FA898'"/>
                  </div>

                  <b-form-input
                    v-show="!getEstudianteLoading"
                    type = "date"
                    min="1940-01-01" 
                    max="2030-12-31"
                    @keyup = "verificarDatosEstudiante"
                    @blur = "$v.estudiante.celular.$touch"
                    placeholder = "Ingresa la fecha"
                    v-model = "$v.estudiante.fechNac.$model"
                    :state = "$v.estudiante.fechNac.$dirty ? !$v.estudiante.fechNac.$invalid : null"
                    disabled
                    >
                    </b-form-input>

                    <b-form-invalid-feedback>
                      <span v-show = "!$v.estudiante.nombres.required"> * el campo es requerido</span>
                    </b-form-invalid-feedback>

                    <span 
                      class="input--error" 
                      v-for="(nacimEstuError, index) in mostrarErroresInput('fecha_nacimiento')" 
                      :key="`nacimEstuError-${index}`">{{ nacimEstuError }}</span>

                </b-form-group>

                <!-- Grupo 7 ( Departamentos ) -->
                <b-form-group 
                  label="7. Departamento de residencia del estudiante:"
                  >
                    <div class = "pb-1  loader-content" v-show="getEstudianteLoading" >
                      <pulse-loader class="mt-2 ml-3"  :loading="getEstudianteLoading" :size = "15" :color="'#4FA898'"/>
                    </div>

                  <b-form-select 
                    v-show="!getEstudianteLoading"
                    v-model = "$v.estudiante.departamento_id.$model"
                    @change = "getProvincias"
                    @blur = "$v.estudiante.departamento_id.$touch"
                    :options = "Object.values(departamentos)"
                    :state = "$v.estudiante.departamento_id.$dirty ? !$v.estudiante.departamento_id.$invalid : null"
                    :disabled = "inputEstudianteDisable"
                    >
                    <template #first>
                      <b-form-select-option value="" disabled>-- Seleccione el departamento de residencia--</b-form-select-option>
                    </template>

                  </b-form-select>

                  <b-form-invalid-feedback>
                    <span v-show = "!$v.estudiante.departamento_id.required"> * el campo es requerido</span>
                  </b-form-invalid-feedback>

                  <span 
                    class="input--error" 
                    v-for="(provEstuError, index) in mostrarErroresInput('provincia')" 
                    :key="`provEstuError-${index}`">{{ provEstuError }}</span>

                </b-form-group>
                <!-- Grupo 8 ( Provincia ) -->
                <b-form-group 
                  label="8. Provincia de residencia del estudiante:"
                  >
                   <div class = "pb-1  loader-content" v-show="getEstudianteLoading" >
                    <pulse-loader class="mt-2 ml-3"  :loading="getEstudianteLoading" :size = "15" :color="'#4FA898'"/>
                  </div>
                  
                  <b-form-select 
                    v-show="!getEstudianteLoading"
                    @change = "getDistritos"
                    v-model = "$v.estudiante.provincia_id.$model" 
                    @blur = "$v.estudiante.provincia.$touch"
                    :options = "Object.values(provincias)"
                    :state = "$v.estudiante.provincia_id.$dirty ? !$v.estudiante.provincia_id.$invalid : null"
                    :disabled = "inputEstudianteDisable"
                    >
                    <template #first>
                      <b-form-select-option value="" disabled>-- Seleccione la provincia de residencia--</b-form-select-option>
                    </template>
                    <!-- Caso de otra distrito -->
                    <b-form-select-option value="otraDistrito">Otros</b-form-select-option>
                  </b-form-select>

                  <b-form-invalid-feedback>
                    <span v-show = "!$v.estudiante.provincia_id.required"> * el campo es requerido</span>
                  </b-form-invalid-feedback>

                  <span 
                    class="input--error" 
                    v-for="(distEstuError, index) in mostrarErroresInput('distrito')" 
                    :key="`distEstuError-${index}`">{{ distEstuError }}</span>

                </b-form-group>
                <!-- Grupo 9 ( DISTRITO ) -->
                <b-form-group 
                  label="9. Distrito de residencia del estudiante:"
                  >
                   <div class = "pb-1  loader-content" v-show="getEstudianteLoading" >
                    <pulse-loader class="mt-2 ml-3"  :loading="getEstudianteLoading" :size = "15" :color="'#4FA898'"/>
                  </div>
                  
                  <b-form-select 
                    v-show="!getEstudianteLoading"
                    @change = "getAllUbigeo"
                    v-model = "$v.estudiante.distrito_id.$model" 
                    @blur = "$v.estudiante.distrito_id.$touch"
                    :options = "Object.values(distritos)"
                    :state = "$v.estudiante.distrito_id.$dirty ? !$v.estudiante.distrito_id.$invalid : null"
                    :disabled = "inputEstudianteDisable"
                    >
                    <template #first>
                      <b-form-select-option value="" disabled>-- Seleccione el distrito de residencia--</b-form-select-option>
                    </template>
                    <!-- Caso de otra distrito -->
                    <b-form-select-option value="otraDistrito">Otros</b-form-select-option>
                  </b-form-select>

                  <b-form-invalid-feedback>
                    <span v-show = "!$v.estudiante.distrito_id.required"> * el campo es requerido</span>
                  </b-form-invalid-feedback>

                  <span 
                    class="input--error" 
                    v-for="(distEstuError, index) in mostrarErroresInput('distrito')" 
                    :key="`distEstuError-${index}`">{{ distEstuError }}</span>

                </b-form-group>
                <!-- Grupo 10 ( DIRECCIÓN) -->
                <b-form-group 
                  label="10. Dirección del estudiante"
                  >
                  <div class = "pb-1  loader-content" v-show="getEstudianteLoading" >
                    <pulse-loader class="mt-2 ml-3"  :loading="getEstudianteLoading" :size = "15" :color="'#4FA898'"/>
                  </div>

                  <b-form-input
                    v-show="!getEstudianteLoading"
                    type = "text"
                    @keyup = "verificarDatosEstudiante"
                    @blur = "$v.estudiante.direccion.$touch"
                    placeholder = "Ingrese la dirección del estudiante"
                    v-model = "$v.estudiante.direccion.$model"
                    :state = "$v.estudiante.direccion.$dirty ? !$v.estudiante.direccion.$invalid : null"
                    :disabled = "inputEstudianteDisable"
                    >
                    </b-form-input>

                    <b-form-invalid-feedback>
                      <span v-show = "!$v.estudiante.direccion.required"> * el campo es requerido</span>
                    </b-form-invalid-feedback>

                    <span 
                      class="input--error" 
                      v-for="(direccionEstuError, index) in mostrarErroresInput('direccion')" 
                      :key="`direccionEstuError-${index}`">{{ direccionEstuError }}</span>

                </b-form-group>
                <!-- Grupo 11 ( AÑO DE CULMINACION DE SEC ) -->
                <b-form-group 
                  label="11. Seleccione el año en el que terminó la secundaria:"
                  >
                  <div class = "pb-1  loader-content" v-show="getEstudianteLoading" >
                    <pulse-loader class="mt-2 ml-3"  :loading="getEstudianteLoading" :size = "15" :color="'#4FA898'"/>
                  </div>

                    <b-form-spinbutton
                      v-if = "!getEstudianteLoading"
                      v-model = "$v.estudiante.anioCulminacion.$model" 
                      @keyup = "verificarDatosEstudiante"
                      @blur = "$v.estudiante.distrito.$touch"
                      min="2010" max="2025"
                      class="text-center"
                     :state = "$v.estudiante.anioCulminacion.$dirty ? !$v.estudiante.anioCulminacion.$invalid : null"
                     :disabled = "inputEstudianteDisable"
                    >
                    </b-form-spinbutton>

                  <b-form-invalid-feedback>
                    <span v-show = "!$v.estudiante.anioCulminacion.required"> * el campo es requerido</span>
                  </b-form-invalid-feedback>

                  <span 
                    class="input--error" 
                    v-for="(culmiEstuError, index) in mostrarErroresInput('anio_culminacion')" 
                    :key="`culmiEstuError-${index}`">{{ culmiEstuError }}</span>

                </b-form-group>

                <!-- Grupo 12 ( CORREO) -->
                <b-form-group 
                  label="12. Correo"
                  >
                    <div class = "pb-1  loader-content" v-show="getEstudianteLoading || getCorreoEstudianteLoading" >
                    <pulse-loader class="mt-2 ml-3"  :loading="getEstudianteLoading || getCorreoEstudianteLoading" :size = "15" :color="'#4FA898'"/>
                  </div>

                  <b-form-input
                    v-show="!getEstudianteLoading"
                    v-if="!getCorreoEstudianteLoading"
                    type = "email"
                    placeholder = "Ingrese su correo electrónico"
                    @keyup = "verificarDatosEstudiante"
                    @change = "buscarCorreoEstudiante"
                    @blur = "$v.estudiante.anioCulminacion.$touch"
                    v-model = "$v.estudiante.correo.$model"
                    :state = "$v.estudiante.correo.$dirty ? !$v.estudiante.correo.$invalid : null"
                    :disabled = "inputEstudianteDisable"
                    >
                  </b-form-input>

                  <b-form-invalid-feedback>
                    <span v-show = "!$v.estudiante.correo.required"> * el campo es requerido</span>
                    <span v-show = "!$v.estudiante.correo.email"> * ingresas un correo electrónico válido</span>
                  </b-form-invalid-feedback>
                  <span 
                    class="input--error" 
                    v-for="(correoEstuError, index) in mostrarErroresInput('correo')" 
                    :key="`correoEstuError-${index}`">{{ correoEstuError }}</span>

                </b-form-group>

                <!-- Grupo 13 ( CONTRASEÑA ) -->
                <b-form-group 
                  label="13. Contraseña"
                  >
                  <div class = "pb-1  loader-content" v-show="getEstudianteLoading" >
                    <pulse-loader class="mt-2 ml-3"  :loading="getEstudianteLoading" :size = "15" :color="'#4FA898'"/>
                  </div>

                  <b-form-input
                    v-show = "!getEstudianteLoading"
                    type = "password"
                    @keyup = "verificarDatosEstudiante"
                    @blur = "$v.estudiante.correo.$touch"
                    placeholder = "Ingrese una contraseña"
                    v-model = "$v.estudiante.contrasenia.$model"
                    :state = "$v.estudiante.contrasenia.$dirty ? !$v.estudiante.contrasenia.$invalid : null"
                    :disabled = "inputEstudianteDisable"
                    >
                  </b-form-input>
                  
                  <b-form-invalid-feedback>
                    <span v-show = "!$v.estudiante.contrasenia.required"> * el campo es requerido</span>
                  </b-form-invalid-feedback>

                  <span 
                  class="input--error" 
                  v-for="(contraEstuError, index) in mostrarErroresInput('password')" 
                  :key="`contraEstuError-${index}`">{{ contraEstuError }}</span>

                </b-form-group>

                <!-- Grupo 14 ( CONFIRMACION DE CONTRASEÑA) -->
                <b-form-group 
                  label="14. Confirmacion de contrasña"
                  >
                  <div class = "pb-1  loader-content" v-show="getEstudianteLoading" >
                    <pulse-loader class="mt-2 ml-3"  :loading="getEstudianteLoading" :size = "15" :color="'#4FA898'"/>
                  </div>

                  <b-form-input
                    v-show = "!getEstudianteLoading"
                    type = "password"
                    @keyup = "verificarDatosEstudiante"
                    @blur = "$v.estudiante.contrasenia.$touch"
                    placeholder = "Confirme su contraseña"
                    v-model = "$v.estudiante.passwordConfirmation.$model"
                    :state = "$v.estudiante.passwordConfirmation.$dirty ? !$v.estudiante.passwordConfirmation.$invalid : null"
                    :disabled = "inputEstudianteDisable"
                    >
                  </b-form-input>
                  
                  <b-form-invalid-feedback>
                    <span v-show = "!$v.estudiante.passwordConfirmation.required"> * el campo es requerido</span>
                    <span v-show = "!$v.estudiante.passwordConfirmation.sameAsPassword"> * las contraseñas deben ser igual</span>
                  </b-form-invalid-feedback>

                  <span 
                  class="input--error" 
                  v-for="(contraEstuError, index) in mostrarErroresInput('password_confirmation')" 
                  :key="`contraEstuError-${index}`">{{ contraEstuError }}</span>

                </b-form-group>

                <!-- Grupo 10* ( APODERADO) -->
                <b-form-group v-show="!mayorDeEdad"
                  label="15. Nombres del apoderado"
                  >
                  <div class = "pb-1  loader-content" v-show="getEstudianteLoading" >
                    <pulse-loader class="mt-2 ml-3"  :loading="getEstudianteLoading" :size = "15" :color="'#4FA898'"/>
                  </div>

                  <b-form-input
                    type = "text"
                    @keyup = "verificarDatosEstudiante"
                    @blur = "$v.estudiante.passwordConfirmation.$touch"
                    v-model = "$v.apoderado.nombres.$model"
                    disabled
                    >
                  </b-form-input>
                </b-form-group>

                <!-- Grupo 11* ( PARENTECO ) -->
                <b-form-group  v-show="!mayorDeEdad"
                  label="16. Seleccione un parentesco con respecto al apoderado:"
                  >
                  <div class = "pb-1  loader-content" v-show="getEstudianteLoading" >
                    <pulse-loader class="mt-2 ml-3"  :loading="getEstudianteLoading" :size = "15" :color="'#4FA898'"/>
                  </div>

                  <b-form-select
                    @change = "verificarDatosEstudiante" 
                    @blur = "$v.estudiante.relacionConApoderado.$touch"
                    v-model = "$v.estudiante.relacionConApoderado.$model" 
                    :options = "parentesco"
                    :state = "$v.estudiante.relacionConApoderado.$dirty ? !$v.estudiante.relacionConApoderado.$invalid : null"
                    description = "Ejemplo escoje 'Hijo', si el apoderado es tu padre"
                    :disabled = "inputEstudianteDisable"
                    >
                    <template #first>
                      <b-form-select-option value="" disabled>-- Seleccione el parenteco con el apoderado--</b-form-select-option>
                    </template>
                    <!-- Caso de otra relacion -->
                    <b-form-select-option value="otraRelacion">Otros</b-form-select-option>
                  </b-form-select>

                  <b-form-invalid-feedback>
                    <span v-show = "!$v.estudiante.relacionConApoderado.required"> * el campo es requerido</span>
                  </b-form-invalid-feedback>

                </b-form-group>
                <b-form-group
                  label-align	="center"
                  style="text-align:center;"
                >
                  <b-button variant="primary" v-show="!mayorDeEdad" @click="cambiarFormulario" >ATRÁS</b-button>
                  <b-button variant="danger" v-show="btnCambiarEstudiante"  @click="cambiarEstudiante" >CAMBIAR ESTUDIANTE</b-button>
                  <b-button variant="success" 
                  :disabled="btnRegistrarEstudianteDisabled"
                  v-show="mostrarBtnRegistrarEstudiante"
                  @click="crearEstudiante" >REGISTRAR ESTUDIANTE</b-button>
                  <p class="text-success" v-show="btnRegistrarEstudianteDisabled" >Rellenar todos los campos para enviar.</p>
                </b-form-group>
              </b-form>
              
            </b-card-body>
          </b-card>
        </div>
    </div>
</template>
<script>
import * as newUserForm from '@/api/newUserForm';
import * as ubigeo from '@/api/ubigeo';

import { validationMixin } from 'vuelidate' 
import { required, minLength, maxLength, numeric, helpers, email , sameAs} from 'vuelidate/lib/validators';
import swal from 'sweetalert';
const letrasValidas = helpers.regex('alfabetic', /[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+/)

export default {
  name: 'register',
  mixins: [validationMixin],
  data() {
    return {
      //
      mostrarFormularioUno: false,
      mostrarFormularioDos: false,
      FormFechaNacDisable: false,
      //
      edad: '',
      anioNac:2005,

      mayorDeEdad: false,

      //errores
      erroresInputs: [],

      //loadings
      getApoderadoLoading: false,
      getEstudianteLoading: false,
      getCorreoEstudianteLoading: false,

      //BTN APODERADO
      mostrarBtnRegistrarApoderado: true,
      btnCrearApoderadoDisable: true,
      inputApoderadoDisable: false,
      btnCambiarApoderado: false,

      //BTN ESTUDIANTE
      mostrarBtnRegistrarEstudiante: true,
      btnRegistrarEstudianteDisabled: true,
      inputEstudianteDisable: false,
      btnCambiarEstudiante: false,

      //APODERADO
      apoderado: {
        dni: '',
        apPater: '',
        apMater: '',
        nombres:'',
        id:'',
        celular:'',
      },

      //estudiante
      estudiante: {
        nombres: '',
        apPater: '',
        apMater: '',
        dni: '',
        fechNac: '',
        celular: '',
        departamento:'',
        departamento_id:'',
        provincia: '',
        provincia_id:'',
        distrito: '',
        distrito_id:'',
        direccion:'',
        relacionConApoderado: '',
        anioCulminacion: 2020,
        apoderadoId: '',
        correo: '',
        contrasenia: '',
        passwordConfirmation: '',
      },
      //Ubigeo
      departamentos:[],
      departamento_id:0,
      provincias: [],
      distritos:[],
      //Parentescos
      parentesco: ['Hijo(a)','Sobrino(a)','conocido(a)','vecino(a)','nieto(a)'],
    }
  },
  validations: {
    //VALIDACIONES DEL APODERADO
    apoderado : {
      dni: {
        required,
        numeric,
        maxLength: maxLength(8),
        minLength: minLength(8)
      },
      apPater: {
        required,
        letrasValidas,
      },
      apMater: {
        required,
        letrasValidas,
      },
      nombres: {
        required,
        letrasValidas
      },
      celular: {
        required,
        numeric,
        maxLength: maxLength(9),
        minLength: minLength(9)
      },
      
    },

    //VALIDACIONES DEL ESTUDIANTE
    estudiante : {
      dni: {
        required,
        numeric,
        maxLength: maxLength(8),
        minLength: minLength(8)
      },
      apPater: {
        required,
        letrasValidas,
      },
      apMater: {
        required,
        letrasValidas,
      },
      nombres: {
        required,
        letrasValidas
      },
      fechNac: {
        required
      },
      celular: {
        required,
        numeric,
        maxLength: maxLength(9),
        minLength: minLength(9)
      },
      departamento:{
        required
      },
      departamento_id:{
        required
      },
      provincia: {
        required
      },
      provincia_id:{
        required
      },
      distrito: {
        required
      },
      distrito_id: {
        required
      },
      direccion:{
        required
      },
      relacionConApoderado: {
        required
      },
      anioCulminacion: {
        required
      },
      correo: {
        required,
        email
      },
      contrasenia: {
        required,
      },
      passwordConfirmation: {
        required,
        sameAsPassword: sameAs('contrasenia')
      }
    },
  },

  computed :{
    validationFechaNac(){
      return !(this.anioNac >2010 || this.anioNac < 1970)
    },
  },

  watch: {
    edad() {

      //yyyy-mm-dd
      this.anioNac = parseInt(this.edad.substr(0,4))
      if ( this.anioNac > 1940 && this.anioNac < 2011) {
        this.mayorDeEdad = false
        this.mostrarFormularioUno = true
        this.mostrarFormularioDos = false
        //
        this.limpiarInputsEstudiante()
        this.limpiarInputsApoderado()
        this.estudiante.apoderadoId = ''
        this.estudiante.relacionConApoderado = ''


      } else {
        this.mayorDeEdad = false
        this.mostrarFormularioUno = false
        this.mostrarFormularioDos = false
        //
        this.limpiarInputsEstudiante()
        this.limpiarInputsApoderado()
        this.estudiante.apoderadoId = ''
        this.estudiante.relacionConApoderado = ''
      }

      this.estudiante.fechNac = this.edad
    },
    
  },

  methods: {
    isLetter(e) {
      let char = String.fromCharCode(e.keyCode); // Get the character
      if(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/.test(char)) return true; // Match with regex 
      else e.preventDefault(); // If not match, don't add to input text
    },
    isNumber(e){
      let char = String.fromCharCode(e.keyCode);
      if(/^[0-9]+$/.test(char)) return true;
      else e.preventDefault();
    },
    cambiarFormulario() {
      this.mostrarFormularioUno === false ? this.mostrarFormularioUno = true : this.mostrarFormularioUno = false
      this.mostrarFormularioDos === false ? this.mostrarFormularioDos = true : this.mostrarFormularioDos = false
    },
    mostrarErroresInput(pCampo) { 
      let camposIncorrectos = Object.keys(this.erroresInputs);
      if (camposIncorrectos.includes(pCampo)) {
        return this.erroresInputs[pCampo]
      } else {
        return []
      }
    },
    /**
     * APODERADO fn
     */
    limpiarInputsApoderado() {
        this.apoderado.nombres =  ''
        this.apoderado.apPater =  ''
        this.apoderado.apMater =  ''
        this.apoderado.dni     =  ''
        this.apoderado.celular =  ''
        this.inputApoderadoDisable = false
        this.btnCambiarApoderado = false
    },

    cambiarApoderado() {
      this.btnCambiarApoderado = false
      this.mostrarBtnRegistrarApoderado = true
      this.btnCrearApoderadoDisable = true

      this.apoderado.dni = ''
      this.apoderado.nombres = ''
      this.apoderado.apMater = ''
      this.apoderado.apPater = ''
      this.apoderado.celular = ''

      this.inputApoderadoDisable = false
    },

    verificarDatosApoderado() {
      if (!this.$v.apoderado.$invalid ) {
        this.btnCrearApoderadoDisable = false
      } else {
        this.btnCrearApoderadoDisable = true
      }
    },

    bucarApoderado() {
      if( this.apoderado.dni.length === 8 ) {
        this.erroresInputs = []
        this.getApoderadoLoading = true

        newUserForm.getApoderado(this.apoderado.dni)
        .then( res => {
          let apoderado = res.data.data
          if( apoderado.length !== 0 ){
            this.inputApoderadoDisable = true

          swal("El apoderado ingresado ya existe", "En caso de quere registrar al estudiante con otro apoderado, dar click en el botón de CAMBIAR APODERADO caso contrario seguir con el registro con el boton SIGUIENTE", "info")

            let indiceDeSeparacion = apoderado[0].apellidos.indexOf(' ')

            this.apoderado.apPater = apoderado[0].apellidos.substr(0,indiceDeSeparacion)
            this.apoderado.apMater = apoderado[0].apellidos.substr(indiceDeSeparacion+1)
            this.apoderado.nombres = apoderado[0].nombre
            // this.apoderado.dni     = apoderado[0].dni
            this.apoderado.celular = 'Restringido'
            //
            this.estudiante.apoderadoId = apoderado[0].id

            this.btnCambiarApoderado = true
            this.mostrarBtnRegistrarApoderado = false
          }
        })
        .catch( e => {
          console.log(e.response.status)
        })
        .finally( () => {
          console.log('getApoderado end')
          this.getApoderadoLoading = false
        })
      }
      
    },

    crearApoderado() {
      this.btnCrearApoderadoDisable = true
      this.inputApoderadoDisable = true
      // animacion de loading mientras crea usuario
      this.getApoderadoLoading = true 

      this.erroresInputs = []

      let apoderadoFormData = new FormData()

      apoderadoFormData.append('nombre', this.apoderado.nombres)
      apoderadoFormData.append('apellidos', `${this.apoderado.apPater} ${this.apoderado.apMater}`)
      apoderadoFormData.append('dni', this.apoderado.dni)
      apoderadoFormData.append('celular', this.apoderado.celular)


      newUserForm.createApoderado(apoderadoFormData)
        .then( res => {

          this.mostrarBtnRegistrarApoderado = false

          let apoderado = res.data.data
          let indiceDeSeparacion = apoderado.apellidos.indexOf(' ')

          this.apoderado.apPater = apoderado.apellidos.substr(0,indiceDeSeparacion)
          this.apoderado.apMater = apoderado.apellidos.substr(indiceDeSeparacion+1)
          this.apoderado.nombres = apoderado.nombre
          this.apoderado.dni      = apoderado.dni
          this.apoderado.celular = apoderado.celular
          //
          this.estudiante.apoderadoId = apoderado.id

          this.btnCambiarApoderado = true
        })
        .catch( (error) => {
          this.erroresInputs = error.response.data.error
          //para dejar cambiar los datos de los apoderados
          this.inputApoderadoDisable = false
          this.btnCrearApoderadoDisable = false
          swal("Campos inválidos", "Por favor verifique que los datos en los campos sean válidos.")
        })                                                                                  
        .finally( () => {
          console.log('createApoderado end')
          this.getApoderadoLoading = false 
        })
    },

    /**
     * ESTUDIANTE fn
     */
    limpiarInputsEstudiante() {
        this.estudiante.nombres   =  ''
        this.estudiante.apPater   =  ''
        this.estudiante.apMater   =  ''
        this.estudiante.dni       =  ''
        this.estudiante.fechNac   =  ''
        this.estudiante.celular   =  ''
        this.estudiante.departamento =  ''
        this.estudiante.provincia   =  ''
        this.estudiante.distrito    =  ''
        this.estudiante.direccion   =  ''
        this.estudiante.relacionConApoderado =  ''
        this.estudiante.anioCulminacion =  2020
        this.estudiante.apoderadoId =  ''
        this.estudiante.correo =  ''
        this.estudiante.contrasenia =  ''
        this.estudiante.passwordConfirmation =  ''

        this.mostrarBtnRegistrarApoderado = true
        this.btnCrearApoderadoDisable = true
        this.inputEstudianteDisable = false
    },

    verificarCorreo() {
      newUserForm.getEmailEstudiante(this.estudiante.correo)
        .then()
    },
    getDepartamentos(){
      ubigeo.getDepartamentos()
      .then(({data}) =>this.departamentos=data
      .map(dep => {
        const deps = {};
        deps['value'] = dep.idDepartamento
        deps['text'] = dep.departamento
        return deps;
        }))
      .catch(console.log)
    },
    getProvincias(){
      this.verificarDatosEstudiante();
      //obtener el text del departamento escogido
      const id = this.estudiante.departamento_id;
      this.estudiante.departamento = this.departamentos.filter(dep => dep.value === id)[0].text;

      //resetear distrito
      this.estudiante.provincia_id=null
      this.estudiante.distrito_id=null
      this.distritos=[];
      ubigeo.getProvincias(id)
      .then(({data})=>this.provincias = data
      .map( prov =>{
        const provs = {};
        provs['value'] = prov.idProvincia
        provs['text'] = prov.provincia
        return provs;
      }))
      .catch(console.log)
    },
    getDistritos(){
      this.verificarDatosEstudiante();
      this.estudiante.distrito_id=null

      //obtener el text de la provincia escogido
      const id = this.estudiante.provincia_id;
      this.estudiante.provincia = this.provincias.filter(pro => pro.value === id)[0].text;

      ubigeo.getDistritos(id)
      .then(({data})=>this.distritos = data
      .map( dist =>{
        const provs = {};
        provs['value'] = dist.idDistrito
        provs['text'] = dist.distrito
        return provs;
      }))
      .catch(console.log)
    },
    getAllUbigeo(){
      this.verificarDatosEstudiante();
      const id = this.estudiante.distrito_id;
      this.estudiante.distrito = this.distritos.filter(pro => pro.value === id)[0].text;
    },
    verificarDatosEstudiante() {
      if (!this.$v.estudiante.$invalid ) {
        this.btnRegistrarEstudianteDisabled = false
      } else {
        this.btnRegistrarEstudianteDisabled = true
      }
    },

    cambiarEstudiante() {
      this.btnCambiarEstudiante= false
      this.FormFechaNacDisable = false
      this.mostrarBtnRegistrarEstudiante = true
      this.btnRegistrarEstudianteDisabled = true

      this.limpiarInputsEstudiante()

      this.inputEstudianteDisable = false
    },

    buscarCorreoEstudiante() {
      this.getCorreoEstudianteLoading = true
      newUserForm.getEmailEstudiante(this.estudiante.correo)
        .then( res => {
          if(res.data.length !== 0) {
            swal("Correo ya existente", "El correo que ingresaste ya esta registrado, ingrese otro correo", "info")
            this.estudiante.correo = ""
          }
        })
        .catch( error => {
          console.log(error.response.status)
        })
        .finally( () => {
          this.getCorreoEstudianteLoading = false
        })
    },

    buscarEstudiante() {
      if( this.estudiante.dni.length === 8 ) {
        this.getEstudianteLoading = true
        newUserForm.getEstudiante(this.estudiante.dni)
        .then( res => {
          let estudiante = res.data.data
          this.FormFechaNacDisable = true
          if( estudiante.length !== 0 ){
            this.estudiante.dni=''
            //swal
            swal("El estudiante con el DNI ingresado ya ha sido registrado anteriormente", 
            "En caso de no recordar su contraseña, envié un correo a academia.el.tambo@gmail.com", "warning")
          } 
          this.mostrarBtnRegistrarEstudiante = true
          this.estudianteYaExiste = false
        })
        .catch( e => {
          console.log(e.response.status)
        })
        .finally( () => {
          this.getEstudianteLoading = false
        })
      }
    },

    crearEstudiante() {
      this.inputEstudianteDisable = true
      //
      this.getEstudianteLoading = true
      this.erroresInputs = []

      let estudianteFormData = new FormData()

      estudianteFormData.append('nombre', this.estudiante.nombres)
      estudianteFormData.append('apellidos', `${this.estudiante.apPater} ${this.estudiante.apMater}`)
      estudianteFormData.append('dni', this.estudiante.dni)
      estudianteFormData.append('fecha_nacimiento', this.estudiante.fechNac)
      estudianteFormData.append('celular', this.estudiante.celular)
      estudianteFormData.append('departamento', this.estudiante.departamento)
      estudianteFormData.append('provincia', this.estudiante.provincia)
      estudianteFormData.append('distrito', this.estudiante.distrito)
      estudianteFormData.append('direccion', this.estudiante.direccion)
      estudianteFormData.append('relacion', this.estudiante.relacionConApoderado)
      estudianteFormData.append('anio_culminacion', this.estudiante.anioCulminacion)
      estudianteFormData.append('correo', this.estudiante.correo)
      estudianteFormData.append('password', this.estudiante.contrasenia)
      estudianteFormData.append('password_confirmation', this.estudiante.passwordConfirmation)
      estudianteFormData.append('apoderado_id', this.estudiante.apoderadoId)

      newUserForm.createEstudiante(estudianteFormData)
        .then( res => {
          this.btnCambiarApoderado = false
          this.FormFechaNacDisable = true

          this.mostrarBtnRegistrarEstudiante = false

          let estudiante = res.data.data

          let indiceDeSeparacion = estudiante.apellidos.indexOf(' ')

          this.apoderado.nombres = estudiante.nombre
          this.estudiante.apPater = estudiante.apellidos.substr(0,indiceDeSeparacion)
          this.estudiante.apMater = estudiante.apellidos.substr(indiceDeSeparacion+1)
          this.estudiante.dni = estudiante.dni
          this.estudiante.fechNac = estudiante.fecha_nacimiento
          this.estudiante.celular = estudiante.celular
          this.estudiante.provincia = estudiante.provincia
          this.estudiante.distrito = estudiante.distrito
          this.estudiante.relacionConApoderado = estudiante.relacion
          this.estudiante.anioCulminacion = estudiante.anio_culminacion
          this.estudiante.apoderadoId = estudiante.apoderado_id

          
          //swal
            swal("El usuario fue registrado", {
              icon : 'success',
              timer: 2000,
              buttons : {
                login : "Ir a login",
              }
            })
            .then ( this.$router.push({ name: "login"}))
        })
        .catch( error => {
          this.erroresInputs = error.response.data.error
          this.inputEstudianteDisable = false ///sacar
          this.FormFechaNacDisable = false
          swal("Campos inválidos", "Por favor verifique que los datos en los campos sean válidos.")
        })                                                                                  
        .finally( () => {
          console.log('createEstudiante end')
          this.getEstudianteLoading = false
        })
    },
  },
  mounted(){
    this.getDepartamentos();
  }
};
</script>
<style lang="scss" scoped>
@import '@/scss/styles.scss';

.bg-nav-muni-auth {
  @extend %bg-nav-muni-auth;
}
.bg-poligon-muni-auth{
  @extend %bg-nav-muni-auth;
}
.tituloFormulario {
  color: $secondary-blue;
  font-weight: 700;
}
.loader-content {
  border: 1px solid #cad1d7;
  background-color: #fff;
  border-radius: 0.375rem;
}
.input--error {
  color: red;
  font-size: 14px;
}
</style>