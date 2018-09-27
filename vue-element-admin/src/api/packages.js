import axios from 'axios'

const URLs = {
  GET_PACKAGES: 'api/-/verdaccio/packages'
}

export default {
  apis: {
    getPackages: async function() {
      return await axios.get(URLs.GET_PACKAGES)
    }
  }
}
