const un=localStorage.getItem("un");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const q = urlParams.get('q');

if(q=='0'){
    alert("Your Username is "+un+". Do remember to login !!:)");
}

db.collection("Users").doc(un).get().then(function(doc){
const dat=doc.data();
document.getElementById("roll").innerHTML=dat.Username;
document.getElementById("name").innerHTML=dat.Name;
document.getElementById("phone").innerHTML=dat.Phone;
document.getElementById("Email").innerHTML=dat.Email;
document.getElementById("img").src=dat.Photo;
const d=new Date(dat.Date.seconds*1000);
console.log(d);
document.getElementById("date").innerHTML= d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
});