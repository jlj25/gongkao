import { checkPermission } from '@/utils/permission'

export default {
  methods: {
    hasPermission(roles) {
      return checkPermission(roles)
    }
  }
}