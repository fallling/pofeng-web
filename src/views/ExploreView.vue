<template>
    <a-layout>
      <a-layout-header class="header-wrapper">
        <HeaderBar></HeaderBar>
      </a-layout-header>

      <a-layout-content id="content-wrapper">
        <a-tabs
          v-model:activeKey="activeKey"
          :destroyInactiveTabPane="true"
        >
          <a-tab-pane key="follow" tab="动态">

            <a-row :gutter="36">
              <a-col>
                <div id="dynamic-module">
                  <a-card
                    v-for="item in dynamics"
                    v-bind:key="item.id"
                    style="width: 696px; height: 196px; margin-bottom: 12px;" :bodyStyle="{ padding: '12px 36px' }">
                    <template #title>
                      <a-avatar :src="item.avatar">
                      </a-avatar>
                      <span style="font-size: 14px; margin-left: 16px; font-weight: bolder">{{ item.user }}</span>
                      <span style="font-size: 14px; margin: 0 16px">{{ item.event }}</span>
                      <span style="font-size: 14px;">{{ item.target }}</span>
                      <span style="font-size: 14px; margin-left: 16px;">{{ item.time }}</span>
                    </template>
                    <a-card-meta>

                      <template #avatar v-if="item.document.cover !== ''">
                        <img height="111" alt="example"
                             src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>
                      </template>

                      <template #title>文章标题</template>

                      <template #description>
                        <div class="description-card">{{ item.document.describe }}</div>
                        <div class="action-card">
                          <span class="action-item"><LikeOutlined/>{{ item.document.like }}</span>
                          <span class="action-item"><StarOutlined/>{{ item.document.star }}</span>
                          <span class="action-item"><MessageOutlined/>{{ item.document.comment }}</span>
                        </div>
                      </template>

                    </a-card-meta>
                  </a-card>
                </div>
              </a-col>

              <a-col>
                <div id="follow-module">
                  <a-card
                    title="关注的人"
                    style="width: 330px; margin-bottom: 12px;">
                    <template #extra><a>更多</a></template>

                    <a-list item-layout="horizontal" :data-source="followUserList">
                      <template #renderItem="{ item }">
                        <a-list-item>
                          <a-list-item-meta>
                            <template #title>
                              <a>{{ item.nikeName }}</a>
                            </template>
                            <template #avatar>
                              <a-avatar :src="item.avatar" />
                            </template>
                            <template #description><div class="describe-2">{{ item.describe }}</div></template>
                          </a-list-item-meta>
                        </a-list-item>
                      </template>
                    </a-list>
                  </a-card>

                  <a-card title="关注的知识库" style="margin-top: 15px">
                    <template #extra><a>更多</a></template>

                    <a-list item-layout="horizontal" :data-source="followBaseList">
                      <template #renderItem="{ item }">
                        <a-list-item>
                          <a-list-item-meta>
                            <template #title>
                              <a>{{ item.baseName }}</a>
                            </template>
                            <template #avatar>
                              <a-avatar :src="item.cover" />
                            </template>
                            <template #description><div class="describe-2">{{ item.describe }}</div></template>
                          </a-list-item-meta>
                        </a-list-item>
                      </template>
                    </a-list>

                  </a-card>
                </div>
              </a-col>
            </a-row>

          </a-tab-pane>
          <a-tab-pane key="recommend" tab="推荐" force-render>
            <a-row :gutter="36">
              <a-col>
                <div id="recommend-module">
                  <a-card
                    v-for="item in recommendDocumentList"
                    v-bind:key="item.id"
                    style="width: 696px; margin-bottom: 12px;">
                    <a-card-meta>
                      <template #title> {{ item.title }} </template>

                      <template #avatar v-if="item.cover !== ''">
                        <img
                          alt="example"
                          height="128"
                          :src="item.cover"/>
                      </template>
                      <template #description>
                        <div class="description-card">
                          {{ item.describe }}
                        </div>

                        <div>
                          <div class="action-card">
                            <span class="action-item"><UserOutlined/><span style="margin-left: 5px">{{ item.author }}</span></span>
                            <span class="action-item"><LikeOutlined/><span style="margin-left: 5px">{{ item.like }}</span></span>
                            <span class="action-item"><StarOutlined/><span style="margin-left: 5px">{{ item.star }}</span></span>
                            <span class="action-item"><MessageOutlined/><span style="margin-left: 5px">{{ item.comment }}</span></span>
                          </div>
                        </div>
                      </template>
                    </a-card-meta>
                  </a-card>
                </div>
              </a-col>

              <a-col>
                <div id="recommend-base">
                  <a-card title="你感兴趣的知识库" style="width:330px">
                    <a-list item-layout="horizontal" :data-source="recommendBaseList">
                      <template #renderItem="{ item }">
                        <a-list-item>
                          <a-list-item-meta>
                            <template #title><a>{{ item.title }}</a></template>

                            <template #avatar>
                              <a-avatar src="https://joeschmoe.io/api/v1/random" />
                            </template>

                            <template #description>
                              <div class="describe-2">{{ item.describe }}</div>
                            </template>
                          </a-list-item-meta>
                        </a-list-item>
                      </template>
                    </a-list>
                  </a-card>
                </div>
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </a-layout-content>
    </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { UserOutlined, LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons-vue'
import HeaderBar from '@/components/HeaderBar.vue'

interface Document {
  id: string
  cover: string,
  title: string,
  describe: string,
  author: string,
  like: number,
  star: number,
  comment: number
}
interface User {
  id: string,
  nikeName: string,
  avatar: string,
  describe: string,
}

interface Base {
  id: string,
  cover: string,
  baseName: string,
  describe: string,
}

const dynamics = [
  {
    id: '1',
    avatar: 'https://joeschmoe.io/api/v1/random',
    user: '毕小烦',
    event: '点赞',
    target: '安慕希',
    time: '06-18 19:24',
    document: {
      cover: '',
      title: '健康防猝指南',
      describe: '谁都怕委屈恶趣味去撒旦积累和蜕变卷首语：最近大半年陆续跟一些朋友交流，她们问我何以有今天的心态或者能量，我想，那不如写写吧。只是从个人角度出发',
      like: 12,
      star: 24,
      comment: 5
    }
  },
  {
    id: '1',
    avatar: 'https://joeschmoe.io/api/v1/random',
    user: '冷志强',
    event: '发布',
    target: '吾有壮志凌云',
    time: '06-18 19:24',
    document: {
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      title: '健康防猝指南',
      describe: '谁都怕委屈恶趣味去撒旦积累和蜕变卷首语：最近大半年陆续跟一些朋友交流，她们问我何以有今天的心态或者能量，我想，那不如写写吧。只是从个人角度出发',
      like: 12,
      star: 24,
      comment: 5
    }
  }
]

const followUserList: User[] = [
  {
    id: '1',
    nikeName: '安小烦',
    avatar: 'https://joeschmoe.io/api/v1/random',
    describe: '如果没有记录和回顾，6天后便会忘记75%的内容 读书笔记正是帮助你记录和回顾的'
  }
]

const followBaseList: Base[] = [
  {
    id: '1',
    cover: '',
    baseName: '吾有壮志凌云',
    describe: 's'
  },
  {
    id: '2',
    cover: '',
    baseName: '墨者修齐',
    describe: '墨者修齐 2022-06 月刊。这里记录我们精心准备的数据可视化信息，完全免费，每月月初发布。'
  }
]

const recommendDocumentList: Document[] = [
  {
    id: '1',
    cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    title: '软件测试周刊',
    describe: '严选数据质量保障是怎么做的？关于接口测试自动化的总结与思考；百度智能测试在测试自动执行领域的实践；微信是如何防止崩溃的？如何把度量引导到正确的方',
    author: '安小凡',
    like: 15,
    star: 25,
    comment: 12
  }, {
    id: '1',
    cover: '',
    title: '你的顾客需要一个好故事-读书笔记',
    describe: '💡 根据 遗忘曲线：如果没有记录和回顾，6天后便会忘记75%的内容 读书笔记正是帮助你记录和回顾的工具，不必拘泥于形式，其核心是：记录、翻',
    author: '曲线救国',
    like: 45,
    star: 65,
    comment: 785
  }

]

const recommendBaseList: Base[] = [
  {
    id: '1',
    cover: '',
    baseName: '项目总结',
    describe: '聚会安排'
  }, {
    cover: '',
    id: '1',
    baseName: '升级问题安排',
    describe: '写在前面：本文档保存了我出于工作惯性打开平日的daily review文档，可我暂时不需要工作时，会记录下些什么。我通过留下真实生活的证据，来'
  }
]
export default defineComponent({
  name: 'ExploreView',
  components: {
    HeaderBar,
    LikeOutlined,
    MessageOutlined,
    StarOutlined,
    UserOutlined
  },
  setup () {
    const activeKey = ref('follow')
    return {
      activeKey,
      dynamics,
      followBaseList,
      followUserList,
      recommendDocumentList,
      recommendBaseList
    }
  }
})

</script>

<style lang="scss" scoped>
.header-wrapper {
  display: flex;
  background-color: white;
  height: 64px;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
}
#content-wrapper {
  margin: auto;
  width: 1100px;
  padding: 0 16px;
}
#dynamic-module {

}
#dynamic-module .follow-card {
  width: 696px;
  padding: 24px;
  background: white;
}
#dynamic-module .description-card {
  height: 45px;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  overflow: hidden;
  display: -webkit-box;
  margin-bottom: 8px;
}
.action-card .action-item {
  margin-right: 16px;
}

.description-3 {
  height: 66px;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  overflow: hidden;
  display: -webkit-box;
  margin-bottom: 8px;
}

.describe-2 {
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  overflow: hidden;
  display: -webkit-box;
  margin-bottom: 8px;
}
</style>
