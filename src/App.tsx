import { TablesListView } from './Views/Tables/ListView'
import styles from './assets/styles/App.module.scss'

export default function App() {
  return (
    <div className={styles.appRoot}>
      <TablesListView />
    </div>
  )
}
