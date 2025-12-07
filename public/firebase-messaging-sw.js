importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');


const firebaseConfig = {
    apiKey: "AIzaSyD_TqvXUWphbfMBnDWh_-GWSKLlavVZAe4",
    authDomain: "share-wheels-23916.firebaseapp.com",
    projectId: "share-wheels-23916",
    storageBucket: "share-wheels-23916.firebasestorage.app",
    messagingSenderId: "647131396922",
    appId: "1:647131396922:web:0bbb90f5639a0395de2e03",
    measurementId: "G-59079RR1CT"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/sharewheels.ico'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});