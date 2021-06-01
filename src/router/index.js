import Vue from 'vue'
import VueRouter from 'vue-router'
import TableManager from '../views/TableManager'
import DiffManager from '../views/DiffManager'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'TableManager',
    component: TableManager
}, {
    path: '/diffs',
    name: 'DiffManager',
    component: DiffManager
}]

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

export default router