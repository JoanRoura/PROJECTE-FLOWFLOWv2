 $(document).ready(function(){
    $('#box-form').submit(function(){
        var txt_correo = $('#email').val();
        var txt_password = $('#pwd').val();

       
        localStorage.setItem('email ',txt_correo);
        localStorage.setItem('password',txt_password);
    });

    console.log(localStorage);

    var correo = localStorage.getItem('email');
    var password =localStorage.getItem('password');

    if(correo != null && password != 'undefined'){
        
        window.location = 'index.html';
    } 
}); 

