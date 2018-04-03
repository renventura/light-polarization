$(document).ready(function() {

	function round(value, decimals = 5) {
	    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
	}

	function percent(value) {
		return value * 100;
	}

	var isPolarized = false,
		rotatedOpacity = 0.5,
		degrees = 90,
		radians = (degrees * Math.PI)/180,
		cos = Math.cos(radians),
		cosSquared = Math.pow(cos, 2),
		initialIntensity = 0.5,
		intensity = 1,
		opacity = 0.5;
	
	var params = {

		start: function(event, ui) {},

		rotate: function(event, ui) {

			degrees = Math.round(ui.angle.degrees);
			if ( degrees == 360 ) degrees = 0;
			radians = (degrees * Math.PI)/180;
			cos = Math.cos(radians);
			cosSquared = Math.pow(cos, 2);

			$('#angle').text(degrees);

			if ( isPolarized ) {

				rotatedOpacity = 1 - (initialIntensity * cosSquared);

				$.each( $('.lens'), function(index, el) {
					$(el).css('opacity', round(rotatedOpacity));
				});

				$('#intensity').text(round(percent( (1-rotatedOpacity)*.5) ));

			} else {

				$('#intensity').text(round(percent(opacity)));
			}
		},

		stop: function(event, ui) {},
	};

	$('#sunglasses').rotatable(params).draggable();

	$('#toggle-polarizer').click(function() {
		
		isPolarized = isPolarized ? false : true;

		$(this).toggleClass('active');
		$('body').toggleClass('polarized');

		if ( isPolarized ) {

			$.each( $('.lens'), function(index, el) {
				$(el).css('opacity', round(rotatedOpacity));
			});

			$('#intensity').text(round(percent( (1-rotatedOpacity)*.5 )));

		} else {

			$.each( $('.lens'), function(index, el) {
				$(el).css('opacity', round(1-opacity));
			});

			$('#intensity').text(round(percent( 1-opacity )));

		}

		$('.ui-rotatable-handle').simulate('drag');
	});

	$('.launch-modal').click(function() {
		var target = $(this).data('modal');
		$('#' + target).addClass('active');
	});

	$('.modal-background, .modal-close').click(function() {
		$(this).closest('.modal').removeClass('active');
	});

});