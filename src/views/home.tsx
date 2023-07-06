const pro = new Promise((resolve) => {
  setTimeout(() => {
    console.log('finish');
    resolve(true);
  });
});

export { pro };
