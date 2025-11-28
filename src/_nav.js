import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'دشبورد',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavGroup,
    name: 'کاربران',
    to: '/users',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'کاربران',
        to: '/users',
      },
      {
        component: CNavItem,
        name: 'کاربر',
        to: '/userByPhoneNumber',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'کارگزاری ها',
    to: '/brokerages',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'کارگزاری ها',
        to: '/brokerages',
      },
      {
        component: CNavItem,
        name: 'ساخت کارگزاری جدید',
        to: '/addBrokerage',
      },
    ],
  },
  // {
  //   component: CNavGroup,
  //   name: 'admin',
  //   to: '/admin',
  //   icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'send notif',
  //       to: '/admin/sendnotification',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'mute channel notif',
  //       to: '/admin/muteChannel',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'delete channel',
  //       to: '/admin/delete',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'get user report',
  //       to: '/admin/userreport',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'delete plan',
  //       to: '/admin/deleteplan',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'get user info',
  //       to: '/admin/getuserinfo',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'active Plan For User',
  //       to: '/admin/activeplanforuser',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'send notif by count',
  //       to: '/admin/sendnotifbycount',
  //     },
  //   ],
  // },

  {
    component: CNavGroup,
    name: 'کانال ها',
    to: '/channel',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'کانال ها',
        to: '/channel/get',
      },
      {
        component: CNavItem,
        name: 'ساخت کانال',
        to: '/channel/add',
      },
   
    ],
  },
  {
    component: CNavGroup,
    name: 'دسته بندی ها',
    to: '/category',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'دسته بندی ها',
        to: '/categories',
      },
      {
        component: CNavItem,
        name: 'ساخت دسته بندی جدید',
        to: '/addcategory',
      },
    ],
  },
  // {
  //   component: CNavGroup,
  //   name: 'messages',
  //   to: '/message',
  //   icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'messages',
  //       to: '/channel/getmessages',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'send message',
  //       to: '/channel/sendMessage',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'delete message',
  //       to: '/channel/deletemessage',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'like message',
  //       to: '/channel/likemessage',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'edit message',
  //       to: '/channel/editmessage',
  //     },
  //   ],
  // },
  {
    component: CNavGroup,
    name: 'بنر ها',
    // to: '/banner',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'بنر ها',
        to: '/banners',
      },
      {
        component: CNavItem,
        name: 'ساخت بنر',
        to: '/addBanner',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'پلن ها',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'پلن ها',
        to: '/plans',
      },
      {
        component: CNavItem,
        name: 'ساخت پلن جدید',
        to: '/addplan',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'سرویس ها',
    to: '/services',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'سرویس ها',
        to: '/services',
      },
      {
        component: CNavItem,
        name: 'ساخت سرویس',
        to: '/addService',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'اعلان ها',
    to: '/notification',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'ارسال اعلان (اندروید)',
        to: '/notification/send',
      },
      {
        component: CNavItem,
        name: 'ارسال اعلان (وب)',
        to: '/web-notification/send',
      },
      {
        component: CNavItem,
        name: 'ارسال اعلان محدود (وب)',
        to: '/web-limited-notification/send',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'فرم',
    to: '/form',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'فرم',
        to: '/form',
      },
    ],
  },

]

export default _nav
