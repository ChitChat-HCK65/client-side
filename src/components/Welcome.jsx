import Logo from "../image/btn_google_signin_dark_pressed_web.png";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Welcome = () => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <>
      <section className="">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex flex-col justify-center pt-16">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Best App Chat in the world
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              Join with 100++ milion user
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0">
              <div className="w-72">
                <img
                  onClick={googleSignIn}
                  src={Logo}
                  // alt="sign in with google"
                  // type="button"
                />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-sky-400">Sponsored By</h1>
            <iframe
              className="mx-auto w-full lg:max-w-xl h-64 rounded-lg sm:h-96 shadow-xl"
              src="https://www.youtube.com/embed/aF6IuhUQwm8"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen=""
            />
          </div>
        </div>
      </section>
    </>
    // <main className="welcome">
    //   <h2>Welcome to ChitChat.</h2>
    //   <button className="sign-in">
    //     <img
    //       onClick={googleSignIn}
    //       src={Logo}
    //       alt="sign in with google"
    //       type="button"
    //     />
    //   </button>
    // </main>
  );
};

export default Welcome;
