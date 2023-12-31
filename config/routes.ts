export default [
  {
    name: '登录',
    path: '/user',
    layout: false,
    routes: [{ path: '/user/login', component: './User/Login' }],
  },
  {
    name: '注册',
    path: '/user',
    layout: false,
    routes: [{ path: '/user/register', component: './User/Register' }],
  },
  { name: '欢迎页面', path: '/welcome', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    name: '管理员页面',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', component: './Admin' },
    ],
  },
  { icon: 'robot', path: '/add_chart', component: './Chart/addChart', name: '图表生成(同步)' },
  {
    icon: 'robot',
    path: '/add_chart_async',
    component: './Chart/addChartAsync',
    name: '图表生成(异步)',
  },
  { icon: 'pieChart', path: '/chart', component: './Chart/myChart', name: '图表页' },
  {
    icon: 'pieChart',
    path: '/chartDetail/:id',
    component: './Chart/myChartDetail',
    name: '图表详情',
    hideInMenu: true,
  },
  { name: '个人信息', path: '/user/manager', icon: 'user', component: './User/Manager' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
