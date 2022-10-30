chrome.storage.local.get(['rooms'], async (result) => {
  if (JSON.stringify(result) === '{}') {
    await fetch('http://localhost:8000/room/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log('the data', data);
        await chrome.storage.local.set({ rooms: [data] });
      });
  }
  const room = await chrome.storage.local.get(['rooms']);
  console.log(room);
});
