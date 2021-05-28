import { action, makeAutoObservable, observable } from 'mobx';
import { message } from 'antd';
import axiosInstance from '@/common/axios';
import { AxiosResponse } from 'axios';
//
// class Auth {
//   token?: string;
//   id?: string;
//   pw?: string;
//   isAuth = false;
//
//   constructore() {
//     makeAutoObservable(this);
//     this.isAuth = false;
//   }
//
//   signIn = (_id: string, _pw: string) => {
//     console.log('mobx action signIn');
//     this.id = _id;
//     this.pw = _pw;
//     this.isAuth = true;
//   };
//
//   signOut = () => {
//     console.log('mobx action signOut');
//     this.token = undefined;
//     this.isAuth = false;
//   };
// }
//
// const auth = new Auth();
// export default auth;

const authObject = observable({
  token: '',
  email: '',
  name: '',
  guildCode: '',
  role: '',
  isAuth: false,

  async signIn(id: string, pw: string) {
    console.log(`mobx action signIn\nid: ${id}, pw: ${pw}`);

    const response = await axiosInstance.post('user/signIn', { email: id, password: pw }).catch((e) => {
      console.log('로그인 에러.1 아이디 또는 비밀번호 확인');
    });
    this.setAuthInfo(response, true);
  },

  async tokenRefresh(token: string) {
    if (!token) {
      return false;
    }
    console.log(`mobx action tokenRefresh\ntoken: ${token}\nisAuth: ${this.isAuth}`);
    // common/axios.ts 에서 axios 인스턴스 생성할 때 localStorage 에 token 이 있으면 header 에 authorization 으로 token 을 넣는다.
    const response = await axiosInstance.get('user/tokenRefresh').catch((e) => {
      console.log('로그인 에러. 아이디 또는 비밀번호 확인');
      return false;
    });

    this.setAuthInfo(response, false);
    return this.isAuth;
  },

  setAuthInfo(response: any, isSignIn: boolean) {
    if (response && response.data && response.data.data) {
      console.log('user/signIn33 >>', response.data);
      const data = response.data.data;
      localStorage.token = data.token;
      this.token = data.token;
      this.email = data.user.email;
      this.name = data.user.name;
      this.guildCode = data.user.guildCode;
      this.role = data.user.role;
      axiosInstance.defaults.headers.authorization = this.token;
      this.isAuth = true;
      if (isSignIn) {
        message.info('로그인 성공');
      }
    } else {
      this.isAuth = false;
    }
  },

  signOut() {
    console.log('mobx action signOut');
    this.isAuth = false;
    this.token = '';
    this.email = '';
    this.name = '';
    this.guildCode = '';
    this.role = '';
  },
});

export default authObject;
