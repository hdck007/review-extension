import baseUrl from './modules/constants';
import createTheReactInstance from './modules/scripts/createReactInstance';

window.onload = async () => {
  const currentUrl = new URL(window.location.href);
  let urlId;
  let roomId;
  if (
    currentUrl.searchParams.get('url') &&
    currentUrl.searchParams.get('url') === 'new'
  ) {
    try {
      console.log(
        currentUrl.href.replace(currentUrl.search, '').replace(/\/$/, '')
      );
      await fetch('https://review-backend-production.up.railway.app/website/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: currentUrl.href
            .replace(currentUrl.search, '')
            .replace(/\/$/, ''),
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('There was an error recording the url');
        })
        .then(async (data) => {
          urlId = data.id;
        });
      await fetch(
        'https://review-backend-production.up.railway.app/room/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('There was an error creating the room');
        })
        .then(async (data) => {
          roomId = data.id;
        });
      createTheReactInstance(
        urlId,
        roomId,
        currentUrl.href.replace(currentUrl.search, '').replace(/\/$/, '')
      );
    } catch (error) {
      alert('An error occured.');
    }
  } else if (
    currentUrl.searchParams.get('url_id') &&
    currentUrl.searchParams.get('room_id')
  ) {
    urlId = currentUrl.searchParams.get('url_id');
    roomId = currentUrl.searchParams.get('room_id');
    createTheReactInstance(
      urlId,
      roomId,
      currentUrl.href.replace(currentUrl.search, '').replace(/\/$/, '')
    );
  }
};
