module.exports = {
  presets: [
    // 内置了一系列babel plugin去转化jsx代码成为我们想要的js代码
    [
      '@babel/preset-react',
      {
        runtime: 'automatic', // 自动导入 JSX 转换而来的函数,
      },
    ],
    // ts预制
    '@babel/preset-typescript',
    //将基础的ES6语法向下转译，兼容不同的浏览器
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: '3',
      },
    ],
  ],
};
