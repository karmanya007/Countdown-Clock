(function () {
	const daysSpan = document.querySelector('.days');
	const hoursSpan = document.querySelector('.hours');
	const minutesSpan = document.querySelector('.minutes');
	const secondsSpan = document.querySelector('.seconds');

	const days_input = document.querySelector('.days_input');
	const hours_input = document.querySelector('.hours_input');
	const minutes_input = document.querySelector('.minutes_input');
	const seconds_input = document.querySelector('.seconds_input');

	const start = document.querySelector('.start_btn');
	const pause = document.querySelector('.pause_btn');
	const stop = document.querySelector('.stop_btn');

	let isRunning = false;
	let isPaused = false;
	let deadLine, timeInterval;

	const initializeClock = () => {
		if (!isRunning) {
			if (!isPaused) {
				if (
					hours_input.value <= 24 &&
					hours_input.value >= 0 &&
					minutes_input.value <= 60 &&
					minutes_input.value >= 0 &&
					seconds_input.value <= 60 &&
					seconds_input.value >= 0 &&
					hours_input.value.length != 0 &&
					minutes_input.value.length != 0 &&
					seconds_input.value.length != 0
				) {
					console.log(hours_input.value);
					hours_input;
					deadLine = new Date(
						Date.parse(new Date()) +
							days_input.value * 24 * 60 * 60 * 1000 +
							hours_input.value * 60 * 60 * 1000 +
							minutes_input.value * 60 * 1000 +
							seconds_input.value * 1000
					);
					clearInput();
					isRunning = true;
					isPaused = false;
					updateClock(deadLine);
					timeInterval = setInterval(updateClock, 1000);
				} else {
					alert('Invalid parameters!!');
					clearInput();
				}
			} else {
				deadLine = new Date(
					Date.parse(new Date()) +
						daysSpan.innerHTML * 24 * 60 * 60 * 1000 +
						hoursSpan.innerHTML * 60 * 60 * 1000 +
						minutesSpan.innerHTML * 60 * 1000 +
						secondsSpan.innerHTML * 1000
				);
				isRunning = true;
				isPaused = false;
				updateClock(deadLine);
				timeInterval = setInterval(updateClock, 1000);
			}
			start.innerHTML = 'START';
			days_input.focus();
		}
	};

	const updateClock = () => {
		const time = getTimeRemaining(deadLine);

		daysSpan.innerHTML = time.days;
		hoursSpan.innerHTML = ('0' + time.hours).slice(-2);
		minutesSpan.innerHTML = ('0' + time.minutes).slice(-2);
		secondsSpan.innerHTML = ('0' + time.seconds).slice(-2);

		if (time.total <= 0) {
			clearInterval(timeInterval);
		}
	};

	const getTimeRemaining = (deadLine) => {
		const t = Date.parse(deadLine) - Date.parse(new Date());
		const seconds = Math.floor((t / 1000) % 60);
		const minutes = Math.floor((t / (1000 * 60)) % 60);
		const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
		const days = Math.floor(t / (1000 * 60 * 60 * 24));

		return {
			total   : t,
			days    : days,
			hours   : hours,
			minutes : minutes,
			seconds : seconds
		};
	};

	const clearInput = () => {
		days_input.value = '';
		hours_input.value = '';
		minutes_input.value = '';
		seconds_input.value = '';
	};

	const clearClock = () => {
		daysSpan.innerHTML = '';
		hoursSpan.innerHTML = '';
		minutesSpan.innerHTML = '';
		secondsSpan.innerHTML = '';
	};

	const pauseFunc = () => {
		if (!isPaused && isRunning) {
			clearInterval(timeInterval);
			isRunning = false;
			isPaused = true;
			start.innerHTML = 'UNPAUSE';
		}
	};

	const stopFunc = () => {
		clearInterval(timeInterval);
		isRunning = false;
		isPaused = false;

		clearInput();
		clearClock();
	};

	start.addEventListener('click', initializeClock);
	document.addEventListener('keypress', function (event) {
		// event variable hold the key pressed
		if (event.keyCode === 13 || event.which === 13) {
			//event.which for older browsers
			initializeClock();
		}
	});
	pause.addEventListener('click', pauseFunc);
	stop.addEventListener('click', stopFunc);
})();
