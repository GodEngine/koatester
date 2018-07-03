
import req from 'utils/req@0.3.0'

/**
 * 用户投票
 *
 * @param {String} env
 * @return {Promise}
 */
export const reqVote = (data, env) => req({
  endpoint: `2018-bird/vote/${env}`,
  data
})
