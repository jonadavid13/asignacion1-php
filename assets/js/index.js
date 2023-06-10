
function envio() {
    $('.btn-primary').on('click',function(event){
        alert('Enviando formulario')

        //$('alertDiv').text('Enviando...');
        event.preventDefault();
    });
    alert('Enviando formulario')
}

function verificarDatos(){
    document.getElementById("alertDiv").innerHTML = "";
    let continuar = false;

    let nombre = document.getElementById("idNombre").value;
    let edad = document.getElementById("idEdad").value;
    let estadoCivil = document.querySelector('input[name="estado-civ"]:checked');
    let sexo = document.querySelector('input[name="sexo"]:checked');
    let sueldo = document.querySelector('input[name="sueldo"]:checked');

    if(nombre == "" || edad == "" || !estadoCivil || !sexo || !sueldo){
        document.getElementById("alertDiv").innerHTML = `<div class="alert alert-warning" role="alert">
            <span>Todos los campos deben estar completados.</span>
        </div>`;
    } else {

        let params = {
            'Nombre': nombre,
            'Edad': edad,
            'EstadoCivil': estadoCivil.value,
            'Sexo': sexo.value,
            'Sueldo': sueldo.value
        };

        let data = JSON.stringify(params);

        console.log(params);
        $.ajax({
            type: "POST",
            url: "assets/php/insertar.php",
            dataType: "json",
            data: data, 
            beforeSend: function (){
                console.log("Enviando datos al Backend")
            },
            success: function(resp){
                console.log(resp);

                if(resp[0].status == "success"){
                    document.getElementById("alertDiv").innerHTML = `<div class="alert alert-success d-flex justify-content-between" role="alert">
                    <span>${resp[0].message}</span>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;

                    alert(resp[0].message); 
                    document.getElementById("RegistroForm").reset();
                    // Ejecutar función de actualización
                }
                if(resp[0].status == "error"){
                    document.getElementById("alertDiv").innerHTML = `<div class="alert alert-danger d-flex justify-content-between" role="alert">
                    <span>${resp[0].message}</span>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;
                }
            },
            fail: function (jqXHR, textStatus, errorThown) {
                console.log("Fail AJAX", textStatus, errorThown);
            },
            error: function (jqXHR, textStatus, errorThown) {
                console.log("Error AJAX",textStatus, errorThown);
            }
        });
    }
}
