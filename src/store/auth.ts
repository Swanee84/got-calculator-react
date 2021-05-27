import { action, makeAutoObservable, observable } from 'mobx';
import axiosInstance from '@/common/axios';
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
      console.log('로그인 에러. 아이디 또는 비밀번호 확인');
    });
    if (response) {
      console.log('user/signIn >>', response.data);
      const data = response.data.data;
      this.token = data.token;
      this.email = data.user.email;
      this.name = data.user.name;
      this.guildCode = data.user.guildCode;
      this.role = data.user.role;
      axiosInstance.defaults.headers.Authorization = this.token;
      this.isAuth = true;
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
