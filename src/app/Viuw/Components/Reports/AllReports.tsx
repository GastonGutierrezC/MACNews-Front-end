import React, { Component } from 'react';
import { UsersActivityReportContainer } from './UsersActivityReportContainer';
import { UsersByMonthReportContainer } from './UsersByMonthReportView';
import { UsersRolesReportContainer } from './UsersRolesReportContainer';
import UsersPendingApplicationReportTable from './UsersPendingApplication';
import NewsReviewReportComponent from './NewsReviewReport';

export class AllReports extends Component {
  render() {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Reportes para el administrador</h2>
        <UsersByMonthReportContainer />
        <UsersActivityReportContainer />
        <UsersRolesReportContainer />
        <UsersPendingApplicationReportTable />
        <NewsReviewReportComponent />
      </div>
    );
  }
}
