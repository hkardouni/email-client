import {
  GoogleAuthProvider,
  OAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";

export const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const { token, user } = await res.json();

      dispatch(signInSuccess({token, user}));
      navigate("/");
    } catch (error) {
      console.log("Could not sign in with google", error);
    }
  };
  const handleMicrosoftClick = async () => {
    try {
      const provider = new OAuthProvider("microsoft.com");
      const auth = getAuth(app);

      const result = signInWithPopup(auth, provider);
      console.log(result);
    } catch (error) {
      console.log("Could not sign in with Microsoft Account", error);
    }
  };

  return (
    <>
      <button
        onClick={handleGoogleClick}
        type="button"
        className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
      >
        Continue with google
      </button>
      <button
        disabled={true}
        onClick={handleMicrosoftClick}
        type="button"
        className="bg-blue-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-45"
      >
        Continue with Microsoft
      </button>
    </>
  );
};
