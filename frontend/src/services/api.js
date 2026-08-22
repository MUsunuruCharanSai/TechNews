const API_URL = import.meta.env.VITE_API_URL || '/api';

// get token from storage
const getToken = () => localStorage.getItem('token');

// fetch helper
const request = async (url, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${url}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

export const authAPI = {
  login: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
};

export const articleAPI = {
  getAll: () => request('/articles'),
  getOne: (id) => request(`/articles/${id}`),
  create: (body) =>
    request('/articles', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) =>
    request(`/articles/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  remove: (id) => request(`/articles/${id}`, { method: 'DELETE' }),
};

export const saveAuth = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isLoggedIn = () => !!getToken();
