<template>
    <a v-if="forum.redirects" class="name" :href="forum.redirects">{{ forum.name }}</a>
    <nuxt-link v-else-if="page" class="name" :to="{ name: 'forums-slug', params: { slug: forum.slug }, query: { page: page } }">{{ forum.name }}</nuxt-link>
    <nuxt-link v-else class="name" :to="{ name: 'forums-slug', params: { slug: forum.slug } }">{{ forum.name }}</nuxt-link>
</template>

<script>
export default {
    props: {
        forum: {
            type: Object,
            required: true
        },
        page: {
            type: Number,
            required: false
        }
    }
}
</script>