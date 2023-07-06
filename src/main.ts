import './scss/base';
import { a } from '@/views/home';
console.log(a);

const asyncRegister = async () => {
  const app = document.getElementById('app');
  if (app) {
    app.innerText = 'hello world';
  }
};
asyncRegister();
