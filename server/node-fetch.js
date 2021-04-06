const fetch = require('node-fetch');

console.log("hello_world")

let inference = {"value":"value","activity":"activity","activityInference":"activityInference","TimeTaken":"timeTaken","user":"user"}
console.log("inference",inference);
fetch('https://34.89.118.144:5005/inference_collect', {
      method: 'POST',
      insecure:true,
      body: JSON.stringify(inference),
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
  })
  .then(res => res.json())
  .then(data => console.log(data));
 
