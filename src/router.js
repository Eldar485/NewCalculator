import config from './pages/config'
import {createRouter, createWebHashHistory} from "vue-router";
import Main from "./pages/Main";

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/config',
        component: config
    }
]

const router =  createRouter({
    routes,
    history: createWebHashHistory()
})
export default router