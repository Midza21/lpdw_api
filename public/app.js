function update() {
// Instantiating new EasyHTTP class 
const http = new EasyHTTP; 
// User Data 
const data = { 
    nom: document.getElementById('nom').value, 
    localisation: document.getElementById('localisation').value, 
  } 

const id = document.getElementById('id').value;

  
// Update Post 
http.put( 
'http://localhost:8080/update_device/'+id, data
    ) 
  
// Resolving promise for response data 
.then(data => console.log(data))
  
// Resolving promise for error 
.catch(err => console.log(err));
}


function Delete() {
  const http = new DeleteHTTP; 

  // const data = { 
  //   nom: document.getElementById('nom').value, 
  //   localisation: document.getElementById('localisation').value, 
  // } 

  const id = document.getElementById('id').value;
  
  console.log(id);
  // Update Post 
  http.delete('http://localhost:8080/device_delete/'+id) 
    
  // Resolving promise for response data 
  .then(data => console.log(data))
    
  // Resolving promise for error 
  .catch(err => console.log(err)); 
}