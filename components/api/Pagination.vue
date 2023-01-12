<template>
	<!-- Pagination -->
	<ul v-if="pagination != null" class="uk-pagination uk-flex uk-flex-center uk-margin">
		<li>
			<a v-if="hasPreviousPage" @click="onPageChange(getPreviousPage)">
				<i class="fas fa-arrow-left"></i>
			</a>

			<button class="buttonReset" v-else href="" disabled>
				<i class="fas fa-arrow-left" uk-tooltip="title: No previous page"></i>
			</button>
		</li>

		<template v-if="hasLeadingGutter">
			<li>
				<a @click="onPageChange(1)">
					1
				</a>
			</li>

			<li class="uk-disabled">
				<span>...</span>
			</li>
		</template>

		<template v-if="hasLeadingPages">
			<li v-for="page in getLeadingPages">
				<a @click="onPageChange(page)">
					{{ page }}
				</a>
			</li>
		</template>

		<li class="uk-active">
			<span>{{ getCurrentPage }}</span>
		</li>

		<template v-if="hasTrailingPages">
			<li v-for="page in getTrailingPages">
				<a @click="onPageChange(page)">
					{{ page }}
				</a>
			</li>
		</template>

		<template v-if="hasTrailingGutter">
			<li class="uk-disabled">
				<span>...</span>
			</li>

			<li>
				<a @click="onPageChange(getLastPage)">
					{{ pagination.totalPages }}
				</a>
			</li>
		</template>

		<li>
			<a v-if="hasNextPage" @click="onPageChange(getNextPage)">
				<i class="fas fa-arrow-right"></i>
			</a>

			<button class="buttonReset" v-else href="" disabled>
				<i class="fas fa-arrow-right" uk-tooltip="title: No next page"></i>
			</button>
		</li>
	</ul>
</template>

<style scoped>
	/*.uk-pagination {*/
	/*	display: inline-flex;*/
	/*	align-items: center;*/
	/*	background: #fefefe;*/
	/*	border: 1px solid #e3e8eb;*/
	/*	border-radius: 3px;*/
	/*}*/

	/*.uk-pagination > *:last-child {*/
	/*	padding-right: 20px;*/
	/*}*/

	/*.uk-pagination.attachedToPage {*/
	/*	position: relative;*/
	/*	top: -20px;*/
	/*	margin: 0;*/
	/*	border-top: none;*/
	/*	border-top-left-radius: 0;*/
	/*	border-top-right-radius: 0;*/
	/*}*/
</style>

<script>
	export default {
		props: {
			page: {
				type: Number,
				required: true
			},
			maxPages: {
			    type: Number,
				required: true
			}
		},
		data() {
		    return {
		        pagination: null
            }
		},
		mounted() {
			this.pagination = this.computePagination(this.page, this.maxPages);
		},
		watch: {
		    page: function(newValue, oldValue) {
		        this.page = newValue;
		        this.pagination = this.computePagination(newValue, this.maxPages);
			},
		    maxPages: function(newValue, oldValue) {
		        this.maxPages = newValue;
		        this.pagination = this.computePagination(this.page, newValue);
			},
		},
		computed: {
		    getCurrentPage: function() {
		        return this.page;
			},
			getLastPage: function() {
		        return this.pagination['total_pages'];
			},
			hasPreviousPage: function() {
		        return this.pagination.hasOwnProperty('previous_page');
			},
			getPreviousPage: function() {
		        return this.pagination['previous_page'];
			},
			hasNextPage: function() {
		        return this.pagination.hasOwnProperty('next_page');
			},
			getNextPage: function() {
		        return this.pagination['next_page'];
			},
			hasLeadingPages: function() {
		        return this.pagination.hasOwnProperty('pages_leading');
			},
			getLeadingPages: function() {
		        return this.pagination['pages_leading'];
			},
			hasTrailingPages: function() {
		        return this.pagination.hasOwnProperty('pages_trailing');
			},
			getTrailingPages: function() {
		        return this.pagination['pages_trailing'];
			},
			hasLeadingGutter: function() {
		        return this.pagination.hasOwnProperty('gutter_leading');
			},
			hasTrailingGutter: function() {
		        return this.pagination.hasOwnProperty('gutter_trailing');
			},
		},
		methods: {
			computePagination(page, totalPages) {
				let previousPage = -1;
				let nextPage = -1;

				// from left to right
				let leading = [];
				let trailing = [];

				if (page < 1) {
					page = 0
				}

				if (page > 1) {
					previousPage = page - 1;

					// populate leading
					for (let i = 1; page - i >= 1 && leading.length < 2; i++) {
						leading.push(page - i);
					}
				}

				// reverse because leading populator iterates incrementally
				leading = leading.reverse();

				if (page < totalPages) {
					nextPage = page + 1;

					// populate trailing
					for (let i = 1; page + i <= totalPages && trailing.length < 2; i++) {
						trailing.push(page + i);
					}
				}

				let pagination = {
					total_pages: totalPages
				};

				if (leading.length > 0) {
					pagination['pages_leading'] = leading
				}

				if (trailing.length > 0) {
					pagination['pages_trailing'] = trailing
				}

				if (previousPage !== -1) {
					pagination['previous_page'] = previousPage
				}

				if (nextPage !== -1) {
					pagination['next_page'] = nextPage
				}

				if (leading > 0) {
					if (leading[leading.length - 1] > 2) {
						pagination['gutter_leading'] = true
					}
				}

				if (trailing > 0) {
					if (trailing[trailing.length - 1] < totalPages - 1) {
						pagination['gutter_trailing'] = true
					}
				}

				return pagination
			},
			onPageChange(page) {
			    this.$emit('page-change', page);
			}
		}
	}
</script>
