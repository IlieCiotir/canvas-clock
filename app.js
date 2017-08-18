(function() {
	angular.module('testApp', ['clock']);

	angular.module('testApp').controller('MainCtrl', function($scope) {

	});

	angular.module('clock',[]);
	angular.module('clock').directive('clock',function($interval){
		return {
			restrict:'E',
			template:'<canvas id="overview" width="1000px" height="1000px"></canvas>',
			link:function(scope, element) {
				var ctx = element[0].children[0].getContext('2d');

				var centerX = ctx.canvas.width / 2;
				var centerY = ctx.canvas.height / 2;
				$interval(paintClock,10)
				///
				//paintClock();

				function paintClock() {
					console.log("tick");
					console.log(ctx.canvas.width);
					console.log(ctx.canvas.height);
					background();
					clockFace();
					drawTimer();
					
					drawHourMinute();
				}
				function drawHourMinute(){
					var today = new Date();
					var seconds = today.getSeconds();
					var minutes = today.getMinutes();

					ctx.beginPath();
					ctx.lineWidth=4;
					ctx.strokeStyle="orange";
					ctx.arc(centerX, centerY, 284, 1.5*Math.PI + (60 - seconds) *Math.PI/(30), 1.5* Math.PI, true);
					ctx.stroke();

					ctx.beginPath();
					ctx.lineWidth=6;
					ctx.strokeStyle="red";
					ctx.arc(centerX, centerY, 292, 1.5*Math.PI + (60 - minutes) *Math.PI/(30), 1.5* Math.PI, true);


					ctx.fillText(minutes, centerX-120, centerY-100);
					ctx.fillText(":", centerX-15,centerY-100);
					ctx.fillText(seconds, centerX+15,centerY-100);

					ctx.stroke();


					var milliseconds=today.getMilliseconds();
					console.log(milliseconds/10);

					
					ctx.fillStyle="rgba(255,255,255,0.20)";
					ctx.fillRect(centerX-3, centerY + 100, 3, 100 -milliseconds/10);

				}
				function drawTimer() {
					ctx.beginPath();
					ctx.fillStyle="orange";
					ctx.font="100px Georgia"
					ctx.fillText("59'",centerX-50,centerY+20);
					ctx.fill();
					ctx.closePath();
				}
				function background(){
					ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
					ctx.fillStyle="rgba(44,56,70,1.00)";
					ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height);
				}

				function clockFace(){
					ctx.lineWidth = 3;
				ctx.strokeStyle="rgba(255,255,255,0.50)";
				ctx.arc(centerX, centerY, 300, 1.5*Math.PI, Math.PI);
				ctx.stroke();
				

				ctx.beginPath();
				ctx.strokeStyle ="green";
				ctx.lineWidth="20"
				ctx.arc(centerX,centerY, 300,2, 0.5 *Math.PI);
				//ctx.stroke();
				ctx.closePath();

				for (var i=0;i<4; i++) {
					var ang = 2*Math.PI/4 *i;
					var sin = Math.sin(ang);
					var cos = Math.cos(ang);
					
					var sx = sin * 220;
					var sy = cos * 220;
					var ex = sin * 300;
					var ey = cos * 300;

					ctx.beginPath();
					ctx.lineWidth=3;
					ctx.strokeStyle="rgba(255,255,255,0.70)";
					ctx.moveTo(centerX+sx, centerY+ sy);
					ctx.lineTo(centerX+ex, centerY+ey);
					ctx.stroke();
					ctx.closePath();
				}
				}

			}
		}
	});
})();