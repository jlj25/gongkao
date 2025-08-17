export default {
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 20,
        total: 0
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.page.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getList()
    }
  }
}