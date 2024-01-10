import {createRouter, createWebHashHistory} from 'vue-router';

const routes = [
    {
        path: '/',
        redirect: 'home'
    },
    {
        name: 'home',
        path: '/home',
        component: () => import('./view/Home.vue'),
        meta: {
            title: '杭州小啄科技有限公司'
        }
    }
];

const router = createRouter({
    routes,
    history:createWebHashHistory()
});

router.beforeEach((to, from, next) => {
    const title = to.meta && to.meta.title;
    if (title) {
        document.title = title;
    }
    next();
});

export {router};