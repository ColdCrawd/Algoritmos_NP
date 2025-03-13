
import { Layout, Menu, theme, Typography } from 'antd';
import { Footer } from 'antd/es/layout/layout';
const { Header, Content } = Layout;


function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
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
          items={[{ key: '1', label: 'Problema del Agente Viajero' }, { key: '2', label: 'nav 2' }]}
          style={{
            flex: 1,
            minWidth: 0,
          }}
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
          Content
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
