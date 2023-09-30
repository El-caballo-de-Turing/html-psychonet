/**
 * TODO Short description.
 *
 * @param data
 */
function builderUserToxic(data) {
	const dom = jQuery('.js-user-toxic');
	dom.removeClass( 'active' ).empty();

	const { enriched_information } = data;
	if (enriched_information === 'undefined') {
		return;
	}

	const { toxic_interactions } = enriched_information;
	if (toxic_interactions === 'undefined') {
		return;
	}

	const title = jQuery(
		"<h2>",
		{ class: 'wrapper__title', text: 'Toxic users' }
	);
	let list = [];
	toxic_interactions.forEach((obj) => {
		const item = jQuery(
			"<span>",
			{ class: 'wrapper__tag', text: obj }
		);
		list.push(item);
	});

	dom.addClass( 'active' ).append(
		title,
		jQuery( "<div>", { class: 'wrapper__list' } ).append(list)
	);
}

/**
 * TODO Short description.
 *
 * @param data
 */
function builderUserTopic(data) {
	const dom = jQuery('.js-user-topic');
	dom.removeClass( 'active' ).empty();

	const { enriched_information } = data;
	if (enriched_information === 'undefined') {
		return;
	}

	const { negative_topics } = enriched_information;
	if (negative_topics === 'undefined') {
		return;
	}

	const title = jQuery(
		"<h2>",
		{ class: 'wrapper__title', text: 'Negative topics' }
	);
	let list = [];
	negative_topics.forEach((obj) => {
		const item = jQuery(
			"<span>",
			{ class: 'wrapper__tag', text: obj }
		);
		list.push(item);
	});

	dom.addClass( 'active' ).append(
		title,
		jQuery( "<div>", { class: 'wrapper__list' } ).append(list)
	);
}

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

	const title = jQuery(
		"<h2>",
		{ class: 'wrapper__title', text: 'Clarifications (By ChatGPT)' }
	);
	const text = jQuery(
		"<p>",
		{ class: 'wrapper__text', text: chatgpt_response }
	);
	dom.addClass( 'active' ).append( title, text );
}

/**
 * TODO Short description.
 *
 * @param data
 */
function builderChart(data) {
	const dom = jQuery('.js-user-chart');
	dom.removeClass( 'active' ).empty();

	const { enriched_information } = data;
	if (enriched_information === 'undefined') {
		return;
	}

	const { sentiment_sequence } = enriched_information;
	if (sentiment_sequence === 'undefined') {
		return;
	}

	const title = jQuery(
		"<h2>",
		{ class: 'wrapper__title', text: 'Sentiment sequence' }
	);
	let list = [];
	sentiment_sequence.forEach((obj) => {
		const item = jQuery(
			"<span>",
			{ class: 'wrapper__tag', text: obj }
		);
		list.push(item);
	});

	dom.addClass( 'active' ).append(
		title,
		jQuery( "<div>", { class: 'wrapper__list' } ).append(list)
	);
}

/**
 * TODO Short description.
 *
 * @param data
 */
function builderMessage(data) {
	const dom = jQuery('.js-user-message');
	dom.removeClass( 'active' ).empty();

	const { tweets } = data;
	if (tweets === 'undefined') {
		return;
	}

	const title = jQuery(
		"<h2>",
		{ class: 'wrapper__title', text: 'Messages' }
	);
	let list = [];
	tweets.forEach((obj) => {
		const { hashtags, mentions, original_text, rts, sentiment } = obj;

		const domText = jQuery(
			"<p>",
			{ class: 'wrapper__text', text: original_text }
		);
		const domHashtags = jQuery(
			"<p>",
			{ class: 'wrapper__text', text: hashtags }
		);
		const domMentions = jQuery(
			"<p>",
			{ class: 'wrapper__text', text: mentions }
		);
		const domRts = jQuery(
			"<p>",
			{ class: 'wrapper__text', text: rts }
		);
		const domSentiment = jQuery(
			"<p>",
			{ class: 'wrapper__text', text: sentiment }
		);
		let classes = 'wrapper__element';
		if (sentiment === 'Positiva') {
			classes += ' positive';
		} else if (sentiment === 'Negativa') {
			classes += ' negative';
		} else {
			classes += ' neutral';
		}

		list.push(
			jQuery( "<div>", { class: classes } ).append(
				domText,
				domHashtags,
				domMentions,
				domRts,
				domSentiment
			)
		);
	});

	dom.addClass( 'active' ).append(
		title,
		jQuery( "<div>", { class: 'wrapper__list' } ).append(list)
	);
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

				builderUserToxic(data);
				builderUserTopic(data);
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
