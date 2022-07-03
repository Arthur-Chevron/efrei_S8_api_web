<template>
    <div class="home">
        <Menu class="home__menu" />

        <div class="home-sub-menu">
            <div class="home-sub-menu__arrow hover">
                <svg
                    v-on:click="$router.push({path: '/browser'})"
                    width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M10 20L11.7625 18.2375L4.7875 11.25L20 11.25V8.75L4.7875 8.75L11.7625 1.7625L10 3.8147e-06L3.8147e-06 10L10 20Z" fill="var(--black)"/>
                </svg>
            </div>
        </div>

        <div class="home-email__received">
            
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Mail",

        components: {
            Menu: () => import('../components/Menu.vue')
        },

        data: () => ({
            email: ""
        }),

        async created() {
            await this.getOneEmail(this.$route.query.id)
        }, 

        methods: {
            // getAllInformations about one email
            async getOneEmail(id) {
                try {  
                    const res = await axios.get(process.env.VUE_APP_URL_MAIL_API + '/mail/one?id=' + id)

                    const subject = res.data.data.data.payload.headers.find(a => a.name === "Subject") !== undefined ? res.data.data.data.payload.headers.find(a => a.name === "Subject").value.substr(0, 60) : ''
                    const subSnippet = res.data.data.data.snippet.substr(0, 50).length < 50 ? res.data.data.data.snippet.substr(0, 50) : res.data.data.data.snippet.substr(0, 50) + '..'
                    const from = res.data.data.data.payload.headers.find(a => a.name === "From") !== undefined ? res.data.data.data.payload.headers.find(a => a.name === "From").value.replace(/<\/?[^>]+(>|$)/g, "") : ''
                    
                    this.email = {
                        id: res.data.data.data.id,
                        unread: res.data.data.data.labelIds.includes('UNREAD'),
                        subject: subject,
                        from: from,
                        snippet: subSnippet,
                        date: res.data.data.data.payload.headers.find(a => a.name === "Received") !== undefined ? res.data.data.data.payload.headers.find(a => a.name === "Received").value.substr(80, 6) : '',
                    }

                } catch(err) {
                    console.log(err)
                }
            }
        }
    }

</script>

<style scoped>

.home__menu {
    position: fixed;
    top: 0;
    left: 0;
}

.home-sub-menu {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    background: white;
    position: fixed;
    top: 0;
    left: 0;

    padding: 0.75% 2%;
    width: 91%;
    margin-left: 5%;
}

.home-sub-menu__arrow {
    width: 3%;
}

.home-email__received {
    display: flex;
    flex-direction: column;
}

.home-email__one-email {
    display: flex;
    justify-content: space-between;
    align-items: center;

    background: white;
    border-bottom: 1px solid var(--grey);
    padding: 0.75% 2%;
    width: 91%;

    margin-left: 5%;
}

.home-email__one-email__p {
    text-align: left;
    font-size: 1vw;
    margin: 0;
}

.home-email__one-email__p:nth-child(1) {
    width: 20%;
    font-weight: 600;
}

.home-email__one-email__p:nth-child(2) {
    width: 35%;
    font-weight: 600;
}

.home-email__one-email__p:nth-child(3) {
    width: 40%;
}

.home-email__one-email__p:nth-child(4) {
    width: 5%;
}

.home-email__one-email-read {
    background: var(--light-grey);
}

.home-email__one-email-read .home-email__one-email__p {
    font-weight: normal;
}

.home-email__one-email__p-snippet {
    color: var(--grey);
}

</style>