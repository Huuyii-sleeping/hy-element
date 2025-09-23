// table.test.ts (放在components/table/目录下)
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import HyTable from './Table.vue'
// @ts-ignore
import HyTableColumn from './TableColumn.vue'

describe('HyTable', () => {
    const testData = [
        {
            id: 1,
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
        },
        {
            id: 2,
            date: '2016-05-02',
            name: 'Jerry',
            address: 'No. 189, Grove St, Los Angeles'
        },
        {
            id: 3,
            date: '2016-05-04',
            name: 'Alice',
            address: 'No. 189, Grove St, Los Angeles'
        }
    ]

    it('renders table with data correctly', async () => {
        const wrapper = mount({
            components: {
                HyTable,
                HyTableColumn
            },
            template: `
        <HyTable :data="tableData">
          <HyTableColumn prop="date" label="日期" />
          <HyTableColumn prop="name" label="姓名" />
          <HyTableColumn prop="address" label="地址" />
        </HyTable>
      `,
            data() {
                return {
                    tableData: testData
                }
            }
        })

        await nextTick()

        // 检查表头
        const headers = wrapper.findAll('th')
        expect(headers).toHaveLength(15)
        expect(headers[0].text()).toBe('日期')
        expect(headers[1].text()).toBe('姓名')
        expect(headers[2].text()).toBe('地址')

        // 检查表体行数
        const rows = wrapper.findAll('tbody tr')
        expect(rows).toHaveLength(3)
    })

    it('renders table with border correctly', async () => {
        const wrapper = mount({
            components: {
                HyTable,
                HyTableColumn
            },
            template: `
        <HyTable :data="tableData" border>
          <HyTableColumn prop="date" label="日期" />
        </HyTable>
      `,
            data() {
                return {
                    tableData: testData
                }
            }
        })

        await nextTick()

        expect(wrapper.find('.my-table').classes()).toContain('my-table--border')
    })

    it('renders table with stripe correctly', async () => {
        const wrapper = mount({
            components: {
                HyTable,
                HyTableColumn
            },
            template: `
        <HyTable :data="tableData" stripe>
          <HyTableColumn prop="date" label="日期" />
        </HyTable>
      `,
            data() {
                return {
                    tableData: testData
                }
            }
        })

        await nextTick()

        const rows = wrapper.findAll('tbody tr')
        // 第二行应该是斑马纹行（索引1）
        expect(rows[1].classes()).toContain('my-table__row--striped')
    })

    it('hides header when show-header is false', async () => {
        const wrapper = mount({
            components: {
                HyTable,
                HyTableColumn
            },
            template: `
        <HyTable :data="tableData" :show-header="false">
          <HyTableColumn prop="date" label="日期" />
        </HyTable>
      `,
            data() {
                return {
                    tableData: testData
                }
            }
        })

        await nextTick()

        expect(wrapper.find('thead').exists()).toBe(false)
    })

    it('applies column width styles correctly', async () => {
        const wrapper = mount({
            components: {
                HyTable,
                HyTableColumn
            },
            template: `
        <HyTable :data="tableData">
          <HyTableColumn prop="date" label="日期" width="200" />
          <HyTableColumn prop="name" label="姓名" width="150" />
        </HyTable>
      `,
            data() {
                return {
                    tableData: [testData[0]]
                }
            }
        })

        await nextTick()

        const headers = wrapper.findAll('th')
        const firstHeader = headers[0]
        const secondHeader = headers[1]

        // 检查内联样式
        expect(firstHeader.attributes('style')).toContain('width: 200px')
        expect(secondHeader.attributes('style')).toContain('width: 150px')
    })

    it('applies column alignment correctly', async () => {
        const wrapper = mount({
            components: {
                HyTable,
                HyTableColumn
            },
            template: `
        <HyTable :data="tableData">
          <HyTableColumn prop="date" label="日期" align="center" />
          <HyTableColumn prop="name" label="姓名" align="right" />
        </HyTable>
      `,
            data() {
                return {
                    tableData: [testData[0]]
                }
            }
        })

        await nextTick()

        const headers = wrapper.findAll('th')
        expect(headers[0].classes()).toContain('is-center')
        expect(headers[1].classes()).toContain('is-right')
    })

    it('exposes columns correctly', async () => {
        const wrapper = mount({
            components: {
                HyTable,
                HyTableColumn
            },
            template: `
        <HyTable ref="tableRef" :data="tableData">
          <HyTableColumn prop="date" label="日期" width="200" />
          <HyTableColumn prop="name" label="姓名" align="center" />
        </HyTable>
      `,
            data() {
                return {
                    tableData: [testData[0]]
                }
            }
        })

        await nextTick()

        const tableRef = wrapper.vm.$refs.tableRef as any
        expect(tableRef.columns).toHaveLength(2)
        expect(tableRef.columns[0]).toEqual({
            prop: 'date',
            label: '日期',
            width: '200',
            minWidth: undefined,
            align: undefined
        })
        expect(tableRef.columns[1]).toEqual({
            prop: 'name',
            label: '姓名',
            width: undefined,
            minWidth: undefined,
            align: 'center'
        })
    })

    it('handles empty data correctly', async () => {
        const wrapper = mount({
            components: {
                HyTable,
                HyTableColumn
            },
            template: `
        <HyTable :data="tableData">
          <HyTableColumn prop="date" label="日期" />
        </HyTable>
      `,
            data() {
                return {
                    tableData: []
                }
            }
        })

        await nextTick()

        const rows = wrapper.findAll('tbody tr')
        expect(rows).toHaveLength(0)
    })

    it('applies highlight current row class correctly', async () => {
        const wrapper = mount({
            components: {
                HyTable,
                HyTableColumn
            },
            template: `
        <HyTable :data="tableData" highlight-current-row>
          <HyTableColumn prop="date" label="日期" />
        </HyTable>
      `,
            data() {
                return {
                    tableData: testData
                }
            }
        })

        await nextTick()

        const rows = wrapper.findAll('tbody tr')
        expect(rows[0].classes()).toContain('my-table__row--header')
    })
})