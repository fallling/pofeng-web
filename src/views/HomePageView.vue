<template>
  <a-layout>
    <a-layout-header class="header-wrapper">
      <HeaderBar></HeaderBar>
    </a-layout-header>

    <a-layout-content class="content-wrapper">
      <a-row :gutter="24">
        <a-col flex="296px">
          <a-card style="width: 296px" id="userInfo">
            <template #cover>
              <a-avatar :size="160" style="margin: auto" :src="user.avatar"></a-avatar>
            </template>
            <a-card-meta>
              <template #title>
                <div class="userInfo-name"> {{ user.nikeName }} </div>
              </template>
            </a-card-meta>
            <div class="userInfo-follow">
              <a-row :gutter="16">
                <a-col :span="12">
                  <a-statistic :value="user.noticer" class="userInfo-follow-item">
                    <template #title>
                      关注者
                    </template>
                  </a-statistic>
                </a-col>
                <a-col :span="12">
                  <a-statistic :value="user.follow" class="userInfo-follow-item">
                    <template #title>
                      关注了
                    </template>
                  </a-statistic>
                </a-col>
              </a-row>
            </div>

            <a-descriptions id="userInfo-detail" layout="vertical" :column="2">
              <a-descriptions-item label="真实姓名">周睿羊</a-descriptions-item>
              <a-descriptions-item label="手机">15674707652</a-descriptions-item>
              <a-descriptions-item label="地址">广东省深圳市</a-descriptions-item>
              <a-descriptions-item label="邮箱">1832385204@qq.com</a-descriptions-item>
              <a-descriptions-item label="简介">
                评论组件可用于对事物的讨论，例如页面、博客文章、问题等等。
              </a-descriptions-item>
            </a-descriptions>
          </a-card>
        </a-col>

        <a-col flex="auto">
          <a-card>
            <a-tabs>
              <a-tab-pane>
                <a-button style="width: 100%">添加自定义内容</a-button>

                <div class="detail-dynamic">
                  <h3>动态</h3>
                  <a-timeline>

                    <a-timeline-item v-for="item in dynamic" v-bind:key="item.id">
                      <div>
                        {{ user.nikeName }}
                        {{ item.event }}
                        {{ item.datetime }}
                      </div>

                      <div>
                        <a-card>
                          <a-card-meta>
                            <template #title>
                              {{item.document.title}}
                            </template>
                            <template #avatar>
                              <a-avatar :src="item.document.cover" />
                            </template>

                            <template #description>
                              <div>{{ item.document.describe }}</div>
                            </template>
                          </a-card-meta>
                        </a-card>
                      </div>

                    </a-timeline-item>

                  </a-timeline>
                </div>
              </a-tab-pane>
            </a-tabs>
          </a-card>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderBar from '@/components/HeaderBar.vue'

const dynamic = [
  {
    id: '1',
    event: '发布了文档',
    datetime: '2022-7-10 18:50:12',
    document: {
      id: '1',
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      title: '撞见你的微笑',
      describe: '成长是孤独的，必须搭建一个适合自己的知识体系（心智模型）'
    }
  }
]

const user = {
  id: '1',
  avatar: 'https://joeschmoe.io/api/v1/random',
  nikeName: '破风',
  realName: '冷志强',
  noticer: '2',
  follow: '4',
  location: '深圳市',
  create: '2',
  like: '23'
}
export default defineComponent({
  name: 'HomePageView',
  components: {
    HeaderBar
  },
  setup () {
    return {
      user,
      dynamic
    }
  }
})
</script>

<style scoped>
.header-wrapper {
  background: white;
}
.content-wrapper {
  padding: 24px 16px 36px
}
#userInfo .userInfo-name {
  text-align: center;
  font-size: 18px;
  font-weight: bolder;
}

#userInfo .userInfo-follow {
}

#userInfo .userInfo-follow .userInfo-follow-item {
  text-align: center;
}
.detail-dynamic {
  margin-top: 36px;
}
</style>
