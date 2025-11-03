const loginBtn = document.querySelector('#loginBtn');
const email = document.getElementById('email');
const password = document.getElementById('password');

loginBtn.addEventListener('click', async (e)=>{
  try{
    e.preventDefault();
    console.log('hi from click loginbtn')
    console.log('this is base url',process.env.BASE_URL)
   const response = await fetch(`${process.env.BASE_URL}/user/login`,{
    method:'POST',
    headers:{"Content-type":"application/json"},
    body:JSON.stringify({
       email:email.value,
    password:password.value
    })
   })
 
   if(response.ok){
    
     window.location.href = `${process.env.BASE_URL}/page/prompt`;
   }
  
  }catch(error){
 
  }
})