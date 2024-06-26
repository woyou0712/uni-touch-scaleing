export default class TouchScaleing {
	startParam = {
		x1: 0,
		y1: 0,
		x2: 0,
		y2: 0,
	};

	scale = 1;

	rotate = 0;

	translateX = 0;
	translateY = 0;

	getTouchPosition(changedTouches) {
		const x1 = changedTouches.find((item) => item.identifier === 0)?.pageX || 0;
		const y1 = changedTouches.find((item) => item.identifier === 0)?.pageY || 0;
		const x2 = changedTouches.find((item) => item.identifier === 1)?.pageX || 0;
		const y2 = changedTouches.find((item) => item.identifier === 1)?.pageY || 0;
		return [x1, y1, x2, y2];
	}
	touchStart(changedTouches) {
		const [x1, y1, x2, y2] = this.getTouchPosition(changedTouches);
		if (x1 !== 0 && y1 !== 0) {
			this.startParam.x1 = x1;
			this.startParam.y1 = y1;
		}
		if (x2 !== 0 && y2 !== 0) {
			this.startParam.x2 = x2;
			this.startParam.y2 = y2;
		}
	}
	touchMove(changedTouches) {
		if (changedTouches.length < 2) return false;
		const param = this.startParam;
		const [startX1, startY1, startX2, startY2] = [
			param.x1,
			param.y1,
			param.x2,
			param.y2,
		];
		const [x1, y1, x2, y2] = this.getTouchPosition(changedTouches);

		this.scale =
			Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) /
			Math.sqrt(
				Math.pow(startX2 - startX1, 2) + Math.pow(startY2 - startY1, 2)
			);
		this.rotate =
			(Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI -
			(Math.atan2(startY2 - startY1, startX2 - startX1) * 180) / Math.PI;
		this.translateX = (x1 + x2) / 2 - (startX1 + startX2) / 2;
		this.translateY = (y1 + y2) / 2 - (startY1 + startY2) / 2;
		return true;
	}
	touchEnd(changedTouches) {
		const [x1, y1, x2, y2] = this.getTouchPosition(changedTouches);
		if (x1 !== 0 && y1 !== 0) {
			this.startParam.x1 = 0;
			this.startParam.y1 = 0;
		}
		if (x2 !== 0 && y2 !== 0) {
			this.startParam.x2 = 0;
			this.startParam.y2 = 0;
		}
		return (
			this.startParam.x1 === 0 &&
			this.startParam.y1 === 0 &&
			this.startParam.x2 === 0 &&
			this.startParam.y2 === 0
		);
	}
}