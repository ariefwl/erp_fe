export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
      text: 'NEW',
    },
  },
  {
    component: 'CNavTitle',
    name: 'Report',
  },
  {
    component: 'CNavGroup',
    name: 'Inv. Report BC',
    to: '/report/beacukai',
    icon: 'cil-puzzle',
    items: [
      {
        component: 'CNavItem',
        name: 'Pemasukan Bahan Baku',
        to: '/report/beacukai/pemasukanBB',
      },
      {
        component: 'CNavItem',
        name: 'Pemakaian Bahan Baku',
        to: '/report/beacukai/pemakaianBB',
      },
    ],
  },
]
