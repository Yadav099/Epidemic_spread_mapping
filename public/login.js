const hID = document.querySelector("input[name='h_id']");
const pwd = document.querySelector("input[name='pass']");
console.log(hID, pwd);

const loginForm = document.querySelector("#loginForm");
loginForm.addEventListener("submit", e => {
    e.preventDefault();
    console.log('hey');
    // $ajax({

    // })
    console.log(hID.value, pwd.value);
    fetch("/signin", {
        method: 'POST',
        body: JSON.stringify({
            h_id: hID.value,
            pass: pwd.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(function(data) {
        if(data.error)
            alert(data.error);
        else {
            location.href = "/admin";
        }
    })
    .catch(function(err) {
        alert(err);
    });
});




















 

