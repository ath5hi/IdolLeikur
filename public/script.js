function submitForm() {
    const name = document.getElementById('name').value;
  
    // Assuming you are using fetch API to send data to the server
    fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `name=${encodeURIComponent(name)}`,
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        // Handle the response as needed
      })
      .catch(error => console.error('Error:', error));
  }
  