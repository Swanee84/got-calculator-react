import { action, computed, makeAutoObservable, makeObservable, observable } from 'mobx';
import { message } from 'antd';
import axios from '@/common/axios';

class Auth {
  token = '';
  email = '';
  name = '';
  guildCode = '';
  role = '';
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
    // makeObservable(this, {
    //   email: observable,
    //   name: observable,
    //   guildCode: observable,
    //   role: observable,
    //   isAuth: observable,
    //   token: observable,
    //   signIn: action,
    //   signOut: action,
    //   tokenRefresh: action,
    //   userTitle: computed,
    // });
    this.isAuth = false;
  }

  public signIn = async (_id: string, _pw: string) => {
    console.log('mobx action signIn');

    const response = await axios.post('user/signIn', { email: _id, password: _pw }).catch((e) => {
      console.log('로그인 에러.1 아이디 또는 비밀번호 확인');
    });

    this.setAuthInfo(response, true);
  };

  public signOut = () => {
    console.log('mobx action signOut');
    this.isAuth = false;
    this.token = '';
    this.email = '';
    this.name = '';
    this.guildCode = '';
    this.role = '';

    delete localStorage.token;
  };

  public tokenRefresh = async (token: string) => {
    if (!token) {
      return false;
    }
    console.log(`mobx action tokenRefresh\ntoken: ${token}\nisAuth: ${this.isAuth}`);
    // common/axios.ts 에서 axios 인스턴스 생성할 때 localStorage 에 token 이 있으면 header 에 authorization 으로 token 을 넣는다.
    const response = await axios.get('user/tokenRefresh').catch((e) => {
      console.log('로그인 에러. 아이디 또는 비밀번호 확인 e:', e);
      return false;
    });

    this.setAuthInfo(response, false);
    return this.isAuth;
  };

  private setAuthInfo = (response: any, isSignIn: boolean) => {
    if (response && response.data && response.data.data) {
      console.log('user/signIn33 >>', response.data);
      const data = response.data.data;
      localStorage.token = data.token;
      this.token = data.token;
      this.email = data.user.email;
      this.name = data.user.name;
      this.guildCode = data.user.guildCode;
      this.role = data.user.role;
      axios.defaults.headers.authorization = this.token;
      this.isAuth = true;
      if (isSignIn) {
        message.info('로그인 성공');
      }
    } else {
      this.isAuth = false;
    }
  };

  get userTitle() {
    console.log('<<<< called userTitle >>>>');
    return `[${this.guildCode}] ${this.name}`;
  }
}

const auth = new Auth();
export default auth;

// const authObject = observable({
//   token: '',
//   email: '',
//   name: '',
//   guildCode: '',
//   role: '',
//   isAuth: false,
//
//   async signIn(id: string, pw: string) {
//     console.log(`mobx action signIn\nid: ${id}, pw: ${pw}`);
//
//     const response = await axiosInstance.post('user/signIn', { email: id, password: pw }).catch((e) => {
//       console.log('로그인 에러.1 아이디 또는 비밀번호 확인');
//     });
//     this.setAuthInfo(response, true);
//   },
//
//   async tokenRefresh(token: string) {
//     if (!token) {
//       return false;
//     }
//     console.log(`mobx action tokenRefresh\ntoken: ${token}\nisAuth: ${this.isAuth}`);
//     // common/axios.ts 에서 axios 인스턴스 생성할 때 localStorage 에 token 이 있으면 header 에 authorization 으로 token 을 넣는다.
//     const response = await axiosInstance.get('user/tokenRefresh').catch((e) => {
//       console.log('로그인 에러. 아이디 또는 비밀번호 확인');
//       return false;
//     });
//
//     this.setAuthInfo(response, false);
//     return this.isAuth;
//   },
//
//   setAuthInfo(response: any, isSignIn: boolean) {
//     if (response && response.data && response.data.data) {
//       console.log('user/signIn33 >>', response.data);
//       const data = response.data.data;
//       localStorage.token = data.token;
//       this.token = data.token;
//       this.email = data.user.email;
//       this.name = data.user.name;
//       this.guildCode = data.user.guildCode;
//       this.role = data.user.role;
//       axiosInstance.defaults.headers.authorization = this.token;
//       this.isAuth = true;
//       if (isSignIn) {
//         message.info('로그인 성공');
//       }
//     } else {
//       this.isAuth = false;
//     }
//   },
//
//   signOut() {
//     console.log('mobx action signOut');
//     this.isAuth = false;
//     this.token = '';
//     this.email = '';
//     this.name = '';
//     this.guildCode = '';
//     this.role = '';
//   },
// });
//
// export default authObject;
