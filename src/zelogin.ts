// ╔══════════════════════════════════════════════════════════════════╗
// ║  zelogin.ts — Firebase Authentication Module for Indiagro      ║
// ║  Complete auth system: Email/Password + Google OAuth            ║
// ║  Firebase Modular SDK v9+                                      ║
// ╚══════════════════════════════════════════════════════════════════╝
//
// ═══════════════════════════════════════════════════════════════════
// 📘 FIREBASE SETUP GUIDE (Step-by-Step)
// ═══════════════════════════════════════════════════════════════════
//
// STEP 1: CREATE A FIREBASE PROJECT
//   1. Go to https://console.firebase.google.com/
//   2. Click "Create a project" (or "Add project")
//   3. Enter project name: "Indiagro" (or any name you prefer)
//   4. Enable/Disable Google Analytics as needed → Click "Create"
//   5. Wait for the project to be created → Click "Continue"
//
// STEP 2: REGISTER YOUR WEB APP
//   1. On the Firebase project dashboard, click the web icon (</>)
//   2. Enter app nickname: "Indiagro Web"
//   3. (Optional) Check "Also set up Firebase Hosting"
//   4. Click "Register app"
//   5. You'll see the Firebase SDK config — COPY the firebaseConfig object
//   6. Paste it in the FIREBASE CONFIGURATION section below
//
// STEP 3: ENABLE EMAIL/PASSWORD AUTHENTICATION
//   1. In Firebase Console → Go to "Authentication" (left sidebar)
//   2. Click "Get Started" (if first time)
//   3. Go to "Sign-in method" tab
//   4. Click "Email/Password"
//   5. Toggle "Enable" → Click "Save"
//
// STEP 4: ENABLE GOOGLE AUTHENTICATION
//   1. Still in Authentication → Sign-in method
//   2. Click "Google"
//   3. Toggle "Enable"
//   4. Select a support email (your Gmail)
//   5. Click "Save"
//
// STEP 5: ADD YOUR DOMAIN (for production)
//   1. In Authentication → Settings → Authorized domains
//   2. Add your production domain (e.g., indiagro.in)
//   3. localhost is added by default for development
//
// STEP 6: HOW TO GET YOUR FIREBASE CONFIG KEYS
//   1. Go to Project Settings (gear icon → Project settings)
//   2. Scroll down to "Your apps" section
//   3. Under the web app, you'll see the config object:
//      {
//        apiKey: "AIzaSy...",
//        authDomain: "your-project.firebaseapp.com",
//        projectId: "your-project-id",
//        storageBucket: "your-project.appspot.com",
//        messagingSenderId: "123456789",
//        appId: "1:123456789:web:abc123",
//        measurementId: "G-XXXXXXXXXX"
//      }
//   4. Copy and paste these values below
//
// STEP 7: HOW zelogin.ts CONNECTS TO FIREBASE
//   - This file imports Firebase SDK modules (already installed via npm)
//   - It initializes Firebase using your config keys
//   - It creates auth functions (signUp, signIn, Google, logout, delete)
//   - These functions are imported and used by the React components
//   - The App.tsx imports from './zelogin' and calls the functions
//
// STEP 8: HOW TO LINK zelogin.ts TO THE LOGIN PAGE
//   - In App.tsx (or any component), import the functions:
//     import { signUpWithEmail, signInWithEmail, signInWithGoogle, logOut } from './zelogin';
//   - Call them in button click handlers or form submit handlers
//   - Each function returns a Promise<AuthResult> with success/error info
//
// ═══════════════════════════════════════════════════════════════════
// 🛡️ SECURITY NOTES
// ═══════════════════════════════════════════════════════════════════
// - Firebase API keys are meant to be public (they identify your project)
// - Security is enforced via Firebase Security Rules, NOT the API key
// - Never store sensitive user data in client-side code
// - Use Firebase Security Rules to protect Firestore/Storage data
// - Enable App Check for additional security in production
// ═══════════════════════════════════════════════════════════════════



import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInAnonymously,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
  deleteUser,
  sendPasswordResetEmail,
  type Auth,
  type User,
  type UserCredential,
} from "firebase/auth";

// ═══════════════════════════════════════════════════════════════════
// 🔑 FIREBASE CONFIGURATION
// ═══════════════════════════════════════════════════════════════════
// ⬇️ REPLACE these placeholder values with your actual Firebase config ⬇️
// Get your config from: Firebase Console → Project Settings → Your apps
// ═══════════════════════════════════════════════════════════════════
const firebaseConfig = {
  apiKey: "AIzaSyDWNIZYEzFpDgatr13vtLwOCy01g1TVvSA",
  authDomain: "indiagrov1.firebaseapp.com",
  projectId: "indiagrov1",
  storageBucket: "indiagrov1.firebasestorage.app",
  messagingSenderId: "994165781704",
  appId: "1:994165781704:web:1a3300c4acedfb49f2a1fd",
  measurementId: "G-QF2JSJXGV3"
};

// ═══════════════════════════════════════════════════════════════════
// 🔍 Check if Firebase config looks valid
// ═══════════════════════════════════════════════════════════════════
const isFirebaseConfigured = (): boolean => {
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey.length < 20) {
    console.warn("⚠️ Firebase API key is missing or too short!");
    return false;
  }
  if (!firebaseConfig.authDomain || !firebaseConfig.projectId) {
    console.warn("⚠️ Firebase authDomain or projectId is missing!");
    return false;
  }
  return true;
};

// ═══════════════════════════════════════════════════════════════════
// 🚀 Initialize Firebase App & Auth
// ═══════════════════════════════════════════════════════════════════
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let googleProvider: GoogleAuthProvider | null = null;

if (isFirebaseConfigured()) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);

    googleProvider = new GoogleAuthProvider();
    googleProvider.addScope("email");
    googleProvider.addScope("profile");
    googleProvider.setCustomParameters({ prompt: "select_account" });

    console.log("✅ Firebase initialized successfully");
  } catch (error) {
    console.error("❌ Firebase initialization error:", error);
  }
} else {
  console.log("⚠️ Firebase not configured — running in DEMO MODE");
}

// ═══════════════════════════════════════════════════════════════════
// 📦 Auth Result Type — returned by all auth functions
// ═══════════════════════════════════════════════════════════════════
export interface AuthResult {
  success: boolean;
  user: {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  } | null;
  error: string | null;
  isDemo: boolean;
  isAnonymous?: boolean; // true for guest users
}

// ═══════════════════════════════════════════════════════════════════
// 🧪 DEMO MODE — Simulated auth when Firebase isn't configured
// Allows full testing of login flow without Firebase setup
// ═══════════════════════════════════════════════════════════════════
const DEMO_USERS: Record<string, { password: string; name: string }> = {};

function generateDemoUid(): string {
  return "demo-" + Math.random().toString(36).substring(2, 10);
}

function createDemoResult(email: string, name: string, photo?: string): AuthResult {
  return {
    success: true,
    user: {
      uid: generateDemoUid(),
      email,
      displayName: name,
      photoURL: photo || null,
    },
    error: null,
    isDemo: true,
  };
}

// ═══════════════════════════════════════════════════════════════════
// Helper: Convert Firebase error codes to user-friendly messages
// ═══════════════════════════════════════════════════════════════════
function getAuthErrorMessage(errorCode: string): string {
  const errorMessages: Record<string, string> = {
    "auth/email-already-in-use": "An account with this email already exists. Try signing in instead.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/weak-password": "Password is too weak. Use at least 6 characters with a mix of letters and numbers.",
    "auth/operation-not-allowed": "This sign-in method is not enabled. Please contact support.",
    "auth/user-not-found": "No account found with this email. Please sign up first.",
    "auth/wrong-password": "Incorrect password. Please try again or reset your password.",
    "auth/user-disabled": "This account has been disabled. Please contact support.",
    "auth/too-many-requests": "Too many failed attempts. Please wait a few minutes and try again.",
    "auth/invalid-credential": "Invalid email or password. Please check and try again.",
    "auth/popup-closed-by-user": "Sign-in popup was closed. Please try again.",
    "auth/popup-blocked": "Popup was blocked by your browser. Please allow popups for this site.",
    "auth/cancelled-popup-request": "Sign-in was cancelled. Please try again.",
    "auth/account-exists-with-different-credential": "An account already exists with this email using a different sign-in method.",
    "auth/network-request-failed": "Network error. Please check your internet connection.",
    "auth/requires-recent-login": "For security, please sign in again before performing this action.",
    "auth/credential-already-in-use": "This credential is already associated with another account.",
  };
  return errorMessages[errorCode] || "Something went wrong. Please try again.";
}

// ═══════════════════════════════════════════════════════════════════
// 📝 SIGN UP — Create new account with Email & Password
// ═══════════════════════════════════════════════════════════════════
// Usage:
//   const result = await signUpWithEmail("user@email.com", "password123", "John Doe");
//   if (result.success) { /* redirect to dashboard */ }
//   else { /* show result.error */ }
// ═══════════════════════════════════════════════════════════════════
export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string
): Promise<AuthResult> {
  // ---- DEMO MODE ----
  if (!isFirebaseConfigured() || !auth) {
    // Simulate validation
    if (!email.includes("@")) {
      return { success: false, user: null, error: "Please enter a valid email address.", isDemo: true };
    }
    if (password.length < 6) {
      return { success: false, user: null, error: "Password must be at least 6 characters.", isDemo: true };
    }
    if (DEMO_USERS[email.toLowerCase()]) {
      return { success: false, user: null, error: "An account with this email already exists.", isDemo: true };
    }
    DEMO_USERS[email.toLowerCase()] = { password, name: displayName };
    return createDemoResult(email, displayName);
  }

  // ---- FIREBASE MODE ----
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Set the display name on the user profile
    if (userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
    }
    return {
      success: true,
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: displayName,
        photoURL: userCredential.user.photoURL,
      },
      error: null,
      isDemo: false,
    };
  } catch (error: unknown) {
    const firebaseError = error as { code?: string };
    return {
      success: false,
      user: null,
      error: getAuthErrorMessage(firebaseError.code || ""),
      isDemo: false,
    };
  }
}

// ═══════════════════════════════════════════════════════════════════
// 🔓 SIGN IN — Login with existing Email & Password
// ═══════════════════════════════════════════════════════════════════
// Usage:
//   const result = await signInWithEmail("user@email.com", "password123");
//   if (result.success) { /* redirect based on role */ }
// ═══════════════════════════════════════════════════════════════════
export async function signInWithEmail(
  email: string,
  password: string
): Promise<AuthResult> {
  // ---- DEMO MODE ----
  if (!isFirebaseConfigured() || !auth) {
    const user = DEMO_USERS[email.toLowerCase()];
    if (!user) {
      return { success: false, user: null, error: "No account found with this email. Please sign up first.", isDemo: true };
    }
    if (user.password !== password) {
      return { success: false, user: null, error: "Incorrect password. Please try again.", isDemo: true };
    }
    return createDemoResult(email, user.name);
  }

  // ---- FIREBASE MODE ----
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
      },
      error: null,
      isDemo: false,
    };
  } catch (error: unknown) {
    const firebaseError = error as { code?: string };
    return {
      success: false,
      user: null,
      error: getAuthErrorMessage(firebaseError.code || ""),
      isDemo: false,
    };
  }
}

// ═══════════════════════════════════════════════════════════════════
// 🔵 SIGN IN WITH GOOGLE — OAuth popup authentication
// ═══════════════════════════════════════════════════════════════════
// Usage:
//   const result = await signInWithGoogle();
//   if (result.success) { /* user is signed in */ }
// ═══════════════════════════════════════════════════════════════════
export async function signInWithGoogle(): Promise<AuthResult> {
  // ---- DEMO MODE ----
  if (!isFirebaseConfigured() || !auth || !googleProvider) {
    const demoEmail = "demo.user@gmail.com";
    const demoName = "Google Demo User";
    DEMO_USERS[demoEmail] = { password: "", name: demoName };
    return createDemoResult(
      demoEmail,
      demoName,
      "https://ui-avatars.com/api/?name=Google+User&background=4ade80&color=fff&size=128&bold=true"
    );
  }

  // ---- FIREBASE MODE ----
  try {
    const result: UserCredential = await signInWithPopup(auth, googleProvider);
    return {
      success: true,
      user: {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      },
      error: null,
      isDemo: false,
    };
  } catch (error: unknown) {
    const firebaseError = error as { code?: string };
    return {
      success: false,
      user: null,
      error: getAuthErrorMessage(firebaseError.code || ""),
      isDemo: false,
    };
  }
}

// ═══════════════════════════════════════════════════════════════════
// 👤 SIGN IN ANONYMOUSLY — Guest user access without credentials
// ═══════════════════════════════════════════════════════════════════
// Usage:
//   const result = await signInAsGuest();
//   if (result.success) { /* guest is logged in */ }
// Note: Guest accounts have limited features and can be upgraded later
// ═══════════════════════════════════════════════════════════════════
export async function signInAsGuest(): Promise<AuthResult> {
  // ---- DEMO MODE ----
  if (!isFirebaseConfigured() || !auth) {
    const guestId = Math.random().toString(36).substring(2, 8).toUpperCase();
    return {
      success: true,
      user: {
        uid: `guest-${guestId}`,
        email: null,
        displayName: `Guest User`,
        photoURL: null,
      },
      error: null,
      isDemo: true,
      isAnonymous: true,
    } as AuthResult;
  }

  // ---- FIREBASE MODE ----
  try {
    const result: UserCredential = await signInAnonymously(auth);
    return {
      success: true,
      user: {
        uid: result.user.uid,
        email: null,
        displayName: "Guest User",
        photoURL: null,
      },
      error: null,
      isDemo: false,
      isAnonymous: true,
    } as AuthResult;
  } catch (error: unknown) {
    const firebaseError = error as { code?: string };
    return {
      success: false,
      user: null,
      error: getAuthErrorMessage(firebaseError.code || ""),
      isDemo: false,
    };
  }
}

// ═══════════════════════════════════════════════════════════════════
// 🔄 PASSWORD RESET — Send reset email
// ═══════════════════════════════════════════════════════════════════
// Usage:
//   const result = await resetPassword("user@email.com");
// ═══════════════════════════════════════════════════════════════════
export async function resetPassword(
  email: string
): Promise<{ success: boolean; error: string | null }> {
  if (!isFirebaseConfigured() || !auth) {
    return { success: true, error: null }; // Demo mode — pretend success
  }

  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, error: null };
  } catch (error: unknown) {
    const firebaseError = error as { code?: string };
    return { success: false, error: getAuthErrorMessage(firebaseError.code || "") };
  }
}

// ═══════════════════════════════════════════════════════════════════
// 🚪 SIGN OUT — Log the user out
// ═══════════════════════════════════════════════════════════════════
// Usage:
//   const result = await logOut();
// ═══════════════════════════════════════════════════════════════════
export async function logOut(): Promise<{ success: boolean; error: string | null }> {
  if (!isFirebaseConfigured() || !auth) {
    return { success: true, error: null };
  }

  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch (error: unknown) {
    const firebaseError = error as { message?: string };
    return { success: false, error: firebaseError.message || "Sign out failed." };
  }
}

// ═══════════════════════════════════════════════════════════════════
// 🗑️ DELETE ACCOUNT — Permanently remove user account
// ═══════════════════════════════════════════════════════════════════
// Note: Requires recent authentication. If it fails with
// "requires-recent-login", the user must sign in again first.
// ═══════════════════════════════════════════════════════════════════
export async function deleteAccount(): Promise<{ success: boolean; error: string | null }> {
  if (!isFirebaseConfigured() || !auth || !auth.currentUser) {
    return { success: true, error: null };
  }

  try {
    await deleteUser(auth.currentUser);
    return { success: true, error: null };
  } catch (error: unknown) {
    const firebaseError = error as { code?: string };
    return { success: false, error: getAuthErrorMessage(firebaseError.code || "") };
  }
}

// ═══════════════════════════════════════════════════════════════════
// 👂 AUTH STATE LISTENER — Watch for auth changes in real-time
// ═══════════════════════════════════════════════════════════════════
// Usage:
//   const unsubscribe = onAuthChange((user) => {
//     if (user) { console.log("Logged in:", user.email); }
//     else { console.log("Logged out"); }
//   });
//   // Later: unsubscribe(); // to stop listening
// ═══════════════════════════════════════════════════════════════════
export function onAuthChange(
  callback: (user: User | null) => void
): (() => void) | null {
  if (!isFirebaseConfigured() || !auth) {
    return null;
  }
  return onAuthStateChanged(auth, callback);
}

// ═══════════════════════════════════════════════════════════════════
// 👤 GET CURRENT USER — Returns currently signed-in user or null
// ═══════════════════════════════════════════════════════════════════
export function getCurrentUser(): User | null {
  if (!auth) return null;
  return auth.currentUser;
}

// ═══════════════════════════════════════════════════════════════════
// ✅ CHECK FIREBASE STATUS — Is Firebase properly configured?
// ═══════════════════════════════════════════════════════════════════
export function isFirebaseReady(): boolean {
  return isFirebaseConfigured();
}

// ═══════════════════════════════════════════════════════════════════
// 📋 SAMPLE HTML SNIPPET — How to connect login form
// ═══════════════════════════════════════════════════════════════════
// <!-- In your React component: -->
//
// import { signInWithEmail, signUpWithEmail, signInWithGoogle } from './zelogin';
//
// // Email/Password Login:
// const handleLogin = async (e) => {
//   e.preventDefault(); // Prevent form reload
//   const result = await signInWithEmail(email, password);
//   if (result.success) {
//     console.log("Logged in!", result.user);
//     // Redirect to farmer/buyer dashboard based on role
//     navigate(userRole === 'farmer' ? 'farmer' : 'buyer');
//   } else {
//     setError(result.error);
//   }
// };
//
// // Google Login:
// const handleGoogle = async () => {
//   const result = await signInWithGoogle();
//   if (result.success) {
//     navigate('profile');
//   }
// };
//
// // Logout:
// import { logOut } from './zelogin';
// const handleLogout = async () => {
//   await logOut();
//   navigate('home');
// };
// ═══════════════════════════════════════════════════════════════════
