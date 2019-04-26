import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

//TUTORIAL 1 - A simple function which returns Hello from Firebase
export const helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});


//TUTORIAL 2 - A function which reads weather conditions from the Firestore and returns them
export const getBostonWeather = functions.https.onRequest((request, response) =>  {
   admin.firestore().doc('cities-weather/boston-ma-us').get()
   .then(snapshot => {
        const data = snapshot.data();
        response.send(data)
    })
    .catch(error => {
        console.log(error);
        response.status(500).send(error)
    })
});

//TUTORIAL 3 - A function which listens to changes on a DB document and sends a push notification using cloud messaging when the data changes
export const onBostonWeatherUpdate =
    functions.firestore.document("cities-weather/boston-ma-us").onUpdate(change => {
        const after = change.after.data();
        const payload = {
            data: {
                temp: String(after.temp),
                conditions: after.conditions
            }
        };
        return admin.messaging().sendToTopic("weather_boston-ma-us", payload)
        .catch(error => {
            console.error("FCM failed");
        })
    });

