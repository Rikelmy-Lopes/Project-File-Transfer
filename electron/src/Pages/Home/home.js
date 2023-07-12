/* eslint-disable no-undef */

const displayIpAddress = () => {
  const addressDiv = document.getElementById('address');
  addressDiv.innerText = `http://${ip.address()}:3000`;
  addressDiv.style.display = 'block';
};

const removeIpAddress = () => {
  const addressDiv = document.getElementById('address');
  addressDiv.innerText = '';
  addressDiv.style.display = 'none';
};

function init() {
  const startServerBtn = document.getElementById('startServerBtn');
  const closeServerBtn = document.getElementById('closeServerBtn');
  startServerBtn.addEventListener('click', () => {
    ipcRenderer.send('start-server');
    displayIpAddress();
  });

  closeServerBtn.addEventListener('click', () => {
    ipcRenderer.send('stop-server');
    removeIpAddress();
  });
}


window.onload = () => {
  init();
};