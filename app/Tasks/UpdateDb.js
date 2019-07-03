'use strict'

const Task = use('Task')

class UpdateDb extends Task {
  static get schedule() {
    return '0 * * * * *'
  }

  async handle() {
    const Database = use('Database')

    const users = await Database.from('users')
    for (let user of users) {
      await Database.transaction(async (trx) => {

        // await Database.truncate('user_table', trx)

        const db = await Database.table('user_table').insert({
          user_id: user.id
        }, trx)
        const updated = await Database.table('user_table')
          .where('user_id', user.id)
          .where('is_active', false)
          .update({
            is_active: true
          }, trx)
      })
    }
  }
}

module.exports = UpdateDb
