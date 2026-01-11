const generateBtn = document.getElementById("generateBtn");
const urlInput = document.getElementById("url");
const dragon = document.getElementById("dragon");
const dragonSound = document.getElementById("dragonSound");
const resultDiv = document.getElementById("result");
const qrImg = document.getElementById("qrImg");
const downloadLink = document.getElementById("download");

generateBtn.addEventListener("click", async () => {
    const url = urlInput.value.trim();
    if (!url) return alert("Enter URL");

    generateBtn.disabled = true;
    resultDiv.style.display = "none";

    // Reset sound
    dragonSound.currentTime = 0;
    dragonSound.play();

    // Show dragon
    dragon.style.display = "block";
    dragon.style.transform = "translateY(-50%)";

    // Force reflow
    dragon.offsetHeight;

    // Start animation
    dragon.style.transform = "translate(150vw, -50%)";

    // Wait exactly 12 seconds
    setTimeout(async () => {

        dragonSound.pause();

        // Backend call (UNCHANGED)
        const res = await fetch("/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url })
        });

        const data = await res.json();
        qrImg.src = data.qrImage;
        downloadLink.href = data.qrImage;

        resultDiv.style.display = "block";

        // Reset dragon
        dragon.style.display = "none";
        dragon.style.transform = "translateY(-50%)";

        generateBtn.disabled = false;

    }, 12000);
});
