const loginBtn = document.querySelector('#loginBtn');
const email = document.getElementById('email');
const password = document.getElementById('password');

loginBtn.addEventListener('click', async (e)=>{
  try{
    e.preventDefault();
    console.log('hi from click loginbtn')
   const response = await fetch(`https://life-automation-production-5fe3.up.railway.app/user/login`,{
    method:'POST',
    headers:{"Content-type":"application/json"},
    body:JSON.stringify({
       email:email.value,
    password:password.value
    })
   })
 
   if(response.ok){
     window.location.href = `https://life-automation-production-5fe3.up.railway.app/page/prompt`;
   }
  
  }catch(error){
 
  }
})