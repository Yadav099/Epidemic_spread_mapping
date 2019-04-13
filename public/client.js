function getNode(type, text) {
  const el = document.createElement(type);
  el.textContent = text;
  return el;
}

const info = document.querySelector("#info");

function searchDisease() {
  fetch("/searchDisease", {
    method: "POST",
    body: JSON.stringify({
      d_name: document.querySelector("input[name='d_name']").value
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(function(data) {
      info.children.length &&
        info.children.forEach(node => {
          info.removeChild(node);
        });
      console.log(data);

      const _data = data.success[0];
      const pos = data.position;
      initMap(pos[0].lat, pos[0].lon);
      //present(h_positions[0].lat, h_positions[0].lon, h_positions[0].name);
      info.appendChild(getNode("h3", `Disease name: ${_data["name"]}`));
      info.appendChild(getNode("h3", `Affected people: ${_data["affected"]}`));
      info.appendChild(getNode("h3", `Death toll: ${_data["death"]}`));
      info.appendChild(getNode("h3", `Precautions: ${_data["precautions"]}`));
      info.appendChild(getNode("h3", `Contagious: ${_data["contagious"]}`));
      info.appendChild(getNode("h3", `Spread Type: ${_data["SpreadType"]}`));
      info.appendChild(getNode("h3", `Status: ${_data["Dstatus"]}`));
    })
    .catch(function(err) {
      console.log(err);
    });
}

document
  .querySelector("button#search")
  .addEventListener("click", searchDisease);
