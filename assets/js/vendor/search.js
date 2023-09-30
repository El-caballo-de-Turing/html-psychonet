/**
 * TODO Short description.
 *
 * @param data
 */
function builderClarification(data) {
	const dom = jQuery('.js-user-clarification');
	dom.removeClass( 'active' ).empty();

	const { enriched_information } = data;
	if (enriched_information === 'undefined') {
		return;
	}

	const { chatgpt_response } = enriched_information;
	if (chatgpt_response === 'undefined') {
		return;
	}

	const text = jQuery(
		"<p>",
		{ class: 'wrapper__text', text: chatgpt_response }
	);
	dom.addClass( 'active' ).append( text );
}

/**
 * TODO Short description.
 *
 * @param data
 */
function builderChart(data) {
	console.log('builderChart');
}

/**
 * TODO Short description.
 *
 * @param data
 */
function builderMessage(data) {
	const { tweets } = data;
	if (tweets === 'undefined') {
		return;
	}

	console.log(tweets);
}

/**
 * TODO Short description.
 *
 * @param user
 */
function searchByUser(user) {
	let url = 'https://jjpeleato.com/hackathon/20230930_0315.json';
	jQuery.ajax(
		{
			type: "GET",
			url: url,
			data: {
				'user': user,
			},
			dataType: 'json',
			crossDomain: true,
			cache: false,
			beforeSend: function () {
				console.log('beforeSend');
			},
			success: function (data, textStatus, jqXHR) {
				if (200 !== jqXHR.status) {
					return;
				}

				builderClarification(data);
				builderChart(data);
				builderMessage(data);
			},
			error: function () {
				console.log('error');
			}
		}
	);
}

/**
 * TODO Short description
 */
function userAction() {
	const userAction = jQuery( '.js-user-action' );
	userAction.on('click', function () {
		const user = jQuery( this ).attr( 'data-user' );
		searchByUser(user);
	});
}

/**
 * TODO Short description
 */
function initialize() {
	userAction();
}
