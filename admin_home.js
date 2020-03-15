
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const q = urlParams.get('q');

var span = document.getElementsByClassName("close")[0];
var modal = document.getElementById("myModal");

span.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }


  
if(q=="abcd"){



db.collection("Users").get().then(function(doc){
    var h=document.getElementById("bod");

    doc.forEach(function(data){
        
        var t=data.data();
        h.insertAdjacentHTML("beforeend",`<div class="inlin">

        <div style="position:absolute; 
        opacity:0.4;
        background-color:white;">
        <img src="${t.Photo}", width="300", height="200"  >
        </div>        

        <div style="position: relative;width:100%;">
        <div class="midd" >
        <p>${t.Username}</p>
        <p>${t.Name}</p>
        <p>${t.Email}</p>
        </div>

        <div class="butmid">
        <button type="button" id=${t.Username} onclick="assign(this.id)">Assign</button>
        <button type="button" id=${t.Username} onclick="openn(this.id)" class="but">View Assigned</button>
        </div>  
        </div> 
        </div>
        
        `);

    });


});
/**/

        /**/

function assign(id){
    location.replace(`exams.html?q=${id}`)
}


function openn(id){
    
    
    db.collection("Users").doc(id).get().then(function(doc){
        var dat=doc.data().exam
        var h=document.getElementById("cont");
        h.innerHTML=""
        var chk=0
        dat.forEach(function(id){
            chk=1;
            db.collection("Exams").doc(id).get().then(function(doc){
                var t=doc.data()
                var datt=t.Date;
        var d = new Date(datt.seconds*1000);

                h.insertAdjacentHTML("beforeend",`<div>
        <h2>${t.Subject}</h2>
        <h3>${t.Type}</h3>
        <p>${d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()}</p>
        <hr/>
        </div>`);
            })

        })

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
    })
        
    
    modal.style.display = "block";
       
}



}

else{


    db.collection("Users").get().then(function(doc){
        var h=document.getElementById("bod");
        
        doc.forEach(function(data){
            var t=data.data();
            h.insertAdjacentHTML("beforeend",`<div class="inlin">
    
            <div style="position:absolute; 
            opacity:0.4;
            background-color:white;">
            <img src="${t.Photo}", width="300", height="200"  >
            </div>        
    
            <div style="position: relative;width:100%;">
            <div class="midd" >
            <p>${t.Username}</p>
            <p>${t.Name}</p>
            <p>${t.Email}</p>
            </div>
    
            <div class="butmid">
            <button type="button" id=${t.Username} onclick="assign(this.id)">Assign</button>
            <button type="button" id=${t.Username} onclick="openn(this.id)" class="but">View Assigned</button>
            </div>  
            </div> 
            </div>
            
            `);
    
        });
    
    
    });
    /**/
    
            /**/
    
    function assign(id){
        
        db.collection("Exams").doc(q).update({
            faculty:id
        });

        db.collection("Users").doc(id).get().then(function(doc){
            var tmpp=doc.data().exam
            
            tmpp.push(q)
            db.collection("Users").doc(id).update({
                exam:tmpp
            }).then(function(){

                


                db.collection("Notify").doc().set({
                    From: "cb.tc.ad",
                    To: id,
                    Type: "assign",
                    exam:q,
                    status:"",
                    reason:"",
                    time:new Date()
                  }).then(function(){
                    alert("Assigned")
                location.replace("exams.html?q=abcd")
                  })

                
            })


        })
    }
    
    
    function openn(id){
        
        
        db.collection("Users").doc(id).get().then(function(doc){
            var dat=doc.data().exam
            var h=document.getElementById("cont");
            h.innerHTML=""
            dat.forEach(function(id){
    
                db.collection("Exams").doc(id).get().then(function(doc){
                    var t=doc.data()
                    var datt=t.Date;
            var d = new Date(datt.seconds*1000);
    
                    h.insertAdjacentHTML("beforeend",`<div>
            <h2>${t.Subject}</h2>
            <h3>${t.Type}</h3>
            <p>${d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()}</p>
            <hr/>
            </div>`);
                })
    
            })
        })
            
        
        modal.style.display = "block";
           
    }


}