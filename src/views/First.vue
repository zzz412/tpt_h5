<template>
	<div class="bg" v-touch:start="start" v-touch:end="swipeHandler">
		<div class="rain one" style="left: 2%;"></div>
		<div class="rain three" style="left: 10%;"></div>
		<div class="rain two" style="left: 25%;"></div>
		<div class="rain five" style="left: 45%;"></div>
		<div class="rain three" style="left: 58%;"></div>
		<div class="rain four" style="left: 72%;"></div>
		<div class="rain two" style="left: 88%;"></div>
		<div class="rain five" style="left: 96%;"></div>
		<div class="loading">
			<transition name="txt" appear>
				<img src="http://cdn.hwzhj.top/Logo.png" class="logo" alt />
			</transition>
			<transition name="txt" appear>
				<img src="http://cdn.hwzhj.top/文字.png" class="txt" alt />
			</transition>
			<img src="http://cdn.hwzhj.top/向上滑动.png" class="up" alt />
			<!-- <div class="loading-top">
        <div class="amd line"></div>
        <div class="amd pen"></div>
      </div>-->
			<!-- <div class="loading-bottom">
        <div class="amd loading_text"></div>
      </div>-->
		</div>
	</div>
</template>

<script>
	import mixins from "@/mixins/touchu";
	export default {
		mixins: [mixins],
		methods: {
			goPage() {
				this.$store.commit("CHANGE_ROUTER", "TransForm");
			}
			// start(e){
			//   console.log('开始',e)
			// },
			// swipeHandler(e) {
			//   console.log(e)
			//   // console.log(11);
			//   // this.$router.push("/transform");
			//   // this.$store.commit("CHANGE_ROUTER", "TransForm");
			// }
		}
	};
</script>

<style lang="scss" scoped>
	.txt-enter {
		opacity: 0;
		// transform: translateX(50px);
		transform: scale(0.3);
	}

	.txt-enter-active {
		transition: all 1.2s;
	}

	.bg {
		height: 100%;
		background-image: url("http://cdn.hwzhj.top/BG.jpg");
		height: 100%;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: 50% 50%;
		position: relative;

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
			position: absolute;
			left: calc(50% - 50px);
			height: 100%;
			width: 100px;
			display: flex;
			justify-content: center;

			.logo {
				position: absolute;
				width: 90px;
				top: 40px;
			}

			.txt {
				position: absolute;
				width: 71px;
				top: 119px;
			}

			.up {
				position: absolute;
				width: 52.5px;
				bottom: 40px;
				animation: mymove 1.3s ease-in-out infinite alternate;

				@keyframes mymove {
					from {
						transform: translate(0, 0);
					}

					to {
						transform: translate(0, 6px);
					}
				}
			}
		}
	}
</style>
