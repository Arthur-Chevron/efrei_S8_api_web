<template>
    <div class="menu">
        <div class="menu__logo menu__logo-tasks hover"></div>
        <div class="menu__logo menu__logo-gmail hover"></div>
    </div>
</template>

<style scoped>

.menu {
    height: 100vh;
    width: 5%;
    padding: 50px 0;
    border-right: 1px solid var(--grey);
    background: white;
    z-index: 10;
}
.menu__logo {
    width: 25px;
    height: 25px;

    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;

    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10% auto;

    padding: 5px 0;
}
.menu__logo-tasks {
    background-image: url('https://www.gstatic.com/companion/icon_assets/tasks_2021_2x.png');
}

.menu__logo-gmail {
    background-image: url('https://logodownload.org/wp-content/uploads/2018/03/gmail-logo-16.png');
}

</style>