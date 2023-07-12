/* eslint-disable no-undef */
const backwards = document.getElementById('backwards');
const forward = document.getElementById('forward');

backwards.addEventListener('click', () => {
  if (location.pathname !== '/') {
    history.back();
  }
});

forward.addEventListener('click', () => {
  history.forward();
});


const displayCurrentDirectory = () => {
  const currentDirectory = document.getElementById('current-directory');
  currentDirectory.innerText += ` ${decodeURIComponent(location.pathname)}?`;
};

const displayEntryList = async () => {
  const entriesList = await getEntriesList();
  const fileList = document.getElementById('file-list');
  entriesList.forEach(entry => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    let entryName = entry.name.split('/');
    entryName = entryName[entryName.length -1];
    if (!entry.isDirectory) {
      link.href = `/download/${encodeURIComponent(entry.name)}`;
      const imageTag = document.createElement('img');
      imageTag.src = '/file.png';
      imageTag.className = 'folder-icon';
      listItem.appendChild(imageTag);
    } else {
      const imageTag = document.createElement('img');
      imageTag.src = '/folder.png';
      imageTag.className = 'folder-icon';
      listItem.appendChild(imageTag);
      link.href = `/${encodeURIComponent(entry.name)}`;
    }
    link.textContent = entryName;
    listItem.appendChild(link);
    fileList.appendChild(listItem);
  });
};

const getEntriesList = async () => {
  const path = location.pathname;
  try {
    const { data } = await axios.get(`/files-list${path}`);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// const saveDirectory = () => {
//   if (!sessionStorage.getItem('currentDirectory')) {
//     sessionStorage.setItem('currentDirectory', os.homedir());
//   }
// };

// const updateDirectory = ({ target }) => {
//   const path = sessionStorage.getItem('currentDirectory');
//   sessionStorage.setItem('currentDirectory', path + '/' + target.innerText);
// };

window.onload = () => {
  // saveDirectory();
  displayEntryList();
  displayCurrentDirectory();
};
