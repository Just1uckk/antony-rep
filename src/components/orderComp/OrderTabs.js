import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OrderInfoTab from './orderModalTabs/OrderInfoTab';
import OrderMaterialTab from './orderModalTabs/OrderMaterialTab';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ padding: "5px 0 5px 0", maxWidth: "auto" }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function OrderTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 'auto' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', minWidth: "140px" }}
      >
        <Tab label="Замовлення" {...a11yProps(0)} />
        <Tab label="Матеріал" {...a11yProps(1)} />
        <Tab disabled label="Фурнітура" />
        <Tab disabled sx={{bgcolor:"charcoal"}} label="Прорахунок" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <OrderInfoTab/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OrderMaterialTab/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        TO BE IMPLEMENTED
      </TabPanel>
      <TabPanel value={value} index={3}>
        TO BE IMPLEMENTED
      </TabPanel>
    </Box>
  );
}