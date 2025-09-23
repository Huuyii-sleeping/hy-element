<template>
    <div class="demo-column-width">
        <h3>自定义列宽</h3>
        <hy-table :data="tableData" border>
            <hy-table-column prop="date" label="日期" width="150" />
            <hy-table-column prop="name" label="姓名" width="120" />
            <hy-table-column prop="address" label="地址" min-width="200" />
        </hy-table>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles, CA 90001',
    },
    {
        date: '2016-05-02',
        name: 'Jerry',
        address: 'No. 189, Grove St, Los Angeles, CA 90002',
    },
])
</script>

<style scoped>
.demo-column-width {
    padding: 20px;
}
</style>