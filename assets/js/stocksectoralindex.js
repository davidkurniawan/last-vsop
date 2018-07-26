$(document).ready(function(){
    // PANEL MENU
				var hash = window.location.hash;
				
				$("ul.panel-menu > li > a").on("click", function(){
					
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
					 	    createChart(cContainer ,data);
					      });
				  }, 500);

				});
				
				 if(hash != ""){
					
				 	if(hash == "#mainchart"){
					
				 		$("ul.panel-menu > li:first-child > a").trigger("click");
			 	}else{
				 		$("ul.panel-menu > li > a[href='"+hash+"']").trigger("click");
					
				 	}
					
				 }else{
						$("ul.panel-menu > li:first-child > a").trigger("click");
					
				 }

                 $("#stocksectoralselect").on("change", function(){
                    // console.log($(this).val());
                        var chartPanel = $(this).val();
                        $("ul.panel-menu > li > a[href='#"+chartPanel+"']").trigger("click");




                 });

	// $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=goog-c.json&callback=?', function (data) {

		

	// });

    function createChart(container, data){

        var options = {

        rangeSelector: {
            selected: 1
        },

        title: {
            
        },
		rangeSelector : {
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
        series: [{
			
            data: data,
            type: 'area',
            threshold: null,
            tooltip: {
                valueDecimals: 2
            },
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            }
        }]
    }
        // Create the chart
	var chart = 	Highcharts.stockChart(container, options);

    }

    });