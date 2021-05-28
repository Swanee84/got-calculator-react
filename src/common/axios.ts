import axios from 'axios';

const url = 'http://localhost:3000/api/';

const axiosInstance = axios.create({
  baseURL: url,
});

if (localStorage.token) {
  axiosInstance.defaults.headers.authorization = localStorage.token;
}

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status, data } = error.response;
    if (status === 401 || status === 403) {
      // 401 은 토큰이 없는 상태, 403 은 토큰 만료, 혹은 디코드 에러. 로그인 화면으로 이동시킨다.
      alert(`[${status}]\n${data.message}`);
    } else if (data.status === 400) {
      alert(`[${data.status}]\n입력 항목을 확인해주세요.`);
    } else if (data.success === false) {
      alert(`[${data.status}]\n[${data.message}]`);
    } else {
      alert(`[${status}]\n${data.message}`);
      return error.response;
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
