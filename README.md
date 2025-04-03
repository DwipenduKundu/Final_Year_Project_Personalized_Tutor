# Final_Year_Project_Personalized_Tutor
Sure! Here's a **README.md** file for your project:  

---
## 📂 Project Structure  

```sh
Project/
│── frontend/ 
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── ChatBox.js
│   │   │   ├── YouTube.js
│   │   │   ├── Wikipedia.js
│   │   │   ├── Test.js
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── App.css
│   ├── package.json
│   ├── public     
│           ├──index.html(homepage/login-page)
│           ├──page-2.html(sign-up page))
│           ├──page-3.html(OTP page)
│           ├──page-4.html(personal data taken page)
│           ├──page-5.html(login successful page)
|
│── backend/
│   ├── server.js
│   |── package.json
```
---

## 🏗️ Setup Instructions  

### **Install Dependencies**  

#### **Frontend**  
```sh
cd Project\frontend
npm i
npm start
```

#### **Backend**  
```sh
cd Project\backend
npm i express
node server.js
```

---

#PAT:Personalized AI tutor

As education is the building block of our society, and in this century knowledge is the key to our success. Our goal is to provide a platform to the students or anyone of this society, where they can learn anything of their choice with a personal AI-tutor of their own. We called it PAT. 

PAT is a personalized AI tutor, which main aim is to provide education and communication skills for free of cost. we will make an artificial tutor who interact with the student and the student also need to interact with them. 

It like a simple interface with more feature for interaction. The search result is shown in the format of audio and text both, and it will give some time to the student to learn it after learning the concept the user have to speak-out the concept to the AI, it will covert the voice of the user to text, and it will check it's correct or not then forward it to next question. 

It will show the progress of the student in both field i.e. knowledge & communication. 





## 🚀 Features  

- **💬 AI Chatbot**: Ask questions and get AI-generated responses.  
- **📺 YouTube Integration**: Fetch relevant YouTube videos based on queries.  
- **📖 Wikipedia Lookup**: Get summarized Wikipedia search results.  
- **📝 AI-Generated Quizzes**: Automatically generate quizzes based on conversation topics.  
- **💾 Local Storage**: Stores chat history and topics for continuity.  

---

## 🛠️ Tech Stack  

### **Frontend** (React.js)  
- React.js with hooks (`useState`, `useEffect`)  
- React Markdown for rendering responses  
- LocalStorage for caching messages and topics  

### **Backend** (Node.js & Express.js)  
- OpenAI API for chatbot responses  
- Wikipedia API for content retrieval  
- YouTube API for video searches  
- Custom AI-based question generator for quizzes  

---





## ⚙️ Configuration  

- **Backend runs on**: `http://localhost:5000/`  
- **Frontend runs on**: `http://localhost:3000/`  

Make sure to set up `.env` file for API keys:
```sh
OPENAI_API_KEY=your_openai_api_key
YOUTUBE_API_KEY=your_youtube_api_key
WIKIPEDIA_API_URL=https://en.wikipedia.org/w/api.php
```

---

## 🎯 Usage  

1️⃣ **Start a Chat**: Ask the AI anything using the chat window.  
2️⃣ **Search YouTube**: Get relevant YouTube videos based on queries.  
3️⃣ **Explore Wikipedia**: Retrieve summarized search results from Wikipedia.  
4️⃣ **Take a Quiz**: AI generates a quiz based on past discussion topics.  

---

## 📸 Screenshots  

![Screenshot (85)](https://github.com/user-attachments/assets/68568541-cd7c-4ae4-acab-76acd694f58a)
![Screenshot (87)](https://github.com/user-attachments/assets/958e4082-45f4-40a8-8b25-d4dcf069f21c)
---![Screenshot (86)](https://github.com/user-attachments/assets/e9bd5867-6dd0-46c4-bca0-3b184054ae77)
![image](https://github.com/user-attachments/assets/33774aee-0270-484b-b2b1-9a4a48688091)
![image](https://github.com/user-attachments/assets/16a78575-3bcc-49ec-8d1a-9c04a017e482)
![image](https://github.com/user-attachments/assets/826f7cd0-7a19-4080-8022-f412d5bc8264)
![image](https://github.com/user-attachments/assets/a6306846-55d5-4a9d-899a-498157715430)



## 📌 Future Enhancements  

- 📚 **More AI-powered learning modules**  
- 🎤 **Voice-enabled chat feature**  
- 📊 **Performance tracking for quizzes**  

---

## 🏆 Contributing  

Contributions are welcome! If you'd like to improve AI Tutor, follow these steps:  
1️⃣ Fork the repository  
2️⃣ Create a feature branch (`git checkout -b feature-branch`)  
3️⃣ Commit changes (`git commit -m "Added feature"`)  
4️⃣ Push to the branch (`git push origin feature-branch`)  
5️⃣ Open a pull request  


---

🚀 **Developed by Dwipendu Kundu** | [LinkedIn](https://www.linkedin.com/in/dwipendu-kundu-a19557227/)  

---


