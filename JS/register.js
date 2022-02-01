const signUp = e => {
    let nombre = document.getElementById('nombre').value,
    apellido = document.getElementById('apellido').value,
    email = document.getElementById('email').value,
    pwd = document.getElementById('pwd').value;

    let formData = JSON.parse(localStorage.getItem('formData')) || [];

    let exist = formData.length &&
        JSON.parse(localStorage.getItem('formData')).some(data =>
            data.nombre.toLowerCase() == nombre.toLowerCase() &&
            data.apellido.toLowerCase() == apellido.toLowerCase()
        );

    if(!exist){
        formData.push({ nombre, apellido, email, pwd});
        localStorage.setItem('formData', JSON.stringify(formData));
        document.querySelector('form').reset();
        document.getElementById('nombre').focus();
        alert("Cuenta creada correctamente. \n\n Por favor, Inicie Sesión en el enlace siguiente.");
    }
    else{
        alert("Vaya... Cuenta duplicada!! \n\n Ya se ha registrado");
    }
    e.preventDefault();
}

function signIn(e) {
    let email = document.getElementById('email2').value
    let pwd = document.getElementById('pwd2').value;
    let formData = JSON.parse(localStorage.getItem('formData')) || [];
    let exist = formData.length &&
    JSON.parse(localStorage.getItem('formData')).some(data => data.email.toLowerCase() = email && data.pwd.toLowerCase() == pwd);
    if(!exist){
        alert("Datos introducidos no validos.");
    }
    else{
        location.href = "index.html";
    }
    e.preventDefault(); 
}