const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Student Form</title>
        </head>
        <body>
            <h1>Student Information Form</h1>

            <form id="studentForm">

                <label>Name:</label>
                <input type="text" id="name" required>
                <br><br>

                <label>Email:</label>
                <input type="email" id="email" required>
                <br><br>

                <label>Course:</label>
                <input type="text" id="course" required>
                <br><br>

                <label>Message:</label>
                <textarea id="message" required></textarea>
                <br><br>

                <button type="submit">Submit</button>

            </form>

            <p id="result"></p>

            <script>
                document.getElementById("studentForm").addEventListener("submit", async function(event) {
                    event.preventDefault();

                    const data = {
                        name: document.getElementById("name").value,
                        email: document.getElementById("email").value,
                        course: document.getElementById("course").value,
                        message: document.getElementById("message").value
                    };

                    try {
                        const response = await fetch("http://localhost:5000/submit", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                        });

                        const result = await response.json();

                        document.getElementById("result").innerText =
                            result.message;

                    } catch (error) {
                        document.getElementById("result").innerText =
                            "Error connecting to Flask backend.";
                        console.error(error);
                    }
                });
            </script>

        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Frontend server running on http://localhost:${PORT}`);
});