
import { Layout, Menu, theme, Typography } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import PageRoutes from './Routes';
import { useNavigate } from 'react-router';


const { Header, Content } = Layout;

function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  const items = [
    { key: '', label: 'Informacion de los problemas' }, 
    { key: 'travel', label: 'Problema del Agente Viajero' }, 
    { key: 'hamilton', label: 'Problema del Ciclo Hamiltoniano' },
    { key: 'knapsack', label: 'Problema de Knapsack' }
  ]

  const onMenuClick = ({ key }) => {
		navigate(`/${key}`);
	};
  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography.Title level={3} style={{ color: 'white', marginBottom:'25px', marginRight: '25px'}}> Analisis de Algoritmos </Typography.Title>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
          onClick={onMenuClick}

        />
      </Header>
      <Content
        style={{
          padding: '20px 48px',
        }}
      >
        <div
          style={{
            background: colorBgContainer,
            minHeight: '120vh',
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <PageRoutes />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default App;
