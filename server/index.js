const path = require('path')
const express = require("express")
const app = express()
const cors = require("cors")
const port = process.env.PORT || 7000

// Page Home
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url
  try {
    const response = await axios.get(targetUrl, {
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    res.json(response.data) // Send the response from the target URL back to the client
  } catch (error) {
    console.error('Error fetching data from target URL:', error)
    res.status(500).send('Error fetching data')
  }
})

// ZingMp3Router
const ZingMp3Router = require("./routers/api/ZingRouter")
app.use("/api", cors(), ZingMp3Router)

// Page Error
app.get("*", (req, res) => {
  res.send("Nhập Sai Đường Dẫn! Vui Lòng Nhập Lại >.<")
});

app.listen(port, () => {
  console.log(`Start server listen at http://localhost:${port}`)
});
