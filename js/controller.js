var Timer = require('./model.js');
var parseInput = require('./parseInput.js');

var Controller = function () {
	var that = this;
	this._timer = null;
	this._buttonClickProcessing = function (event) {
		var input = parseInput();
		if(!input.isValid) throw "Wrong input.";
		switch (event.target || event.srcElement) {
			case window.Prompter.$buttonCountUp :
				if(!that._timer){
					that._timer = new Timer("count-up", input.value);
				} else if (that._timer.type === "count-up" && !that._timer.paused) {
					that._timer.pause();
				} else if (that._timer.type === "count-up" && that._timer.paused) {
					that._timer.run();
				}
				break
			case window.Prompter.$buttonCountDown :
				if(!that._timer){
					that._timer = new Timer("count-down", input.value);
				} else if (that._timer.type === "count-down" && !that._timer.paused) {
					that._timer.pause();
				} else if (that._timer.type === "count-down" && that._timer.paused) {
					that._timer.run();
				}
				break
			case window.Prompter.$buttonCountDeadline :
				if(!that._timer){
					that._timer = new Timer("deadline", input.value);
				}
				break
			case window.Prompter.$buttonReset :
				if (that._timer) that._timer.cancel();
				that._timer = null;
				break
		}
	}
	window.Prompter.$body.addEventListener("click", that._buttonClickProcessing);
}

module.exports = Controller;