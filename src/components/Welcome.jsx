import Logo from "../image/btn_google_signin_dark_pressed_web.png"
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Welcome = () => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <main className="welcome">
      <h2>Welcome to ChitChat.</h2>
      <button className="sign-in">
        <img
          onClick={googleSignIn}
          src={Logo}
          alt="sign in with google"
          type="button"
        />
      </button>
    </main>
  );
};

export default Welcome;
