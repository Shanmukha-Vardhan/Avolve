import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    sendPasswordResetEmail,
    updateProfile,
    onAuthStateChanged,
    User,
    GoogleAuthProvider,
    signInWithPopup,
    UserCredential,
} from 'firebase/auth';
import { auth } from './config';

// Sign up with email and password
export const signUp = async (
    email: string,
    password: string,
    displayName?: string
): Promise<UserCredential> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    if (displayName && userCredential.user) {
        await updateProfile(userCredential.user, { displayName });
    }

    return userCredential;
};

// Sign in with email and password
export const signIn = async (
    email: string,
    password: string
): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
};

// Sign in with Google
export const signInWithGoogle = async (): Promise<UserCredential> => {
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return signInWithPopup(auth, provider);
};

// Sign out
export const signOut = async (): Promise<void> => {
    return firebaseSignOut(auth);
};

// Send password reset email
export const resetPassword = async (email: string): Promise<void> => {
    return sendPasswordResetEmail(auth, email);
};

// Get current user
export const getCurrentUser = (): User | null => {
    return auth.currentUser;
};

// Subscribe to auth state changes
export const onAuthChange = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
};

// Update user profile
export const updateUserProfile = async (
    displayName?: string,
    photoURL?: string
): Promise<void> => {
    const user = auth.currentUser;
    if (!user) throw new Error('No authenticated user');

    return updateProfile(user, {
        displayName: displayName ?? user.displayName,
        photoURL: photoURL ?? user.photoURL,
    });
};
