<template>
  <div class="flex p-4">
    <CollapseContainer title="右侧操作按钮" class="w-1/3 mr-4">
      <BasicTree :treeData="treeData" :actionList="actionList" />
    </CollapseContainer>

    <CollapseContainer title="右键菜单" class="w-1/3 mr-4">
      <BasicTree :treeData="treeData" :beforeRightClick="getRightMenuList" />
    </CollapseContainer>
  </div>
</template>
<script lang="ts">
  import { defineComponent, h } from 'vue';
  import { BasicTree, ActionItem, ContextMenuItem } from '/@/components/Tree/index';
  import { treeData } from './data';
  import { CollapseContainer } from '/@/components/Container/index';
  import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue';
  export default defineComponent({
    components: { BasicTree, CollapseContainer },
    setup() {
      function handlePlus(node: any) {
        console.log(node);
      }

      function getRightMenuList(node: any): ContextMenuItem[] {
        return [
          {
            label: '新增',
            handler: () => {
              console.log('点击了新增', node);
            },
            icon: 'ant-design:plus-outlined',
          },
          {
            label: '删除',
            handler: () => {
              console.log('点击了删除', node);
            },
            icon: 'ant-design:folder-open-filled',
          },
        ];
      }
      const actionList: ActionItem[] = [
        {
          render: (node) => {
            return h(PlusOutlined, {
              class: 'ml-2',
              onClick: () => {
                handlePlus(node);
              },
            });
          },
        },
        {
          render: () => {
            return h(DeleteOutlined);
          },
        },
      ];
      return { treeData, actionList, getRightMenuList };
    },
  });
</script>
