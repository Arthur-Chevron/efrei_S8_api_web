<template>
    <div class="home">
        <Menu class="home__menu" />

        <div class="home-sub-menu">
            <div class="home-sub-menu__arrow hover">
                <svg
                    v-on:click="indexPage -= 1; getAllEmail()"
                    width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M8.45399 14.0997L2.45399 8.09967L8.45392 2.09967C8.97741 1.57618 8.97759 1.51568 8.4541 0.992188C7.93061 0.468698 7.69224 0.468797 7.16875 0.992287L1.00768 7.15336C0.484186 7.67685 0.484186 8.52249 1.00768 9.04598L7.16875 15.2071C7.69224 15.7305 7.93049 16.1232 8.45399 15.5997C8.96405 15.0762 8.97748 14.6232 8.45399 14.0997Z" fill="var(--black)"/>
                </svg>

            </div>
            <div class="home-sub-menu__arrow hover">

                <svg
                    v-on:click="indexPage += 1; getAllEmail()"
                    width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M1.00793 2.34662L7.00793 8.34662L1.008 14.3466C0.484506 14.8701 0.484322 14.9306 1.00781 15.4541C1.5313 15.9776 1.76967 15.9775 2.29316 15.454L8.45424 9.29293C8.97773 8.76944 8.97773 7.9238 8.45424 7.40031L2.29316 1.23924C1.76967 0.715748 1.53142 0.32313 1.00793 0.84662C0.497862 1.37011 0.484439 1.82313 1.00793 2.34662Z" fill="var(--black)"/>
                </svg>
            </div>
        </div>

        <div class="home-email__received">
            <div
                class="home-email__one-email hover"
                v-for="mail of allEmailDisplay"
                :key="mail.id"
                v-bind:class="{'home-email__one-email-read': !mail.unread}"
                v-on:click="$router.push({path: '/mail?id=' + mail.id})"
            >
                <p class="home-email__one-email__p">{{ mail.from }}</p>
                <p class="home-email__one-email__p">{{ mail.subject }}</p>
                <p class="home-email__one-email__p home-email__one-email__p-snippet">{{ mail.snippet }}</p>
                <p class="home-email__one-email__p">{{ mail.date }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Home",

        components: {
            Menu: () => import('../components/Menu.vue')
        },

        data: () => ({
            allEmail: [],
            allEmailDisplay: [],
            nextPageToken: [''],
            indexPage: 0
        }),

        async created() {
            await this.getAllEmail()
        }, 

        methods: {
            // retrieve all email
            async getAllEmail() {
                // put in loading
                this.$emit('in-loading', true)

                try { 
                    if (this.indexPage < 0) this.indexPage = 0
                    // empty all array to have new values
                    this.allEmail.splice(0, this.allEmail.length)
                    this.allEmailDisplay.splice(0, this.allEmailDisplay.length)

                    const res = await axios.get(process.env.VUE_APP_URL_MAIL_API + '/mail?pageToken=' + this.nextPageToken[this.indexPage])

                    // empty all array to have new values
                    this.allEmail.splice(0, this.allEmail.length)
                    this.allEmailDisplay.splice(0, this.allEmailDisplay.length)

                    console.log(res.data.data.data.messages)

                    this.allEmail = res.data.data.data.messages
                    this.nextPageToken.push(res.data.data.data.nextPageToken)

                    for (const mail of this.allEmail) {
                        await this.getOneEmail(mail.id)
                    }

                } catch(err) {
                    console.log(err)
                }
                
                // put in loading
                this.$emit('in-loading', false)
            },
            

            // getAllInformations about one email
            async getOneEmail(id) {
                try {  
                    const res = await axios.get(process.env.VUE_APP_URL_MAIL_API + '/mail/one?id=' + id)

                    const subject = res.data.data.data.payload.headers.find(a => a.name === "Subject") !== undefined ? res.data.data.data.payload.headers.find(a => a.name === "Subject").value.substr(0, 60) : ''
                    const subSnippet = res.data.data.data.snippet.substr(0, 50).length < 50 ? res.data.data.data.snippet.substr(0, 50) : res.data.data.data.snippet.substr(0, 50) + '..'
                    const from = res.data.data.data.payload.headers.find(a => a.name === "From") !== undefined ? res.data.data.data.payload.headers.find(a => a.name === "From").value.replace(/<\/?[^>]+(>|$)/g, "") : ''
                    
                    this.allEmailDisplay.push({
                        id: res.data.data.data.id,
                        unread: res.data.data.data.labelIds.includes('UNREAD'),
                        subject: subject,
                        from: from,
                        snippet: subSnippet,
                        date: res.data.data.data.payload.headers.find(a => a.name === "Received") !== undefined ? res.data.data.data.payload.headers.find(a => a.name === "Received").value.substr(80, 6) : '',
                    })

                } catch(err) {
                    console.log(err)
                }
            }
        }
    }

</script>

<style scoped>

.home {
    padding: 2% 0;
}

.home__menu {
    position: fixed;
    top: 2%;
    left: 0;
}

.home-sub-menu {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    background: white;
    position: fixed;
    top: 0;
    left: 0;

    padding: 0.75% 2%;
    width: 93%;
    margin-left: 3%;
}

.home-sub-menu__arrow {
    width: 3%;
}

.home-email__received {
    display: flex;
    flex-direction: column;
    padding-top: 2%;
}

.home-email__one-email {
    display: flex;
    justify-content: space-between;
    align-items: center;

    background: white;
    border-bottom: 1px solid var(--grey);
    padding: 0.75% 2%;
    width: 93%;
    margin-left: 4%;
}

.home-email__one-email:hover {
    box-shadow: inset 1px 0 0 #dadce0,inset -1px 0 0 #dadce0,0 1px 2px 0 rgba(60,64,67,.3),0 1px 3px 1px rgba(60,64,67,.15);
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