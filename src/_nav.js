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
      {
        component: 'CNavItem',
        name: 'Pemasukan Hasil Prod.',
        to: '/report/beacukai/pemasukanHP',
      },
      {
        component: 'CNavItem',
        name: 'Pengeluaran Hasil Prod.',
        to: '/report/beacukai/pengeluaranHP',
      },
      {
        component: 'CNavItem',
        name: 'Mutasi Bahan Baku',
        to: '/report/beacukai/mutasiBB',
      },
      {
        component: 'CNavItem',
        name: 'Mutasi Hasil Produksi',
        to: '/report/beacukai/mutasiHP',
      },
      {
        component: 'CNavItem',
        name: 'Penyelesaian Waste',
        to: '/report/beacukai/waste',
      },
    ],
  },
]
