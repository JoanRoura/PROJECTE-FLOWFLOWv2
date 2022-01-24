 $(document).ready(function(){
    $('#box-form').submit(function(){
        var txt_correo = $('#correo').val();
        var txt_password = $('#password').val();

       
        localStorage.setItem('usuario',txt_correo);
        localStorage.setItem('password',txt_password);
    });

    console.log(localStorage);

    var correo = localStorage.getItem('usuario');
    var password =localStorage.getItem('password');

    if(correo != null && password != 'undefined'){
        
        window.location = 'index.html';
    } 
}); 

