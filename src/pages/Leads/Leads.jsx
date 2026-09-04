import React from 'react';
import LeadTable from '../../components/leadTable/LeadTable';
import Layout from '../../components/layout/Layout';

const Leads = () => {
  return (
    <Layout title="Lead Management">
      <LeadTable />
    </Layout>
  );
};

export default Leads;