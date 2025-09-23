<template>
    <div class="demo-align">
        <h3>对齐方式</h3>
        <hy-table :data="tableData" border>
            <hy-table-column prop="date" label="日期" width="180" align="left" />
            <hy-table-column prop="name" label="姓名" width="120" align="center" />
            <hy-table-column prop="amount" label="金额" width="120" align="right" />
            <hy-table-column prop="address" label="地址" />
        </hy-table>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
    {
        date: '2016-05-03',
        name: 'Tom',
        amount: 129.8,
        address: 'No. 189, Grove St',
    },
    {
        date: '2016-05-02',
        name: 'Jerry',
        amount: 99.5,
        address: 'No. 190, Grove St',
    },
])
</script>

<style scoped>
.demo-align {
    padding: 20px;
}
</style>