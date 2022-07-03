import Vue from "vue"
import Router from "vue-router"
Vue.use(Router)

const VueLogin = () => import("./views/Login")
const VueHome = () => import("./views/Home")
const VueMail = () => import("./views/Mail")
const Vue404 = () => import("./views/Error404")

// attribution des paths
const Login = { path: '/', name: 'Login', component: VueLogin }
const Home = { path: '/browser', name: 'Home', component: VueHome }
const Mail = { path: '/mail', name: 'Mail', component: VueMail }
const Error = { path: '/:catchAll(.*)', name: "ErrorPage", component: Vue404}


// 1. Définition des routes
const routes = [
    Login,
    Home,
    Mail,
    /* always at the end */
    Error
]

export default new Router({
    mode: "history",
    routes,
    scrollBehavior (){return { x: 0, y: 0 }}
})