<template>
    <ContentField>
        我的Bot
    </ContentField>
</template>

<script>
import ContentField from '@/components/ContentField.vue'
// import $ from "jquery";
// import { useStore } from "vuex";


export default {
    components: {
        ContentField
    },
    setup() {
        // const store = useStore();
        // console.log(store.state.user);
        // let jwt_token = localStorage.getItem('jwt_token');

        // $.ajax({
        //     url: "http://127.0.0.1:8888/user/bot/add/",
        //     type: "post",
        //     data: JSON.stringify({
        //         title: "Bot的标题",
        //         description: "Bot的描述",
        //         content: "Bot的代码",
        //     }),
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: "Bearer " + jwt_token,
        //     },
        //     success(resp) {
        //         console.log(resp);
        //     },
        //     error(resp) {
        //         console.log(resp);
        //     },
        // });
    }
}
</script>

<style scoped>

</style>