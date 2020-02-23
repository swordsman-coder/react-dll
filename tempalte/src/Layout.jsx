import * as React from 'react'

import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'


import routes, { IRoute } from './Menu'

import './Layout.css'

const { Footer, Sider, Content } = Layout
const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu


class BasicLayout extends React.Component {

    state = {
        collapsed: false,
        mode: 'inline',
        winHeight: 0,
        selectedMenuKey: 0
    }
    onCollapse(collapsed) {
        this.setState({
            collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    }

    componentDidMount() {
        this.activeMenu()
        this.resizeWindow()
        window.addEventListener('resize', this.resizeWindow.bind(this))
    }
    resizeWindow() {
        this.setState({
            winHeight: document.body.clientHeight
        })
    }
    activeMenu() {
        routes.forEach((r, i) => {
            if (new RegExp(r.path).test(window.location.hash)) {
                if (i > 0) {
                    this.setState({
                        selectedMenuKey: i
                    })
                }
            }
        })
    }

    render() {
        return (
            <Router>
                <Layout style={{ height: this.state.winHeight }}>

                    <Sider style={{ minHeight: this.state.winHeight }} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse.bind(this)}>

                        <Menu theme="light" mode={this.state.collapsed ? 'vertical' : 'inline'} defaultSelectedKeys={[this.state.selectedMenuKey + '']}>
                            {
                                routes.map((route, index) => {
                                    if (route.subRoutes) {
                                        return (
                                            <SubMenu key={index} title={<span><Icon type={route.icon || ''} /><span className="nav-text">{route.name}</span></span>}>
                                                {
                                                    route.subRoutes.map((subRoute, subIndex) => !subRoute.hide && (
                                                        <MenuItem key={index + '-' + subIndex}>
                                                            <Link to={route.path + subRoute.path}>{subRoute.name}</Link>
                                                        </MenuItem>
                                                    ))
                                                }
                                            </SubMenu>
                                        )
                                    } else {
                                        return !route.hide && (
                                            <MenuItem key={index}>
                                                <Link to={route.path}>
                                                    <Icon type={route.icon || ''} />
                                                    <span className="nav-text">{route.name}</span>
                                                </Link>
                                            </MenuItem>
                                        )
                                    }
                                })
                            }
                        </Menu>
                    </Sider>
                    <Layout>

                        <Content className="main-content">

                            {

                                routes.map((route, index) => {

                                    if (route.subRoutes) {
                                        return (
                                            <Switch key={index}>
                                                {
                                                    route.subRoutes.map((subRoute, subIndex) => {

                                                        return (

                                                            <Route
                                                                key={index + '-' + subIndex}
                                                                exact={subRoute.exact}
                                                                path={route.path + subRoute.path}
                                                                component={subRoute.component}
                                                            />
                                                        )
                                                    })
                                                }
                                            </Switch>
                                        )
                                    } else {
                                        return (
                                            <Route
                                                key={index}
                                                exact={route.exact}
                                                path={route.path}
                                                component={route.component}
                                            />
                                        )
                                    }
                                })

                            }

                        </Content>
                    </Layout>
                </Layout>
            </Router>
        )
    }
}

export default BasicLayout;
