import { assert } from '@japa/assert'
import { apiClient } from '@japa/api-client'
import app from '@adonisjs/core/services/app'
import type { Config } from '@japa/runner/types'
import { pluginAdonisJS } from '@japa/plugin-adonisjs'
import testUtils from '@adonisjs/core/services/test_utils'
import env from '#start/env'
import { authApiClient } from '@adonisjs/auth/plugins/api_client'
import { exec } from 'node:child_process'

/**
 * This file is imported by the "bin/test.ts" entrypoint file
 */

/**
 * Configure Japa plugins in the plugins array.
 * Learn more - https://japa.dev/docs/runner-config#plugins-optional
 */
export const plugins: Config['plugins'] = [
  assert(),
  apiClient({
    baseURL: `http://${env.get('HOST')}:${env.get('PORT')}`,
  }),
  pluginAdonisJS(app),
  authApiClient(app),
]

/**
 * Configure lifecycle function to run before and after all the
 * tests.
 *
 * The setup functions are executed before all the tests
 * The teardown functions are executed after all the tests
 */
export const runnerHooks: Required<Pick<Config, 'setup' | 'teardown'>> = {
  setup: [
    () => {
      return new Promise<void>((resolve, reject) => {
        const createDbCommand = `docker exec -i betalent_db mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS test_db"`

        exec(createDbCommand, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error creating database: ${stderr}`)
            reject(stderr)
          } else {
            console.log(`Database created or already exists: ${stdout}`)
            testUtils
              .db()
              .migrate()
              .then(() => resolve())
              .catch(reject)
          }
        })
      })
    },
  ],
  teardown: [],
}

/**
 * Configure suites by tapping into the test suite instance.
 * Learn more - https://japa.dev/docs/test-suites#lifecycle-hooks
 */
export const configureSuite: Config['configureSuite'] = (suite) => {
  if (['browser', 'functional', 'e2e'].includes(suite.name)) {
    return suite.setup(() => testUtils.httpServer().start())
  }
}
