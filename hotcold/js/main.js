function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function submitGuess() {
	console.log('hi');
	var guess = $('input').val();
	console.log(guess);

	if (!isNumber(guess)) {
		$('#guess-alert').children('p').text("We only support numbers. We simple machine.");
		$('#guess-alert').fadeIn(300);

	} else if (guess < 0 || guess >1000) {
		$('#guess-alert').children('p').text("Please pick a number between 1 and 1000. No negatives please.");
		$('#guess-alert').fadeIn(300);

	} else {
		$('#guess-alert').fadeOut(300);
		$('#number-guessed').text(guess);
		if (guess == mynum) {
			$('.slider').css({'width' : '30em'});
			$('#number-guessed').text(0);
			$('body').removeClass('roll').animate({'nothing':null}, 1, function () {
					$(this).addClass('roll');
			});
			$('#myModal').foundation('reveal', 'open');
			//$('body').addClass('roll');
			mynum= Math.floor(Math.random()*1000);
			console.log(mynum);

		} else {
			var dist_from_guess = guess - mynum;
			// console.log(dist_from_guess);

			if (dist_from_guess < 0){
				// console.log(dist_from_guess / 40);
				var width_calc = Math.abs(dist_from_guess/40);

				if (width_calc < 0.2) {
					width_calc = 0.10;
				}
				$('#cold').css({'width': width_calc + 'em'});
				$('#hot').css({'width': 0});
			
			} else {
				// console.log(dist_from_guess / 40);
				var width_calc2 = (dist_from_guess/40);
				if (width_calc2 < 0.2) {
					width_calc2 = 0.10;
				}

				$('#hot').css({'width': width_calc2 + 'em'});
				$('#cold').css({'width': 0});
			}
		}
	}
	$('input').val('');
}

var mynum= Math.floor(Math.random()*1000);
console.log(mynum);

$('#guess-submit').on('click', 'button', function(){
	//$('body').removeClass('roll');
	// $('.slider').removeClass('default-hot-cold');
	submitGuess();
	
});
$('#guess-submit').submit(function(){
	//$('body').removeClass('roll');
	// $('.slider').removeClass('default-hot-cold');
	submitGuess();
	return false;
	
});



