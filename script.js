let ip = document.getElementById("ip");
let popup = document.createElement("span");
popup.innerHTML = `<p class="copied">Server ip was copied.</p>`;
popup.classList.add("popup");
ip.appendChild(popup);
const url = new URLSearchParams(window.location.search);
const serverip = "123.456.789.0:8080";

ip.onclick = function () {
    popup.style.display = "block";
    popup.style.animation = "appear 0.5s ease-in-out 0s 1 normal forwards";
    copyToClipboard(serverip);
    setTimeout(() => {
        popup.style.display = "none";
    }, 2000);
}
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        console.info("Text was copied to the clipboard");
    } catch (error) {
        console.error("Could not copy text: ", error);
    }
}





if (url.get("website") === "contact") {
    fetch("https://raw.githubusercontent.com/baerchen201/creaperwebsite/main/contact.txt?cache=" + Date.now())
        .then(response => response.text())
        .then(text => {
            // Use the text here
            const html = text;
            document.getElementById("editable").innerHTML = html;
        });

    let uname = document.getElementById("username");
    let dname = document.getElementById("dcname");
    let mail = document.getElementById("email");
    let msg = document.getElementById("message");

    function sendform() {
        if ((uname) && (dname) && (mail) && (msg)) {
            const post = `Benutzername: ${uname.value}
    Discord-Name: ${dname.value}
    Email: ${mail.value}
    Nachricht: 
    
    ${msg.value}
    
    -----------------`

            console.log(post);
            postToDiscord(post);
        } else {
            window.alert("Bitte alles ausfüllen");
            return;
        }
    }
    function postToDiscord(text) {
        //    var text = "This is a test message";
        let webhookURL = "https://discord.com/api/webhooks/1071054149799649280/DOLDdwwhl31l9Zv8kcd6-2MH7moVQ5EYVurSi1aBW1PTOEpfoI2LMymxqeZM8LL7SkjK";
        let request = new XMLHttpRequest();

        request.open("POST", webhookURL, true);
        request.setRequestHeader("Content-Type", "application/json");

        request.onreadystatechange = function () {
            if ((request.readyState === 2 || request.readyState === 4) && request.status === 204) {
                if (request.readyState === 2) {
                    console.log("Message ready to send...");
                    console.log("(Ready state 2)");
                } else {
                    console.log("Message posted successfully to Discord");
                    console.log("Ready state: " + request.readyState);
                    console.log("Status: " + request.status);

                    location.reload();
                }
            } else {
                console.error("Failed to post message to Discord");
                console.log(request.readyState);
                console.log(request.status);
            }
        };
        request.send(JSON.stringify({ content: text }));
    }
} else if (url.get("website") === "about") {
    fetch("https://raw.githubusercontent.com/baerchen201/creaperwebsite/main/about.txt?cache=" + Date.now())
        .then(response => response.text())
        .then(text => {
            // Use the text here
            const html = text;
            document.getElementById("editable").innerHTML = html;
        });
} else if (url.get("website") === "start" || !window.location.search.includes("website=")) {
    fetch("https://raw.githubusercontent.com/baerchen201/creaperwebsite/main/main.txt?cache=" + Date.now())
        .then(response => response.text())
        .then(text => {
            // Use the text here
            const html = text;
            document.getElementById("editable").innerHTML = html;
        });
} else if (url.get("website") === "dc") {
    fetch("https://raw.githubusercontent.com/baerchen201/creaperwebsite/main/dcurl?cache=" + Date.now())
        .then(response => response.text())
        .then(text => {
            // Use the text here
            location.href = text;
        });
}