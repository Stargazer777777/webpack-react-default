import './scss/base';

const asyncRegister = async () => {
  const app = document.getElementById('app');
  if (app) {
    app.innerText = 'hello world';
  }
};
asyncRegister();
