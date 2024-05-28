import { firebaseDB } from "./firebase";
import {ref, set} from "firebase/database";

class Database {
  saveContent(userId, content) {
    firebaseDB.ref(`/contents/${userId}/${content.id}`).set(content);
  }
  saveCommnet(userId, comment) {
    //
  }
  updateContent(userId, content) {
    // console.log(userId, content);
    firebaseDB.ref(`/contents/${userId}/${content.id}`).update(content);
  }
  removeContent(userId, contentId) {
    firebaseDB.ref(`/contents/${userId}/${contentId}`).remove();
  }
  readAllContent() {
    const result = ref("contents").once("value");
  }
  readMyContent(userId) {
    return firebaseDB.ref(`content/${userId}`).once("value");
  }
}
export default Database;
