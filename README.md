# Uniapp 双指触摸缩放

## 使用方法

### 安装

```bash
npm install uni-touch-scaleing
```

### 在 Uniapp 中使用
- demo页面
```html
<template>
	<view class="touch-zoom" @touchstart="onTouchstart" @touchmove="onTouchmove" @touchend="onTouchend">
		<image src="图片地址" :style="[cmpTransform]" mode="aspectFit" />
	</view>
</template>
<script>
import TouchScale from 'uni-touch-scaleing';
export default {
	data() {
		return {
			touch: null,
			scaling: 1, // 缩放比例
			translate: 0, // 偏移量
			rotate: 0, // 旋转角度
			transition: 0, // 过渡动画时长

			transitionTime: null, // 定时器
			clearTransitionTime: null // 定时器
		};
	},
	mounted() {
		this.touch = new TouchScale();
	},
	destroyed() {
		// 销毁组件清除定时器
		clearTimeout(this.transitionTime);
		clearTimeout(this.clearTransitionTime);
	},
	computed: {
		cmpTransform() {
			return {
				transform: `scale(${this.scaling}) translate(${this.translate}) rotate(${this.rotate}deg)`,
				transition: this.transition
			};
		}
	},
	methods: {
		onTouchstart(e) {
			this.touch.touchStart(e.changedTouches);
		},
		onTouchmove(e) {
			const bool = this.touch.touchMove(e.changedTouches);
			if (!bool) return;
			this.scaling = this.touch.scale;
			this.translate = `${this.touch.translateX}px,${this.touch.translateY}px`;
			this.rotate = this.touch.rotate;
		},
		onTouchend(e) {
			const bool = this.touch.touchEnd(e.changedTouches);
			if (!bool) return;
			// 退出还原
			this.transition = '0.3s'; // 添加过渡动画
			clearTimeout(this.transitionTime);
			this.transitionTime = setTimeout(() => {
				this.scaling = 1;
				this.translate = 0;
				this.rotate = 0;
				clearTimeout(this.clearTransitionTime);
				this.clearTransitionTime = setTimeout(() => {
					this.transition = 0; // 清除过度动画
				}, 100);
			}, 50);
		}
	}
};
</script>

<style>
.touch-zoom {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 100;
}
image {
	width: 100%;
	height: 100%;
	max-width: 100%;
	max-height: 100%;
}
</style>
```
