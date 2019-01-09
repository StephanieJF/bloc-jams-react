import React, { Component } from 'react';

function formatTime(time) {
	const mins = Math.floor(time / 60);
	const secs = Math.floor(time - (mins * 60));

	return '' + mins + ':' + (secs < 10 ? '0' + secs : secs)
}

export default formatTime;
