import { useState } from 'react';
import { Layout as LayoutAnt, Menu, theme } from 'antd';
import { HomeFilled, InfoCircleFilled, LikeFilled, ProductFilled } from '@ant-design/icons';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LikeContext } from '../context/LikeContext';
import { useContext } from 'react';

const { Header, Content, Footer } = LayoutAnt;

const Layout = () => {
    
  const [current, setCurrent] = useState(useLocation().pathname);
  const { count } = useContext(LikeContext);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [
    {
      key: "/",
      label: <Link to="/">Home</Link>,
      icon: <HomeFilled />,
    },
    {
      key: "/services",
      label: <Link to="/services">Services</Link>,
      icon: <ProductFilled />
    },
    {
      key: '/favorites',
      label: "Favorites",
      icon: <Link to="/favorites"><LikeFilled /></Link>,
    },
    {
      key: "/about",
      label: <Link to="/about">About</Link>,
      icon: <InfoCircleFilled />
    },
    
  ];

  return (
    <LayoutAnt className='Layout'>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[current]} 
          items={items}
          onClick={(e) => setCurrent(e.key)} 
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
        <span style={{ color: 'white' }}><LikeFilled/> Count: {count}</span>
      </Header>

      <Content className='main'
        style={{
          padding: '0 48px',
          margin: '24px 0'
        }}
      >
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}>
          <Outlet />
        </div>
      </Content>

      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </LayoutAnt>
  );
};

export default Layout;
