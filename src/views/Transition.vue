<template>
	<div class="bg" v-touch:swipe.bottom="swipeHandler">
		<div class="loading">
			<div class="mail"></div>
			<div class="star"></div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// 延时器对象
				timeOutObj: '',
			}
		},
		mounted() {
			this.timeOutObj = setTimeout(() => {
				// this.$router.push("/share");
      			this.$store.commit("CHANGE_ROUTER", "Share");
			}, 3000)
		},
		methods: {
			swipeHandler() {
				this.$router.back();
			},
		},
		beforeDestroy() {
			clearInterval(this.timeOutObj);
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

		.loading {
			position: relative;
			margin: 0 auto;
			height: 100%;
			width: 90%;
			display: flex;
			justify-content: center;

			.mail {
				position: absolute;
				width: 60%;
				height: 80%;
				top: 100px;
				background-image: url("http://cdn.hwzhj.top/信箱.png");
				background-size: contain;
				background-repeat: no-repeat;
				background-position: 50% 50%;
			}

			.star {
				position: absolute;
				width: 90%;
				height: 78%;
				background-image: url("http://cdn.hwzhj.top/信件.png");
				background-size: contain;
				background-repeat: no-repeat;
				background-position: 50% 50%;
				animation: mymove 3.3s linear infinite alternate;

				@keyframes mymove {
					0% {
						width: 90%;
						height: 78%;
						/*开始为原始大小*/
					}

					100% {
						width: 0%;
						height: 88%;
					}

				}
			}


			.up {
				position: absolute;
				width: 52.5px;
				bottom: 40px;
			}
		}
	}
</style>
