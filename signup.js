

document.getElementById("sub").onclick=function(){
  console.log("in");
  document.getElementById("loader").style.display="block";
  document.getElementById("wrap").style.display="none";

  var name=document.getElementById("name").value;
  var date=document.getElementById("date").value;
  var email=document.getElementById("mail").value;
  var phno=document.getElementById("phno").value;
  var pass=document.getElementById("pass").value;
  var confpass=document.getElementById("pass1").value;

  ar=date.split("-")
  if(parseInt(ar[0])>1998 || parseInt(ar[1])>31 || parseInt(ar[2])>12){
    console.log(date)
    console.log("invalid date")
  }
  if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
    console.log("invalid email")
  }

  if( parseInt(ar[0])>1998 || parseInt(ar[1])>12 || parseInt(ar[2])>31  || name=="" || (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) ||
  phno.length!=10 || date=="" ){
alert("invalid data")
location.reload()
  }
  else{   
    
  var encrypted = CryptoJS.AES.encrypt(pass, "Secret Passphrase");
  
  
  var enc=encrypted.toString();
  
  if(confpass==pass){

    var input=document.getElementById("imgInp");
    if (input.files && input.files[0]) {
	var file = input.files[0];
    console.log(file);
    
    var task=firebase.storage().ref("profiles/").child(file.name).put(file);
    
   task.then(function(){
       
    var storageRef = firebase.storage().ref();

    storageRef.child(`profiles/${file.name}`).getDownloadURL().then(function(url) {



      db.collection("Count").doc("Count").get().then(function(doc){
        var cnt=doc.data().count;
        cnt=cnt+1;
  
        db.collection("Count").doc("Count").set({
          count:cnt
        })
        var un="cb.tc."+cnt;
        db.collection("Users").doc(un).set({
          Username:un,
          Name: name,
          Email: email,
          Password:enc,
          Date: new Date(date),
          Phone:phno,
          Photo: url,
          exam:[]
        }).then(function(){
            localStorage.setItem('un', un);
            console.log("yeah");
            location.replace("profile.html?q=0");
            
        });
  
      });     
  
    })
    


    });


   }
   else{
     alert("Please upload Image")
   }



}
else{
  alert("Passwords didn't match");
  location.reload();
}
}
}
