// let current = 0; //0 for new 1 for existing
// const toggleBtn = document.querySelector("#toggleBtn");
// const existingForm = document.querySelector("#existing-form");
// const newForm = document.querySelector("#new-form");

// const precautions = document.querySelector("input[name='precautions']");
// const contageousip = document.querySelector("input[name='contageousip']");
// const Spreadip = document.querySelector("input[name='Spreadip']");
// const affectedip = document.querySelector("input[name='affectedip']");
// const lifecountip = document.querySelector("input[name='lifecountip']");

// function toggleDiv() {
//   if (current == 0) {
//     toggleBtn.innerHTML = "Existing";
//     current = 1;
//     newForm.style.display = "none";
//     existingForm.style.display = "block";
//   } else {
//     toggleBtn.innerHTML = "New";
//     current = 0;
//     existingForm.style.display = "none";
//     newForm.style.display = "block";
//   }
// }

// function searchDisease() {
//   fetch("/searchDisease", {
//     method: "POST",
//     body: JSON.stringify({
//       d_name: document.querySelector("input[name='d_name']").value
//     }),
//     headers: {
//       "Content-Type": "application/json"
//     }
//   })
//     .then(res => res.json())
//     .then(function(data) {
//       console.log(data.success[0]);

//     })
//     .catch(function(err) {
//       console.log(err);
//     });
// }
