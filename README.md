✍️ Handwritten Text Extraction System
📌 Description

This project is a full-stack web application that extracts handwritten text from uploaded images using Optical Character Recognition (OCR) techniques. The system processes handwritten documents, cleans and enhances the image, extracts text, and displays it through a user-friendly web interface.

The application is designed to demonstrate practical use of image preprocessing, OCR pipelines, backend APIs, and a modern frontend for document processing workflows.

⚙️ How It Works

The user uploads an image containing handwritten text through the frontend interface.

The backend receives the image and performs preprocessing such as noise removal and image cleaning.

OCR techniques are applied to extract readable text from the processed image.

The extracted text is optionally summarized using basic AI-based logic.

The final extracted text is sent back to the frontend and displayed to the user.

Users can view extracted text history and copy results as needed.

▶️ How to Run
Backend

Navigate to the backend folder:

cd backend


Install required dependencies:

pip install -r requirements.txt


Start the backend server:

python app.py

Frontend

Navigate to the frontend folder:

cd frontend


Install dependencies:

npm install


Start the frontend application:

npm start


Open the browser and access the application to upload images and extract handwritten text.

🧰 Tech Stack

Python, Flask, OCR, OpenCV, Image Preprocessing, JavaScript, React.js, HTML, CSS, Firebase, REST APIs
