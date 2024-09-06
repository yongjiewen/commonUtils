module.exports = {
  title: "js工具库",
  base: "/",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    // logo: '/commonUtils/image.png',
    nav: [
      {
        text: "首页",
        link: "/"
      },
      {
        text: "文档",
        link: "/docsFile/start"
      },
      {
        text: "Github",
        link: "https://github.com/yongjiewen/commonUtils"
      }
    ],
    sidebar: {
      '/docsFile/': [
        // {
        //   title: "开始",
        //   children: ["/docsFile/start",'/docsFile/store'],
        //   // initialOpenGroupIndex: 1
        // }
        "/docsFile/start",
        '/docsFile/store',
        '/docsFile/time',
        '/docsFile/dom',
      ]
    }
  }
};
