//앱 내에서 다른 라우트로 이동 할 때에는, 일반 형식으로 하면 새로고침을 해버리기에 하면 안된다.
//새로고침을 하기 위해선, 리액트 라우터에 있는 Link 컴포넌트를 사용해야한다. 이 컴포넌트를 사용하면
//페이지를 새로 불러오는걸 막고, 원하는 라우트로 화면 전환을 해준다.
import {Home, Friend, ScheduleCalendar, Event, Money, VisitPage} from '../pages/index';
const Menu = [
    {
        path: "/main",
        name: "Home",
        component: Home,
        layout: true,
    },
    {
        path: "/friend",
        name: "Friend",
        component: Friend,
        layout: true,
    },
    {
        path: "/scheduleCalendar",
        name: "Calendar",
        component: ScheduleCalendar,
        layout: true,
    },
    {
        path: "/event",
        name: "Event",
        component: Event,
        layout: true,
    },
    {
        path: "/money",
        name: "Money",
        component: Money,
        layout: true,
    }
    // {
    //     path: "/visitPage",
    //     name: "visitPage",
    //     component: VisitPage,
    //     layout: false,
    // },
]



export default Menu;