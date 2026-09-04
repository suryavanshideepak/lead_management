import React from 'react';
import EmployeeLeadTable from '../../components/EmployeeLeadTable/EmployeeLeadTable';
import Layout from '../../components/layout/Layout';

const EmployeeLeads = () => {
  return (
    <Layout title="Lead Management">
      <EmployeeLeadTable />
    </Layout>
  );
};

export default EmployeeLeads;