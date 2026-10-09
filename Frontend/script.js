async function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    const status = document.getElementById("uploadStatus");

    if (!fileInput.files.length) {
        status.innerText = "Please select a file first.";
        return;
    }

    status.innerText = "Uploading...";

    try {
        const formData = new FormData();
        formData.append("file", fileInput.files[0]);

        const response = await fetch("http://localhost:5000/upload", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Upload failed");
        }

        status.innerText = data.message;
    } catch (error) {
        console.error("Upload error:", error);
        status.innerText = "Upload failed: " + error.message;
    }
}

async function loadFiles() {
    const fileList = document.getElementById("fileList");

    try {
        const response = await fetch("http://localhost:5000/files");

        if (!response.ok) {
            throw new Error("Could not load files");
        }

        const files = await response.json();

        fileList.innerHTML = "";

        if (files.length === 0) {
            fileList.textContent = "No files uploaded yet.";
            return;
        }

        files.forEach((filename) => {
    const item = document.createElement("li");

    const name = document.createElement("span");
    name.textContent = filename + " ";

    const download = document.createElement("a");
    download.href =
        "http://localhost:5000/download/" + encodeURIComponent(filename);
    download.textContent = "Download";

    item.appendChild(name);
    item.appendChild(download);
    fileList.appendChild(item);
});
    } catch (error) {
        fileList.textContent = "Failed to load files: " + error.message;
    }
}