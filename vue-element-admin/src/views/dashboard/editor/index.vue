<template>
  <div class="dashboard-editor-container">
    <div class="clearfix package-container">
      <el-card v-for="(pk, index) in packages" :key="index" class="package-item" shadow="always">
        <div slot="header" class="clearfix">
          <span>{{ pk.name }}</span>
          <el-button style="float:right;padding: 3px 0;" type="text" @click="goToPackageDetail(pk.name)">详细</el-button>
        </div>
        <div>
          <div class="package-item-detail">作者：{{ pk.author.name }}</div>
          <div class="package-item-detail">版本：{{ pk.version }}</div>
          <div class="package-item-detail">更新时间：{{ getDateTime(pk.time) }}</div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
import GithubCorner from '@/components/GithubCorner'

export default {
  name: 'DashboardEditor',
  components: { PanThumb, GithubCorner },
  data() {
    return {
      emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3',
      packages: []
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  mounted: function() {
    this.getPackages()
  },
  methods: {
    getPackages: async function() {
      const packages = await this.apis.getPackages()
      this.packages = packages.data
    },
    getDateTime: function(dataStr) {
      const dt = new Date(dataStr)
      console.log(dt)

      return dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes()
    },

    goToPackageDetail: function(componentName) {
      this.$router.push(`/package/${componentName}`)
    }
  }
}
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
  .emptyGif {
    display: block;
    width: 45%;
    margin: 0 auto;
  }

  .dashboard-editor-container {
    background-color: #fbfbfb;
    min-height: 100vh;
    padding: 20px 30px 0px;
    .pan-info-roles {
      font-size: 12px;
      font-weight: 700;
      color: #333;
      display: block;
    }
    .info-container {
      position: relative;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }
  }

  .package-container{
    display: flex;
    justify-content: space-around;

    .package-item{
      width: 47%;

      .package-item-detail{
        font-size: .8rem;
        margin-top: .2rem;
        color:#2d2d2d;
      }
    }
  }
</style>
