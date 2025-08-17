export default {
  computed: {
    device() {
      return this.$store.state.app.device
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.$_resizeHandler)
    })
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        this.$store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          this.$store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
      }
    },
    $_isMobile() {
      const rect = document.body.getBoundingClientRect()
      return rect.width - 1 < 992
    }
  }
}