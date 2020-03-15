const un=localStorage.getItem("un");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const q = urlParams.get('q');

var i=0
var l
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

console.log(d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear())
document.getElementById("date").innerHTML= d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();


disp(i)
});


function disp(n){

    db.collection("Users").doc(un).get().then(function(doc){
        const dat=doc.data();
console.log(n)

    var h=document.getElementById("cardzz")
    h.innerHTML=""
    l=dat.exam.length
    tt=0

    if(l==0){
        document.getElementById("loader").style.display="none"
        h.insertAdjacentHTML("beforeend",` <div class='container5'>
           
        <div class='tear'></div>
        <div class='tear2'></div>
        <div class='face'>
        <div class='eyebrow'>v</div>
        <div class='eyebrow'>v</div>
        
            
           
            <div class='mouth'></div>
        </div>
      </div>
      <p id="caption">Nothing to Display</p>
      `);

    }

    else{
    dat.exam.forEach(function(ele){
        if(tt==n){
        db.collection("Exams").doc(ele).get().then(function(doc){
            var t1=doc.data()
            const d=new Date(t1.Date.seconds*1000);
    
            document.getElementById("loader").style.display="none"
                h.insertAdjacentHTML("beforeend",`<div>
                
                <h2 style="text-align:center">${t1.Subject}</h2>
                <h3 style="text-align:center">${t1.Type}</h3>
                <p style="text-align:center">${d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()}</p>
                <button type="button" class="btn btn-primary btn-sm" style="color:white; margin-left:5%" onclick="change1()" style="float:left" >&larr; Prev </button>
                <button type="button" class="btn btn-primary btn-sm" style="color:white; margin-left:45%;" onclick="change()" >Next &rarr;</button>
                </div>`);           
    
            
                        
    
        })    
    }
    tt++
    })
    }
});


}


function change(){
    var h=document.getElementById("cardzz")
    h.innerHTML=""
    document.getElementById("loader").style.display="block"
    i++;
    console.log(i)
    if(i==l){
        i=0
    }
    disp(i)

}

function change1(){
    var h=document.getElementById("cardzz")
    h.innerHTML=""
    document.getElementById("loader").style.display="block"

    i--;
    
    if(i==-1){
        i=l-1
    }
    disp(i)

}

