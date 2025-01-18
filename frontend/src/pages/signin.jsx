import { auth, provider, signInWithPopup } from "../firebase";

const signUpWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("User signed up:", result.user);
    })
    .catch((error) => {
      console.error("Error during sign up:", error);
    });
};

const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("User signed in:", result.user);
    })
    .catch((error) => {
      console.error("Error during sign in:", error);
    });
};
