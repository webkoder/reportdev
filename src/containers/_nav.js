import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Items',
    to: '/items',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Sites',
    to: '/sites',
    icon: 'cil-laptop',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Campanhas',
    to: '/campanhas',
    icon: 'cil-laptop',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Devs']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Ricardo',
    to: '/devs/ricardo',
    icon: 'cil-user',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Marcos',
    to: '/devs/marcos',
    icon: 'cil-user',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Config']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Itens do mês',
    to: '/itensdomes',
    icon: 'cil-check',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Constantes',
    to: '/constantes',
    icon: 'cil-layers',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Instruções',
    to: '/instrucoes',
    icon: 'cil-file',
  }
]

export default _nav
