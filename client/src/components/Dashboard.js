import React from 'react';
import AppHeader from './AppHeader';
import AppContent from './AppContent';
import PageTitle from './PageTitle';
import styles from '../styles/modules/app.module.scss';

const Dashboard = () => {
  return (
    <>
      <div className="container">
        <PageTitle>Employee List</PageTitle>
        <div className={styles.app__wrapper}>
          <AppHeader />
          <AppContent />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
