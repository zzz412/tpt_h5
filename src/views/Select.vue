<template>
	<div class="bg" v-touch:swipe.bottom="swipeHandler">
		<div class="loading">
			<div class="rain one" style="left: 2%;"></div>
			<div class="rain three" style="left: 10%;"></div>
			<div class="rain two" style="left: 25%;"></div>
			<div class="rain five" style="left: 45%;"></div>
			<div class="rain three" style="left: 58%;"></div>
			<div class="rain four" style="left: 72%;"></div>
			<div class="rain two" style="left: 88%;"></div>
			<div class="rain five" style="left: 96%;"></div>
			<div class="tab">
				<div class="tag tag-default" :class="[
				isFx(index)?'tag-fx2':'tag-fx1',
				{
				'tag-check':da.check,
				'tag-default':da.color === 0,
				'tag-dark':da.color === 1,
				'tag-light':!da.check
				}
			]"
				 v-for="(da,index) in showData" :key="index" @click="tagChecked(index)">{{da.txt}}</div>
				<!-- <div v-for="da in showData">
					<div>{{da}}</div>
        </div>-->
				<!-- <img class="toast-bg" src="http://cdn.hwzhj.top/选择提示.png" alt /> -->
				<img class="toast-bg" src="http://cdn.hwzhj.top/_编组_.png" alt />

			</div>

			<div class="statistics">
				已选择 {{selectedData.length}} / 5
			</div>
			<div class="button">
				<img src="http://cdn.hwzhj.top/换一换.png" @click="changeDataHandler" class="change" alt />
				<img src="http://cdn.hwzhj.top/确定按钮.png" class="sure" @click="swipeTopHandler" />
			</div>
		</div>
	</div>
</template>

<script>
	import {
		Picker,
		Popup,
		Toast
	} from "vant";
	import {
		mapMutations,
		mapState
	} from "vuex";
	import dataJson from "../utils/data.js";
	export default {
		data() {
			return {
				data: dataJson,
				dataLength: 0,
				showData: []
			};
		},
		computed: {
			...mapState(["userInfo", "selectedData"]),
			originData() {
				return this.data[
					Object.keys(this.data).find(item =>
						item.includes(this.userInfo.userYear)
					)
				];
			}
		},
		mounted() {
			this.creatData();
			for (let i = 0, len = this.showData.length; i < len; i++) {
				const isHas = this.selectedData.find(item => {
					return item == this.showData[i].txt;
				});
				if (isHas) {
					this.showData[i].check = true;
				}
			}
		},
		methods: {
			...mapMutations(["changeSelectedData"]),
			isFx(index) {
				if (index == 0) return true;
				if (index % 3 == 0) return true;
				return false;
			},
			// 选择标签
			tagChecked(index) {
				if (this.showData[index].check) {
					this.showData[index].check = !this.showData[index].check;
					const data = this.selectedData.findIndex(item => {
						return item == this.showData[index].txt
					})
					if (data != -1) {
						this.selectedData.splice(data, 1);
						this.changeSelectedData(this.selectedData);
					}

				} else {
					if (this.selectedData.length > 4) {
						Toast("最多选择5个");
						return;
					}
					this.showData[index].check = !this.showData[index].check;
					this.selectedData.push(this.showData[index].txt);
					this.changeSelectedData(this.selectedData);
				}
			},
			swipeHandler() {
				//   this.$router.back();
			},
			swipeTopHandler() {
				this.changeSelectedData(this.selectedData);
				if (this.selectedData.length < 1) {
					Toast("最少选择1个");
					return;
				}
				//   this.$router.push("/transition");
				this.$store.commit("CHANGE_ROUTER", "MyTransition");
			},
			changeDataHandler() {
				this.dataLength++;
				if (this.dataLength > this.originData.length - 1) {
					this.dataLength = 0;
				}
				this.creatData();
				for (let i = 0, len = this.showData.length; i < len; i++) {
					const isHas = this.selectedData.find(item => {
						return item == this.showData[i].txt;
					});
					if (isHas) {
						this.showData[i].check = true;
					}
				}
			},
			// 生成数据
			creatData() {
				this.showData = this.originData[this.dataLength].data.map(item => {
					return {
						check: false,
						txt: item,
						// color: Math.floor(Math.random() * 3)
					};
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.bg {
		height: 100%;
		background-image: url("http://cdn.hwzhj.top/BG.jpg");
		background-size: cover;
		background-repeat: no-repeat;
		background-position: 50% 50%;

		.rain {
			width: 2px;
			height: 135px;
			background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.25));
			position: absolute;
		}

		.one {
			animation: downRain 1.5s infinite;
		}

		.two {
			animation: downRain 1.3s infinite;
		}

		.three {
			animation: downRain 1.8s infinite;
		}

		.four {
			animation: downRain 1.9s infinite;
		}

		.five {
			animation: downRain 2.2s infinite;
		}

		@keyframes downRain {
			0% {
				top: -10px;
			}

			100% {
				top: 100%;
			}
		}

		.loading {
			position: relative;
			margin: 0 auto;
			height: 100%;
			width: 95%;
			display: flex;
			justify-content: center;

			.tab {
				color: #fff;
				font-size: 12px;
				width: 100%;
				top: 80px;
				position: absolute;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;

				.toast-bg {
					position: absolute;
					width: 45px;
					right: 40px;
					bottom: -40px;
					animation: mymove 1.3s ease-in-out infinite alternate;
				}

				@keyframes mymove {
					from {
						transform: translate(0, 0);
						opacity: 1;
					}

					to {
						transform: translate(0, 6px);
						opacity: 0.5;
					}
				}

				.tag {
					box-sizing: border-box;
					border-radius: 20px;
					display: flex;
					justify-content: center;
					align-items: center;
					text-align: center;
					padding: 6px 8px;
					line-height: 1.5;
				}

				.tag-fx1 {
					width: 47%;
					margin: 8px 4px;
					white-space: nowrap;
				}

				.tag-fx2 {
					width: 47%;
					margin: 8px 10%;
					white-space: nowrap;
				}

				.tag-default {
					color: #ac6622;
					border: 1px solid #ac6622;
				}

				.tag-dark {
					color: #f1deaa;
					background: #ac6622;
					border: 1px solid #ac6622;
				}

				.tag-light {
					color: #fff;
					background: transparent;
					border: 1px solid #fff;
				}

				.tag-check {
					color: #ac6622;
					border: 1px solid #fff;
					background: #fff;
				}
			}

			.statistics {
				position: absolute;
				width: 80%;
				height: 120px;
				top: 420px;
				text-align: center;
				font-size: 14px;
				color: #dbdbdb;
				line-height: 120px;
				// background: #FFFFFF;
			}

			.button {
				position: absolute;
				width: 100%;
				height: 160px;
				top: 520px;
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
