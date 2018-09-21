
axios.get('http://thecolorapi.com/id?hex=0047AB')
  .then(function(callback) {
    // Handle the success
    console.log(callback.hex.value);
    alert(res.hex.value);
  })
  .catch(function(err) {
    // handle error
    console.log(err.message)
  });