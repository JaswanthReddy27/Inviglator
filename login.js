if (localStorage.getItem("un") != null) {
    var temp=localStorage.getItem("un");
if(temp=="admin"){
    location.replace("admin.html");
}
else{
    location.replace("loginhm.html");
}

}

document.getElementById("sub").onclick=function(){


    var un=document.getElementById("un").value;
    var pass=document.getElementById("pass").value;
    
if(un=="cb.tc.ad"){
    if(pass=="side"){
        var un="cb.tc.ad";
        localStorage.setItem('un', un);

        location.replace("admin.html");
    }
    else{
        alert("invalid password admin");
        location.reload()

    }

}
else if(un==""||pass==""){
    alert("No Empty Characters allowed")
    location.reload()
}
    else{
        document.getElementById("loader").style.display="block";
  document.getElementById("wrap").style.display="none";       
        
        
        db.collection("Users").doc(un).get().then(function(doc){
        if(doc.exists){
            var p=doc.data().Password;
            
            var decrypted = CryptoJS.AES.decrypt(p, "Secret Passphrase");
            var value=decrypted.toString(CryptoJS.enc.Utf8);
            if(value==pass){
                localStorage.setItem('un', un);

                location.replace("loginhm.html");

            }
            else{
                alert("Invalid password");
                location.reload();

            }
        }
        else{
            alert("Invalid Username");
            location.reload();

        }
    });
}
};