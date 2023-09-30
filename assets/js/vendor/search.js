/**
 * TODO Short description.
 */
function clearDom() {
	jQuery('.js-user-toxic').removeClass( 'active' ).empty();
	jQuery('.js-user-topic').removeClass( 'active' ).empty();
	jQuery('.js-user-clarification').removeClass( 'active' ).empty();
	jQuery('.js-user-chart').removeClass( 'active' ).empty();
	jQuery('.js-user-message').removeClass( 'active' ).empty();
}

/**
 * TODO Short description.
 *
 * @param user
 */
function builderTitle(user) {
	const dom = jQuery('.js-user-title');
	const title = jQuery(
		"<h3>",
		{ class: 'wrapper__title', text: user }
	);
	dom.addClass( 'active' ).append(title);
}

/**
 * TODO Short description.
 *
 * @param data
 */
function builderUserToxic(data) {
	const { enriched_information } = data;
	if (enriched_information === 'undefined') {
		return;
	}

	const { toxic_interactions } = enriched_information;
	if (toxic_interactions === 'undefined') {
		return;
	}
	if (toxic_interactions.length === 0) {
		return;
	}

	const title = jQuery(
		"<h2>",
		{ class: 'wrapper__title', text: 'Toxic users interactions' }
	);
	let list = [];
	toxic_interactions.forEach((obj) => {
		const item = jQuery(
			"<span>",
			{ class: 'wrapper__tag', text: obj }
		);
		list.push(item);
	});

	const dom = jQuery('.js-user-toxic');
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
	const { enriched_information } = data;
	if (enriched_information === 'undefined') {
		return;
	}

	const { negative_topics } = enriched_information;
	if (negative_topics === 'undefined') {
		return;
	}
	if (negative_topics.length === 0) {
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

	const dom = jQuery('.js-user-topic');
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
	const { enriched_information } = data;
	if (enriched_information === 'undefined') {
		return;
	}

	const { chatgpt_response } = enriched_information;
	if (chatgpt_response === 'undefined') {
		return;
	}
	if (chatgpt_response.length === 0) {
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

	const dom = jQuery('.js-user-clarification');
	dom.addClass( 'active' ).append( title, text );
}

/**
 * TODO Short description.
 *
 * @param data
 */
function builderChart(data) {
	const { enriched_information } = data;
	if (enriched_information === 'undefined') {
		return;
	}

	const { sentiment_sequence } = enriched_information;
	if (sentiment_sequence === 'undefined') {
		return;
	}
	if (sentiment_sequence.length === 0) {
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

	const dom = jQuery('.js-user-chart');
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
	const { tweets } = data;
	if (tweets === 'undefined') {
		return;
	}
	if (tweets.length === 0) {
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

	const dom = jQuery('.js-user-message');
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
	let url = 'http://127.0.0.1:8088/';
	if (window.location.hostname === 'web.psychonet.lndo.site') {
		url = 'https://jjpeleato.com/hackathon/20230930_0315.json';
	} else {
		url += user;
	}

	clearDom();
	builderTitle(user);

	jQuery.ajax(
		{
			type: "GET",
			url: url,
			dataType: 'json',
			crossDomain: true,
			cache: true,
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
