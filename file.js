console.log("in")
document.getElementById("but").onclick=function(){
var input=document.getElementById("imgInp");
    if (input.files && input.files[0]) {
	var file = input.files[0];
    console.log(file);
    
    var task=firebase.storage().ref("profiles/").child(file.name).put(file);
    
   task.then(function(){
       console.log("done");
   })
}
}
