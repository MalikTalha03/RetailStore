
const checkToken = async () => {
  const url = process.env.REACT_APP_API_URL + 'auth/login/'
  const token = localStorage.getItem('token');
  if (token === null) {
    window.location.href = '/login';
    return false;
  }
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  const response = await data.json();
  if (response.status === 200 || response.message === 'JWT OK') {
    return true;
  }
  else {
    window.location.href = '/login';
    localStorage.removeItem('token');
    return false;
  }
};

export default checkToken;