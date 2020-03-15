var un=localStorage['un']
console.log(un)
var h=document.getElementById("content")

var span = document.getElementsByClassName("close")[0];
var modal = document.getElementById("myModal");


var span1 = document.getElementsByClassName("close1")[0];
var modal1 = document.getElementById("myModal1");


span.onclick = function() {
    //document.getElementById("reason").value=""
    modal1.style.display = "none";

    modal.style.display = "none";
    

  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
        document.getElementById("reason").value=""
      modal.style.display = "none";
      
    }
  }

  span1.onclick = function() {
    document.getElementById("reason").value=""
    modal1.style.display = "none";
    

  }
  
  // When the user clicks anywhere outside of the modal, close it
  

db.collection("Notify").where("To", "==", un).orderBy("time", "desc").get().then(function(doc){

    var chk=0
   
    doc.forEach(function(data){
        chk=1
        var t=data.data();
        var datt=t.time;
        var d = new Date(datt.seconds*1000);

        if(t.Type=="assign"){

        db.collection("Exams").doc(t.exam).get().then(function(doc){
            var t1=doc.data()

            if(t.status==""){
                h.insertAdjacentHTML("beforeend",`<div id="card">
                <div style="height:200px;">
        <h2 style="text-align:center;">${t.From}</h2>
        <p style="text-align:center;">${t.Type} mail for ${t1.Type}- ${t1.Subject}</p>
        
        </div>
        <button id=${data.id} class="ting" onclick="expand(this.id)" style="margin-left:80%;"><i class="fa fa-arrow-circle-right" style="font-size:30px;" aria-hidden="true"></i>
                </i>

                </button>
        
        <div style="height:30px;border-top:rgba(128, 128, 128, 0.651) dashed 2px">
                
                <p style="margin-top:2%; display:inline-block;">${d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()}</p>
                <p style="margin-top:2%; display:inline-block;margin-left:60%;">${d.getHours() + ":" + d.getMinutes()}</p>

                
                
                </div>
        </div>`);
            }

            else{

                if(t.status=="accept"){
                h.insertAdjacentHTML("beforeend",`<div id="card">
                <div style="height:200px;">
        <h2 style="text-align:center;">${t.From}</h2>
        <p style="text-align:center;">${t.Type} mail for ${t1.Type}- ${t1.Subject}</p>
        <img src="accept.jpg" height="62" width="104" style="margin-left:30%;margin-top:5%;">
        </div>
        <button id=${data.id} class="ting" onclick="expand(this.id)" style="margin-left:80%;"><i class="fa fa-arrow-circle-right" style="font-size:30px;" aria-hidden="true"></i>
                </i>

                </button>
        
        <div style="height:30px;border-top:rgba(128, 128, 128, 0.651) dashed 2px">
                
                <p style="margin-top:2%; display:inline-block;width:20%">${d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()}</p>
                
                <p style="margin-top:2%; display:inline-block;margin-left:60%;">${d.getHours() + ":" + d.getMinutes()}</p>

                
                
                </div>
        </div>`);

            }

            else{


                h.insertAdjacentHTML("beforeend",`<div id="card">
                <div style="height:200px;">
        <h2 style="text-align:center;">${t.From}</h2>
        <p style="text-align:center;">${t.Type} mail for ${t1.Type}- ${t1.Subject}</p>
        <img src="decline.jpg" height="42" width="84" style="margin-left:30%;margin-top:5%;">
        </div>
        <button id=${data.id} class="ting" onclick="expand(this.id)" style="margin-left:80%;"><i class="fa fa-arrow-circle-right" style="font-size:30px;" aria-hidden="true"></i>
                </i>

                </button>
        
        <div style="height:30px;border-top:rgba(128, 128, 128, 0.651) dashed 2px">
                
                <p style="margin-top:2%; display:inline-block;">${d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()}</p>
                
                <p style="margin-top:2%; display:inline-block;margin-left:60%;">${d.getHours() + ":" + d.getMinutes()}</p>

                
                
                </div>
        </div>`);

            }

        }

        })

                            }
                    
        else{

            if(t.Type=="accept"){


            db.collection("Notify").doc(t.id).get().then(function(doc){
                var t1=doc.data()

                db.collection("Exams").doc(t1.exam).get().then(function(doc){
                    var t2=doc.data()
                    
                h.insertAdjacentHTML("beforeend",`<div id="card">

                <div style="height:200px;">
                <h2 style="text-align:center">${t.From}</h2>
                <p style="text-align:center">${t.Type} mail for ${t2.Type}- ${t2.Subject}</p>
                
                <img src="accept.jpg" height="62" width="104" style="margin-left:30%;margin-top:5%;">
                
                
                </div>
                <button id=${data.id} class="ting" onclick="expand(this.id)" style="margin-left:80%;"><i class="fa fa-arrow-circle-right" style="font-size:30px;" aria-hidden="true"></i>
                </i>

                </button>
                
                <div style="height:30px;border-top:rgba(128, 128, 128, 0.651) dashed 2px">
                
                <p style="margin-top:2%; display:inline-block;">${d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()}</p>
                <p style="margin-top:2%; display:inline-block;margin-left:60%;">${d.getHours() + ":" + d.getMinutes()}</p>

                
                
                </div>
                
                </div>`);
                });
            })
            
        }

        else{


            db.collection("Notify").doc(t.id).get().then(function(doc){
                var t1=doc.data()

                db.collection("Exams").doc(t1.exam).get().then(function(doc){
                    var t2=doc.data()
                    
                h.insertAdjacentHTML("beforeend",`<div id="card">

                <div style="height:200px;">
                <h2 style="text-align:center">${t.From}</h2>
                <p style="text-align:center">${t.Type} mail for ${t2.Type}- ${t2.Subject}</p>
                
                
                <img src="decline.jpg" height="42" width="84" style="margin-left:30%;margin-top:5%;">
                
                </div>
                <button id=${data.id} class="ting" onclick="expand(this.id)" style="margin-left:80%;"><i class="fa fa-arrow-circle-right" style="font-size:30px;" aria-hidden="true"></i>
                </i>

                </button>
                
                <div style="height:30px;border-top:rgba(128, 128, 128, 0.651) dashed 2px">
                
                <p style="margin-top:2%; display:inline-block;">${d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()}</p>
                <p style="margin-top:2%; display:inline-block;margin-left:60%;">${d.getHours() + ":" + d.getMinutes()}</p>

                
                
                </div>
                
                </div>`);
                });
            })


        }
        
        

        }


    });

if(chk==0){
    document.getElementById("mithun").style.backgroundColor="grey";
    h.insertAdjacentHTML("beforeend",` 
    
    <div class="crown">
	<div class="point"></div>
	<div class="point"></div>
	<div class="point"></div>
	<div class="point"></div>
	<div class="point"></div>
</div>
    
    
    <div class='container5'>
           
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
    document.getElementById("loader").style.display="none"
    h.style.display="block"
    
})

function expand(id){
    var h1=document.getElementById("cont")
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

        <button class="status green" id=${id} onclick="accept(this.id)">Ok, I'm Happy to take this <i class="fa fa-check" aria-hidden="true"></i>
        </button>

        <button class="status red" id=${id} onclick="decline(this.id)">Sorry, I cannot <i class="fa fa-times" aria-hidden="true"></i>
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
    modal.style.display = "block";

});
}






function decline(id){
    modal1.style.display = "block";
    document.getElementById("ids").value=id
}

document.getElementById("sub").onclick=function(){
    modal.style.display = "none";
    
    var h1=document.getElementById("cont1")
    h1.innerHTML=""
    h1.insertAdjacentHTML("beforeend",`<img src="queen.jpg"> <p><i class="fa fa-quote-left" aria-hidden="true"></i>
    While others were dreaming about it - I was getting it done. </p>`)

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
    modal.style.display = "none";
    var h1=document.getElementById("cont1")
    h1.innerHTML=""
    h1.insertAdjacentHTML("beforeend",`<img src="queen.jpg"> <p><i class="fa fa-quote-left" aria-hidden="true"></i>
    While others were dreaming about it - I was getting it done. </p>`)
    
    modal1.style.display = "block";
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