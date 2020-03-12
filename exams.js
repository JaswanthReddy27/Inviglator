
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const q = urlParams.get('q');

function noant(){

    var h=document.getElementById("content");
    h.innerHTML=""
    db.collection("Exams").get().then(function(doc){
    

    

    

        doc.forEach(function(data){
            var t=data.data();
            if(t.faculty=="none"){
            var datt=t.Date;
            var d = new Date(datt.seconds*1000);
            var id=data.id;
            h.insertAdjacentHTML("beforeend",`<div>
            <h2>${t.Subject}</h2>
            <h3>${t.Type}</h3>
            <p>${d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()}</p>
            <button id="${id}" onclick="delet(this.id)">Delete</button>
            <button id="${id}" onclick="assign(this.id)">Assign a Faculty</button>
            </div>`);
            }
        });
        
    
    
    
    
    
    
});
}

function ant(){
    var h=document.getElementById("content");
    h.innerHTML=""
    db.collection("Exams").get().then(function(doc){
    

    

    

        doc.forEach(function(data){
            var t=data.data();
            if(t.faculty!="none"){
            var datt=t.Date;
            var d = new Date(datt.seconds*1000);
            var id=data.id;
            h.insertAdjacentHTML("beforeend",`<div>
            <h2>${t.faculty}</h2>
            <h3>${t.Subject}</h3>
            <h4>${t.Type}</h4>
            <p>${d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()}</p>
            <hr/>
            </div>`);
            }
        });
        
    
    
});
}


if(q=="abcd"){

    var h=document.getElementById("bod");
    h.insertAdjacentHTML("afterbegin",`<button onclick="noant()">Not Assigned</button>
    
    <button onclick="ant()">Assigned</button>
    `);
noant()
    

document.getElementById("submit").onclick=function(){
    var sub=document.getElementById("sub").value;
    var typ=document.getElementById("typ").value;
    var date=document.getElementById("date").value;
    sub=sub.toUpperCase()
console.log(sub);
console.log(typ);
console.log(date);


db.collection("Exams").doc().set({
    Subject: sub,
    Type:typ,
    Date:new Date(date),
    faculty:"none",
    

  }).then(function(){
      
      location.reload();
  });
}

function delet(id){
   /* db.collection("cities").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });*/
    if(confirm("Are you sure to delete?")){
        db.collection("Exams").doc(id).delete().then(function() {
            location.reload();
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }
    else{
        console.log("no");
    }
}

function assign(id){
    location.replace(`admin_home.html?q=${id}`)
}
}
else{
    document.getElementById("form").style.display="none";

    db.collection("Exams").get().then(function(doc){
        var h=document.getElementById("bod");
    
        doc.forEach(function(data){
            var t=data.data();
            if(t.faculty=="none"){
            var datt=t.Date;
            var d = new Date(datt.seconds*1000);
            var id=data.id+"_"+t.Type;
            h.insertAdjacentHTML("beforeend",`<div>
            <h2>${t.Subject}</h2>
            <h3>${t.Type}</h3>
            <p>${d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()}</p>
            <button id="${id}", onclick="assign(this.id)">Assign</button>
            </div>`);
            }
    
        });
    });

    function assign(id){
        
        var arr=id.split("_")
        console.log(arr)
        
        
        db.collection("Exams").doc(arr[0]).update({
            faculty:q
        });

        db.collection("Users").doc(q).get().then(function(doc){
            var tmpp=doc.data().exam
            
            tmpp.push(arr[0])
            db.collection("Users").doc(q).update({
                exam:tmpp
            }).then(function(){
                

                var today = new Date();
                console.log(today.getTime())

                db.collection("Notify").doc().set({
                    From: "cb.tc.ad",
                    To: q,
                    Type: "assign",
                    exam:arr[0],
                    status:"",
                    reason:"",
                    time:new Date()
                  }).then(function(){
                    alert("Assigned")
                    location.replace("admin_home.html?q=abcd")
                  })

                

                
            })


        })
        

    }
    

    
}
