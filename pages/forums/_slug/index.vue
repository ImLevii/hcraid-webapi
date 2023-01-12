<template>
	<div class="forum">
		<ul class="uk-breadcrumb">
			<li>
				<nuxt-link :to="{ name: 'forums' }">Forums</nuxt-link>
			</li>
			<li class="divider">
				<i class="fas fa-chevron-right"></i>
			</li>
			<li>
				<ForumLink :forum="this.forum"/>
			</li>
		</ul>

		<div class="page-section uk-margin">
			<div class="container">
				<div class="forum-header">
					<ForumLink :forum="this.forum" class="page-title forum-link" />

					<div class="forum-tools">
						<a class="sort">
							<span class="option-name">
								sort:
								<i v-bind:class="[this.getSortOptionClass]"></i>
								{{ this.sort }}
							</span>
							<i class="fas fa-chevron-down" style="position: relative; top: 2px; font-size: 9px"></i>
						</a>

						<div uk-dropdown="mode: click">
							<div class="dropdown-body">
								<ul class="uk-list menu-links">
									<li>
										<a @click="updateSort('HOT')">
											<i class="fab fa-hotjar"></i>
											Hot
										</a>
									</li>
									<li>
										<a @click="updateSort('NEW')">
											<i class="fas fa-sort-up" style="position: relative; top: 6px; font-size: 18px"></i>
											New
										</a>
									</li>
									<li>
										<a @click="updateSort('OLD')">
											<i class="fas fa-sort-down" style="position: relative; top: -2px; font-size: 18px"></i>
											Old
										</a>
									</li>
								</ul>
							</div>
						</div>

						<nuxt-link v-if="displayPostButton" :to="{ name: 'forums-slug-new', params: { slug: this.forum.slug } }" class="new-post">
							<i class="fas fa-plus"></i>
							<span class="text">New Post</span>
						</nuxt-link>
					</div>
				</div>

				<div class="structure">
					<div v-if="threads.length > 0" v-for="thread in threads" :key="thread.id" class="thread">
						<div class="identity">
							<div class="avatar">
							  <PlayerAvatar :username="thread.created_by.username" :uuid="thread.created_by.uuid" :size="26" />
							</div>

							<div class="details">
								<ThreadLink :thread="thread" class="name" />

								<span class="created">
									Created by
									<PlayerLink :user="thread.created_by"/>
									<DateDisplay :timestamp="thread.created_at" />
								</span>
							</div>
						</div>

						<div class="statistics">
							<div class="slot">
								<span class="number">{{ thread.statistics_replies }}</span>
								<span class="name">Replies</span>
							</div>
							<div class="slot">
								<span class="number">{{ thread.statistics_views }}</span>
								<span class="name">Views</span>
							</div>
						</div>

						<div class="activity">
							<div v-if="thread.last_reply" class="creator">
								<PlayerAvatar :user="thread.last_reply.created_by"/>
								<div class="details">
									<span>
										<PlayerLink :user="thread.last_reply.created_by"/>
										replied
									</span>
									<DateDisplay :timestamp="thread.last_reply.created_at"/>
								</div>
							</div>
							<span v-else class="creator uk-width-100">
								No replies yet
							</span>
						</div>
					</div>

					<div v-if="threads.length === 0" class="empty-forum" style="padding: 100px 0;">
						<i class="fal fa-snooze"></i>
						<span>Nobody has posted here yet...</span>
					</div>
				</div>

				<!-- Pagination -->
				<Pagination :page="page" :maxPages="maxPages" v-on:page-change="updatePage" uk-margin style="margin: 0 0 0 auto;"/>
			</div>
		</div>
	</div>
</template>

<style>
.structure > .thread > .avatar .player-avatar {
	width: 32px;
	height: 32px;
	box-sizing: border-box;
}

@media screen and (max-width: 959px) {
	.structure > .thread > .avatar .player-avatar {
		width: 20px !important;
		height: 20px !important;
	}
}
</style>

<style scoped>
	.forum-header {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-bottom: 6px;
		padding: 20px;
		background: #262626 url('~assets/images/experiment7.png') no-repeat;
		/*border: 2px solid rgba(156, 242, 255, 0.19);*/
		border-radius: 3px;
		background-size: cover;
		border: 1px solid #333;
		box-sizing: border-box;
		color: #fff;
	}

	.forum-header .forum-link {
		width: auto;
		display: block;
		margin: 0 6px 0 0;
		box-sizing: border-box;
		color: #fff;
	}

	.forum-tools {
		display: flex;
		align-items: center;
		flex-grow: 1;
		flex-shrink: 0;
	}

	.forum-tools > * {
		margin-right: 3px;
	}

	.forum-tools > *:last-child {
		margin-right: 0;
	}

	.forum-tools > a {
		height: 100%;
		display: flex;
		align-items: center;
		margin-left: 10px;
		border-radius: 3px;
		color: #fff;
		font-size: 13px;
		font-weight: bold;
		text-transform: lowercase;
		text-shadow: 0 1px 1px rgba(5, 5, 5, 0.3);
		box-sizing: border-box;
		opacity: 0.99;
	}

	.forum-tools > a:hover {
		font-weight: bold;
		text-decoration: none;
		text-shadow: 0 2px 10px #fff;
	}

	.forum-tools > a > i {
		font-size: 10px;
	}

	.forum-tools > a:hover > i {
		/*color: #8e2814;*/
	}

	.forum-tools > .sort > i {
		margin-left: 5px;
	}

	.forum-tools > .new-post > i {
		margin-right: 5px;
	}

	.forum-tools > .uk-dropdown {
		padding: 0;
		border-radius: 3px;
	}

	.forum-tools > .uk-dropdown .menu-links {
		margin-bottom: 0;
	}

	.forum-tools > .uk-dropdown .menu-links li {
		width: 100%;
		padding: 4px 10px;
		border-bottom: 1px solid #f5f8fa;
		box-sizing: border-box;
	}

	.forum-tools > .uk-dropdown .menu-links li > a {
		color: #6f6f6f;
		font-size: 14px;
		font-weight: bold;
		line-height: 12px;
		text-transform: uppercase;
	}

	.forum-tools > .uk-dropdown .menu-links li > a > i {
		width: 14px;
		text-align: center;
	}

	.forum-tools > .uk-dropdown .menu-links > li:nth-child(n+2),
	.forum-tools > .uk-dropdown .menu-links > li > ul {
		margin-top: 0;
	}

	.forum-tools > .uk-dropdown .menu-links > li:first-child {
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;
	}

	.forum-tools > .uk-dropdown .menu-links > li:last-child {
		border-bottom-left-radius: 3px;
		border-bottom-right-radius: 3px;
	}

	.page-section {
		padding: 20px;
	}

	.structure {
		border-radius: 3px;
		border: 1px solid #DFE7EB;
	}

	.structure > .thread {
		display: flex;
		padding: 8px 16px;
		background: #FEFEFE;
		border-radius: 2px;
		border-bottom: 1px solid #DFE7EB;
	}

	.structure > .thread:last-child {
		border-bottom: none;
	}

	.structure > .thread > .identity {
		display: flex;
		margin-right: auto;
	}

	.structure > .thread > .identity > .avatar {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		margin-right: 10px;
	}

	.structure > .thread > .identity > .details {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-right: auto;
		padding-right: 20px;
		font-size: 13px;
	}

	.structure > .thread > .identity > .details > .name {
		margin-bottom: 3px;
		color: #333;
		font-size: 16px;
		line-height: 14px;
		font-weight: bold;
		transition: color ease-in-out 0.15s;
	}

	.structure > .thread > .identity > .details > .name:hover {
		color: #0f6ecd;
		text-decoration: none;
	}

	.structure > .thread > .identity > .details > .created {
		font-size: 11px;
		line-height: 10px;
	}

	.structure > .thread > .statistics {
		display: flex;
		flex-shrink: 0;
		margin-right: 20px;
	}

	.structure > .thread > .statistics > .slot {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-right: 20px;
	}

	.structure > .thread > .statistics > .slot:last-child {
		margin-right: 0;
	}

	.structure > .thread > .statistics > .slot > .name {
		font-size: 11px;
		text-transform: uppercase;
	}

	.structure > .thread > .statistics > .slot > .number {
		font-size: 14px;
		font-weight: bold;
	}

	.structure > .thread > .activity {
		width: 20%;
		display: flex;
		flex-shrink: 0;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		font-size: 13px;
		line-height: 13px;
	}

	.structure > .thread > .activity > .name:hover {
		color: #616161;
		text-decoration: none;
	}

	.structure > .thread > .activity > .creator {
		display: flex;
		align-items: center;
		font-size: 12px;
		line-height: 12px;
	}

	.structure > .thread > .activity > .creator > .details {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	@media screen and (max-width: 640px) {
		.forum-header .forum-link {
			margin-right: 10px;
		}

		.forum-tools {
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}

		.forum-tools {
			flex-direction: row;
			flex-grow: 0;
			flex-shrink: 1;
			margin-left: auto;
		}

		.forum-tools > a {
			margin-left: 0;
			flex-shrink: 0;
			flex-grow: 1;
		}

		.forum-tools > * {
			margin-right: 10px;
		}

		.structure > .thread {
			flex-direction: column;
		}

		.structure > .thread > .details > .name {
			font-size: 14px;
		}

		.structure > .thread > .details {
			padding-right: 6px;
		}

		.structure > .thread > .statistics {
			display: none;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		.structure > .thread > .statistics > .slot {
			margin: 0;
		}

		.structure > .thread > .activity {
			display: none;
		}
	}

	.empty-forum {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 100px 0;
	}

	.empty-forum i {
		font-size: 96px;
		opacity: 0.99;
	}

	.empty-forum span {
		margin-top: 10px;
		font-family: 'Rajdhani', sans-serif;
		text-transform: uppercase;
		opacity: 0.99;
	}
</style>

<style>
	.structure > .thread > .activity > .creator .player-avatar {
		width: 24px;
		height: 24px;
		margin-right: 6px;
	}

	.forum-tools .option-name i {
		position: relative;
	}

	.forum-tools .option-name .fab.fa-hotjar {
		font-size: 11px;
		top: -1px;
	}

	.forum-tools .option-name .fas.fa-sort-up {
		font-size: 15px;
		top: 5px;
	}

	.forum-tools .option-name .fas.fa-sort-down {
		font-size: 15px;
		top: -1px;
	}
</style>

<script>
export default {
    layout: 'forums-sidebar',
    async asyncData({$axios, route}) {
        const forum = route.params.slug;
        const sort = route.query.sort || 'HOT';
        const page = parseInt(route.query.pg) || 1;

        const data = {
            sort: sort,
            page: page
		};

        await $axios
            .get('/forums/' + forum + '/')
            .then(result => {
                data.forum = result.data['forum'];

                if (result.data.hasOwnProperty('can_post')) {
                    data.canPost = result.data['can_post'];
				}
            })
            .catch(error => {
                console.log(error);
            });

        await $axios
            .get('/forums/' + forum + '/threads?sort=' + sort + '&page=' + page)
            .then(result => {
                data.threads = result.data['threads'];
				data.maxPages = result.data['max_pages'];
            })
            .catch(error => {
                console.log(error);
            });

        return data;
    },
    data() {
        return {
            loaded: false,
            forum: null,
			page: 1,
			maxPages: -1,
			sort: 'NEW',
			canPost: false,
            truncate: require('~/assets/script/text.js').truncate,
        }
    },
    head() {
        if (this.page === 1) {
            return { title: this.forum.name }
		} else {
            return { title: this.forum.name + " (Pg " + this.page + ")" }
		}
    },
	methods: {
        updateSort(sort) {
            this.sort = sort;
            this.updateURL();
            this.fetchResults();
		},
		updatePage(page) {
            this.page = page;
            this.updateURL();
            this.fetchResults();
		},
		updateURL() {
            this.$router.push({path: this.$nuxt.$route.path, query: { sort: this.sort, pg: this.page }});
		},
		async fetchResults() {
            this.loaded = false;

			return await this.$axios
				.get('/forums/' + this.forum.slug + '/threads/?sort=' + this.sort + '&page=' + this.page)
				.then(result => {
					this.threads = result.data['threads'];
					this.maxPages = result.data['max_pages'];
				})
				.catch(error => {
					console.log(error);
				});
		}
	},
	computed: {
        displayPostButton: function() {
            return this.$auth.loggedIn && this.canPost;
		},
		getSortOptionClass: function() {
            switch (this.sort) {
				case "HOT":
				    return "fab fa-hotjar";
                case "NEW":
                    return "fas fa-sort-up";
				case "OLD":
				    return "fas fa-sort-down";
				default:
				    return "";
            }
		}
	}
}
</script>
