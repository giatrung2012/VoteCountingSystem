// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  set,
  onValue // Thêm hàm này để theo dõi thay đổi
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1tZumyW33LJKVnDoxbY2EfXYKuMpCftU",
  authDomain: "esp32-309e2.firebaseapp.com",
  databaseURL: "https://esp32-309e2-default-rtdb.firebaseio.com",
  projectId: "esp32-309e2",
  storageBucket: "esp32-309e2.appspot.com",
  messagingSenderId: "342662439626",
  appId: "1:342662439626:web:bc30377bc4ead4178c0a33",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const countRef = ref(database, "IoT/count");

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("refreshData").addEventListener("click", getData);
  document.getElementById("resetCounter").addEventListener("click", resetCounter);
  
  // Thêm hàm lắng nghe sự thay đổi vào cơ sở dữ liệu
  onValue(countRef, (snapshot) => {
    const data = snapshot.val();
    document.getElementById("count").innerText = Math.max(data, 0);
  });
});

function getData() {
  get(countRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        document.getElementById("count").innerText = snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function resetCounter() {
  set(countRef, -1); // Sửa resetRef thành countRef để reset giá trị trong cơ sở dữ liệu
}
