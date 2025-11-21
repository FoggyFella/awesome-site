

async function check_password(the_attempt){
    const response = await fetch("https://mypythonworker.hrimar321.workers.dev", {
        method: "POST",
        body: JSON.stringify({
          thething: "checkpass",
          attempt: the_attempt
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
    
      const stuff = response.json();
      console.log(stuff);
}