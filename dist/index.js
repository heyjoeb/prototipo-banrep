// register the service worker on our web page:
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(function() {
    console.log('Service worker registered');
  }).catch(function() {
    console.log('Service worker registration failed');
  });
}
else {
  console.log('Service worker not supported');
}

// Since we only want to store a simple boolean in this example opt-in to keep things simple we’ll just use localStorage to store this state:
var optedIn = false;
window.onload = function() {
 
if('serviceWorker' in navigator) {
  document.getElementById('go-offline').innerHTML = '<h4>Acceso offline:</h4><input type="checkbox" name="go-offline" id="go-offline-status" value="false" /><label for="go-offline-status">Activar</label><div id="off-line-msg"></div>';
 
  checkOptedIn();
 
  document.getElementById("go-offline-status").addEventListener('click', function(){
      console.log('start/stop fetching');
      optInOut();
    });
 
  }
  else document.getElementById('go-offline').innerHTML = 'ServiceWorker no es soportado por este navegador. Por favor inténtelo con chrome o firefox.';
 
};

// checks the value of the localStorage item with the following code, and sets the checkbox appropriately:
function checkOptedIn() {
  console.log('checking opted in...')
  if(!!localStorage.getItem('offlineoptin')) {
    optedIn = true;
    document.getElementById("go-offline-status").checked = true;
    console.log('opted in');
    return;
  }
  else console.log('not opted in');
}

// To allow a user to opt-in to offline, we’ll provide a checkbox which, when checked, will post a message to the service worker to make the most recent content available offline:
function optInOut() {
  if(!optedIn) {
    optedIn = true;
    localStorage.setItem('offlineoptin', '1');
    navigator.serviceWorker.controller.postMessage({'command': 'offline-opt-in'});
  }
  else {
    optedIn = false;
    localStorage.removeItem('offlineoptin');
    navigator.serviceWorker.controller.postMessage({'command': 'offline-opt-out'});
  }
}