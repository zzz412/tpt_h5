<template>
	<div class="bg" v-touch:swipe.bottom="swipeHandler" v-touch:longtap="longtapHandler">
		<div class="loading">
			<img src="http://cdn.hwzhj.top/Logo.png" class="logo" alt />
			<img src="http://cdn.hwzhj.top/文案.png" class="ten-years" alt />
			<div :class="showBg">
				<p class="secret-text">
					<span>{{userInfo.userName}}：</span>
					<ol>
						<li v-for="(da,index) in selectedData" :key="index">{{da}}</li>
					</ol>
				</p>
			</div>
			<div class="share" @click="showWxImage"></div>
		</div>

		<div class="shareWx" @click="hiddenImage" v-show="wxImageShow">
			<img class="wxImage" src="http://cdn.hwzhj.top/微信内-分享提示.png" />
		</div>

		<div class="bg" ref="imageWrapper">
			<div class="loading">
				<img src="http://cdn.hwzhj.top/Logo.png" class="logo" alt />
				<img src="http://cdn.hwzhj.top/文案.png" class="ten-years" alt />
				<div :class="showBg">
					<p class="secret-text">
						<span>{{userInfo.userName}}：</span>
						<ol>
							<li v-for="(da,index) in selectedData" :key="index">{{da}}</li>
						</ol>
					</p>
				</div>
				<img src="http://cdn.hwzhj.top/别人查看-引导.png" class="qrCode" alt />
			</div>
		</div>
		<Popup v-model="show" style="width: 80%;">
			<div style="text-align: center;font-size:22px;margin: 10px 0px;">长按保存图片</div>
			<div style="text-align: center;font-size:22px;margin: 10px 0px;">
				<img :src="imgUrl" style="width: 90%;" />
			</div>
		</Popup>
	</div>
</template>

<script>
	import {
		Popup,
		Toast
	} from "vant";
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
				show: false,
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
				wxImageShow: false,
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
			// 显示分享
			showWxImage() {
				this.wxImageShow = true;
			},
			// 隐藏分享图标
			hiddenImage() {
				this.wxImageShow = false;
			},
			swipeHandler() {
				this.$router.back();
			},
			longtapHandler() {
				html2canvas(this.$refs.imageWrapper, {
					useCORS: true
				}).then(canvas => {
					let dataURL = canvas.toDataURL("image/png");
					this.imgUrl = dataURL;
					if (this.imgUrl !== "") {
						var ua = window.navigator.userAgent.toLowerCase();
						//通过正则表达式匹配ua中是否含有MicroMessenger字符串
						if (ua.match(/MicroMessenger/i) == 'micromessenger') {
							this.show = true;
						} else {
							this.saveFile(this.imgUrl, 'share.jpg');
						}
					}
				});
			},
			saveFile(data, filename) {
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
		background-image: url("http://cdn.hwzhj.top/BG.png");
		background-size: cover;
		background-repeat: no-repeat;
		background-position: 50% 50%;

		.shareWx {
			position: absolute;
			margin: 0 auto;
			height: 100%;
			width: 100%;
			top: 0px;
			display: flex;
			justify-content: center;
			z-index: 999;

			.wxImage {
				width: 100%;
			}
		}

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
				background-image: url("http://cdn.hwzhj.top/60保密.png");
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
				background-image: url("http://cdn.hwzhj.top/60保密.png");
			}

			.seven {
				background-image: url("http://cdn.hwzhj.top/保密70.png");
			}

			.eight {
				background-image: url("http://cdn.hwzhj.top/80保密.png");
			}

			.nine {
				background-image: url("http://cdn.hwzhj.top/90保密.png");
			}

			.zero {
				background-image: url("http://cdn.hwzhj.top/00保密.png");
			}

			.share {
				position: absolute;
				width: 150px;
				top: 580px;
				background-image: url("http://cdn.hwzhj.top/分享.png");
				background-size: contain;
				height: 58px;
				background-repeat: no-repeat;
			}

			.qrCode {
				position: absolute;
				width: 7rem;
				top: 15.46667rem;
				left: 7px;
			}
		}

		.van-popup {
			width: 100%;
			height: 100%;
		}
	}
</style>
