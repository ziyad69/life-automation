const frontPrompt = document.querySelector('#prompt');
const btn = document.querySelector('#btn');
const loader = document.getElementById('loader');
const circle = loader.querySelector('.circle');
const check = loader.querySelector('.check');
 
 

btn.addEventListener('click', async (e) => {
 
  loader.style.display = 'flex';
  circle.style.display = 'block';
  check.style.display = 'none';

  try {
   

   
    const response = await fetch('https://life-automation-production.up.railway.app/ai', {
      method: 'POST',
      headers: { 
        "Content-Type": "application/json" ,
        
      },
      body: JSON.stringify({
        prompt: frontPrompt.value || 'manage my time now i arrive to the university at 8:10 and what i will do in gaps today is tuesday'
      })
    });
     
  
    if (response.ok) {
   
      circle.style.display = 'none';
      check.style.display = 'block';
      await new Promise(resolve => setTimeout(resolve, 1500));  
    } else {
      alert('Error fetching data.');
    }

  } catch (err) {
   
  }

 
  loader.style.display = 'none';
});

