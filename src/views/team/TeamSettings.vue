<template>
  <a-card title="设置" >
    <a-tabs
      default-active-key="1"
      :tab-position="'left'">
      <a-tab-pane key="1" tab="基础设置">
        <a-card title="基础设置">
          <a-form style="width: 348px" class="form-style">
            <a-form-item label="名称">
              <a-input></a-input>
            </a-form-item>

            <a-form-item label="简介">
              <a-textarea :auto-size="{ minRows: 2, maxRows: 6 }">
              </a-textarea>
            </a-form-item>

            <a-form-item label="头像">
              <a-upload
                name="avatar"
                style="padding-left: 24px"
                list-type="picture"
                :show-upload-list="false"
                action="//jsonplaceholder.typicode.com/posts/">

                <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                <div v-else>
                  <LoadingOutlined v-if="loading"></LoadingOutlined>
                  <PlusOutlined v-else></PlusOutlined>
                  <div class="ant-upload-text">Upload</div>
                </div>

              </a-upload>
            </a-form-item>

            <a-form-item>
              <a-button>更新</a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-tab-pane>

      <a-tab-pane key="2" tab="高级设置" force-render>
        <a-card title="删除团队">
          <div style="padding: 12px 8px">删除权限只有团队管理员拥有。注意！删除团队后，你将丢失该团队中的所有数据。</div>
          <a-button type="danger" @click="deleteTeam">删除团队</a-button>
        </a-card>
      </a-tab-pane>

      <a-tab-pane key="3" tab="权限">
        <a-card title="成员角色权限设置">
          管理员<br>
          管理员拥有所有权限
          <a-list item-layout="horizontal">
            团队权限
            <a-list-item>
              允许成员添加、删除成员
              <a-switch @change="onChange" />
            </a-list-item>
            <a-list-item>
              允许成员新建、删除知识库
              <a-switch @change="onChange" />
            </a-list-item>

            知识库权限
            <a-list-item>
              允许成员添加、删除知识库成员
              <a-switch @change="onChange" />
            </a-list-item>
            <a-list-item>
              允许成员导出知识库
              <a-switch @change="onChange" />
            </a-list-item>
            <a-list-item>
              允许成员分享知识库
              <a-switch @change="onChange" />
            </a-list-item>
            <a-list-item>
              允许成员分享文档
              <a-switch @change="onChange" />
            </a-list-item>
            <a-list-item>
              允许成员导出文档
              <a-switch @change="onChange" />
            </a-list-item>
          </a-list>

        </a-card>
      </a-tab-pane>

      <a-tab-pane key="4" tab="安全日志">
        <a-card title="安全日志">
          <a-table :columns="columns" :data-source="data">

          </a-table>
        </a-card>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { deleteTeam } from '@/axios/api'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'TeamSettings',
  props: ['teamId'],
  components: {
    LoadingOutlined,
    PlusOutlined
  },
  setup (props) {
    const router = useRouter()
    // 删除团队
    const handleDeleteTeam = () => {
      console.log('删除团队', props.teamId)
      deleteTeam(props.teamId).then(resp => {
        console.log(resp)
        message.success('删除成功')
        router.push({
          path: '/home'
        })
      })
    }
    return {
      handleDeleteTeam
    }
  }
})
</script>

<style scoped>

</style>
