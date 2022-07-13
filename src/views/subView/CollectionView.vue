<template>
  <div style="display: flex">
    <div class="list-group">
      <div style="margin-bottom: 20px">
        <span>收藏列表</span>
        <span style="float: right"><a-icon type="plus"></a-icon> </span>
      </div>

      <a-list item-layout="horizontal" :data-source="groupData">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta>
              <template #title>
                <a-card size="small" class="meta-card" :bordered="false"
                        :headStyle="{border: 0}" :bodyStyle="{padding: '0 10px'}">
                  <template #title>{{ item.title }}</template>
                  <p style="margin: 5px 0 10px 0">{{ item.articleNum }}条内容</p>
                </a-card>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </div>

    <div class="list-container">
      <span>全部</span>
      <a-table :columns="columns" :data-source="data" :pagination="false">
        <template #bodyCell="{ column, text }">
          <template v-if="column.key === 'name'">
            <a>{{ text }}</a>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
const groupData = [
  { title: '全部', articleNum: 2 },
  { title: '不悲人生短暂', articleNum: 0 }
]

const columns = [
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '归属', dataIndex: 'baseName', key: 'baseName' },
  { title: '收藏时间', dataIndex: 'collectionTime', key: 'collectionTime' }
]

const data = [
  { key: '1', name: '图片存储优化', baseName: '吾有壮志凌云', collectionTime: '2022-05-08' },
  { key: '2', name: '环境搭建', baseName: '吾有壮志凌云', collectionTime: '2022-05-08' }
]

export default defineComponent({
  name: 'CollectionView',
  components: {
  },
  setup () {
    return {
      groupData,
      columns,
      data
    }
  }
})
</script>

<style scoped>
.list-group{
  float: left;
  width: 250px;
  height: 100vh;
  padding: 20px 12px;
  border-right: #eeeeee solid 1px;
} /deep/ .ant-list-split .ant-list-item{
    border: 0;
  }
.meta-card{
  background-color: #eeeeee;
  border-radius: 10px;
  width: 180px;
}

.list-container{
  padding: 20px 24px;
  width: 100vh;
}
</style>
