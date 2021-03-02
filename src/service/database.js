import { firebaseAuth, firebaseDB } from "./firebase";

class Database {
  saveContent(userId, content) {
    firebaseDB.ref(`/contents/${userId}/${content.id}`).set(content);
  }
  removeContent(userId, content) {
    firebaseDB.ref(`/contents/${userId}/${content}`);
  }
  readAllContent() {
    return firebaseDB.ref("contents").once("value");
  }
  readMyContent(userId) {
    return firebaseDB.ref(`content/${userId}`).once("value");
  }
}
export default Database;
