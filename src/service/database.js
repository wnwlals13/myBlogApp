import { db } from "./firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

class Database {
  /* 모든 게시글 조회 */
  getAllContent = async() => {
    const docSnap = await getDocs(collection(db, "content"));
    const result = [];
    docSnap.forEach(item=>{
      result.push(item.data());
    })
    return result;
  }
  /* 게시글 추가 (단일) */
  addContent = async(content)=> {
    await setDoc(doc(db, 'content', content.id), content)
  }
  // saveCommnet(userId, comment) {
  //   //
  // }
  // updateContent(userId, content) {
  //   // console.log(userId, content);
  //   firebaseDB.ref(`/contents/${userId}/${content.id}`).update(content);
  // }
  // removeContent(userId, contentId) {
  //   firebaseDB.ref(`/contents/${userId}/${contentId}`).remove();
  // }
  // readAllContent() {
  //   const result = ref("contents").once("value");
  // }
  // readMyContent(userId) {
  //   return firebaseDB.ref(`content/${userId}`).once("value");
  // }
}
export default Database;
