<template>
	<div class="bg" v-touch:swipe.bottom="swipeHandler">
		<div class="loading">
			<div class="tab">
				<div v-for="da in showData">
					<div>{{da}}</div>
				</div>
			</div>
			<div class="button">
				<img src="@/assets/select/换一换.png" @click="changeDataHandler" class="change" alt />
				<img src="@/assets/select/确定按钮.png" class="sure" @click="swipeTopHandler" />
			</div>
		</div>
	</div>
</template>

<script>
	import dataJson from '../utils/data.js'
	export default {
		data() {
			return {
				// 年代
				year: 80,
				data: dataJson,
				dataLength: 0,
				showData: [],
			}
		},
		watch: {
			showData(val){
				console.log(val)
			}
		},
		mounted() {
			this.showData = this.data.zeroZero[this.dataLength].data
		},
		methods: {
			swipeHandler() {
				this.$router.back();
			},
			swipeTopHandler() {
				this.$router.push("/transition");
			},
			changeDataHandler() {
				this.dataLength ++;
				if(this.dataLength > this.data.zeroZero.length-1){
					this.dataLength = 0;
				}
				this.showData = this.data.zeroZero[this.dataLength].data
			}
		}
	};
</script>

<style lang="scss" scoped>
	.bg {
		height: 100%;
		background-image: url("../assets/loading/BG.png");
		background-size: cover;
		background-repeat: no-repeat;
		background-position: 50% 50%;

		.loading {
			position: relative;
			margin: 0 auto;
			height: 100%;
			width: 90%;
			display: flex;
			justify-content: center;

			.tab {
				color: #fff;
				font-size: 14px;
				width: 100%;
				height: 400px;
				top: 80px;
				position: absolute;
				color: rgba(255, 255, 255, 0.8);
				line-height: 2;
				text-align: center;
			}

			.button {
				position: absolute;
				width: 100%;
				height: 160px;
				top: 560px;
				text-align: center;

				.change {
					position: absolute;
					width: 100px;
					left: 40px;
				}

				.sure {
					position: absolute;
					width: 100px;
					right: 40px;
				}
			}

		}
	}
</style>
