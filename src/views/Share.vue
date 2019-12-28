<template>
	<div class="bg" v-touch:swipe.bottom="swipeHandler">
		<div class="loading">
			<img src="@/assets/index/Logo.png" class="logo" alt />
			<img src="@/assets/result/文案.png" class="ten-years" alt />
			<div class="secret">
				<p class="secret-text">
					<span>郑小耿：</span>
					<ol>
						<li>每周打卡一部电影</li>
						<li>消灭豆瓣必看书单</li>
						<li>学会用镜头留下最美的风景</li>
						<li>走出舒适圈</li>
						<li>掌握一门新语言</li>
					</ol>
				</p>
			</div>
			<img src="@/assets/result/分享.png" class="share" alt />
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			swipeHandler() {
				this.$router.back();
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
				top: 85px;
				left: 0rem;
			}

			.ten-years {
				position: absolute;
				width: 190px;
				top: 135px;
			}

			.secret {
				position: absolute;
				width: 100%;
				height: 400px;
				top: 205px;
				background-image: url("../assets/result/60保密.png");
				background-repeat:no-repeat;
				background-size: cover;
				.secret-text{
					position: absolute;
					width: 80%;
					top: 35px;
					left: 35px;
					font-size: 18px;
					font-weight: 200;
					color: #2b5259;
					ol{
						position: absolute;
						font-size: 16px;
						width: 100%;
						top: 35px;
						left: 20px;
						list-style: decimal;
						li{
							line-height: 26px;
						}
					}
				}
			}
			
			.share{
				position: absolute;
				width: 150px;
				top: 630px;
			}
		}
	}
</style>
