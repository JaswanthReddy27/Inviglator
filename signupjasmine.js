document.getElementById("sub").onclick=function(){
    console.log("in");
    var name=document.getElementById("name").value;
    var date=document.getElementById("date").value;
    var email=document.getElementById("mail").value;
    var phno=document.getElementById("phno").value;
    var pass=document.getElementById("pass").value;
    var confpass=document.getElementById("pass1").value;

location.replace(`jasmine/specrunner.html?name=${name}&date=${date}&email=${email}&phno=${phno}&pass=${pass}&confpass=${confpass}`);


}