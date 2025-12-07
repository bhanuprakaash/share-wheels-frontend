import { initializeApp } from "@firebase/app";
import { getMessaging, getToken } from "@firebase/messaging";

const fcmConfig = {
    vapidKey: import.meta.env.VITE_FCM_VAPID_KEY
}

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestFcmToken = async () => {
    try {
        const permission = await Notification.requestPermission();
        
        if (permission === "granted") {
            const token = await getToken(messaging, {
                vapidKey: fcmConfig.vapidKey
            });
            return token;
        } else {
            console.log("Notification permission denied");
            return null;
        }
    } catch (error) {
        console.error("An error occurred while retrieving token. ", error);
        return null;
    }
};