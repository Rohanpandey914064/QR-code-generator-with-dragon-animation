const express = require("express");
const QRCode = require("qrcode");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/generate", async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ error: "URL required" });

        // Generate QR as Base64
        const qrImage = await QRCode.toDataURL(url);

        res.json({ qrImage });

    } catch (err) {
        res.status(500).json({ error: "QR generation failed" });
    }
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
