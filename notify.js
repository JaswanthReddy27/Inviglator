var un=localStorage['un']
console.log(un)
var h=document.getElementById("content")

db.collection("Notify").where("To", "==", un).orderBy("time", "desc").get().then(function(doc){
    doc.forEach(function(data){
        var t=data.data();

        var datt=t.time;
        var d = new Date(datt.seconds*1000);

        if(t.Type=="assign"){

        db.collection("Exams").doc(t.exam).get().then(function(doc){
            var t1=doc.data()

            if(t.status==""){
        h.insertAdjacentHTML("beforeend",`<div style="background-color:grey">
        <h2>${t.From}</h2>
        <p>${t.Type} mail for ${t1.Type}- ${t1.Subject}</p>
        <p>${d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()}, ${d.getHours() + ":" + d.getMinutes()}</p>
        <button id=${data.id} onclick="expand(this.id)">more -></button>
        <hr/>
        
        </div>`);
            }

            else{

                h.insertAdjacentHTML("beforeend",`<div>
        <h2>${t.From}</h2>
        <p>${t.Type} mail for ${t1.Type}- ${t1.Subject}</p>
        <p>${d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()}, ${d.getHours() + ":" + d.getMinutes()}</p>
        <button id=${data.id} onclick="expand(this.id)">more -></button>
        <hr/>
        
        </div>`);

            }
        });

                            }
                    
        else{


            db.collection("Notify").doc(t.id).get().then(function(doc){
                var t1=doc.data()

                db.collection("Exams").doc(t1.exam).get().then(function(doc){
                    var t2=doc.data()
                    
                h.insertAdjacentHTML("beforeend",`<div>
                <h2>${t.From}</h2>
                <p>${t.Type} mail for ${t2.Type}- ${t2.Subject}</p>
                <p>${d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()}, ${d.getHours() + ":" + d.getMinutes()}</p>
                <button id=${data.id} onclick="expand(this.id)">more -></button>
                <hr/>
                
                </div>`);
                });
            });



        }


    });


});

function expand(id){
    var h1=document.getElementById("expand")
    h1.innerHTML=""
    

    db.collection("Notify").doc(id).get().then(function(data){
    var t=data.data();
    
        
    if(t.Type=="assign"){
    
        db.collection("Exams").doc(t.exam).get().then(function(doc){
            var t1=doc.data()
            var datt=t1.Date;
            var d = new Date(datt.seconds*1000);
        h1.insertAdjacentHTML("beforeend",`<div>
        <h1>${t.From}</h1>

        <h3>Hey ${t.To},</h3>
        <p>This is to Notify that you're assigned to Invigilate the following exam on <strong>${d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()}</strong></p>

        <ul>
        <li>Type: ${t1.Type}</li>
        <li>Subject: ${t1.Subject}</li>
        </ul>
        
        <hr/>
        </div>`);

        if(t.status==""){

            h1.insertAdjacentHTML("beforeend",`<div>
        <h2>It's Mandatory to reply this notification with your response.</h2>

        <button id=${id} onclick="accept(this.id)">Ok, I'm Happy to take this <i class="fa fa-check" aria-hidden="true"></i>
        </button>

        <button id=${id} onclick="decline(this.id)">Sorry I cannot <i class="fa fa-times" aria-hidden="true"></i>
        </button>
        </div>`);
        }

        else if(t.status=="accept"){
            h1.insertAdjacentHTML("beforeend",`<div>
        <h3>Hey cb.tc.ad,</h3>
        <p>Yes, I'm happy to take up this duty.</p>
        </div>`);
        }
        else if(t.status=="decline"){
            h1.insertAdjacentHTML("beforeend",`<div>
        <h3>Hey cb.tc.ad,</h3>
        <p>Sorry, I cannot do this because ${t.reason}</p>
        </div>`);
        }
        
        
        });
    }

    else{

        db.collection("Notify").doc(t.id).get().then(function(data){
            var t3=data.data()

        db.collection("Exams").doc(t3.exam).get().then(function(doc){
            var t1=doc.data()

        h1.insertAdjacentHTML("beforeend",`<div>
        <h1>${t.From}</h1>

        <h3>Hey ${t.To},</h3>
        <p>This is to Notify that ${t.From} - ${t.Type}ed the request to invigilate ${t1.Subject} in ${t1.Type}</p>
        
        <hr/>
        </div>`);

        if(t.Type=="decline"){

            h1.insertAdjacentHTML("beforeend",`<div>
        <p>Reason: ${t3.reason}</p>`);

        }

    });
        });


    }

});
}


var span = document.getElementsByClassName("close")[0];
var modal = document.getElementById("myModal");

span.onclick = function() {
    document.getElementById("reason").value=""
    modal.style.display = "none";
    

  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
        document.getElementById("reason").value=""
      modal.style.display = "none";
      
    }
  }

function decline(id){
    modal.style.display = "block";
    document.getElementById("ids").value=id
}

document.getElementById("sub").onclick=function(){
    modal.style.display = "none";

    var val=document.getElementById("ids").value
    var reason=document.getElementById("reason").value

    var msg="Sorry, I cannot because "+reason;
    var today = new Date();
    console.log(today.getTime())
    
    db.collection("Notify").doc().set({
        From: un,
        To: "cb.tc.ad",
        Type: "decline",
        id:val,
        Message:msg,
        time:new Date()
      }).then(function(){

        db.collection("Notify").doc(val).update({
            status:"decline",
            reason:reason
        }).then(function(){



            db.collection("Notify").doc(val).get().then(function(doc){
                var t=doc.data().exam
                console.log(t)
                db.collection("Exams").doc(t).update({
                    faculty:"none"
                })

                db.collection("Users").doc(un).get().then(function(doc){
                    var t1=doc.data().exam
                    console.log(t1)
                    const index = t1.indexOf(t);
                    
                    t1.splice(index, 1);
                    console.log(t1)

                    db.collection("Users").doc(un).update({
                        exam:t1
                    })
                    

                    
                }).then(function(){
                    alert("Replied successfully")
                    location.reload()
    
                })

            })



            

        })



        
      })

}

function accept(id){


    var msg="Yes, I can Take up this duty.";

    var today = new Date();
    console.log(today.getTime())

    db.collection("Notify").doc().set({
        From: un,
        To: "cb.tc.ad",
        Type: "accept",
        id:id,
        Message:msg,
        time: new Date()
      }).then(function(){

        db.collection("Notify").doc(id).update({
            status:"accept",
            
        }).then(function(){
            alert("Replied successfully")
        location.reload()

        })



        
      })


}