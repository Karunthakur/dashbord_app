import React, { useState } from 'react';
import { Drawer, theme } from 'antd';
import { CNAPP_DASHBOARD_TREE } from './data';
import Dashboard from './Components/Dashbord/Dashbord';
import Navbar from './Components/Dashbord/Navbar';
import Modal from './Components/Dashbord/Modal';
import "ag-charts-enterprise";
import { MenuFoldOutlined } from "@ant-design/icons"

import "./App.css"


const App = () => {
  const [state, setState] = useState(CNAPP_DASHBOARD_TREE);
  const [open, setOpen] = useState(false);
  const [openMenu, setOPenMenu] = useState(false)
  const [searchVal, setSearchVal] = useState('');
  const [id, setId] = useState(0)


  const openAddWidget = (id) => {
    setId(id)
    setOpen(!open)
  }
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <div className="bg-white h-4 pl-6 pt-12 xl:hidden" >
        <MenuFoldOutlined
          style={{ color: "black  ", fontSize: 30 }}
          className='text-black'
          onClick={() => setOPenMenu(true)}
        />
      </div>
      <span className='bg-black xl:visible '>
        <Navbar
          data={state}
          setState={setState}
          style={{ background: colorBgContainer }}
          searchVal={searchVal}
          setSearchVal={setSearchVal}
        />
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">CNAPP DASHBOARD</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setOpen(true)}
              className="flex w-40 h-10 border-4 justify-center items-center"
            >
              + Add Widget
            </button>
          </div>
        </div>
      </span>
      <Drawer
        placement='left'
        onClose={() => setOPenMenu(false)}
        open={openMenu}
        closable={false}>
        <Navbar
          isInline
          data={state}
          setState={setState}
          style={{ background: colorBgContainer }} />
      </Drawer>
      <section className='p-4'>
        {/* <ApolloData /> */}
        <Dashboard
          open={open}
          state={state}
          setState={setState}
          setOpen={setOpen}
          openAddWidget={openAddWidget}
          searchVal={searchVal}
          setSearchVal={setSearchVal}
        />
        {open &&
          <Modal
            setOpen={setOpen}
            state={state}
            setState={setState}
            id={id}
            setId={setId}
          />}
      </section>
      <footer className='text-center'>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED Ant
      </footer>
    </>
  );
};

export default App;
