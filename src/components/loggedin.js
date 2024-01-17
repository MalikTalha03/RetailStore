
const checkToken = async () => {
  const url = 'http://localhost:3001/auth/login/'
  const token = localStorage.getItem('token');
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