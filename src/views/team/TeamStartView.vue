<template>
  <div class="content-container">
    <a-carousel>
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
    </a-carousel>

    <div class="list-container">
      <a-list :grid="{ gutter: 16, column: 4 }" :data-source="data">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-card :title="item.title">
              Card content
            </a-card>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const data = [
  { title: 'Title 1' },
  { title: 'Title 2' },
  { title: 'Title 3' },
  { title: 'Title 4' }
]
export default defineComponent({
  name: 'TeamStartView',
  setup () {
    return {
      data
    }
  }
})
</script>

<style scoped>
.content-container{
  padding: 24px 12px;
}

.list-container{
  padding-top: 24px;
}

/*.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 213px;
  line-height: 213px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}*/
</style>
