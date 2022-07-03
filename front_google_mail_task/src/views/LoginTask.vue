<template></template>

<script>
    import axios from 'axios'

    export default {
        name: "LoginTask",

        async created() {
            await this.login()
        },

        methods: {
            async login() {
                try {

                    const res = await axios.get(process.env.VUE_APP_URL_TASK_API + '/auth')

                    window.open(res.data.url, '_self')

                } catch(err) {
                    return console.log(err)
                }
             }
        }
    }
</script>