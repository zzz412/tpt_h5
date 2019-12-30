<template>
	<div class="bg" v-touch:swipe.bottom="swipeHandler" v-touch:longtap="longtapHandler">
		<div class="loading">
			<img src="http://cdn.hwzhj.top/Logo.png" class="logo" alt />
			<img src="http://cdn.hwzhj.top/主标题.png" class="ten-years" alt />
			<div :class="showBg">
				<p class="secret-text">
					<span>{{userInfo.userName}}：</span>
					<ol>
						<li v-for="(da,index) in selectedData" :key="index">{{da}}</li>
					</ol>
				</p>
			</div>
			<div class="bottom-share">
				<div class="downApp" @click="goDown"></div>
				<div class="share" @click="showWxImage"></div>
				<div class="share-txt2">下载APP 赢新春好礼</div>
				<div class="share-txt">长按保存图片</div>
			</div>
		</div>

		<div class="shareWx" @click="hiddenImage" v-show="wxImageShow">
			<img class="wxImage" src="http://cdn.hwzhj.top/微信内-分享提示.png" />
		</div>

		<div class="bg" ref="imageWrapper" style="">
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
				<img src="http://cdn.hwzhj.top/qr.png" class="qrCode" alt />
			</div>
		</div>
		<Popup v-model="show" style="width: 80%;">
			<div class="txt">长按保存图片</div>
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
	import * as TPTJS from 'tpt-js-sdk'
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
				const shareInfo = {
					title: '给未来十年的自己|我想对你说…',
					imgUrl: 'http://cdn.hwzhj.top/分享页面.jpg',
					url: 'http://zeng.pub/tpth5',
					content: '在吗？我是十年后的你，你有什么想对我说？'
				}
				TPTJS.tpH5Share(shareInfo);
			},
			// 隐藏分享图标
			hiddenImage() {
				this.wxImageShow = false;
			},
			swipeHandler() {
				// this.$router.back();
			},
			longtapHandler() {
				html2canvas(this.$refs.imageWrapper, {
					useCORS: true,
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
			},
			goDown(){
				window.open('https://ecustomer.cntaiping.com/static/download/#xiaZaiAPP?source=1')
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
		user-select:none;
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
				width: 80px;
				top: 10px;
				left: 0rem;
			}

			.ten-years {
				position: absolute;
				width: 180px;
				top: 40px;
			}

			.secret {
				position: absolute;
				width: 92%;
				height: 370px;
				top: 110px;
				background-image: url("http://cdn.hwzhj.top/60保密filter.png");
				background-repeat: no-repeat;
				background-size: cover;
				user-select:none;
				.secret-text {
					position: absolute;
					width: 90%;
					top: 30px;
					left: 35px;
					font-size: 18px;
					font-weight: 200;
					color: #2b5259;
					user-select:none;

					ol {
						position: absolute;
						font-size: 16px;
						width: 100%;
						top: 30px;
						left: 20px;
						list-style: decimal;
						user-select:none;

						li {
							line-height: 26px;
							user-select:none;
						}
					}
				}

			}

			.six {
				background-image: url("http://cdn.hwzhj.top/60保密filter.png");
			}

			.seven {
				background-image: url("http://cdn.hwzhj.top/70保密filter.png");
			}

			.eight {
				background-image: url("http://cdn.hwzhj.top/80保密filter.png");
			}

			.nine {
				background-image: url("http://cdn.hwzhj.top/90保密filter.png");
			}

			.zero {
				background-image: url("http://cdn.hwzhj.top/00保密filter.png");
			}
			.bottom-share{
				width: 100%;
				position: absolute;
				height: 30px;
				display: flex;
				justify-content: space-around;
				// bottom: 55px;
				top: 485px;
			}
			.downApp {
				width: 120px;
				background-image: url("http://cdn.hwzhj.top/下载app.png");
				background-size: contain;
				height: 58px;
				background-repeat: no-repeat;
			}
			.share {
				width: 120px;
				background-image: url("http://cdn.hwzhj.top/share.png");
				background-size: contain;
				height: 58px;
				background-repeat: no-repeat;
			}
			.share-txt{
				position: absolute;
				font-size: 12px;
				color: #b45c16;
				width: 100%;
				bottom: -43px;
				text-align: center;
				user-select:none;
			}

			.share-txt2{
				position: absolute;
				font-size: 12px;
				color: #b45c16;
				width: 100%;
				bottom: -23px;
				text-align: center;
				user-select:none;
			}

			.qrCode {
				position: absolute;
				width:270px;
				top: 500px;
				left: 27px;
			}
		}

		.van-popup {
			background: transparent;
			.txt{
				text-align: center;
				font-size:22px;
				margin: 10px 0px;
				color:#fff;
				user-select:none;
			}
		}
	}
</style>
