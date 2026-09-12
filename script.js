const catSelect = document.getElementById("category");
const subSelect = document.getElementById("subcategory");

for (let key in categories) {
    let opt = document.createElement("option");
    opt.value = key;
    opt.textContent = categories[key].label;
    catSelect.appendChild(opt);
}

function updateSub() {
    let selected = categories[catSelect.value];
    subSelect.innerHTML = "";
    selected.options.forEach(o => {
        let opt = document.createElement("option");
        opt.value = o;
        opt.textContent = o;
        subSelect.appendChild(opt);
    });
}

catSelect.addEventListener("change", updateSub);
updateSub();

function submitReport() {
    const user = document.getElementById("user").value;
    const desc = document.getElementById("desc").value;
    const steps = document.getElementById("steps").value;
    const image = document.getElementById("image").value;

    const selected = categories[catSelect.value];

    const payload = {
        embeds: [{
            title: "New Bug Report",
            color: 3447003,
            fields: [
                {name:"User", value:user || "Unknown"},
                {name:"Category", value:selected.label},
                {name:"Issue", value:subSelect.value},
                {name:"Description", value:desc || "None"},
                {name:"Steps", value:steps || "None"}
            ],
            image: image ? {url:image} : undefined,
            timestamp: new Date()
        }]
    };

    fetch(selected.webhook, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(payload)
    }).then(()=>{
        document.getElementById("status").innerText = "Report sent!";
    });
}
