import { useState } from "react";
import { auth, db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import EmojiPicker from "emoji-picker-react"

import PropTypes from "prop-types";

function SendMessage({ scroll }) {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onEmojiClick = (event, emojiData) => {
    console.log(event,"<<<<<<<<<<<<<<< event", emojiData, "<<<<<<<<<<<<<<< emojiobject");
    setMessage(message + event.emoji);
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    setMessage("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
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
    </form>
  );
}

SendMessage.propTypes = {
  scroll: PropTypes.object.isRequired,
};
export default SendMessage;
