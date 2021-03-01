import { firebaseAuth, firebaseDB } from "./firebase";
let date = new Date();
let year = date.getFullYear();
let month = ("0" + (1 + date.getMonth())).slice(-2);
let day = ("0" + date.getDate()).slice(-2);
let dateId = year + month + day;
let num = 0;
class Database {
  saveContent(userId, content) {
    firebaseDB.ref(`${userId}/contents/${dateId}/${num++}`).set(content);
  }
  removeContent(userId, content) {
    firebaseDB.ref(`${userId}/contents/`);
  }
  async readContent(userId) {
    const snapshot = await firebaseDB.ref("/users/" + userId).once("value");
    snapshot.forEach((childSnapshot) => {
      console.log(childSnapshot);
    });
  }
}
export default Database;
