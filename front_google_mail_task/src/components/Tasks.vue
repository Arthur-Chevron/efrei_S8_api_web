<template>
    <transition name="tasks-transition">
        <div class="tasks" v-if="open">
            <img class="tasks__close hover" v-on:click="$emit('open-tasks', false)" alt="close croix" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA0CAYAAADBjcvWAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFySURBVHgB3drLbcJAFIXhn6QhOkopnFJYZpeUkHSTLhIsODJEvGzP417/0gDCXswn22MvDJdtydvNue8O4/cw3sjXMOdh7jv/8XK2cXP63pMLN8x1f/q9ubWTOMqzHDkfqWHo0c4iB24SyonYuFkoJ2LiFqGciIUrgnIiBq4oyom+uCooJ/rgqqKcaItrgnKiDa4pyom6uC4oJ+rguqKcKIsLgXKiDC4UyolluJAoJ+bhQqOcmIZLgXLiOVwqlBP3cSlRTlzHpUY5cYlbBcqJEbMalPtgRH2yks5PvxJPKCH6f02JFeBuLRQiMe7R6icS4p5d0kUi3NT7lEiAm3vzFYFxc1FOBMQtRTkRCFcK5UQAXGmUEx1xtVBOdMDVRjnRENcK5UQDXGuUExVxvVBOVMD1RjlREBcF5UQBXDSUEwtwUVFOzMBFRzkxAZcF5cQTuGwoJ+7gsqKcuILbkhvlxOjYvh4+fji+wPhNbtgXo+P9D2cUGOpKkW1CAAAAAElFTkSuQmCC"/>

            <p class="tasks__title">Tasks</p>

            <div class="tasks__all-choice">
                <div class="tasks__choice hover" v-on:click="openChoiceModal = true">
                    <p>{{ allTasks[allTasks.findIndex(a => a.id === idList)].title }}</p>
                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.0683 0.397167L5.64125 4.82419L1.21422 0.397216C0.827972 0.0109657 0.783332 0.0108301 0.397081 0.397081C0.0108302 0.783332 0.0109034 0.959211 0.397154 1.34546L4.94303 5.89134C5.32928 6.27759 5.95322 6.27759 6.33947 5.89134L10.8853 1.34546C11.2716 0.959211 11.5613 0.783418 11.175 0.397167C10.7888 0.02082 10.4545 0.0109161 10.0683 0.397167Z" fill="var(--grey-dark)"/>
                    </svg>
                </div>
                

                <div class="tasks__choice__modal" v-if="openChoiceModal">
                    <p
                        class="tasks__choice__modal__title hover"
                        v-for="list of allTasks"
                        :key="list.id"
                        v-on:click="idList = list.id; openChoiceModal = false"
                    >
                        {{ list.title }}
                    </p>

                    <p>Create a new list</p>
                    <input type="text" v-model="newList.title" placeholder="Title of your list"/>
                    <button v-on:click="insertAList">Create</button>
                </div>
            </div>
            

            <div class="tasks__all-task">
                <div class="tasks__all-task__one-task"
                    v-for="task of allTasks[allTasks.findIndex(a => a.id === idList)].allTasksOfAList"
                    :key="task.id"
                >
                    
                </div>
            </div>

        </div>
    </transition>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Tasks",

        props: {
            open: Boolean
        },

        data: () => ({
            allTasks: [
        {
            "kind": "tasks#taskList",
            "id": "MDEyMTQ4NjM5MTc3ODQ3OTYxMjQ6MDow",
            "etag": "\"LTEwNjEzMjQ5MTQ\"",
            "title": "Mes tâches",
            "updated": "2022-07-02T21:07:31.182Z",
            "selfLink": "https://www.googleapis.com/tasks/v1/users/@me/lists/MDEyMTQ4NjM5MTc3ODQ3OTYxMjQ6MDow",
            "allTasksOfAList": [
                {
                    "kind": "tasks#task",
                    "id": "R3kwUDVBamNGRFpWMkJnbg",
                    "etag": "\"LTEwNjE4MzU5NDI\"",
                    "title": "Flavien la pute",
                    "updated": "2022-07-02T20:59:00.000Z",
                    "selfLink": "https://www.googleapis.com/tasks/v1/lists/MDEyMTQ4NjM5MTc3ODQ3OTYxMjQ6MDow/tasks/R3kwUDVBamNGRFpWMkJnbg",
                    "position": "00000000000000000000",
                    "status": "needsAction",
                    "links": []
                },
                {
                    "kind": "tasks#task",
                    "id": "WVdzTGZyRzdUNWpMQTBFYQ",
                    "etag": "\"LTEwNjM3NDM3NzM\"",
                    "title": "Des barres",
                    "updated": "2022-07-02T20:27:12.000Z",
                    "selfLink": "https://www.googleapis.com/tasks/v1/lists/MDEyMTQ4NjM5MTc3ODQ3OTYxMjQ6MDow/tasks/WVdzTGZyRzdUNWpMQTBFYQ",
                    "position": "00000000000000000001",
                    "status": "needsAction",
                    "links": []
                },
                {
                    "kind": "tasks#task",
                    "id": "NEF3RWVZQkZ1TXN2Q0hWcw",
                    "etag": "\"LTEwNjM3NDk4OTE\"",
                    "title": "Undefined Title",
                    "updated": "2022-07-02T20:27:06.000Z",
                    "selfLink": "https://www.googleapis.com/tasks/v1/lists/MDEyMTQ4NjM5MTc3ODQ3OTYxMjQ6MDow/tasks/NEF3RWVZQkZ1TXN2Q0hWcw",
                    "position": "00000000000000000003",
                    "status": "needsAction",
                    "links": []
                },
                {
                    "kind": "tasks#task",
                    "id": "aHNKLWR5d29UNzFOYkQtRg",
                    "etag": "\"LTEwODc2MDk2MzU\"",
                    "title": "Create First Tasks For Api",
                    "updated": "2022-07-02T13:49:26.000Z",
                    "selfLink": "https://www.googleapis.com/tasks/v1/lists/MDEyMTQ4NjM5MTc3ODQ3OTYxMjQ6MDow/tasks/aHNKLWR5d29UNzFOYkQtRg",
                    "position": "00000000000000000002",
                    "status": "needsAction",
                    "due": "2022-07-02T00:00:00.000Z",
                    "links": []
                }
            ]
        },

        {
            "kind": "tasks#taskList",
            "id": "MDEyMTQ4NjM5MTc3ODQ3OTYxMjQ6MDowdddd",
            "etag": "\"LTEwNjEzMjQ5MTQ\"",
            "title": "Mes tâches 2",
            "updated": "2022-07-02T21:07:31.182Z",
            "selfLink": "https://www.googleapis.com/tasks/v1/users/@me/lists/MDEyMTQ4NjM5MTc3ODQ3OTYxMjQ6MDow",
            "allTasksOfAList": [
                {
                    "kind": "tasks#task",
                    "id": "R3kwUDVBamNGRFpWMkJnbg",
                    "etag": "\"LTEwNjE4MzU5NDI\"",
                    "title": "Flavien la pute 2",
                    "updated": "2022-07-02T20:59:00.000Z",
                    "selfLink": "https://www.googleapis.com/tasks/v1/lists/MDEyMTQ4NjM5MTc3ODQ3OTYxMjQ6MDow/tasks/R3kwUDVBamNGRFpWMkJnbg",
                    "position": "00000000000000000000",
                    "status": "needsAction",
                    "links": []
                },
                {
                    "kind": "tasks#task",
                    "id": "WVdzTGZyRzdUNWpMQTBFYQ",
                    "etag": "\"LTEwNjM3NDM3NzM\"",
                    "title": "Des barres",
                    "updated": "2022-07-02T20:27:12.000Z",
                    "selfLink": "https://www.googleapis.com/tasks/v1/lists/MDEyMTQ4NjM5MTc3ODQ3OTYxMjQ6MDow/tasks/WVdzTGZyRzdUNWpMQTBFYQ",
                    "position": "00000000000000000001",
                    "status": "needsAction",
                    "links": []
                },
                {
                    "kind": "tasks#task",
                    "id": "NEF3RWVZQkZ1TXN2Q0hWcw",
                    "etag": "\"LTEwNjM3NDk4OTE\"",
                    "title": "Undefined Title",
                    "updated": "2022-07-02T20:27:06.000Z",
                    "selfLink": "https://www.googleapis.com/tasks/v1/lists/MDEyMTQ4NjM5MTc3ODQ3OTYxMjQ6MDow/tasks/NEF3RWVZQkZ1TXN2Q0hWcw",
                    "position": "00000000000000000003",
                    "status": "needsAction",
                    "links": []
                },
                {
                    "kind": "tasks#task",
                    "id": "aHNKLWR5d29UNzFOYkQtRg",
                    "etag": "\"LTEwODc2MDk2MzU\"",
                    "title": "Create First Tasks For Api",
                    "updated": "2022-07-02T13:49:26.000Z",
                    "selfLink": "https://www.googleapis.com/tasks/v1/lists/MDEyMTQ4NjM5MTc3ODQ3OTYxMjQ6MDow/tasks/aHNKLWR5d29UNzFOYkQtRg",
                    "position": "00000000000000000002",
                    "status": "needsAction",
                    "due": "2022-07-02T00:00:00.000Z",
                    "links": []
                }
            ]
        }

    ],
            idList: 'MDEyMTQ4NjM5MTc3ODQ3OTYxMjQ6MDow',
            openChoiceModal: false,
            newList: {
                title: ''
            }
        }),

        async created() {
            await this.getAllTasks()
        },

        methods: {
            async getAllTasks() {
                try {

                    const res = await axios.get(process.env.VUE_APP_URL_TASK_API + '/tasks')

                    this.allTasks.splice(0, this.allTasks.length)

                    this.allTasks = res.data.data
                    this.idList = this.allTasks[0].id

                } catch(err) {
                    console.log(err)
                }
            },

            // create a new List of tasks
            async insertAList() {
                try {

                    const res = await axios.post(process.env.VUE_APP_URL_TASK_API + '/tasks/list', {title: this.newList.title})

                    res.data.data.allTasksOfAList = []
                    this.allTasks.push(res.data.data)
                    this.idList = res.data.data.id
                    this.openChoiceModal = false
                    this.newList.title = ''

                } catch(err) {
                    console.log(err)
                }
            }
        }
    }
</script>

<style scoped>

    .tasks-transition-enter-active {
        animation: left-to-right 0.1s ease-in;
    }

    @keyframes left-to-right {
        0% {
            transform: translateX(-50px);
        }
        100% {
            transform: translateX(0);
        }
    }

    .tasks {
        position: fixed;
        top: 0;
        left: 0;
        background: white;
        width: 16%;
        height: 100vh;
        padding: 0 2%;
        overflow-y: scroll;
        z-index: 20;
        box-shadow: 0px 4px 5px 0px rgba(0,0,0,.14),0px 1px 10px 0px rgba(0,0,0,.12),0px 2px 4px -1px rgba(0,0,0,.2);
    }

    .tasks__close {
        position: absolute;
        top: 2%;
        right: 5%;
        width: 6%;
    }

    .tasks__title {
        font-size: 0.9vw;
        color: var(--grey-dark);
        text-transform: uppercase;
        text-align: left;
    }

    .tasks__all-choice {
        position: relative;
    }

    .tasks__choice {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .tasks__choice__modal {
        position: absolute;
        top: 100%;
        left: 0;
        margin-top: 1%;
        background: white;
        padding: 2% 0;
        border-radius: 5px;
        box-shadow: 0px 4px 5px 0px rgba(0,0,0,.14),0px 1px 10px 0px rgba(0,0,0,.12),0px 2px 4px -1px rgba(0,0,0,.2);
        width: 100%;
    }

    .tasks__choice__modal__title {
        padding: 1% 5%;
        text-align: left;
    }

    .tasks__choice__modal__title:nth-last-child(1) {
        border-bottom: 1px solid var(--grey-dark);
    }

    

    .tasks__choice__modal__title:hover {
        background: var(--grey);
    }

    input {
        width: 96%;
        padding: 1% 2%;
        border: none;
        border-bottom: 1px solid var(--grey-dark);
    }
    
</style>