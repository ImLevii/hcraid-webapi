<template>
  <div class="page-section">
    <div class="category" v-for="category in categories" :key="category.id">
      <div class="title">
        <span>{{ category.name }}</span>
      </div>

      <div class="structure">
        <div class="forum" v-for="forum in category.children" :key="forum.id">
          <div class="identity">
            <div class="icon">
              <i :class="forum.icon" />
            </div>

            <div class="uk-flex uk-flex-column">
              <ForumLink :forum="forum" />
              <p class="description">{{ forum.description }}</p>
            </div>
          </div>

          <div class="statistics">
            <div class="slot">
              <span class="number">{{ forum.statistics_threads }}</span>
              <span class="name">Threads</span>
            </div>
            <div class="slot">
              <span class="number">{{ forum.statistics_posts }}</span>
              <span class="name">Posts</span>
            </div>
          </div>

          <div class="activity">
            <template v-if="forum.last_thread">
              <PlayerAvatar
                v-if="forum.last_thread.last_reply"
                :user="forum.last_thread.last_reply.created_by"
              />
              <PlayerAvatar v-else :user="forum.last_thread.created_by" />

              <div class="details">
                <ThreadLink
                  :thread="forum.last_thread"
                  :charLimit="30"
                  class="thread-name"
                />

                <div v-if="forum.last_thread.last_reply" class="creator-name">
                  <span>
                    <PlayerLink
                      :user="forum.last_thread.last_reply.created_by"
                    />
                    replied
                  </span>

                  <DateDisplay
                    :timestamp="forum.last_thread.last_reply.created_at"
                  />
                </div>
                <div v-else class="creator-name">
                  <span>
                    Created by
                    <PlayerLink :user="forum.last_thread.created_by" />
                  </span>

                  <DateDisplay :timestamp="forum.last_thread.created_at" />
                </div>
              </div>
            </template>
            <span v-else class="empty"> no recent activity </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-section {
  width: auto;
  padding: 20px;
}

.category {
  margin-bottom: 20px;
}

.category:last-child {
  margin-bottom: 0;
}

.category > .title {
  position: relative;
  display: block;
  padding: 20px;
  margin-bottom: 6px;
  background: #262626 url("~assets/images/experiment7.png") no-repeat;
  /*border: 2px solid rgba(156, 242, 255, 0.19);*/
  border-radius: 3px;
  background-size: cover;
  border: 1px solid #333;
  box-sizing: border-box;
}

/* Applies a shiny border effect */
.category > .title::after {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  content: "";
  border: 2px solid rgba(155, 155, 155, 0.1);
}

.category > .title > span {
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  line-height: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.99;
}

.category > .structure {
  z-index: 997;
  background: #fff;
  border: 1px solid #dfe7eb;
  border-radius: 3px;
}

.category > .structure > .forum {
  display: flex;
  padding: 12px 16px;
  /* background: #fafafa; */
  background: #fefefe;
  border-bottom: 1px solid #dfe7eb;
  border-radius: 3px;
}

.category > .structure > .forum:last-child {
  margin-bottom: 0;
  border-bottom: none;
}

.category > .structure > .forum > .identity > .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  margin-right: 16px;
}

.category > .structure > .forum > .identity > .icon > i {
  color: #333;
  font-size: 24px;
  text-align: center;
}

.category > .structure > .forum > .identity {
  display: flex;
  justify-content: center;
  margin-right: auto;
}

.category > .structure > .forum > .identity .name {
  display: block;
  margin-bottom: 3px;
  color: #333;
  font-size: 18px;
  font-weight: bold;
  line-height: 18px;
  transition: color ease-in-out 0.15s;
}

.category > .structure > .forum > .identity .name:hover {
  color: #0f6ecd;
}

.category > .structure > .forum > .identity .description {
  margin: 0;
  font-size: 12px;
  line-height: 12px;
}

.category > .structure > .forum > .statistics {
  display: flex;
  min-width: 20%;
}

.category > .structure > .forum > .statistics > .slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
}

.category > .structure > .forum > .statistics > .slot:last-child {
  margin-right: 0;
}

.category > .structure > .forum > .statistics > .slot > .name {
  font-size: 11px;
  line-height: 11px;
  text-transform: lowercase;
}

.category > .structure > .forum > .statistics > .slot > .number {
  font-size: 14px;
  line-height: 13px;
  font-weight: bold;
  margin-bottom: 3px;
}

.category > .structure > .forum > .activity {
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  width: 25%;
  padding: 0 10px;
  font-size: 13px;
  line-height: 13px;
}

.category > .structure > .forum > .activity > .details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.category > .structure > .forum > .activity > .details .creator-name {
  display: flex;
  flex-direction: column;
  font-size: 11px;
  line-height: 11px;
}

.forums-nav .nav-item {
  padding: 5px 10px;
  margin-right: 6px;
  background: #fefefe;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #333;
  font-weight: bold;
  text-transform: uppercase;
}

.forums-nav .nav-item:hover {
  text-decoration: none;
}

@media screen and (max-width: 640px) {
  .category > .structure > .forum {
    position: relative;
    flex-direction: column;
  }

  .category > .structure > .forum > div {
    width: 100%;
  }

  .category > .structure > .forum > .activity {
    display: none;
    padding: 0;
    width: 100%;
    justify-content: flex-start;
  }

  .category > .structure > .forum > .activity a {
    word-break: break-word;
  }

  .category > .structure > .forum > .activity .empty {
    display: none;
  }

  .category > .structure > .forum {
    padding-right: 110px;
  }

  .category > .structure > .forum > .identity {
    justify-content: flex-start;
  }

  .category > .structure > .forum > .identity > .name {
    font-size: 14px;
  }

  .category > .structure > .forum > .statistics {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: auto;
    margin-right: 20px;
    margin-top: 18px;
  }

  .category > .structure > .forum > .statistics > .slot {
    padding: 0;
    margin-right: 10px;
  }
}
</style>

<style>
.category > .structure > .forum > .activity .player-avatar {
  width: 24px;
  height: 24px;
  margin-right: 6px;
}

@media screen and (max-width: 640px) {
  .category > .structure > .forum > .activity .player-avatar {
    margin-right: 10px;
  }
}
</style>

<script>
export default {
  layout: "forums-sidebar",
  async asyncData({ $axios, route }) {
    return await $axios
      .get("/forums/")
      .then((result) => {
        return {
          categories: result.data,
        };
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      loaded: false,
      categories: null,
    };
  },
  head() {
    return {
      title: "Forums",
    };
  },
};
</script>
