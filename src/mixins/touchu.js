export default {
    data() {
        return {
            startX: 0,
            endX: 0
        }
    },
    methods: {
        start(e) {
            this.startX = e.changedTouches[0].screenY;
            // console.log('开始', e)
        },
        swipeHandler(e) {
            // console.log(e)
            this.endX = e.changedTouches[0].screenY;
            if (this.startX - this.endX > 0) {
                this.goPage()
            }
        },
        goPage() {

        }
    }
}