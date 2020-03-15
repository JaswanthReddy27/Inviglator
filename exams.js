
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const q = urlParams.get('q');

function noant(){
    document.getElementById("loader").style.display="block";
    var h=document.getElementById("content");

    document.getElementById("ant").classList.remove("active")
    document.getElementById("noant").classList.add("active")
    h.innerHTML=""
    db.collection("Exams").get().then(function(doc){
    

    var chk=0

    

        doc.forEach(function(data){
            var t=data.data();
            if(t.faculty=="none"){
                chk=1
            var datt=t.Date;
            var d = new Date(datt.seconds*1000);
            var id=data.id;
            h.insertAdjacentHTML("beforeend",`
            <div id="card">
            <div class="card inactive-1" style="width:73%;"></div>
            <div class="card inactive-2" style="width:76%;"></div>
            <div class="card1" style="width:80%;">
    
                
                <h3 style="text-align:center">${t.Subject}</h3>
<h4 style="text-align:center">${t.Type}</h4>
<p style="text-align:center">${d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()}</p>

<div style="margin-top:30%;">

<button id="${id}" onclick="delet(this.id)" type="button" class="btn btn-primary btn-sm" style="color:white; float:left">Delete</button>
<button id="${id}" onclick="assign(this.id)" type="button" class="btn btn-primary btn-sm" style="color:white; float:right">Assign a Faculty</button>
      </div>         
                
            </div></div>`);
            }
        });
        
    
    if(chk==0){
        
        h.insertAdjacentHTML("beforeend",` <div class='container5'>
        <div class='tear'></div>
        <div class='tear2'></div>
        <div class='face'>
        <div class='eyebrow'>v</div>
        <div class='eyebrow'>v</div>
        
            
           
            <div class='mouth'></div>
        </div>
      </div>`);
    }
    
    
    
    
}).then(function(){
    document.getElementById("loader").style.display="none";
    h.style.display="block"

})
}

function ant(){
    document.getElementById("loader").style.display="block";
    var h=document.getElementById("content");
    document.getElementById("noant").classList.remove("active")
    document.getElementById("ant").classList.add("active")
    h.innerHTML=""
    db.collection("Exams").get().then(function(doc){
    

    
      var chk=0
    

        doc.forEach(function(data){
            var t=data.data();
            if(t.faculty!="none"){
                chk=1
            var datt=t.Date;
            var d = new Date(datt.seconds*1000);
            var id=data.id;
            h.insertAdjacentHTML("beforeend",`
            <div id="card">
            <div class="card inactive-1"></div>
            <div class="card inactive-2"></div>
            <div class="card1">
    
            <h3 style="text-align:center;margin-top:8%;">${t.faculty}</h3>
                <h4 style="text-align:center;margin-top:5%;">${t.Subject}</h3>
<h5 style="text-align:center;margin-top:5%;">${t.Type}</h5>
<h5 style="text-align:center;margin-top:5%;">${d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()}</h5>

               
                
            </div></div>`);
            }
        });
        
    if(chk==0){
         
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
    
}).then(function(){
    document.getElementById("loader").style.display="none";
    h.style.display="block"
})
}


if(q=="abcd"){
    document.getElementById("defg").innerHTML="";
    var h=document.getElementById("bod");
    
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
    
    document.getElementById("abcd").innerHTML="";

    db.collection("Exams").get().then(function(doc){
        var h=document.getElementById("bod1");
        
        i=0
        var color;
        doc.forEach(function(data){
            var t=data.data();

            if(t.faculty=="none"){
            var datt=t.Date;
            var d = new Date(datt.seconds*1000);
            var id=data.id+"_"+t.Type;
            if(i%3==0){
                color="#FF9933"
            }
            else if(i%3==1){
                color="white"
            }
            else{
                color="#138808"
            }

            i++;
            h.insertAdjacentHTML("beforeend",`
            
            <div id="cards">
            

            <h4 style="text-align:center;color:white;margin-top:5%;">${t.Type}</h3>
            <h5 style="text-align:center;color:white;margin-top:15%;">${t.Subject}</h5>
                
            

            <h5 style="text-align:center;color:white;margin-top:15%;">${d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()}</h5>

            
            
            <button id="${id}"  onclick="assign(this.id)" class="btn btn-primary btn-sm" style="margin-top:15%;margin-left:15%;width:200px;height:70px;color:black;background-color:${color}">Assign</button>

</div>`



            
            );
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

function yeshh(){
    console.log("yaah")
}



function openup(){
    document.querySelector(".asdfg").style.display="inline-block";
    document.getElementById("opp").style.display="none"
    document.getElementById("bod").style.width="59%"
}

function closeup(){
    document.getElementById("bod").style.width="80%"
    document.getElementById("opp").style.display="inline-block"
    document.querySelector(".asdfg").style.display="none";
}