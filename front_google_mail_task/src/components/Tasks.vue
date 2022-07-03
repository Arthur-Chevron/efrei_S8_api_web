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
                        {{ list.title }}
                    </p>

                    <p class="tasks__choice__modal__info">Create a new list</p>
                    <input type="text" v-model="newList.title" placeholder="Title of your list"/>
                    <button class="tasks__choice__modal__button" v-on:click="insertAList">Create</button>
                </div>
            </div>


            <div class="tasks__add-task">
                <div class="tasks__add-task_modal" v-if="openNewTask">
                    <p class="tasks__add-task__modal__info">Add a task</p>
                    <input type="text" v-model="newTask.title" placeholder="Title of your list"/>
                    <input type="text" v-model="newTask.notes" placeholder="Notes of your list"/>
                    <button class="tasks__choice__modal__button" v-on:click="insertATask">Add</button>
                </div>

                <div class="tasks__button-add hover" v-on:click="openNewTask = true">
                    <div class="tasks_button-add__icon"></div>
                    <p class="tasks_button-add__p">Add a task</p>
                </div>
            </div>
            
            

            <div class="tasks__all-task">
                <div class="tasks__all-task__one-task"
                    v-for="task of allTasks[allTasks.findIndex(a => a.id === idList)].allTasksOfAList"
                    :key="task.id"
                >
                    <div
                        class="tasks__all-task__one-task__icon hover"
                        v-on:click="deleteATask(task.id)"
                    ></div>
                    <p class="tasks__all-task__one-task__p">{{ task.title }}</p>
                </div>
            </div>

            <div class="tasks__button-add hover" v-on:click="deleteAListOfTasks">
                <svg class="tasks_button-delete__icon" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.54547 7.75L10.9492 5.34625L11.4449 4.85055C11.518 4.77742 11.518 4.65859 11.4449 4.58547L10.9145 4.05508C10.8414 3.98195 10.7226 3.98195 10.6495 4.05508L7.75 6.95453L4.85055 4.05484C4.77742 3.98172 4.65859 3.98172 4.58547 4.05484L4.05484 4.58523C3.98172 4.65836 3.98172 4.77719 4.05484 4.85031L6.95453 7.75L4.05484 10.6495C3.98172 10.7226 3.98172 10.8414 4.05484 10.9145L4.58523 11.4449C4.65836 11.518 4.77719 11.518 4.85031 11.4449L7.75 8.54547L10.1537 10.9492L10.6495 11.4449C10.7226 11.518 10.8414 11.518 10.9145 11.4449L11.4449 10.9145C11.518 10.8414 11.518 10.7226 11.4449 10.6495L8.54547 7.75Z" fill="#D93025"/>
                    <circle cx="7.5" cy="7.5" r="7" stroke="#DB4446"/>
                </svg>

                <p class="tasks_button-delete__p">Delete the list</p>
            </div>
        </div>
    </transition>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Tasks",

        props: {
            open: Boolean,
            loading: Boolean
        },

        data: () => ({
            allTasks: [],
            idList: 'MDEyMTQ4NjM5MTc3ODQ3OTYxMjQ6MDow',
            openChoiceModal: false,
            openNewTask: false,
            newList: {
                title: ''
            },
            newTask: {
                title: '',
                notes: ''
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

                    if (err.code === 'ERR_NETWORK') return this.$router.go()
                    else return this.$router.push({path: '/'})
                }
            },

            // create a new task 
            async insertATask() {
                try {
                    this.openChoiceModal = false

                    const res = await axios.post(process.env.VUE_APP_URL_TASK_API + '/tasks',
                        {
                            title: this.newTask.title,
                            notes: this.newTask.notes,
                            idListTasks: this.idList
                        }
                    )

                    this.allTasks[this.allTasks.findIndex(a => a.id === this.idList)].allTasksOfAList.push(res.data.data)
                    
                    this.openNewTask = false
                    this.newTask.title = ''
                    this.newTask.notes = ''

                } catch(err) {
                    console.log(err)
                }
            },

            // create a new List of tasks
            async insertAList() {
                try {
                    this.openNewTask = false

                    const res = await axios.post(process.env.VUE_APP_URL_TASK_API + '/tasks/list', {title: this.newList.title})

                    res.data.data.allTasksOfAList = []
                    this.allTasks.push(res.data.data)
                    this.idList = res.data.data.id
                    this.openChoiceModal = false
                    this.newList.title = ''

                } catch(err) {
                    console.log(err)
                }
            },

            // finish a task
            async deleteATask(idTask) {
                try {
                    await axios.delete(process.env.VUE_APP_URL_TASK_API + '/tasks?idListTasks=' + this.idList + '&idTask=' + idTask)
                    // delete in the array
                    const indexIdTask = this.allTasks[this.allTasks.findIndex(a => a.id === this.idList)].allTasksOfAList.findIndex(b => b.id === idTask)
                    this.allTasks[this.allTasks.findIndex(a => a.id === this.idList)].allTasksOfAList.splice(indexIdTask, 1)

                } catch(err) {
                    console.log(err)
                }
            },

            // delete a all list
            async deleteAListOfTasks() {
                try {
                    await axios.delete(process.env.VUE_APP_URL_TASK_API + '/tasks/list?idListTasks=' + this.idList)
                    // delete in the array
                    const indexIdList = this.allTasks.findIndex(b => b.id === this.idList)
                    this.idList = indexIdList === 0 ? this.allTasks[1].id : this.allTasks[0].id
                    this.allTasks.splice(indexIdList, 1)
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

    .tasks__all-choice, .tasks__add-task {
        position: relative;
    }

    .tasks__choice {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .tasks__choice__modal, .tasks__add-task_modal {
        position: absolute;
        top: 100%;
        left: 0;
        margin-top: 1%;
        background: white;
        padding: 2% 0;
        border-radius: 5px;
        box-shadow: 0px 4px 5px 0px rgba(0,0,0,.14),0px 1px 10px 0px rgba(0,0,0,.12),0px 2px 4px -1px rgba(0,0,0,.2);
        width: 100%;
        z-index: 30;
    }

    .tasks__choice__modal__title {
        padding: 1% 5%;
        text-align: left;
    }

    .tasks__choice__modal__info {
        border-top: 1px solid var(--grey-dark);
        padding-top: 2%;
        padding-left: 5%;
        font-size: 1vw;
        color: var(--grey-dark);
        text-align: left;
    }

    .tasks__add-task__modal__info {
        padding-top: 2%;
        padding-left: 5%;
        font-size: 1vw;
        color: var(--grey-dark);
        text-align: left;
    }

    .tasks__choice__modal__title:hover {
        background: var(--grey);
    }

    input {
        width: 90%;
        padding: 1% 2%;
        border: none;
        border-bottom: 1px solid var(--grey-dark);
    }
    

    .tasks__choice__modal__button {
        border: 1px solid var(--light-grey);
        color: var(--blue-google);
        background: white;
        border-radius: 5px;
        margin: 3% 0;

        font-size: 1vw;
        font-weight: 500;
        letter-spacing: .1px;
        line-height: 24px;
        align-items: center;
        appearance: none;
        -webkit-appearance: none;
        background-color: #1a73e8;
        border: 1px solid transparent;
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
        display: inline-flex;
        justify-content: center;
        padding: 6px 24px 6px;
        text-decoration: none;
        text-rendering: optimizeLegibility;
    }

    .tasks__button-add, .tasks__all-task__one-task {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 3% 5%;
    }

    .tasks_button-add__icon {
        background-size: contain;
        -moz-box-flex: none;
        flex: none;
        font-size: 24px;
        height: 20px;
        margin: 0 16px 0 8px;
        padding: auto;
        text-align: center;
        width: 20px;
        background-image: url('https://www.gstatic.com/tasks/task-add-accent-light.svg');
    }

    .tasks_button-add__p {
        color: var(--blue-google);
        font-weight: 500;
    }

    .tasks__all-task__one-task__icon {
        background-size: contain;
        -moz-box-flex: none;
        flex: none;
        font-size: 24px;
        height: 15px;
        margin: 0 16px 0 8px;
        padding: auto;
        text-align: center;
        width: 15px;
        border: 1px solid var(--grey-dark);
        border-radius: 50%;
    }

    .tasks__all-task__one-task__p {
        text-align: left;
        margin: 0;
    }

    .tasks_button-delete__p {
        color: var(--red-google);
        font-weight: 500;
    }

    .tasks_button-delete__icon {
        margin: 0 16px 0 8px;
    }
</style>