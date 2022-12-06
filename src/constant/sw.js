// export  function swDev(){
//     const publicVapidKey =
//       "BJ4hodWHTXqWcSpOAusEZ-4Od3IPcX-y4FLCpkxprH-4h9UI28MkSpStBxP9C6qy4_K4fgdlkaJdYUSKgdNWs4Q";
// function urlBase64ToUint8Array(base64String) {
//     const padding = "=".repeat((4 - base64String.length % 4) % 4);
//     const base64 = (base64String + padding)
//       .replace(/\-/g, "+")
//       .replace(/_/g, "/");
  
//     const rawData = window.atob(base64);
//     const outputArray = new Uint8Array(rawData.length);
  
//     for (let i = 0; i < rawData.length; ++i) {
//       outputArray[i] = rawData.charCodeAt(i);
//     }
//     return outputArray;
// }   
// if('serviceWorker' in navigator){
//     send().catch(err => console.error(err));
// }
// async function send(){
//     //register service worker
//     const register = await navigator.serviceWorker.register('/worker.js', {
//         scope: '/'
//     });

//     //register push
//     const subscription = await register.pushManager.subscribe({
//         userVisibleOnly: true,

//         //public vapid key
//         applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
//     });
   
//     //Send push notification
//     await fetch("/subscribe", {
//         method: "POST",
//         body: JSON.stringify(subscription),
//         headers: {
//             "content-type": "application/json"
//         }
//     });
// }
// }
export function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }