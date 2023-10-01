/**
 * The `cleanLoader` function reset and clear the loading content.
 */
function cleanLoader() {
	jQuery('.loader').remove();
}

/**
 * The `cleanDom` function resets and clears the content of specific page elements.
 */
function cleanDom() {
	jQuery('.js-user-toxic').removeClass( 'active' ).empty();
	jQuery('.js-user-topic').removeClass( 'active' ).empty();
	jQuery('.js-user-clarification').removeClass( 'active' ).empty();
	jQuery('.js-user-chart').removeClass( 'active' ).empty();
	jQuery('.js-user-message').removeClass( 'active' ).empty();
	jQuery('.js-user-title').removeClass( 'active' ).empty();
}

/**
 * The `builderTitle` function is responsible for constructing and
 * displaying a user title.
 *
 * @param user
 */
function builderTitle(user) {
	const dom = jQuery('.js-user-title');
	const title = jQuery(
		"<h2>",
		{ class: 'wrapper__title', text: user }
	);
	const loader = jQuery(
		"<span>",
		{ class: 'loader' }
	);
	dom.addClass( 'active' ).append(title, loader);
}

/**
 *
 * The `builderUserToxic` function is responsible for constructing and
 * displaying a user toxic part.
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
		"<h3>",
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
 *
 * The `builderUserTopic` function is responsible for constructing and
 * displaying a user topic part.
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
		"<h3>",
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
 * The `builderClarification` function is responsible for constructing and
 * displaying a clarification part.
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
		"<h3>",
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
 * The `builderClarification` function is responsible for constructing and
 * displaying a clarification part.
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
		"<h3>",
		{ class: 'wrapper__title', text: 'Sentiment sequence' }
	);
	let list = [];
	sentiment_sequence.forEach((obj) => {
		let classes = 'wrapper__tag';
		if (obj === 'Positivo') {
			classes += ' positive';
		} else if (obj === 'Negativo') {
			classes += ' negative';
		} else {
			classes += ' neutral';
		}
		const item = jQuery(
			"<span>",
			{ class: classes, text: obj }
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
 * The `builderMessage` function is responsible for constructing and displaying a message part.
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
		"<h3>",
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
		if (sentiment === 'Positivo') {
			classes += ' positive';
		} else if (sentiment === 'Negativo') {
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
		jQuery( "<div>", { class: 'wrapper__messages' } ).append(list)
	);
}

/**
 * The `searchByUser` function performs a user search operation, fetching and
 * displaying relevant data. It integrates with jQuery for AJAX requests and DOM manipulation.
 *
 * @param user
 */
function searchByUser(user) {
	let url = 'http://127.0.0.1:8088/';
	if (window.location.hostname === 'web.psychonet.lndo.site') {
		url = 'https://jjpeleato.com/hackathon/20230930_0600.json';
	} else {
		url += user;
	}

	cleanDom();
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

				cleanLoader();
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
 * The `userAction` function enhances user interaction by enabling a click event
 * on elements with the class 'js-user-action.'
 */
function userAction() {
	const userAction = jQuery( '.js-user-action' );
	userAction.on('click', function () {
		const user = jQuery(this).attr('data-user');
		searchByUser(user);
	});
}

/**
 * The `initialize` function serves as the entry point for setting up and initializing
 * various functionalities within the application. In this context, it calls the `userAction`
 * function to enable user interaction enhancements.
 */
function initialize() {
	userAction();
}
