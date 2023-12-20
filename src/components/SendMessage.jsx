import { useState } from "react";
import { auth, db, storage } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import EmojiPicker from "emoji-picker-react"

import PropTypes from "prop-types";

function SendMessage({ scroll }) {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [image, setImage] = useState(null);
  

  const onEmojiClick = (event) => {
    // console.log(event,"<<<<<<<<<<<<<<< event", emojiData, "<<<<<<<<<<<<<<< emojiobject");
    setMessage(message + event.emoji);
  };

  const onImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    const { uid, displayName, photoURL } = auth.currentUser;

    let imageUrl = null;

    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      await uploadTask.then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      }).then((downloadURL) => {
        imageUrl = downloadURL;
      });
    }

    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
      image: imageUrl,
    });
    setMessage("");
    setImage(null);
    scroll.current.scrollIntoView({ behavior: "fast" });
  };

  return (
    <form onSubmit={(event) => sendMessage(event)} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>Emojji</button>
      {showEmojiPicker && <EmojiPicker onEmojiClick={onEmojiClick} />}
      <button type="submit">Send</button>
      <input
        id="imageInput"
        name="imageInput"
        type="file"
        onChange={onImageChange}
      />
    </form>
  );
}

SendMessage.propTypes = {
  scroll: PropTypes.object.isRequired,
};
export default SendMessage;
