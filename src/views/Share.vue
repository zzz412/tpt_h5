<template>
	<div class="bg" v-touch:swipe.bottom="swipeHandler"  v-touch:longtap="longtapHandler" ref="imageWrapper">
		<div class="loading">
			<img src="@/assets/index/Logo.png" class="logo" alt />
			<img src="@/assets/result/文案.png" class="ten-years" alt />
			<div :class="showBg">
				<p class="secret-text">
					<span>{{userInfo.userName}}：</span>
					<ol>
						<li v-for="(da,index) in selectedData" :key="index">{{da}}</li>
					</ol>
				</p>
			</div>
			<img v-if="!showQrCode" src="@/assets/result/分享.png" class="share" alt />
			<img v-else src="@/assets/result/别人查看-引导.png" class="qrCode" alt />
		</div>
		<Popup :show="showImgModel">
			123
			<img :src="imgUrl" class="qrCode" />
		</Popup>
	</div>
</template>

<script>
	import { Popup } from "vant";
	import html2canvas from "html2canvas"
	import {
		mapMutations,
		mapState
	} from "vuex";
	export default {
		components: {
		  Popup
		},
		data() {
			return {
				bg: [{
					name: '60',
					path: '60保密.png',
					class: 'six'
				}, {
					name: '70',
					path: '保密70.png',
					class: 'seven'
				}, {
					name: '80',
					path: '80保密.png',
					class: 'eight'
				}, {
					name: '90',
					path: '90保密.png',
					class: 'nine'
				}, {
					name: '00',
					path: '00保密.png',
					class: 'zero'
				}],
				dataLength: 0,
				showBg: 'secret six',
				showQrCode: false,
				imgUrl: '',
				showImgModel: false,
			};
		},
		computed: {
			...mapState(["userInfo", "selectedData"]),
		},
		mounted() {
			const bg = this.bg.find(item => {
				return item.name == this.userInfo.userYear
			}) || {
				class: ''
			}
			this.showBg = "secret " + bg.class || "secret";
		},
		methods: {
			swipeHandler() {
				this.$router.back();
			},
			longtapHandler() {
				this.showQrCode = true;
				html2canvas(this.$refs.imageWrapper).then(canvas => {
					let dataURL = canvas.toDataURL("image/png");
					this.imgUrl = dataURL;
					if (this.imgUrl !== "") {
						this.showImgModel = true;
						console.log(this.showImgModel)
						// this.saveFile(this.imgUrl,'xxx.png');
					}
				});
			},
			saveFile(data, filename){
				let save_link = document.createElement('a');
				save_link.href = data;
				save_link.download = filename;
			
				let event = document.createEvent('MouseEvents');
				event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				save_link.dispatchEvent(event);
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

			.logo {
				position: absolute;
				width: 90px;
				top: 40px;
				left: 0rem;
			}

			.ten-years {
				position: absolute;
				width: 190px;
				top: 90px;
			}

			.secret {
				position: absolute;
				width: 100%;
				height: 400px;
				top: 160px;
				background-image: url("../assets/result/60保密.png");
				background-repeat: no-repeat;
				background-size: cover;

				.secret-text {
					position: absolute;
					width: 80%;
					top: 30px;
					left: 35px;
					font-size: 18px;
					font-weight: 200;
					color: #2b5259;

					ol {
						position: absolute;
						font-size: 16px;
						width: 100%;
						top: 30px;
						left: 20px;
						list-style: decimal;

						li {
							line-height: 26px;
						}
					}
				}

			}

			.six {
				background-image: url("../assets/result/60保密.png");
			}

			.seven {
				background-image: url("../assets/result/保密70.png");
			}

			.eight {
				background-image: url("../assets/result/80保密.png");
			}

			.nine {
				background-image: url("../assets/result/90保密.png");
			}

			.zero {
				background-image: url("../assets/result/00保密.png");
			}

			.share {
				position: absolute;
				width: 150px;
				top: 580px;
			}

			.qrCode {
				position: absolute;
				width: 7rem;
				top: 15.46667rem;
				left: 7px;
			}
		}
	}
</style>
