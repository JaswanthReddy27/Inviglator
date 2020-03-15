
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const name = urlParams.get('name');
const date = urlParams.get('date');
const email = urlParams.get('email');
const phno = urlParams.get('phno');
const pass = urlParams.get('pass');
const confpass = urlParams.get('confpass');

describe("TESTING SIGNUP",() =>{

it("Mail Validated",function(){
    var result = isEmail_valid(email);
    expect(result).toBe(true);
    });
    function isEmail_valid(email){
        var pattern =/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        if(email==null)
        {
            return false
        }
        else
        {
            return pattern.test(email)
        }
        };


it("Name Validated",function(){
    var result1 = isname_valid(name);
    expect(result1).toBe(true);
    });
    function isname_valid(name){
         var pattern1 =/^[A-Za-z]+$/;
         if(name==null)
         {
            return false
         }
         else
         {
         return pattern1.test(name)
         }
        };


it("Phone number Validated",function(){
    var result2 = isphno_valid(phno);
    expect(result2).toBe(true);
    });
    function isphno_valid(phno){
        
         var pattern2 =/^\d{10}$/;
         if(phno==null)
         {
            return false
         }
         else
         {
         var pno=parseInt(phno)
         return pattern2.test(pno)
         }
        };
it("Date Of Birth Validated",function(){
    var result3 = isdob_valid(date);
    expect(result3).toBe(true);
    });
    function isdob_valid(dob){
        arr=dob.split("-")
        dob=arr[1]+"-"+arr[2]+"-"+arr[0]
        console.log(dob)
    var pattern3 =/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    if(dob==null)
     {
        return false
     }
    else
     {
        //var pno=parseInt(phno)
        return pattern3.test(dob)
     }
};

it("Password Validated",function(){
    var result4 = ispass_valid(pass,confpass);
    expect(result4).toBe(true);
    });
    function ispass_valid(pass,cpass){
    var pattern4 =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    //To check a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
    if(pass==null || cpass==null)
     {
        return false
     }
    else
     {
        if(pass==cpass)
        {
        return pattern4.test(pass)
        }
        else{
            return false
        }
     }
};
    });