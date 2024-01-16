
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
  if (response.status !== 200) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
};

export default checkToken;