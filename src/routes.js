import React from 'react'


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Channel = React.lazy(() => import('./views/tradersplusComponents/Channel'))
const AddChannel = React.lazy(() => import('./views/tradersplusComponents/AddChannel'))
const editChannel = React.lazy(() => import('./views/tradersplusComponents/editChannel'))
const Banners = React.lazy(() => import('./views/tradersplusComponents/Banner/Banners'))
const Banner = React.lazy(() => import('./views/tradersplusComponents/Banner/Banner'))
const AddBanner = React.lazy(() => import('./views/tradersplusComponents/Banner/AddBanner'))
const Users = React.lazy(() => import('./views/tradersplusComponents/Users/Users'))
const Messages = React.lazy(() => import('./views/tradersplusComponents/Messages/Messages'))
const Notification = React.lazy(() => import('./views/tradersplusComponents/Notifications/Notifications'))
const Plans = React.lazy(() => import('./views/tradersplusComponents/plans/Plans'))
const Plan = React.lazy(() => import('./views/tradersplusComponents/plans/Plan'))
const AddPlan = React.lazy(() => import('./views/tradersplusComponents/plans/AddPlan'))
const Services = React.lazy(() => import('./views/tradersplusComponents/Services/Services'))
const AddServices = React.lazy(() => import('./views/tradersplusComponents/Services/AddService'))
const Service = React.lazy(() => import('./views/tradersplusComponents/Services/Service'))
const Categories = React.lazy(() => import('./views/tradersplusComponents/Categories/Categories'))
const AddCategory = React.lazy(() => import('./views/tradersplusComponents/Categories/AddCategory'))
const NotificationsReport = React.lazy(() => import('./views/tradersplusComponents/NotificationsReport/NotificationsReport'));
const Setting = React.lazy(() => import('./views/tradersplusComponents/Setting/Setting'));
const Form = React.lazy(() => import('./views/tradersplusComponents/form/form'));
const UserByPhoneNumber = React.lazy(() => import('./views/tradersplusComponents/Users/UserByPhoneNumber'));
const Brokerages = React.lazy(() => import('./views/tradersplusComponents/Brokerages/brokerages'));
const Brokerage = React.lazy(() => import('./views/tradersplusComponents/Brokerages/brokerage'));
const AddBrokerage = React.lazy(() => import('./views/tradersplusComponents/Brokerages/addBrokerage'));
const WebNotification = React.lazy(() => import('./views/tradersplusComponents/Notifications/WebNotification'));
const WebLimitedNotification = React.lazy(() => import('./views/tradersplusComponents/Notifications/WebLimitedNotification'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'دشبورد', element: Dashboard },
  { path: '/channel/get', name: 'کانال ها', element: Channel },
  { path: '/channel/add', name: 'اضافه کردن کانال', element: AddChannel },
  { path: '/channel/edit', name: 'edit channel', element: editChannel },
  { path: '/banners', name: 'بنر ها', element: Banners },
  { path: '/banner/:id', exact:true , name: 'بنر', element: Banner },
  { path: '/addBanner', exact:true , name: 'اضافه کردن بنر', element: AddBanner },
  { path: '/users', exact:true , name: 'کاربران', element: Users },
  { path: '/messages/:id', exact:true , name: 'پیام ها', element: Messages },
  { path: '/notification/send', exact:true , name: 'ارسال اعلان جدید', element: Notification },
  { path: '/plans', exact:true , name: ' پلن ها', element: Plans },
  { path: '/plan/:id', exact:true , name: ' پلن', element: Plan },
  { path: '/addPlan', exact:true , name: 'ساخت پلن', element: AddPlan },
  { path: '/services', exact:true , name: ' سرویس ها', element: Services },
  { path: '/addService', exact:true , name: ' سرویس جدید', element: AddServices },
  { path: '/service/:id', exact:true , name: 'سرویس', element: Service },
  { path: '/addcategory', exact:true , name: 'ساخت دسته بندی جدید', element: AddCategory },
  { path: '/categories', exact:true , name: ' دسته بندی ها', element: Categories },
  { path: '/notificationsReport', exact:true , name: 'اعلان ها', element: NotificationsReport },
  { path: '/setting', exact:true , name: ' تنظیمات', element: Setting },
  { path: '/form', exact:true , name: ' فرم', element: Form },
  { path: '/userByPhoneNumber', exact:true , name: ' کاربر بر اساس شماره تماس', element: UserByPhoneNumber },
  { path: '/brokerages', exact:true , name: 'کارگزاری ها', element: Brokerages },
  { path: '/brokerages/:id', exact:true , name: 'کارگزاری ', element: Brokerage },
  { path: '/addBrokerage', exact:true , name: 'افزودن کارگزاری', element: AddBrokerage },
  { path: '/web-notification/send', exact:true , name: ' ارسال اعلان (وب)', element: WebNotification },
  { path: '/web-limited-notification/send', exact:true , name: 'ارسال اعلان محدود(وب)', element: WebLimitedNotification },
]

export default routes;
