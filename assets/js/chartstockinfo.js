$(document).ready(function(){

    	
				// PANEL MENU
				var hash = window.location.hash;
				
				$("ul.panel-menu > li > a, a.homechart").on("click", function(){
					
					var href = $(this).attr("href");
					var cContainer = $(this).data("container");
					$("ul.panel-menu > li > a").removeClass("active");
					
					$(".panel").removeClass("active");
					$(href+".panel").addClass("active");
					$(this).addClass("active");


                    $("#"+cContainer).html("");
                    $("#"+cContainer).append('<div class="loader-chart">\
						                    	<i class="fa fa-spin fa-spinner fa-2x"></i>\
						                    </div>');
					// load chart
					 setTimeout(function(){
                         $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-ohlcv.json&callback=?', function (data) {
					  	    drawChart(cContainer ,data);
					     });
					 }, 500);
					


				});
				
					
				
				if(hash != ""){
					
					if(hash == "#mainchart"){
					
						$("a.homechart").trigger("click");
					}else{
						$("ul.panel-menu > li > a[href='"+hash+"']").trigger("click");
					
					}
					
				}else{
						
						$("a.homechart").trigger("click");
					
				}
				

			function drawChart(container, data){

				// split the data set into ohlc and volume
					var ohlc = [],
						volume = [],
						dataLength = data.length,
						// set the allowed units for data grouping
						groupingUnits = [[
							'week',                         // unit name
							[1]                             // allowed multiples
						], [
							'month',
							[1, 2, 3, 4, 6]
						]],

						i = 0;

					for (i; i < dataLength; i += 1) {
						ohlc.push([
							data[i][0], // the date
							data[i][1], // open
							data[i][2], // high
							data[i][3], // low
							data[i][4] // close
						]);

						volume.push([
							data[i][0], // the date
							data[i][5] // the volume
						]);
					}
					var options = {

						rangeSelector: {
							selected: 1.,
							inputEnabled:false,
							buttons: [{
								type: 'month',
								count: 1,
								text: '1m'
							}, {
								type: 'month',
								count: 3,
								text: '3m'
							}, {
								type: 'month',
								count: 6,
								text: '6m'
							},
							{
								type: 'year',
								count: 1,
								text: '1y'
							}, {
								type: 'all',
								text: 'All'
							}]
						},

						title: {
							text: ''
						},
						
						yAxis: [{
							labels: {
								align: 'right',
								x: -3
							},
							title: {
								text: ''
							},
							height: '60%',
							lineWidth: 2
						}, {
							labels: {
								align: 'right',
								x: -3
							},
							title: {
								text: ''
							},
							top: '65%',
							height: '35%',
							offset: 0,
							lineWidth: 2
						}],

						tooltip: {
							split: true
						},

						series: [{
							type: 'candlestick',
							name: 'AAPL',
							data: ohlc,
							dataGrouping: {
								units: groupingUnits
							}
						}, {
							type: 'column',
							name: 'Volume',
							data: volume,
							yAxis: 1,
							dataGrouping: {
								units: groupingUnits
							}
						}]
					};

					// create the chart
					

					var chart = new Highcharts.stockChart(container, options);
			}


});