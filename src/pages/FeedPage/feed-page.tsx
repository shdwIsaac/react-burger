import React, { FC } from 'react'
import styles from '../HomePage/home-page.module.css'
import { HistoryFeed } from '../../components/HistoryFeed/history-feed'
import { HistoryStats } from '../../components/HistoryStats/history-stats'

export const FeedPage: FC = () => {
  return (
    <div className={styles.appContent}>
      <div className={styles.appContentConstructor}>
        <HistoryFeed/>
        <HistoryStats/>
      </div>
    </div>
  )
}
